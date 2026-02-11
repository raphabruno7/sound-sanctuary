# Task: S03-0001 — Architect: Content Modules + Page Outlines (v1)

## Assigned Agent Role
Architect

## Goal
Define reusable content modules and page outlines (H1/H2/sections) for the primary conversion routes, derived from BRIEFING v5 + S02 architecture docs.

## Scope (files/pages)
- Create/update planning docs only:
  - `docs/architecture/CONTENT_ARCHITECTURE_v2.md` (or add an appendix file) for module definitions
  - Optional: `docs/briefing/BRIEFING_v5_INTERPRETED.md` refinements (versioned as v6 when needed)
- Pages covered (outlines only):
  - `/sound-healing`
  - `/sessions`
  - `/portfolio` (minimal)
  - `/about` (minimal)

## Constraints
- No UI/code changes.
- No design system decisions.
- No new dependencies.
- No schema/Convex changes.

## Acceptance Criteria
- Each page has a clear section outline with module references.
- Modules are reusable and described by purpose, required headings, and expected bullet-level content.
- Explicitly documents what is placeholder vs locked.
- `./scripts/agent_check.sh` passes.

