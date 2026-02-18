# Sound Sanctuary — Project Status (Snapshot)

This file captures the current state of the repo so work can continue across Codex sessions/agents without relying on chat history.

## Repo
- Local path: `/Users/raphaelbruno/projects/sound-sanctuary`
- Remote: `https://github.com/raphabruno7/sound-sanctuary`
- Default branch: `main`

## Current Sprint
- Last completed sprint: `S03` (DONE, 2026-02-12)
- Current sprint: `S04` (IN PROGRESS) — DS v8.9 integration + visual polish

## Major Milestones / PRs
- `#20` — `feat(ui): propagate design-system v5.3 + dark mode` (S03 baseline)
- `#23` — `feat(ui): apply canonical token recipes to header/footer/CTAs` (S03 UI alignment)
- `#25` — `docs(release): S03 closeout (dependencies merged)` (S03 complete)
- `#46` — bump design-system to v8.3.0
- `#47` — bump design-system to v8.4.0
- `#48` — bump design-system to v8.7.0
- `#49` — bump design-system to v8.8.0
- `#50` — bump design-system to v8.9.0
- `#51` — docs: refresh project status (post-S04 + ds v8.9.0) (merged; this file supersedes it for S04 execution)

## Design System Source Of Truth
- Centralized design system is integrated via git submodule at `./design-system`.
- DS version: `v8.9.0` (submodule pinned in `main`).
- Canonical consumer imports (website, in order):
  - `design-system/styles/dist/tokens.css`
  - `design-system/styles/dist/base.css`
  - `design-system/styles/dist/typography.css`
  - `design-system/styles/dist/components.css`
  - `design-system/styles/dist/animations.css` (S04-PR1)
- Consumer repo rule: do not define local token registries (no local `:root` token blocks).
- Dark-mode toggle is delivered in the shared shell (`src/components/ThemeToggle.tsx`).

## What Exists (v0)
- Next.js App Router + TypeScript + Tailwind
- Convex integrated (client provider + functions)
- Newsletter subscribe flow (Convex subscribers table + mutations)
- Portfolio + Testimonials tables + read paths
- Minimal header/footer navigation

## Key Docs
- `docs/HIGH_LEVEL.md` — product direction
- `docs/AGENT_ORCHESTRATION.md` — PR-first multi-agent workflow
- `docs/SPRINTS/S03.md` — last completed sprint (DONE)
- `docs/prompts/CODEX_EXEC_S04.md` — execution plan for S04
- `agents/ASYNC_CONTRACT.md` — agent rules in async mode
- `agents/tasks/S03/*` — sprint tasks and closeout artifacts

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
