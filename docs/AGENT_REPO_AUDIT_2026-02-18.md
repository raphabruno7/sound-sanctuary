# Repo Audit & Status (Sound Sanctuary)

Date: 2026-02-18

## Current Git Status
- Local `main` is synced with `origin/main` at `0513cac` (PR #64 merged).
- Latest completed sprint reports: `docs/AGENT_REPORT_S04.md`, `docs/AGENT_REPORT_S05.md`.

## What Changed Since The Last Sprint Reports
- PR #64 merged: ESLint now ignores nested worktree outputs (`.worktrees/**`, `**/.next/**`, `**/convex/_generated/**`) to avoid local-only noise when using git worktrees.
- `.worktrees/` is now ignored at repo level via `.gitignore` to prevent accidental tracking across clones.

## Design System Integration (Is the site “receiving” it?)
Yes.
- `src/app/globals.css` imports design-system CSS bundles:
  - `design-system/styles/dist/tokens.css`
  - `design-system/styles/dist/base.css`
  - `design-system/styles/dist/typography.css`
  - `design-system/styles/dist/components.css`
  - `design-system/styles/dist/animations.css`
- The app uses DS class contracts (`btn`, `ds-*`) plus Tailwind utilities where needed.
- DS is consumed as a git submodule at `design-system/` (local state shows `v8.8.0-3-g4ff32e2`, package version `8.9.0`).

## Critical Issues (Start Here)
1. **Language consistency (English-only):** there is still visible Portuguese copy in user-facing routes (e.g. `src/app/sound-healing/page.tsx`, `src/app/sessions/page.tsx`, and “Portfolio em construção”). This is the most obvious product-quality gap right now.
2. **No CI gate:** there is no `.github/workflows/` pipeline. A single-person repo still benefits from a PR check that runs `npm ci`, `npm run lint`, and `npm run build`.
3. **Newsletter spam hardening:** the Convex `subscribe` mutation validates email format, but has no rate limiting or bot protection. Before going public, add at least one of:
   - Turnstile/hCaptcha + server-side verification
   - a honeypot field + timing checks
   - per-IP / per-session throttling (where feasible)
4. **Canonical/SEO environment:** sitemap/robots exist, but you should define a single canonical site URL (e.g. `NEXT_PUBLIC_SITE_URL`) and ensure metadata uses it consistently.
5. **CSS sprawl risk:** `src/app/globals.css` contains a growing amount of page-specific styling. Consider moving page-specific blocks into route-level CSS modules (or component-scoped styles) to keep globals small and predictable.

## Infra Observations (Local-first, no OAuth)
- **Convex is the only “backend” surface area right now.** Without OAuth, treat all mutations as public-facing. Validate inputs defensively, avoid leaking existence of records, and consider basic abuse protections.
- **Secrets:** keep secrets out of git (already good: `.env*` is ignored except `.env.local.example`). For deploy, store env vars in the hosting provider + Convex dashboard (not in the repo).
- **Deploy readiness:** if deploying to Vercel, confirm submodules are fetched during build (git submodule support) and that `npm run build` succeeds in a clean environment (no local `.env.local` assumptions).

## Security Notes (Private repo)
Keeping the repo private helps:
- reduce accidental disclosure of proprietary code, internal docs, and implementation details
- reduce risk of secrets being leaked via PRs/issues in a public space

But privacy does **not** secure the deployed website:
- client-side code ships to every browser
- public endpoints (Convex mutations) must be secured independently
- operational security is mostly: env vars, access control, abuse prevention, dependency hygiene, and monitoring

## Suggested Next Sprint (S06) — Minimal, High Impact
- Translate remaining user-facing Portuguese copy to English and do a single “tone pass”.
- Add a CI workflow that runs lint + build on PRs.
- Add spam protection to newsletter signup before public launch.
