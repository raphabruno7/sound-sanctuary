# Task: S04-0002 (QA + Release) Visual regression gate for v5.3 recipes adoption

## Goal
Gate the `sound-sanctuary` PR produced by `S04-0001` (typography/components recipes adoption) with a tight visual + functional regression check in light and dark mode.

## Scope
- Validate the PR branch from `S04-0001` (link will be in the PR description).
- Check critical routes:
  - `/`
  - `/sound-healing`
  - `/sessions`
  - `/contact`
  - `/portfolio`

## Constraints
- No code changes unless absolutely required for a release break/fix.
- No new dependencies.
- Keep main clean.

## Commands To Run
```bash
set -euo pipefail

cd /Users/raphaelbruno/projects/sound-sanctuary
pwd
git status -sb

git fetch origin --prune

# Replace <PR_NUMBER> with the PR created by S04-0001
# Pull the PR branch locally for validation
# (No new feature branches; this is a temporary checkout for verification.)
gh pr checkout <PR_NUMBER>

./scripts/agent_check.sh

# Optional local preview (only if needed)
# pnpm dev
```

## Manual Checklist (Light + Dark)
- [ ] Home hero: H1 readable, spacing consistent, no overlap
- [ ] Header: nav links accessible, ThemeToggle works, no layout shift
- [ ] Footer: links readable, spacing consistent
- [ ] CTAs: primary/secondary states readable (hover/focus), no low-contrast text
- [ ] Dark mode:
  - Toggle adds/removes `html.dark`
  - No illegible text on dark backgrounds

## PR Body / Comment To Leave
```md
QA Gate Results (S04-0002)

- ./scripts/agent_check.sh: <PASS/FAIL>
- Visual regression (light/dark): <PASS/ISSUES>
- Notes:
  - <route>: <issue or OK>

Recommendation: MERGE / REQUEST CHANGES
```

## Stop Condition
Post the QA gate comment and stop (no merge questions).
