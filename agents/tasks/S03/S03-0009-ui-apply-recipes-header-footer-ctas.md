# Task: S03-0009 — UI: Apply Canonical Recipes/Tokens to Header/Footer/Primary CTAs

## Assigned Agent Role
UI

## Goal
Apply design-system v5.3 recipes/tokens to shared shell surfaces and primary conversion CTAs without inventing new styles or redefining local tokens.

## Scope (files/pages)
- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`
- Primary CTA surfaces in:
  - `src/app/page.tsx`
  - `src/app/sessions/page.tsx`
  - `src/app/sound-healing/page.tsx`
- If needed for canonical class usage:
  - `src/app/globals.css` (mapping/import alignment only)

## Constraints
- Use only canonical design-system tokens/recipes already available.
- Do not add new CSS variables or local `:root` token definitions.
- Do not add new dependencies.
- Do not change schema/Convex.
- Keep structure and copy intent intact.

## Acceptance Criteria
- Header/footer/primary CTAs use canonical tokenized styles consistently.
- No local token duplication is introduced.
- No ad-hoc style inventions outside design-system recipes.
- `./scripts/agent_check.sh` passes.
