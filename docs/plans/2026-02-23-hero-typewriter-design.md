# Hero Cinematográfico com Digitação — Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current two-block hero (H1 + Sound Bath) with a single cinematic hero: full 3:2 photo, clean top, one centered text block at the bottom with a typewriter reveal animation.

**Architecture:** Client component `HeroTypewriter` using requestAnimationFrame for character-by-character text reveal with intelligent punctuation pauses. Intersection Observer triggers animation on viewport entry. CSS-only layout with `text-align: center`, absolute positioning at bottom center of the photo.

**Tech Stack:** Next.js App Router, React client component, next-intl, CSS custom properties, requestAnimationFrame, Intersection Observer, `prefers-reduced-motion` media query

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [header transparente]                                  │
│                                                         │
│          (foto limpa — árvores, Raphael, gongo)         │
│                                                         │
│                                                         │
│  ─ ─ ─ ─ ─ ─ ─ ─ vinheta começa (~50%) ─ ─ ─ ─ ─ ─ ─  │
│                                                         │
│                      S O M                              │
│            o super alimento do sistema                  │
│                    nervoso.                             │
│                                                         │
│            O sistema nervoso é vibração.                │
│            Quando você se deita...                      │
│            ...                                          │
│            Nada. Apenas deitar e receber.               │
│                                                         │
└─────────────────────────────────────────────────────────┘
│  [CTA strip: Agendar 1:1 | Sound Healing Live]         │
│                                                         │
│  [PARA QUEM É — next section]                           │
```

## Typography Scale

| Element | Font | Size | Weight | Color | Extra |
|---|---|---|---|---|---|
| "SOM" | DM Mono | 0.7rem | 500 | #C4A35A | tracking 0.25em, uppercase |
| Title | Cormorant Garamond | clamp(1.8rem, 4.5vw, 3.2rem) | 300 | #fff | text-shadow |
| "E você reinicia." | Cormorant Garamond | clamp(1.1rem, 2.5vw, 1.5rem) | 300 italic | #E0C97F | |
| Body | DM Sans | clamp(0.82rem, 1.5vw, 0.95rem) | 400 | rgba(255,255,255,0.75) | text-shadow, line-height 1.75 |
| Closing | Cormorant Garamond | clamp(0.9rem, 1.8vw, 1.1rem) | 300 italic | rgba(255,255,255,0.65) | |

## Animation Spec

- **Engine:** requestAnimationFrame loop, ~35ms per character base
- **Punctuation pauses:**
  - `,` → +150ms
  - `.` → +400ms
  - `—` → +200ms
  - Paragraph break → +600ms
  - Before "E você reinicia." → +800ms (dramatic pause)
  - Before "Nada. Apenas deitar e receber." → +1000ms (climax)
- **Trigger:** Intersection Observer (threshold: 0.3)
- **`prefers-reduced-motion: reduce`**: all text appears instantly with 1s opacity fade
- **Replay:** animation plays once, does not replay on re-entry

## Removals from Hero

- H1 "Sound Healing" + subtitle + CTAs
- `.home-hero__content`, `.home-hero__copy`
- `.home-hero__soundbath` (current right-aligned block)
- `journey-axon` decorative element
- All associated CSS classes

## CTA Migration

CTAs ("Agendar 1:1" / "Entrar no Sound Healing Live") move to a minimal strip immediately after the hero photo, before the "Para quem é" section.
