# Task: S03-0010 — QA: Visual Regression Checklist (Light/Dark, Critical Routes)

## Assigned Agent Role
QA

## Goal
Run and document a light/dark visual regression pass focused on critical conversion routes after recipe/token application.

## Scope (files/pages)
- Validate critical routes in both themes:
  - `/`
  - `/sound-healing`
  - `/sessions`
  - `/contact`
  - `/portfolio`
- Produce checklist evidence in:
  - `docs/QA_RELEASE.md` (append S03 section) or
  - `docs/SPRINTS/S03_QA_CHECKLIST.md`

## Constraints
- No code changes in this task unless explicitly authorized as bugfix follow-up.
- No new dependencies.
- No schema/Convex changes.
- Keep findings objective: pass/fail + concrete notes.

## Acceptance Criteria
- Checklist includes light and dark outcomes per critical route.
- Header/footer/primary CTA surfaces are explicitly verified.
- Any regressions are linked to concrete file/route locations.
- `./scripts/agent_check.sh` passes in the reviewed branch.
