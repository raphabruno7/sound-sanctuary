# S07 Design — "Sanctuary Feel" Visual Refinement

Date: 2026-02-19

## Context

Post-S06 visual audit revealed that while the design system vocabulary is strong (organic palette, nervous-system animations, glass morphism), the site doesn't yet embody the sanctuary experience it promises. Dark mode is functionally broken (text invisible, bg not rendering), light mode is clinical, photography is underutilized, and animations are hidden in microscopic details.

This sprint takes Approach B from the brainstorming session: fix what's broken + make the site *feel* like sanctuary, without restructuring architecture or adding i18n.

## Audience

Practitioner based in Lisbon. Audience: expats in Portugal + online sessions for Brazil. Site needs EN and PT-BR (i18n deferred to future sprint — this sprint fixes existing PT content and ensures current EN is clean).

---

## PR-1 — Fix Dark Mode Cascade + Contrast

### Problem
Tailwind 4 `@theme inline` defines `--color-background: var(--sh-semantic-bg-primary)` etc. When `.dark` class is added to `<html>`, the DS `dark-mode.css` remaps the `--sh-*` vars — but Tailwind may resolve values at build time, breaking the runtime cascade.

### Solution
Add explicit `.dark {}` block in `globals.css` that re-bridges all Tailwind theme vars:

```css
.dark {
  --color-background: var(--sh-semantic-bg-primary);
  --color-foreground: var(--sh-semantic-text-primary);
  --color-muted: var(--sh-semantic-bg-secondary);
  --color-muted-foreground: var(--sh-semantic-text-muted);
  --color-card: var(--sh-semantic-bg-secondary);
  --color-card-foreground: var(--sh-semantic-text-primary);
  --color-popover: var(--sh-glass-light-bg);
  --color-popover-foreground: var(--sh-semantic-text-primary);
  --color-border: var(--sh-glass-light-border);
  --color-input: var(--sh-glass-light-border);
}
```

### Dark text contrast boost (consumer override, not DS)

| Token | Dark current | Dark new |
|---|---|---|
| `--sh-semantic-text-secondary` | `rgba(242,239,232, 0.7)` | `rgba(242,239,232, 0.82)` |
| `--sh-semantic-text-muted` | `rgba(242,239,232, 0.5)` | `rgba(242,239,232, 0.62)` |

### Dark glass cards — definition

| Property | Current | New |
|---|---|---|
| `--sh-glass-light-border` (in .dark) | `rgba(196,163,90, 0.15)` | `rgba(196,163,90, 0.25)` |
| box-shadow | none | `0 0 20px rgba(196,163,90, 0.06)` |
| `--sh-glass-light-bg` (in .dark) | `rgba(26,26,22, 0.6)` | `rgba(26,26,22, 0.7)` |

### Button legibility in dark
- `btn-secondary`: border `rgba(196,163,90, 0.35)`, text `var(--sh-semantic-text-primary)`
- `btn-ghost`: text opacity 0.7 → 0.9

**Files:** `src/app/globals.css`
**Gate:** Dark mode renders obsidian bg, readable text, visible glass cards and buttons.

---

## PR-2 — Hero Cinematográfico

### Problem
Photo confined in 3:2 grid rectangle. Vignette invisible. Technical caption exposed. Photo doesn't create immersion.

### Solution
Replace side-by-side grid with full-section photo-under-overlay:

- `<section>` with `position: relative`, `min-height: 70vh`
- `<Image fill>` with `object-cover`, `object-position: center 30%`
- Overlay: `linear-gradient(to top, var(--sh-semantic-bg-primary) 0%, rgba(bg, 0.85) 30%, rgba(bg, 0.4) 60%, rgba(bg, 0.2) 100%)`
- Amber vignette layer: `radial-gradient(ellipse at 50% 80%, rgba(196,163,90, 0.15), transparent 70%)`
- Text positioned `absolute bottom` within container, left-aligned
- `text-shadow` subtle in dark for legibility over photo
- Mobile: `min-height: 50vh`, adjusted `object-position`
- Remove caption "Photo 01 - 2627"
- Remove label "00 - HOME" (header provides wayfinding)
- Move "UPSTREAM CARE · REGULATION BEFORE BREAKDOWN" to label of next section

