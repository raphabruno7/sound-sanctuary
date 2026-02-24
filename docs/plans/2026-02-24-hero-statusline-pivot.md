# Hero Status Line Pivot

**Date:** 2026-02-24
**Status:** Approved

## Summary

Replace the long typewriter paragraph sequence with a minimal Claude Code
status-line aesthetic. The hero becomes: photo + static "VOCE" label with
arrow pointing at the person lying down + a single rotating status line
with 16 short glitch-style words that follow the arc of a sound healing
session.

## Layout

```
+---------------------------------------------+
|                                              |
|              [hero photo fullscreen]         |
|                                              |
|                   VOCE                       |  <- static, DM Mono, uppercase
|                    |                         |  <- arrow SVG, subtle pulse
|            [person lying down]               |
|                                              |
|                                              |
|    (o) . vibrandooo . agendar ->            |  <- status line, bottom area
|                                              |
+---------------------------------------------+
```

## Components

### 1. "VOCE" + Arrow (static)

- Position: absolute, centered over the person lying down in the photo
  (~60% vertical, ~50% horizontal, adjustable via CSS)
- Font: DM Mono, uppercase, letter-spacing 0.2em, white with text-shadow
- Arrow: inline SVG, subtle pulse animation (opacity 0.6-1)
- Appears with fade-in on Intersection Observer trigger

### 2. Status Line (dynamic, main element)

- Position: absolute bottom-center (same area as current status line)
- Layout: `strike-wave . [word] . agendar ->`
- StrikeWave SVG (existing, refined)
- Word swaps via cross-fade (opacity transition), interval ~3.6s
- 16 words in sequence, infinite loop
- `phraseVibrate` keyframe (existing horizontal micro-movement)
- CTA "agendar ->" links to /contact
- All UPPERCASE, DM Mono

### 3. What Gets Removed

- All `typeSegment` logic (rAF loop, charIndex, getPauseForChar)
- 8 text segments (title, opening, p1-p4, reset, closing)
- Classes: `.hero-tw__title`, `.hero-tw__body`, `.hero-tw__accent`
- States: `typedChars`, `phase: typing|holding|dissolving`
- Cursor element and `cursorBlink` animation

### 4. What Stays

- Intersection Observer (trigger)
- Status line phrase rotation (already working)
- StrikeWave SVG
- `phraseVibrate` animation
- `prefers-reduced-motion` handling

## Props (simplified)

```tsx
interface HeroStatusLineProps {
  youLabel: string;         // "VOCE" / "YOU"
  statusPhrases: string[];  // 16 words
  statusCta: string;        // "agendar" / "book"
  ctaHref: string;          // "/contact"
}
```

## Word List (16 words, session arc)

### PT-BR
1. deitandooo
2. bowls vibrandooo
3. sistema nervoso alimentando
4. regulandooo
5. dissolvendo no mat
6. frequencia delta
7. transmutando
8. nao fazendo nadaaa
9. zero mente
10. reiniciandooo
11. vibrandooo
12. hibernando
13. silencio carregando
14. ondas lentas
15. gongo processando
16. rebuild completo

### EN
1. lying downnn
2. bowls vibratinggg
3. nervous system feeding
4. regulatinggg
5. dissolving on the mat
6. delta frequency
7. transmuting
8. not doinggg
9. zero mind
10. restartinggg
11. vibratinggg
12. hibernating
13. silence loading
14. slow waves
15. gong processing
16. rebuild complete

## i18n Keys

Move from `home.soundBath.*` (8 paragraph keys) to `home.hero.*`:

```json
{
  "hero": {
    "youLabel": "VOCE",
    "statusPhrases": ["deitandooo", "..."],
    "statusCta": "agendar",
    "cta_primary": "Agendar 1:1",
    "cta_secondary": "Entrar no Sound Healing Live"
  }
}
```

Remove: `soundBath.title`, `soundBath.opening`, `soundBath.p1`-`p4`,
`soundBath.reset`, `soundBath.closing`.
Keep: `soundBath.statusPhrases` moves to `hero.statusPhrases`.

## CSS Delta

- Remove: `.hero-tw__slide`, `.hero-tw__slide--in/--out`,
  `.hero-tw__cursor`, `cursorBlink`, `.hero-tw__title/body/accent`
- Add: `.hero-you` (VOCE + arrow position), `.hero-you__arrow` (pulse)
- Keep: `.hero-tw__status`, `.hero-tw__wave`, `.hero-tw__phrase`,
  `.hero-tw__cta`, `phraseVibrate`, `heroRipple`, `heroPulse`
