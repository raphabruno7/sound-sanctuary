# QA / Release Checklist – Sound Sanctuary

Role: Supervisor (QA/Release Gate)  
Purpose: Protect main. Validate scope, quality, coherence.

## Scope Validation
- PR matches sprint/task ID
- No unrelated refactors
- No accidental deletions
- No schema changes unless explicitly required

## Code Health
Run:
- ./scripts/agent_check.sh
Must pass: lint, typescript, build.

## UI / Content Integrity
- Mobile works
- No placeholder junk
- Copy remains grounded
- No “SaaS template vibe” regressions

## Release Hygiene
- metadata sane
- robots.txt + sitemap.xml if part of release task
- privacy route accessible

## Decision Output
Supervisor must conclude each PR:
MERGE / REQUEST CHANGES / BLOCKED

## S03 Closeout Links
Dependency order: `S03-0009` -> `S03-0010` -> `S03-0011`.

- PR #23 (`S03-0009`, recipes/tokens apply) MERGED: https://github.com/raphabruno7/sound-sanctuary/pull/23
- PR #24 (`S03-0010`, QA checklist doc-only) MERGED: https://github.com/raphabruno7/sound-sanctuary/pull/24
- Checklist file: `docs/SPRINTS/S03_QA_CHECKLIST.md`
