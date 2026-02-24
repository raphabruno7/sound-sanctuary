# Hero Status Line — Session Report

**Date:** 2026-02-23 / 2026-02-24
**Branch:** main
**Status:** Implemented, lint + build passing

---

## What was built

The hero section evolved through three phases across two sessions, ending
with a minimal Claude Code status-line aesthetic.

### Final result

A fullscreen photo with two overlaid elements:

1. **"VOCE" + arrow** — static label (DM Mono, uppercase) pointing at the
   person lying down in the photo. Fades in on viewport entry.

2. **Status line** — rotating glitch-style words following the arc of a
   sound healing session, flanked by a StrikeWave SVG and a CTA link.

```
+---------------------------------------------+
|                                              |
|              [hero photo fullscreen]         |
|                                              |
|                   VOCE                       |
|                    |                         |
|            [person lying down]               |
|                                              |
|    (o) . vibrandooo . agendar ->            |
+---------------------------------------------+
```

### The 16 rotating words (PT-BR)

deitandooo, bowls vibrandooo, sistema nervoso alimentando, regulandooo,
dissolvendo no mat, frequencia delta, transmutando, nao fazendo nadaaa,
zero mente, reiniciandooo, vibrandooo, hibernando, silencio carregando,
ondas lentas, gongo processando, rebuild completo.

### The 16 rotating words (EN)

lying downnn, bowls vibratinggg, nervous system feeding, regulatinggg,
dissolving on the mat, delta frequency, transmuting, not doinggg,
zero mind, restartinggg, vibratinggg, hibernating, silence loading,
slow waves, gong processing, rebuild complete.

---

## Evolution (3 phases)

### Phase 1: Typewriter with paragraph accumulation

**Commits:** `095484e`, `8292ff8`, `3ec7167`

First implementation: paragraphs typed character-by-character and
accumulated on screen. Problems: text overflowed and covered the photo.
Fixed with a rolling text window using `max-height`, `overflow: hidden`,
and `mask-image` fade.

### Phase 2: Cross-dissolve with status line

**Commits:** `6961f18`, `eb0538a`, `df7c38f`, `350f19d`

User feedback: text should appear and disappear, not accumulate. Rewrote
to cross-dissolve — each paragraph types in, holds, fades out, next
appears. Added slide-up motion on enter/exit. Added a Claude Code-inspired
status line (StrikeWave SVG + rotating micro-phrases + CTA) that appears
after all segments finish. Refined timing, typography, vibrating text.

### Phase 3: Status-line pivot (final)

**Commit:** `c982b23`

User changed strategy: drop the long paragraphs entirely. Keep only the
status line as the main hero element, add "VOCE" + arrow as a static
annotation on the photo. Component reduced from 258 to 131 lines.

---

## Files changed (final state)

| File | Action | Lines |
|------|--------|-------|
| `src/components/HeroStatusLine.tsx` | Created | 131 |
| `src/components/HeroTypewriter.tsx` | Deleted | 258 |
| `src/app/[locale]/page.tsx` | Modified | -39/+17 |
| `src/app/globals.css` | Modified | -159/+128 |
| `messages/pt-BR.json` | Modified | -14/+17 |
| `messages/en.json` | Modified | -14/+17 |
| `docs/plans/2026-02-23-hero-dissolve-statusline.md` | Created | 83 |
| `docs/plans/2026-02-24-hero-statusline-pivot.md` | Created | 143 |
| `docs/plans/2026-02-24-hero-statusline-impl.md` | Created | 558 |

**Total:** +1137 / -173 lines (including design docs and impl plan)

---

## Commit history

```
c982b23 feat(hero): pivot to Claude Code status-line aesthetic
350f19d refine(hero): slower typing, vibrating status line, harmonized typography
df7c38f fix(hero): slide-up motion on segment enter/exit
eb0538a feat(hero): cross-dissolve typewriter with status line
6961f18 docs: hero dissolve + status line design
3ec7167 fix(hero): rolling text window with mask-fade
8292ff8 fix(hero): IO trigger + 100vh height + rAF animation loop
095484e feat(hero): cinematic typewriter reveal animation — S11
```

---

## Technical decisions

**Component architecture:**
- `HeroStatusLine.tsx` — client component, 4 props (youLabel,
  statusPhrases, statusCta, ctaHref)
- Intersection Observer triggers fade-in of both VOCE and status line
- Phrase rotation: setInterval with cross-fade (opacity transition)
- StrikeWave: inline SVG with 3 concentric ripple rings + core pulse
- phraseVibrate: CSS keyframe for subtle horizontal micro-movement

**Accessibility:**
- `prefers-reduced-motion` handled purely in CSS (skip all animations,
  show elements immediately with no transitions)
- `aria-live="polite"` on status line for screen reader announcements
- `aria-hidden="true"` on decorative SVGs

**CSS class naming:**
- Prefix `hero-sl__` for status-line elements
- Prefix `hero-you` for VOCE + arrow elements
- Replaced old `hero-tw__` prefix entirely

**Lint fix:**
- React 19 `react-hooks/set-state-in-effect` rule prohibits synchronous
  setState in effect body. Moved reduced-motion handling from JS to CSS.

---

## Verification

- Lint: `npm run lint` — exit 0, zero errors
- Build: `npm run build` — exit 0, compiled in 12.7s, all pages generated
- JSON: both locale files parse correctly
- Dev server: running on localhost:3000

---

## Design docs

- `docs/plans/2026-02-24-hero-statusline-pivot.md` — design rationale
- `docs/plans/2026-02-24-hero-statusline-impl.md` — implementation plan
- `docs/plans/2026-02-23-hero-dissolve-statusline.md` — phase 2 design
