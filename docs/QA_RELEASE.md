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
