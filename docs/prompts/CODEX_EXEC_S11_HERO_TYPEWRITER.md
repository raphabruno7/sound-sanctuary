# CODEX PROMPT — S11: Hero Cinematográfico com Digitação

## Context

Sound Sanctuary is a Next.js 16 App Router site (TypeScript + Tailwind v4) using `next-intl` for i18n. The homepage is at `src/app/[locale]/page.tsx`. Translations live in `messages/pt-BR.json` and `messages/en.json`. The design system uses CSS custom properties with `--sh-` prefix. Fonts: Cormorant Garamond (display), DM Sans (body), DM Mono (mono/labels).

The current hero has two competing text blocks inside the photo — this must be replaced with a single centered typewriter block.

Read the design doc at `docs/plans/2026-02-23-hero-typewriter-design.md` before starting.

## What to build

Replace the homepage hero with a cinematic full-photo hero with a single centered text block that reveals character-by-character like someone is typing it live.

## Deliverables (in order)

### 1. Create `src/components/HeroTypewriter.tsx` (client component)

A `"use client"` component that receives all text segments as props and renders them character-by-character using requestAnimationFrame.

**Props interface:**
```typescript
interface HeroTypewriterProps {
  label: string;        // "SOM" — small mono label
  title: string;        // "o super alimento do sistema nervoso."
  opening: string;      // "O sistema nervoso é vibração."
  p1: string;           // paragraph 1
  p2: string;           // paragraph 2
  reset: string;        // "E você reinicia."
  p3: string;           // paragraph 3
  p4: string;           // paragraph 4
  closing: string;      // "E sabe o que você precisa fazer? Nada. Apenas deitar e receber."
}
```

**Animation logic:**
- Build a flat array of "segments" from props, each segment has: `text`, `cssClass`, `pauseBefore` (ms), `pauseAfter` (ms)
- Segments in order:
  1. `label` → class `hero-tw__label`, pauseBefore: 0
  2. `title` → class `hero-tw__title`, pauseBefore: 300
  3. `opening` → class `hero-tw__body`, pauseBefore: 600
  4. `p1` → class `hero-tw__body`, pauseBefore: 600
  5. `p2` → class `hero-tw__body`, pauseBefore: 600
  6. `reset` → class `hero-tw__reset`, pauseBefore: 800 (dramatic pause)
  7. `p3` → class `hero-tw__body`, pauseBefore: 600
  8. `p4` → class `hero-tw__body`, pauseBefore: 600
  9. `closing` → class `hero-tw__closing`, pauseBefore: 1000 (climax pause)

- Use `useRef` + `requestAnimationFrame` loop
- Base speed: 35ms per character
- Smart pauses within text: `,` → +150ms, `.` → +400ms, `—` → +200ms, `\n` → +600ms
- Use Intersection Observer (threshold: 0.3) to trigger — animation starts when the text area enters viewport
- Animation plays ONCE — store `hasPlayed` in a ref
- `prefers-reduced-motion`: check with `window.matchMedia('(prefers-reduced-motion: reduce)')` — if true, render all text immediately with a CSS `opacity 0→1` transition of 1s

**Rendering approach:**
- Maintain a `displayedChars` count in state
- Concatenate all segment texts into one master string with segment boundary markers
- Render: for each segment, calculate how many chars are visible based on `displayedChars`, render a `<span>` with the segment's CSS class containing only the visible portion
- Segments with 0 visible chars are not rendered at all (clean DOM)

**The component renders:**
```html
<div class="hero-tw" ref={containerRef}>
  <span class="hero-tw__label">SOM</span>
  <span class="hero-tw__title">o super alimento do sistema nervoso.</span>
  <p class="hero-tw__body">O sistema nervoso é vibração.</p>
  <p class="hero-tw__body">Quando você se deita...</p>
  ...
  <span class="hero-tw__reset">E você reinicia.</span>
  ...
  <p class="hero-tw__closing">E sabe o que você precisa fazer? Nada. Apenas deitar e receber.</p>
</div>
```

### 2. Add CSS to `src/app/globals.css`

**Remove these classes entirely** (they are replaced):
- `.home-hero__soundbath` and all its children (`-label`, `-title`, `-body`, `-reset`, `-closing`)
- `.home-hero__content`
- `.home-hero__copy`
- `.dark .home-hero__copy`
- `.home-hero .btn-row`
- `.home-hero .btn-secondary` (all variants including `:hover`, `:root:not(.dark)`)

**Keep unchanged:**
- `.home-hero` (aspect-ratio 3/2, overflow hidden, position relative)
- `.home-hero__image` (object-fit cover, center center)
- `.home-hero__overlay` — but STRENGTHEN the gradient for centered text legibility:
  ```css
  .home-hero__overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to top,
      rgba(26, 26, 22, 0.95) 0%,
      rgba(26, 26, 22, 0.80) 25%,
      rgba(26, 26, 22, 0.40) 45%,
      transparent 60%
    );
  }

  :root:not(.dark) .home-hero__overlay {
    background: linear-gradient(
      to top,
      rgba(26, 26, 22, 0.88) 0%,
      rgba(26, 26, 22, 0.65) 25%,
      rgba(26, 26, 22, 0.25) 45%,
      transparent 60%
    );
  }
  ```
- `.home-hero__vignette` (keep as-is)

