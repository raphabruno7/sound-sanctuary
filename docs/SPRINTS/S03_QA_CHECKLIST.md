# S03 QA Checklist (Light/Dark Visual Regression)

Scope: S03-0010 QA visual regression pass (critical routes, light + dark) after applying design-system token recipes.

Reviewed branch/PR:
- PR: https://github.com/raphabruno7/sound-sanctuary/pull/23
- Branch: `feat/S03-0009-ui-apply-recipes-header-footer-ctas`
- Commit (detached worktree): `681174b`

Automation evidence:
- `git submodule update --init --recursive`: OK (design-system checked out at `87f1e7e9...`)
- `npm install`: OK
- `./scripts/agent_check.sh`: OK (lint + build, routes generated include `/`, `/sound-healing`, `/sessions`, `/contact`, `/portfolio`)

Notes on method:
- This checklist records objective findings from code + build verification.
- A browser-based visual pass is still recommended to confirm perceived contrast/legibility in both themes.

## Checklist (Critical Routes)

### `/`
- Light: PASS (header/footer present; primary CTA uses tokenized button recipe; page background uses semantic tokens via layout/base).
- Dark: WARN (hero overlay uses fixed neutrals and several sections use `text-neutral-*` utilities; recommend manual contrast check).

### `/sound-healing`
- Light: PASS (page renders with default semantic text/background; booking CTA present).
- Dark: PASS (page relies on defaults; booking CTA uses tokenized recipe).

### `/sessions`
- Light: PASS (booking CTA to `/contact` present and tokenized).
- Dark: PASS (same as light; relies on semantic defaults + tokenized CTA).

### `/contact`
- Light: PASS (page exists and renders; header/footer present from layout).
- Dark: PASS (no hardcoded light tokens observed; relies on semantic defaults).

### `/portfolio`
- Light: PASS (renders; content present).
- Dark: FAIL risk (page uses `bg-white` and multiple `text-neutral-*` utilities; likely inconsistent in dark theme). 

## Shell Surfaces

- Header: PASS (uses semantic tokens; includes ThemeToggle; primary "Book" CTA present).
- Footer: PASS (uses semantic tokens).
- Theme toggle: PASS by implementation (toggles `html.dark` class).

