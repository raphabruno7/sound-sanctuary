# Task: S03-0006 — Release: Metadata + robots.txt + sitemap.xml for New Routes

## Assigned Agent Role
Release

## Goal
Ensure release hygiene covers the actual route set after S03 UI tasks land: metadata, `robots.txt`, and `sitemap.xml`.

## Scope (files/pages)
- `src/app/layout.tsx` (metadata only, if applicable)
- `src/app/robots.ts` or `public/robots.txt` (as used in repo)
- `src/app/sitemap.ts` or `public/sitemap.xml` (as used in repo)

## Constraints
- Strict scope: only metadata + robots + sitemap.
- No refactors unrelated to release hygiene.
- No new dependencies.

## Acceptance Criteria
- New/updated routes are included as appropriate.
- `./scripts/agent_check.sh` passes.

