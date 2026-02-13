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
    BEGIN { in_block=0 }
    $0 ~ /^[[:space:]]*```autopilot[[:space:]]*$/ { in_block=1; next }
    $0 ~ /^[[:space:]]*```[[:space:]]*$/ { if (in_block==1) exit; }
    { if (in_block==1) print }
  ' "$task_path"
}

extract_pr_body_md() {
  local task_path="$1"
  awk '
    BEGIN { in_md=0; in_body=0 }
    $0 ~ /^[[:space:]]*##[[:space:]]+PR Body[[:space:]]*$/ { in_body=1; next }
    $0 ~ /^[[:space:]]*```md[[:space:]]*$/ { if (in_body==1) { in_md=1; next } }
    $0 ~ /^[[:space:]]*```[[:space:]]*$/ { if (in_md==1) exit }
    { if (in_md==1) print }
  ' "$task_path"
}

parse_kv_block() {
  # Deprecated: bash 3.2 (macOS default) doesn't support associative arrays.
  # Keep this function name for compatibility, but parse into simple variables
  # via parse_autopilot_metadata below.
  die "internal: parse_kv_block is no longer supported"
}

parse_autopilot_metadata() {
  local block="$1"
  local base="main"
  local branch=""
  local commit_msg=""
  local pr_title=""
  local check_cmd="./scripts/agent_check.sh"

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
      BASE) base="$val" ;;
      BRANCH) branch="$val" ;;
      COMMIT_MSG) commit_msg="$val" ;;
      PR_TITLE) pr_title="$val" ;;
      CHECK_CMD) check_cmd="$val" ;;
      *)
        die "unsupported autopilot key: $key"
        ;;
    esac
  done <<EOF
$block
EOF

  # Emit shell-safe assignments for the caller to eval.
  printf 'base=%q\n' "$base"
  printf 'branch=%q\n' "$branch"
  printf 'commit_msg=%q\n' "$commit_msg"
  printf 'pr_title=%q\n' "$pr_title"
  printf 'check_cmd=%q\n' "$check_cmd"
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

  local base branch commit_msg pr_title check_cmd
  eval "$(parse_autopilot_metadata "$autopilot")"
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

  local base branch commit_msg pr_title check_cmd
  eval "$(parse_autopilot_metadata "$autopilot")"

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
