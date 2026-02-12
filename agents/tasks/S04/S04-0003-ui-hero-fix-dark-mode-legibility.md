# Task: S04-0003 (UI Hero) Fix dark-mode legibility regressions (remove hardcoded light neutrals)

```autopilot
BASE=main
BRANCH=codex/feat/S04-0003-fix-dark-mode-legibility
COMMIT_MSG=fix(ui): remove hardcoded light neutrals for dark mode legibility
PR_TITLE=fix(ui): dark-mode legibility on critical routes (semantic token classes)
CHECK_CMD=./scripts/agent_check.sh
```

## Goal
Address Supervisor gate feedback: prevent dark-mode low-contrast regressions by removing hardcoded light-theme utilities (e.g. `bg-white`, `text-neutral-*`, `border-neutral-*`) from critical pages and replacing them with **semantic token classes**.

## Context
- Review feedback (REQUEST CHANGES): dark-mode legibility risk due to `bg-white` + `text-neutral-*` on critical routes.
- Design-system is the source of truth. Consumer repo must not introduce local tokens.

## Scope
Update only these files (unless you find the same issue on other critical routes):
- `/Users/raphaelbruno/projects/sound-sanctuary/src/app/page.tsx`
- If the same patterns exist on these routes, fix them too (keep minimal):
  - `/Users/raphaelbruno/projects/sound-sanctuary/src/app/sound-healing/page.tsx`
  - `/Users/raphaelbruno/projects/sound-sanctuary/src/app/sessions/page.tsx`
  - `/Users/raphaelbruno/projects/sound-sanctuary/src/app/contact/page.tsx`

## Out of Scope
- No new dependencies.
- No Tailwind config changes.
- No new CSS files.
- No changes inside `./design-system` submodule.

## Constraints
- Replace hardcoded light-only utilities with semantic equivalents:
  - Prefer: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `text-card-foreground`.
  - For subtle text: prefer semantic `text-muted-foreground` over `text-neutral-700/600`.
- Do NOT hardcode colors or introduce `:root` tokens in this repo.
- Keep the existing structure/content; this is a legibility + consistency fix.

## Commands To Run
```bash
set -euo pipefail

cd /Users/raphaelbruno/projects/sound-sanctuary
pwd
git status -sb

./scripts/pr_autopilot.sh start /Users/raphaelbruno/projects/sound-sanctuary/agents/tasks/S04/S04-0003-ui-hero-fix-dark-mode-legibility.md

# Locate offending utilities (should include the ones called out by Supervisor)
rg -n "bg-white|text-neutral-|border-neutral-" src/app/page.tsx src/app/sound-healing/page.tsx src/app/sessions/page.tsx src/app/contact/page.tsx || true

# Make the minimal class replacements described in Constraints.

# Re-run checks
./scripts/agent_check.sh

./scripts/pr_autopilot.sh finish /Users/raphaelbruno/projects/sound-sanctuary/agents/tasks/S04/S04-0003-ui-hero-fix-dark-mode-legibility.md
