# Sound Sanctuary — Project Status (Snapshot)

This file captures the current state of the repo so work can continue across Codex sessions/agents without relying on chat history.

## Repo
- Local path: `/Users/raphaelbruno/projects/sound-sanctuary`
- Remote: `https://github.com/raphabruno7/sound-sanctuary`
- Default branch: `main`

## Current Sprint
- Current sprint: `S03` (DONE)
- Summary: design-system v5.3 is centralized via submodule, dark-mode is delivered, and S03 closeout docs are merged.

## Major Milestones / PRs
- `#20` — `feat(ui): propagate design-system v5.3 + dark mode` (`feat/S03-0008-design-system-v5-3-propagation`)
- `#23` — `feat(ui): apply canonical token recipes to header/footer/CTAs` (`feat/S03-0009-ui-apply-recipes-header-footer-ctas`)
- `#24` — `docs(qa): S03 light/dark checklist for PR #23` (`codex/s03-0010-qa-checklist-pr23`)
- `#25` — `docs(release): S03 closeout (dependencies merged)` (`codex/s03-0011-closeout-docs`)

## Design System Source Of Truth
- Centralized design system is integrated via git submodule at `./design-system`.
- Canonical tokens for web consumers: `design-system/styles/dist/tokens.css`.
- Canonical base styles for web consumers: `design-system/styles/dist/base.css`.
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
- `docs/SPRINTS/S03.md` — current/most recent sprint (DONE)
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
