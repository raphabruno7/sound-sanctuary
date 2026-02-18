# Sound Sanctuary — Project Status (Snapshot)

This file captures the current state of the repo so work can continue across Codex sessions/agents without relying on chat history.

## Repo
- Local path: `/Users/raphaelbruno/projects/sound-sanctuary`
- Remote: `https://github.com/raphabruno7/sound-sanctuary`
- Default branch: `main`

## Current Sprint
- Current sprint: none (maintenance mode)
- Last completed sprint(s): `S03` + `S04` (DONE)
- Summary: design-system is centralized via submodule, dark-mode is delivered, and the v1.5 “journey” pass is implemented across core pages.

## Major Milestones / PRs
- `#20` — `feat(ui): propagate design-system v5.3 + dark mode` (S03 baseline)
- `#23` — `feat(ui): apply canonical token recipes to header/footer/CTAs` (S03 UI alignment)
- `#25` — `docs(release): S03 closeout (dependencies merged)` (S03 complete)
- `#29` — `feat(ui): adopt design-system v5.3 typography recipes` (S04 start)
- `#31` — `feat(ui): apply v5.3 recipes to secondary routes` (S04 recipes pass)
- `#32` — `feat(ui): recipes on static pages` (S04 continued)
- `#34` — `feat(ui): portfolio recipes` (S04 continued)
- `#35` — `docs: tone + desire experience v1` (copy/UX direction)
- `#36` — `feat(ui): implement v1.5 journey across core pages` (core UX pass)
- `#50` — `chore: bump design-system to v8.9.0` (design-system maintenance)

## Design System Source Of Truth
- Centralized design system is integrated via git submodule at `./design-system`.
- Current submodule pin: `4ff32e2c47af72f850456b44aec495bb55c0bc95` (main as of 2026-02-18).
- Canonical consumer imports (website):
  - `design-system/styles/dist/tokens.css`
  - `design-system/styles/dist/base.css`
  - `design-system/styles/dist/typography.css`
  - `design-system/styles/dist/components.css`
- Consumer repo rule: do not define local token registries (no local `:root` token blocks).
- Dark-mode toggle is delivered in the shared shell (`src/components/ThemeToggle.tsx`).

## What Exists (v0)
- Next.js App Router + TypeScript + Tailwind
- Convex integrated (client provider + functions)
- Newsletter subscribe flow (Convex subscribers table + mutations)
- Portfolio + Testimonials tables + read paths
- Shared shell (header/footer) + theme toggle + v1.5 journey styling across core pages

## Key Docs
- `docs/HIGH_LEVEL.md` — product direction
- `docs/AGENT_ORCHESTRATION.md` — PR-first multi-agent workflow
- `docs/SPRINTS/S03.md` — historical sprint doc (DONE)
- `agents/ASYNC_CONTRACT.md` — agent rules in async mode
- `agents/tasks/S03/*` — sprint tasks and closeout artifacts
- `agents/tasks/S04/*` — post-S03 adoption + hardening tasks (recipes, dark-mode legibility, QA gates)

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
