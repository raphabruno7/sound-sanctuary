# Task: S04-0004 (UI Hero) Apply v5.3 recipes to secondary routes (sound-healing, sessions, contact)

```autopilot
BASE=main
BRANCH=codex/feat/S04-0004-ui-recipes-secondary-routes
COMMIT_MSG=feat(ui): apply v5.3 recipes to secondary routes
PR_TITLE=feat(ui): apply v5.3 recipes to secondary routes
CHECK_CMD=./scripts/agent_check.sh
```

## Goal
Extend the v5.3 design-system recipes (typography/components + semantic tokens) to secondary routes so light/dark remain consistent beyond Home:
- `/sound-healing`
- `/sessions`
- `/contact`

## Scope
- Update markup/classNames (no new CSS) in:
  - `src/app/sound-healing/page.tsx`
  - `src/app/sessions/page.tsx`
  - `src/app/contact/page.tsx`
- Use existing design-system recipes and semantic classes (`btn`, `btn-primary/secondary`, ds- typography where appropriate, `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`).

## Out of Scope
- No new dependencies.
- No Tailwind config changes.
- No schema/Convex changes.
- Do not invent new tokens or add `:root` variables locally.

## Constraints
- Keep content structure intact; this is a recipe/semantic pass.
- Remove/replace any `bg-white`, `text-neutral-*`, `border-neutral-*` if encountered.
- Keep imports order in `globals.css` as-is (no edits expected there).

## Commands To Run
```bash
set -euo pipefail

cd /Users/raphaelbruno/projects/sound-sanctuary
pwd
git status -sb

git submodule update --init --recursive

./scripts/pr_autopilot.sh start /Users/raphaelbruno/projects/sound-sanctuary/agents/tasks/S04/S04-0004-ui-recipes-secondary-routes.md

# Guardrail scan
rg -n "bg-white|text-neutral-|border-neutral-" src/app/sound-healing/page.tsx src/app/sessions/page.tsx src/app/contact/page.tsx || true

# Apply recipe/semantic classes per Constraints.

./scripts/agent_check.sh

./scripts/pr_autopilot.sh finish /Users/raphaelbruno/projects/sound-sanctuary/agents/tasks/S04/S04-0004-ui-recipes-secondary-routes.md
```

## PR Body
```md
## Summary
- Apply design-system v5.3 recipes and semantic token classes to secondary routes (/sound-healing, /sessions, /contact)
- Replace remaining light-only neutrals (if any) with semantic background/text/border classes
- Keep structure/content intact; no new CSS or deps

## Verification
- ./scripts/agent_check.sh
```

## Stop Condition
- PR opened; stop (no merge questions).