**Files:** `src/app/page.tsx`, `src/app/globals.css`
**Gate:** Hero feels immersive. Photo is the first emotional impact. Text readable in both modes.

---

## PR-3 — Respiração Espacial (Variable Spacing + Full-Bleed)

### Problem
All sections use uniform `margin: 5rem 0` and `max-width: 1040px`. Mechanical rhythm.

### Solution

Variable spacing mapped to emotional rhythm:

| Transition | Current | New | Why |
|---|---|---|---|
| Hero → "What It Is" | 5rem | 8rem | Let photo breathe |
| Between content sections | 5rem | 5rem | Keep (ok) |
| Before vine dividers | 5rem | 3rem | Divider is a visual pause |
| After vine dividers | 5rem | 4rem | Smooth transition |
| Before CTA blocks | 5rem | 6rem | Weight to the invitation |
| Impulse plate (section 07) | 1040px container | **full-bleed** | Expansion moment |

Impulse plate full-bleed: remove `journey-container`, section goes `width: 100vw`, inner text content stays `max-width: 1040px; margin: auto`. Glass bg + impulse SVGs extend edge-to-edge.

Implementation: utility classes (`journey-section-lg`, `journey-section-sm`) or Tailwind inline on specific elements.

**Files:** `src/app/page.tsx`, `src/app/globals.css`
**Gate:** Page has breathing rhythm. Impulse section feels expansive.

---

## PR-4 — Tipografia com Dinâmica

### Problem
Almost everything uses `ds-font-display ds-weight-light` at various sizes. No contrast of weight or family between sections.

### Solution

| Element | Current | New |
|---|---|---|
| Section labels | `font-mono, xs, uppercase, text-muted` | Keep — correct metronomic anchor |
| Even-numbered titles (02, 04, 06) | `ds-weight-light` | `ds-weight-regular` — slightly heavier for contrast |
| Poetic PT subtitles | Same as body | `ds-font-display ds-italic ds-weight-light` (extend hero pattern) |
| Anchor phrases ("O som reconstrói...") | `ds-font-display ds-size-2xl` | Add `ds-text-overline` = gold accent, wider letter-spacing |
| Stats/numbers if any | body | `ds-font-mono` — technical/organic contrast |

Principle: alternate display-light (expansion) and display-regular (presence) for inhale/exhale rhythm.

**Files:** `src/app/page.tsx`, `src/app/sound-healing/page.tsx`, `src/app/sessions/page.tsx`, `src/app/about/page.tsx`
**Gate:** Typography has dynamic rhythm. Titles feel varied, not uniform.

---

## PR-5 — Artwork Opacities Recalibrated

### Problem
All artwork textures invisible at current opacities. Dark mode absorbs more — needs ~60-70% more opacity than light for same perceived weight.

### Solution

| Artwork | Light (current → new) | Dark (current → new) |
|---|---|---|
| `.vine-divider` | 0.14 → 0.22 | 0.22 → 0.35 |
| `.nervura-art` | 0.12 → 0.18 | 0.20 → 0.30 |
| `.jornada-art` | 0.09 → 0.14 | 0.15 → 0.24 |
| `.neuron-field-bg` | 0.06 → 0.10 | 0.10 → 0.16 |
| `.venation-art` | 0.06 → 0.10 | 0.10 → 0.16 |
| `.scapes-art` | 0.08 → 0.12 | 0.13 → 0.20 |

Calibration point: perceptible in peripheral vision, never competing with content.

**Files:** `src/app/globals.css`
**Gate:** Artwork textures visible in both modes. Subtle, not dominant.

---

## PR-6 — Vine Draw-On + Breath Expansion + Neuron Glow

### Vine draw-on (CSS scroll-driven animation)

```css
.vine-path {
  stroke-dasharray: 620;
  stroke-dashoffset: 620;
  animation: vineGrow 2.5s var(--sh-motion-easing-flow) forwards;
  animation-play-state: paused;
  animation-timeline: view();
  animation-range: entry 0% entry 80%;
}

@keyframes vineGrow {
  to { stroke-dashoffset: 0; }
}

@supports not (animation-timeline: view()) {
  .vine-path {
    stroke-dashoffset: 0;
    animation: none;
  }
}
```

