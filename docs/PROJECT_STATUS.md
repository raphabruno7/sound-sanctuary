# Sound Sanctuary — Project Status (Snapshot)

This file captures the current state of the repo so work can continue across Codex sessions/agents without relying on chat history.

## Repo
- Local path: `/Users/raphaelbruno/projects/sound-sanctuary`
- Remote: `https://github.com/raphabruno7/sound-sanctuary`
- Default branch: `main`

## What Exists (v0)
- Next.js App Router + TypeScript + Tailwind
- Convex integrated (client provider + functions)
- Newsletter subscribe flow (Convex subscribers table + mutations)
- Portfolio + Testimonials tables + read paths
- Minimal header/footer navigation

## Key Docs
- `docs/HIGH_LEVEL.md` — product direction
- `docs/AGENT_ORCHESTRATION.md` — PR-first multi-agent workflow
- `docs/SPRINTS/S01.md` — current async sprint
- `agents/ASYNC_CONTRACT.md` — agent rules in async mode
- `agents/tasks/S01/*` — frozen sprint tasks

## How To Run (local)
1) Install deps:
   - `npm install`
2) Run Convex (required for mutations/queries):
   - `npx convex dev`
3) Run Next:
   - `npm run dev`

## Common Ops
- Quick checks:
  - `scripts/agent_check.sh`
- See sprint/tasks status:
  - `scripts/async_status.sh`

## Convex Seeding
From terminal (if `CONVEX_DEPLOYMENT` is set via `.env.local`):
- `npx convex run portfolio:seedDemo`
- `npx convex run testimonials:seedDemo`

Or via dashboard:
- `npx convex dashboard` then run the same mutations.

## Notes / Known Constraints
- Build script uses webpack: `npm run build` runs `next build --webpack` (Turbopack had sandbox/permission issues in this environment).

