# Sound Sanctuary — History / Timeline

This is a lightweight log of major repo milestones so the project can be continued without relying on chat history.

## 2026-02-10

### Repo bootstrap
- Local repo created at `/Users/raphaelbruno/projects/sound-sanctuary`
- Remote created: https://github.com/raphabruno7/sound-sanctuary
- Initial spec added: `docs/HIGH_LEVEL.md`

### PRs merged (in order)
1) PR #1 — Scaffold Next.js app + docs
   - https://github.com/raphabruno7/sound-sanctuary/pull/1
   - Added: Next.js (App Router) + TS + Tailwind baseline and initial pages.

2) PR #2 — Newsletter (Convex)
   - https://github.com/raphabruno7/sound-sanctuary/pull/2
   - Added: Convex integration, `subscribers` table, subscribe/unsubscribe mutations, newsletter form on Home.

3) PR #3 — Portfolio + Testimonials (Convex)
   - https://github.com/raphabruno7/sound-sanctuary/pull/3
   - Added: `portfolioItems` + `testimonials` tables + functions, `/portfolio` reads from Convex, Home previews, header/footer.

4) PR #4 — Agent orchestration (Codex + MCP runbooks)
   - https://github.com/raphabruno7/sound-sanctuary/pull/4
   - Added: runbooks, task templates, QA checklist, helper scripts, Codex config placeholders.

5) PR #5 — Async mode (Sprint S01)
   - https://github.com/raphabruno7/sound-sanctuary/pull/5
   - Added: sprint file, frozen async tasks, async contract, `scripts/async_status.sh`.

### Notes / decisions
- Build uses webpack mode in this environment: `npm run build` runs `next build --webpack` (Turbopack had sandbox/permission issues).

## 2026-02-12

### S03 closeout
- PR #20 — Design-system v5.3 propagation + dark-mode foundation.
- PR #23 — Apply canonical token recipes to header/footer/primary CTAs.
- PR #24 — S03 light/dark checklist for PR #23.
- PR #25 — S03 dependency-ordered closeout docs.
- PR #27 — Project status snapshot updated post-S03.

### S04 kickoff (tasks + adoption)
- PR #28 — Add S04 design propagation tasks (UI/QA/release cards).
- PR #29 — Adopt design-system typography recipes (consumer import expansion).
- PR #30 / #31 / #32 / #34 — Continue recipes adoption across routes and portfolio.

## 2026-02-13

### UX direction + “journey” pass
- PR #35 — Add tone/desire experience brief (copy + UX arc).
- PR #36 — Implement v1.5 journey across core pages.

## 2026-02-17

### Design-system maintenance
- PR #50 — Bump `./design-system` submodule to v8.9.0.
