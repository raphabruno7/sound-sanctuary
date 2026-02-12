# Task: S04-0000 (Supervisor) Merge design-system PR #4 (v5.3 recipes)

## Goal
Merge `design-system` PR #4 so `sound-sanctuary` can consume `styles/dist/typography.css` and `styles/dist/components.css` from the centralized design-system.

## Scope
- Review and merge: https://github.com/raphabruno7/design-system/pull/4
- Validate the PR publishes these consumer artifacts:
  - `styles/dist/typography.css`
  - `styles/dist/components.css`
- Capture the merge commit SHA for downstream submodule bump.

## Constraints
- Do not copy HTML or CSS into `sound-sanctuary`.
- `design-system` remains the single source of truth.
- Prefer minimal verification that protects consumers: dist files exist + import guidance is correct.

## PR Title / Body (for the merge comment)
Title (already set by the PR): keep the existing PR title.

Comment to post on the PR after merging:
```md
Merged for consumer adoption.

- Publishes: styles/dist/typography.css, styles/dist/components.css
- Consumer import order documented
```

## Commands To Run
```bash
set -euo pipefail

cd /Users/raphaelbruno/design-system
pwd
git status -sb

git fetch origin --prune

gh pr view 4 --json number,title,state,mergedAt,baseRefName,headRefName,url

gh pr diff 4

# Lightweight consumer-safety checks (dist files + docs guidance)
# If the PR is not checked out locally, use gh pr checkout.
gh pr checkout 4

ls -la styles/dist | sed -n '1,200p'

test -f styles/dist/typography.css
test -f styles/dist/components.css

# Optional: confirm README/doc import order mentions tokens/base before new files
rg -n "typography\.css|components\.css|tokens\.css|base\.css" README.md docs || true

# Merge (no branch deletion)
gh pr merge 4 --merge --delete-branch=false

gh pr view 4 --json url,state,mergedAt,mergeCommit --jq '{url,state,mergedAt,mergeCommit}'
```

## Stop Condition
- PR #4 is `MERGED` and you posted the merge commit SHA back to the operator.