**Add new `.hero-tw` classes:**
```css
/* ── Hero Typewriter — centered text block ── */
.hero-tw {
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  z-index: 2;
  text-align: center;
  max-width: 52ch;
  margin: 0 auto;
  padding: 0 1.5rem;
  pointer-events: none;
}

.hero-tw__label {
  display: block;
  font-family: var(--sh-font-mono, 'DM Mono', monospace);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--sh-organic-gold-primary, #C4A35A);
  margin-bottom: 0.75rem;
}

.hero-tw__title {
  display: block;
  font-family: var(--sh-font-display, 'Cormorant Garamond', serif);
  font-weight: 300;
  font-size: clamp(1.8rem, 4.5vw, 3.2rem);
  line-height: 1.15;
  color: #fff;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.6);
  margin-bottom: 1.5rem;
}

.hero-tw__body {
  display: block;
  font-family: var(--sh-font-sans, 'DM Sans', sans-serif);
  font-size: clamp(0.82rem, 1.5vw, 0.95rem);
  font-weight: 400;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5em;
}

.hero-tw__reset {
  display: block;
  font-family: var(--sh-font-display, 'Cormorant Garamond', serif);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: var(--sh-organic-gold-light, #E0C97F);
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.hero-tw__closing {
  display: block;
  font-family: var(--sh-font-display, 'Cormorant Garamond', serif);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(0.9rem, 1.8vw, 1.1rem);
  color: rgba(255, 255, 255, 0.65);
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
  margin-top: 1em;
}

/* Reduced motion: instant reveal with fade */
.hero-tw--revealed {
  animation: heroFadeIn 1s ease-out forwards;
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── CTA strip after hero ── */
.hero-cta-strip {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 1.5rem;
}

@media (max-width: 768px) {
  .hero-tw {
    bottom: 2rem;
    max-width: 90vw;
    padding: 0 1rem;
  }

  .hero-tw__title {
    font-size: clamp(1.5rem, 6vw, 2.2rem);
    margin-bottom: 1rem;
  }

  .hero-tw__body {
    font-size: clamp(0.8rem, 3.2vw, 0.9rem);
  }

  .hero-cta-strip {
    flex-direction: column;
    padding: 2rem 1.25rem;
  }
}

@media (max-width: 480px) {
  .home-hero {
    aspect-ratio: 4 / 3;
  }

  .hero-tw {
    bottom: 1.5rem;
  }
}
```

### 3. Update `src/app/[locale]/page.tsx`

**Replace the entire hero section** (from `{/* ── 1. HERO` comment to closing `</section>`) with:

```tsx
{/* ── 1. HERO — cinematic photo + typewriter text ── */}
<section className="home-hero">
  <Image
    src="/media/hero/2627.jpg"
    alt="Sound healing session outdoors — Raphael playing instruments and a person lying down receiving sound"
    fill
    priority
    sizes="100vw"
    className="home-hero__image"
  />
  <div className="home-hero__overlay" aria-hidden="true" />
  <div className="home-hero__vignette" aria-hidden="true" />
  <HeroTypewriter
    label={t("soundBath.label")}
    title={t("soundBath.title")}
    opening={t("soundBath.opening")}
    p1={t("soundBath.p1")}
    p2={t("soundBath.p2")}
    reset={t("soundBath.reset")}
    p3={t("soundBath.p3")}
    p4={t("soundBath.p4")}
    closing={t("soundBath.closing")}
  />
</section>

{/* ── CTA strip ── */}
<div className="hero-cta-strip">
  <Link className="btn btn-primary" href="/contact">
    {t("hero.cta_primary")}
  </Link>
  <Link className="btn btn-secondary" href="/sessions">
    {t("hero.cta_secondary")}
  </Link>
</div>
```

Add the import at the top:
```tsx
import { HeroTypewriter } from "@/components/HeroTypewriter";
```

### 4. Clean up messages (optional, low priority)

The `home.hero.title` and `home.hero.sub` keys are no longer used in the hero. You may keep them (no harm) or remove them. Do NOT remove `home.hero.cta_primary` and `home.hero.cta_secondary` — they are used in the CTA strip.

### 5. Verify

Run:
```bash
npm run lint
npm run build
```

Both must pass with zero errors. The build will catch any unused imports or missing references.

## Constraints

- Do NOT add any npm dependencies. Zero new deps.
- Do NOT touch the design-system submodule.
- Do NOT modify any page other than `src/app/[locale]/page.tsx`.
- Do NOT use Framer Motion or any animation library.
- Respect `prefers-reduced-motion` — users who prefer reduced motion get instant text with a gentle fade.
- The typewriter component must be a `"use client"` component. The page itself remains a server component.
- Mobile first: test at 375px width mentally. The text must be readable and the animation must not cause layout shifts.
- Use `requestAnimationFrame` for the animation loop, NOT `setInterval` or `setTimeout` chains.

## Files to create/modify

| Action | File |
|--------|------|
| CREATE | `src/components/HeroTypewriter.tsx` |
| MODIFY | `src/app/globals.css` (remove old hero classes, add new) |
| MODIFY | `src/app/[locale]/page.tsx` (replace hero section) |

## Commit message

```
feat(hero): cinematic typewriter reveal animation — S11

- Replace dual-block hero with single centered typewriter text
- New HeroTypewriter client component (requestAnimationFrame)
- Character-by-character reveal with smart punctuation pauses
- Intersection Observer trigger, plays once
- prefers-reduced-motion: instant fade-in fallback
- CTAs migrate to strip below hero photo
- Strengthen bottom vignette for centered text legibility
```
