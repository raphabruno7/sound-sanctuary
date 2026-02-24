# Hero Dissolve + Status Line — Design

**Goal:** Replace the rolling-text typewriter hero with a cross-dissolve sequence where each segment types in, holds, then fades out before the next appears. After the full sequence, a persistent "status line" stays with rotating micro-phrases + CTA + animated strike-wave.

## Behavior

1. **Text never moves** — stays anchored at the bottom-center of the hero photo. No scrolling, no mask, no overflow.
2. **Cross-dissolve sequence** — each of 9 segments: typewriter types → hold 2s → fade-out 1.2s → next segment fades-in and types.
3. **Status line** — after all 9 segments complete, a persistent bar appears with:
   - Strike-wave concentric circles (small, inline-left, pulsing slow)
   - Rotating micro-phrases: "vibrating", "melting into the mat", "dissolving", etc.
   - CTA link: "agendar →"
4. **Bilingual label** — no separate label. First segment is the practice name flowing into the title:
   - PT-BR: "Sound Healing: o super alimento do sistema nervoso."
   - EN: "Sound Bath: the superfood for the nervous system."

## Animation Spec

- **Engine:** CSS opacity transitions + existing rAF typewriter
- **BASE_SPEED:** 55ms (slower, more human)
- **Humanization:** ±15ms random jitter per character
- **Punctuation pauses:** same as current but 1.5× longer
- **Hold time after typing:** 2000ms
- **Cross-dissolve duration:** 1200ms ease-in-out
- **Status line entry:** 800ms fade-in after last dissolve
- **Micro-phrase rotation:** 4s interval, 600ms cross-fade

## Segments (9 total, each dissolves after typing)

| # | Key | Class | Notes |
|---|-----|-------|-------|
| 1 | title (merged) | hero-tw__title | "Sound Healing: o super alimento..." |
| 2 | opening | hero-tw__body | "O sistema nervoso é vibração." |
| 3 | p1 | hero-tw__body | "Quando você se deita..." |
| 4 | p2 | hero-tw__body | "Seus ossos, sua água interna..." |
| 5 | reset | hero-tw__accent | "E você reinicia." |
| 6 | p3 | hero-tw__body | "Durante um Banho de Som..." |
| 7 | p4 | hero-tw__body | "O som ajuda o corpo a sair..." |
| 8 | closing | hero-tw__accent | "Nada. Apenas deitar e receber." |
| 9 | status | hero-tw__status | Persistent — micro-phrases + CTA + strike-wave |

## Status Line Design

```
  ◎))  vibrating · agendar →
```

- `◎))` = inline strike-wave SVG (24px), pulsing with `strikeWave` animation at reduced opacity
- Micro-phrases rotate: "vibrating", "melting into the mat", "dissolving", "receiving"
- PT-BR variants: "vibrando", "dissolvendo no mat", "recebendo"
- CTA is a real `<a>` link to /contact
- Font: DM Mono, 0.72rem, tracking 0.15em, gold primary color

## Typography (aesthetic refinements)

- **Title:** Cormorant Garamond, 300, clamp(1.6rem, 4vw, 2.8rem) — slightly smaller than current
- **Body:** DM Sans, 350 (lighter), clamp(0.85rem, 1.4vw, 0.95rem), line-height 1.8, letter-spacing 0.01em
- **Accent (reset/closing):** Cormorant Garamond, 300 italic, gold-light color
- **Status:** DM Mono, 400, 0.72rem, tracking 0.15em

## CSS Changes

- Remove `max-height`, `overflow: hidden`, `mask-image`, `flex` from `.hero-tw`
- Add `.hero-tw__slide` wrapper for each segment (absolute, same position)
- Transitions via `.hero-tw__slide--active { opacity: 1; }` / default `opacity: 0`
- Status line: `.hero-tw__status` with flex row, gap, align-center

## Component Changes

- `HeroTypewriter` → rewrite to manage active segment index
- Each segment renders in its own positioned wrapper
- rAF types into active segment, on complete → wait → advance index
- After segment 8, show status line permanently
- Strike-wave SVG inline in status line

## Messages Changes

- Remove `soundBath.label` usage (merged into title)
- Update `soundBath.title` to include practice name:
  - PT-BR: "Sound Healing: o super alimento do sistema nervoso."
  - EN: "Sound Bath: the superfood for the nervous system."
- Add `soundBath.statusPhrases` array for micro-phrases
- Add `soundBath.statusCta` for CTA text