Fallback: vine appears static in unsupported browsers.

### Breath pulse expansion

| Element | Animation | Timing |
|---|---|---|
| Hero subtitle (existing) | `sh-text-breathe` | 4500ms |
| Anchor phrases ("O som reconstrói...") | `sh-text-breathe` | 4500ms, delay 1s |
| Section labels on viewport entry | fade-in (opacity 0→1) | 600ms, `animation-timeline: view()` |

Max 2-3 breathing elements visible in any viewport at once.

### Neuron-field (about page)
- Opacity increase per PR-5 table
- Add `filter: blur(1px)` for depth-of-field effect
- Ensure glow uses gold `rgba(196,163,90,...)` not white

### `prefers-reduced-motion`
All additions respect: static fallback, no animation.

**Files:** `src/app/globals.css`, `src/app/about/page.tsx`
**Gate:** Vines grow on scroll (Chrome/Safari 18+). Breath felt as ambient presence. Neuron field has depth.

---

## PR-7 — Light Mode Warmth

### Problem
Light mode renders clinical white instead of warm cream sanctuary.

### Solution

**Cream fallback:** Add inline `style={{ backgroundColor: '#F8F6F1' }}` on `<body>` as safety net. Audit for any `bg-white` hardcoded — replace with `bg-background`.

**Glass cards — more presence in light:**

| Property | Current | New (`:root:not(.dark)`) |
|---|---|---|
| `--sh-glass-light-bg` | `rgba(242,239,232, 0.45)` | `rgba(242,239,232, 0.6)` |
| `--sh-glass-light-border` | `rgba(196,163,90, 0.12)` | `rgba(196,163,90, 0.18)` |
| `--sh-glass-light-shadow` | `rgba(26,58,42, 0.06)` | `rgba(26,58,42, 0.10)` |

Override in consumer `globals.css`, not in DS.

**Files:** `src/app/layout.tsx`, `src/app/globals.css`
**Gate:** Light mode feels warm and organic. Cards have presence like tracing paper with gold border over linen.

---

## PR-8 — Content Cleanup

### Captions removed
- "Photo 01 - 2627" (hero) — delete
- "Photo 03 - 2641" (section 03) — delete

### PT-BR accent fixes

| Current | Correct |
|---|---|
| Principio fundador | Princípio fundador |
| Quatro forcas do som | Quatro forças do som |
| Frequencia do fogo | Frequência do fogo |
| Frequencia da agua interna | Frequência da água interna |
| vibracao encontra o liquido | vibração encontra o líquido |
| alcanca cada nervo | alcança cada nervo |
| O corpo humano e 70% agua | O corpo humano é 70% água |
| O sistema nervoso esta imerso | O sistema nervoso está imerso |
| Ondulacao que limpa | Ondulação que limpa |
| Nada e inerte | Nada é inerte |
| Animacao · Impulsos | Animação · Impulsos |

### Section order
Reorder sections for logical sequence (07 before 08/09) or remove numbering inconsistency.

**Files:** `src/app/page.tsx`, `src/app/sound-healing/page.tsx`
**Gate:** No technical captions visible. All PT text has correct accents. Section flow is logical.

---

## Execution Order

1. **PR-1** (dark mode fix) — unblocks everything
2. **PR-2** (hero) — highest visual impact
3. **PR-5** (artwork opacities) — quick win
4. **PR-8** (content cleanup) — quick win
5. **PR-7** (light mode warmth) — pairs with PR-1
6. **PR-3** (spacing) — layout changes
7. **PR-4** (typography) — content changes
8. **PR-6** (animations) — polish layer

## Definition of Done

- `bash scripts/agent_check.sh` passes (lint + build)
- Dark mode: obsidian bg, readable text, visible glass cards, artwork textures present
- Light mode: warm cream, glass cards with presence, artwork perceptible
- Hero: immersive photo, text over image, no technical captions
- Animations: vines grow on scroll (supported browsers), breath ambient, reduced-motion respected
- PT content: all accents correct
- ThemeToggle cycles correctly: dark → light → system

## Out of Scope

- i18n (next-intl / route-based language switching)
- New pages or routes
- Convex schema changes
- DS token changes (all overrides are consumer-side)
- Booking integration
- Portfolio media support
