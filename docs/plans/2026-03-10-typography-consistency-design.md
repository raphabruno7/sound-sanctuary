# Typography Consistency — Design

**Date:** 2026-03-10
**Status:** Approved

## Problem

The site has a well-designed 3-layer typography architecture (tokens → ds utilities → journey semantic classes), but several components bypass it with raw Tailwind classes. This creates visual inconsistency in font sizing, responsiveness, and color semantics.

## Decision

Preserve the existing layered architecture. Fix components that violate it.

## Rules

1. **Section headings** → `journey-title` (fluid clamp, display font, weight 300)
2. **Section subtitles** → `journey-sub` (fluid clamp, secondary color)
3. **Section labels** → `journey-label` (mono, xs, uppercase, wide tracking)
4. **Body paragraphs** → `text-secondary leading-relaxed`
5. **Small text / captions** → `ds-size-sm` + `text-muted`
6. **Card titles** → `ds-font-display ds-size-xl ds-weight-light`
7. **Semantic colors only** → `text-secondary`, `text-muted`, `text-primary` (never `text-muted-foreground` in page sections)

## Changes Required

### TestimonialsPreview.tsx
- `h2.text-2xl.md:text-3xl.tracking-tight` → `h2.journey-title`
- `p.text-muted-foreground` → `p.journey-sub`

### PortfolioPreview.tsx
- `h2.text-2xl.md:text-3xl.tracking-tight` → `h2.journey-title`
- `p.text-muted-foreground` → `p.journey-sub`
- `p.text-xs.tracking-wide.text-muted-foreground.uppercase` → `p.journey-label`
- `h3.text-lg.tracking-tight` → `h3.ds-font-display.ds-size-lg.ds-weight-light`
- `p.text-sm.text-muted-foreground.leading-relaxed` → `p.text-secondary.leading-relaxed`

### page.tsx (inline sections)
- Audit all `text-muted-foreground` → `text-muted` or `text-secondary`
- Ensure every section heading uses `journey-title`
- Ensure every section subtitle uses `journey-sub`

### SiteFooter.tsx
- Normalize `text-muted-foreground` → `text-muted`

## Non-Goals

- No changes to design-system tokens or journey-* class definitions
- No changes to font loading or font families
- No new CSS classes
