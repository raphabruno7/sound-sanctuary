# Sound Sanctuary — Claude Code Guidelines

Personal site for a sound healer. Next.js App Router + Convex + next-intl, bilingual (pt-BR / en), WhatsApp-first funnel. This file is the working contract; the Design System section is **enforced**.

## Stack

- **Next.js 16.1** (App Router, Turbopack in dev). Build runs on **webpack** (`next build --webpack`), not Turbopack.
- **React 19.2**, **TypeScript 5** (strict).
- **Tailwind CSS v4** — CSS-first, no `tailwind.config`; theme lives in `globals.css` + the design-system tokens.
- **Convex 1.32** — backend/database.
- **next-intl 4.8** — i18n.
- No component library. **No test framework is configured** — there is no `npm test`; `npm run lint` is the only static gate.

## Commands

- `npm run dev` — Next dev server (Turbopack).
- `npx convex dev` — run **alongside** dev; portfolio and newsletter depend on Convex queries/mutations and are blank/broken without it.
- `npm run build` — production build (webpack).
- `npm run lint` — eslint. Run before opening a PR.

## Architecture

- Routes in `src/app/[locale]/` — **Server Components by default**. Add `"use client"` only where needed: Convex hooks, theme/language toggles, interactive widgets (12 client files today, all under `src/components` except `portfolio/page.tsx`).
- Convex functions in `convex/*.ts` (`schema.ts`, `portfolio.ts`, `testimonials.ts`, `subscribers.ts`); import through `convex/_generated/api`. Never hand-edit `convex/_generated/`.
- i18n plugin wired in `next.config.ts` → `src/i18n/request.ts`; routing in `src/i18n/routing.ts`; navigation helpers in `src/i18n/navigation.ts` (use its `Link`, not `next/link`).
- **All user-facing copy lives in `messages/{en,pt-BR}.json`**, never hardcoded in JSX. Note: **testimonials are i18n data (`t.raw`), not Convex.**

## i18n / language strategy

- Two locales: **`pt-BR`** and **`en`**. `defaultLocale: "en"`, `localePrefix: "as-needed"` (en at `/`, pt-BR at `/pt-BR`).
- Browser detection is on (next-intl default): `pt-*` browsers — including Portugal (`pt-PT`) — resolve to **pt-BR**; everyone else to **en**.
- **Register is Brazilian Portuguese, deliberately.** It reads without friction for both BR and PT audiences (the reverse has more). Keep pt-BR spelling ("Contato", "você", "se forma"); do **not** "correct" toward pt-PT.
- Exception: testimonial quotes stay **verbatim** — real client voices, authenticity over consistency.
- Any string added to one locale must be added to the other.

## Design System Rules (MANDATORY)

This project has a 3-layer typography architecture. **Never bypass it.**

### Layer 1: Tokens (`--sh-*` in `design-system/styles/dist/tokens.css`)
CSS variables for colors, sizes, weights, spacing. Never use raw hex/rgb in components.

### Layer 2: Design System Utilities (`ds-*` in typography.css / components.css)
- **Font sizes:** `ds-size-xs`, `ds-size-sm`, `ds-size-base`, `ds-size-lg`, `ds-size-xl`, `ds-size-2xl` ... `ds-size-7xl`
- **Font weights:** `ds-weight-light`, `ds-weight-regular`, `ds-weight-medium`, `ds-weight-semibold`, `ds-weight-bold`
- **Font families:** `ds-font-display`, `ds-font-body`, `ds-font-mono`, `ds-font-arabic`
- **Components:** `ds-glass`, `ds-modal`, `ds-accordion`, `ds-timeline`, `ds-badge`, `ds-skeleton`, etc.

### Layer 3: Journey Semantic Classes (in `globals.css`)
- **Section headings:** `journey-title` (fluid clamp, display font)
- **Section subtitles:** `journey-sub` (fluid clamp, secondary color)
- **Section labels:** `journey-label` (mono, xs, uppercase, wide tracking)
- **Card titles:** `ds-font-display ds-size-xl ds-weight-light`

### Forbidden Patterns
- **NEVER** use `text-xs`, `text-sm`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl` etc. → use `ds-size-*`
- **NEVER** use `text-muted-foreground` → use `text-muted` or `text-secondary`
- **NEVER** use `font-light`, `font-bold` etc. → use `ds-weight-*`
- **NEVER** hardcode heading styles → use `journey-title`
- **NEVER** use raw font-family → use `ds-font-*`

### Allowed Tailwind
- Layout: `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `max-w-*`, `rounded-*`
- Positioning: `relative`, `absolute`, `fixed`
- Responsive prefixes: `md:`, `lg:`
- Semantic colors mapped in theme: `text-primary`, `text-secondary`, `text-muted`, `bg-card`, `border-border`

### Theme
Dark is the default theme; light is opt-in via `ThemeToggle` (class-based, not `prefers-color-scheme`). **Every new surface must be checked in both themes** — hardcoded backgrounds break in dark (past bug: `ds-accordion` rendered white plates on dark).

## Conventions & gotchas

- **Copy is product, not filler.** No design/spec jargon in user-facing strings (past leak: "Cada botão é uma sinapse", "aparecem no fluxo de agendamento"). Write from the visitor's side.
- **No health claims.** Sound healing is wellness — use experiential language; avoid medical/therapeutic assertions ("reconstrói o sistema nervoso").
- CTAs funnel to WhatsApp (`wa.me/message/...`). Keep contact paths consistent — don't introduce placeholder emails.
- `framer-motion` is a dependency but **currently unused** (animations are CSS). Don't reach for it without a real need, or drop it.
- `src/middleware.ts` triggers a Next 16 deprecation warning — rename to `proxy.ts` when convenient.
- Multiple lockfiles on the machine make Next infer the wrong workspace root (harmless warning); set `turbopack.root` if it becomes noise.
- **Branch + PR for every change; never commit directly to `main`.**

## Orchestration & status (source of truth — don't duplicate here)

- `docs/PROJECT_STATUS.md`, `docs/HIGH_LEVEL.md` — current state and direction.
- `docs/plans/` — active plans (latest: `2026-07-10-website-readiness.md`).
- `docs/AGENTS.md` + `agents/` (`ASYNC_CONTRACT.md`, `runbooks/`, `checklists/`) — the async multi-agent workflow.
