# Sound Sanctuary — Claude Code Guidelines

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

## Project Structure
- Design system source: `design-system/styles/dist/`
- Global CSS (imports + custom): `src/app/globals.css`
- Main page: `src/app/[locale]/page.tsx`
- Components: `src/components/`
- i18n messages: `messages/en.json`, `messages/pt-BR.json`

## Tech Stack
- Next.js 15 (App Router) + Tailwind CSS v4 (CSS-first config)
- Convex (backend/database)
- next-intl (i18n: en + pt-BR)
- Design system: custom CSS tokens + utilities (no component library)
