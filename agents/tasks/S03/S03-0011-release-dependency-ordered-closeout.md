# Task: S03-0011 — Release: Dependency-Ordered S03 Closeout

## Assigned Agent Role
Release

## Goal
Close S03 with a dependency-ordered release checklist after UI alignment and visual regression tasks complete.

## Scope (files/pages)
- Update sprint/release tracking docs only:
  - `docs/SPRINTS/S03.md`
  - `docs/PROJECT_STATUS.md` (if used for sprint completion status)
  - `docs/QA_RELEASE.md` (link QA evidence from S03-0010)

## Constraints
- No product code changes.
- No dependency additions.
- No schema/Convex changes.
- Do not mark sprint complete without explicit evidence links.

## Acceptance Criteria
- Confirms completion ordering: `S03-0009` -> `S03-0010` -> `S03-0011`.
- Includes links to merged PRs/evidence for recipe alignment and visual QA.
- Records any deferred items as explicit backlog carry-over.
- `./scripts/agent_check.sh` passes.
