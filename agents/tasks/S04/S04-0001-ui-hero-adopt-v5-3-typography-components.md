# Task: S04-0001 (UI Hero) Adopt design-system v5.3 recipes (typography + components)

```autopilot
BASE=main
BRANCH=codex/feat/S04-0001-adopt-v5-3-typography-components
COMMIT_MSG=feat(ui): adopt design-system typography + components recipes
PR_TITLE=feat(ui): adopt design-system v5.3 recipes (typography + components)
CHECK_CMD=./scripts/agent_check.sh
```

## Goal
Propagate the v5.3 visual system by consuming additional **canonical** CSS outputs from the centralized `./design-system` submodule:
- `styles/dist/typography.css`
- `styles/dist/components.css`

Then apply the new recipe classes to the site shell and Home hero, without inventing local tokens/styles.

## Context
- Source of truth: centralized repo `design-system` (submodule mounted at `./design-system`).
- Prerequisite: `design-system` PR #4 is merged (the Supervisor task will provide the merge SHA).

## Scope
- Bump submodule `./design-system` to the merge commit SHA from design-system PR #4.
- Update imports order in `/Users/raphaelbruno/projects/sound-sanctuary/src/app/globals.css`.
- Apply recipe classNames (no new CSS files) in:
  - `/Users/raphaelbruno/projects/sound-sanctuary/src/components/SiteHeader.tsx`
  - `/Users/raphaelbruno/projects/sound-sanctuary/src/components/SiteFooter.tsx`
  - `/Users/raphaelbruno/projects/sound-sanctuary/src/app/page.tsx`

## Out of Scope
- No new dependencies.
- No Tailwind config work.
- No new local token registries (`:root { --... }`) in `sound-sanctuary`.
- No Convex/schema changes.
- Do not copy reference HTML from branding; only use it to visually compare.

## Constraints
- `globals.css` must keep canonical order: design-system imports must come **before** Tailwind imports.
- Consumer repo must not hardcode token values.

## Commands To Run
```bash
set -euo pipefail

pwd
git status -sb

# Start the branch via autopilot
./scripts/pr_autopilot.sh start /Users/raphaelbruno/projects/sound-sanctuary/agents/tasks/S04/S04-0001-ui-hero-adopt-v5-3-typography-components.md

# Ensure submodules are present
git submodule update --init --recursive

# Bump submodule to the design-system PR #4 merge SHA
# Replace <MERGE_SHA_FROM_DESIGN_SYSTEM_PR_4> with the reported merge commit.
(cd design-system && git fetch origin --prune && git checkout <MERGE_SHA_FROM_DESIGN_SYSTEM_PR_4>)

git add design-system

# Verify new dist files exist
ls -la design-system/styles/dist | sed -n '1,200p'

test -f design-system/styles/dist/typography.css
test -f design-system/styles/dist/components.css

# Inspect available recipe class names (use these instead of inventing new ones)
rg -n "^\\.|\\.ds-|\\.btn|\\.cta|header|footer|hero" design-system/styles/dist/typography.css design-system/styles/dist/components.css | sed -n '1,200p'

# Update globals.css imports (tokens + base already exist; add typography + components after base)
# Then apply className updates in SiteHeader/SiteFooter/Home hero.

# Validate
./scripts/agent_check.sh

# Finish via autopilot (commit staged-only, push, PR create)
./scripts/pr_autopilot.sh finish /Users/raphaelbruno/projects/sound-sanctuary/agents/tasks/S04/S04-0001-ui-hero-adopt-v5-3-typography-components.md
```

## PR Body
```md
## Summary
- Bump `./design-system` submodule to the merge commit from design-system PR #4
- Import canonical design-system recipes:
  - `design-system/styles/dist/typography.css`
  - `design-system/styles/dist/components.css`
- Apply recipe classNames to site shell + Home hero (no local tokens/CSS added)

## Source of Truth
- Design system repo: https://github.com/raphabruno7/design-system
- Merged PR (recipes publish): https://github.com/raphabruno7/design-system/pull/4

## Verification
- ./scripts/agent_check.sh
```

## Stop Condition
- PR is opened, and you stop (no merge questions).
