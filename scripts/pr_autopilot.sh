#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  ./scripts/pr_autopilot.sh start  <task.md>
  ./scripts/pr_autopilot.sh finish <task.md>

Task file requirements:
  1) An autopilot block:

     ```autopilot
     BASE=main
     BRANCH=feat/...
     COMMIT_MSG=...
     PR_TITLE=...
     CHECK_CMD=./scripts/agent_check.sh
     ```

  2) A PR body block:

     ## PR Body
     ```md
     ...
     ```

Notes:
  - 'start' creates the branch from BASE.
  - 'finish' runs CHECK_CMD, commits STAGED changes only, pushes, and opens a PR.
  - No new dependencies; uses git + gh only.
EOF
}

die() {
  echo "error: $*" >&2
  exit 1
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "missing required command: $1"
}

trim() {
  local s="$1"
  s="${s#"${s%%[![:space:]]*}"}"
  s="${s%"${s##*[![:space:]]}"}"
  printf '%s' "$s"
}

strip_quotes() {
  local s="$1"
  if [[ "$s" =~ ^\".*\"$ ]]; then
    printf '%s' "${s:1:${#s}-2}"
    return 0
  fi
  if [[ "$s" =~ ^\'.*\'$ ]]; then
    printf '%s' "${s:1:${#s}-2}"
    return 0
  fi
  printf '%s' "$s"
}

extract_autopilot_block() {
  local task_path="$1"
  awk '
    BEGIN { in=0 }
    $0 ~ /^[[:space:]]*```autopilot[[:space:]]*$/ { in=1; next }
    $0 ~ /^[[:space:]]*```[[:space:]]*$/ { if (in==1) exit; }
    { if (in==1) print }
  ' "$task_path"
}

extract_pr_body_md() {
  local task_path="$1"
  awk '
    BEGIN { in=0; in_body=0 }
    $0 ~ /^[[:space:]]*##[[:space:]]+PR Body[[:space:]]*$/ { in_body=1; next }
    $0 ~ /^[[:space:]]*```md[[:space:]]*$/ { if (in_body==1) { in=1; next } }
    $0 ~ /^[[:space:]]*```[[:space:]]*$/ { if (in==1) exit }
    { if (in==1) print }
  ' "$task_path"
}

parse_kv_block() {
  local block="$1"
  local -n out_ref="$2"
  while IFS= read -r line; do
    line="$(trim "$line")"
    [[ -z "$line" ]] && continue
    [[ "$line" == \#* ]] && continue
    [[ "$line" != *=* ]] && continue
    local key="${line%%=*}"
    local val="${line#*=}"
    key="$(trim "$key")"
    val="$(strip_quotes "$(trim "$val")")"
    case "$key" in
      BASE|BRANCH|COMMIT_MSG|PR_TITLE|CHECK_CMD)
        out_ref["$key"]="$val"
        ;;
      *)
        die "unsupported autopilot key: $key"
        ;;
    esac
  done <<<"$block"
}

ensure_clean_worktree() {
  if ! git diff --quiet || ! git diff --cached --quiet; then
    die "worktree has changes; commit/stash before running autopilot"
  fi
  if [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
    die "worktree has untracked files; clean them before running autopilot"
  fi
}

ensure_on_branch() {
  local expected="$1"
  local current
  current="$(git branch --show-current)"
  [[ "$current" == "$expected" ]] || die "expected to be on branch '$expected' but on '$current'"
}

run_check() {
  local cmd="$1"
  echo "+ $cmd"
  # shellcheck disable=SC2086
  $cmd
}

start_cmd() {
  local task_path="$1"
  local autopilot
  autopilot="$(extract_autopilot_block "$task_path")"
  [[ -n "$autopilot" ]] || die "missing autopilot metadata block in $task_path"

  declare -A meta=()
  parse_kv_block "$autopilot" meta

  local base="${meta[BASE]:-main}"
  local branch="${meta[BRANCH]:-}"
  [[ -n "$branch" ]] || die "autopilot BRANCH is required"

  ensure_clean_worktree

  git switch "$base" >/dev/null
  git pull --rebase >/dev/null || true
  git switch -c "$branch"

  echo "ok: on branch $branch (from $base)"
}

finish_cmd() {
  local task_path="$1"
  local autopilot pr_body
  autopilot="$(extract_autopilot_block "$task_path")"
  [[ -n "$autopilot" ]] || die "missing autopilot metadata block in $task_path"

  declare -A meta=()
  parse_kv_block "$autopilot" meta

  local branch="${meta[BRANCH]:-}"
  local commit_msg="${meta[COMMIT_MSG]:-}"
  local pr_title="${meta[PR_TITLE]:-}"
  local check_cmd="${meta[CHECK_CMD]:-./scripts/agent_check.sh}"
  local base="${meta[BASE]:-main}"

  [[ -n "$branch" ]] || die "autopilot BRANCH is required"
  [[ -n "$commit_msg" ]] || die "autopilot COMMIT_MSG is required"
  [[ -n "$pr_title" ]] || die "autopilot PR_TITLE is required"

  ensure_on_branch "$branch"

  pr_body="$(extract_pr_body_md "$task_path")"
  [[ -n "$pr_body" ]] || die "missing PR body block (expected: '## PR Body' then a fenced md block) in $task_path"

  run_check "$check_cmd"

  if git diff --cached --quiet; then
    die "no staged changes; stage the intended files before running finish"
  fi

  git commit -m "$commit_msg"
  git push -u origin "$branch"

  local body_file
  body_file="$(mktemp -t pr_body.XXXXXX.md)"
  printf '%s\n' "$pr_body" >"$body_file"

  gh pr create \
    --base "$base" \
    --head "$branch" \
    --title "$pr_title" \
    --body-file "$body_file"

  echo "ok: PR opened for $branch -> $base"
}

main() {
  need_cmd git
  need_cmd gh

  if [[ $# -lt 2 ]]; then
    usage
    exit 2
  fi

  local action="$1"
  local task_path="$2"
  [[ -f "$task_path" ]] || die "task file not found: $task_path"

  case "$action" in
    start) start_cmd "$task_path" ;;
    finish) finish_cmd "$task_path" ;;
    -h|--help|help) usage ;;
    *) usage; die "unknown action: $action" ;;
  esac
}

main "$@"
