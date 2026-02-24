# Hero Status Line Pivot — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the long typewriter paragraph hero with a minimal Claude Code status-line aesthetic — static "VOCE" + arrow over the photo + 16 rotating glitch-style words.

**Architecture:** Rewrite `HeroTypewriter.tsx` into `HeroStatusLine.tsx` — strip all typewriter/segment logic, keep Intersection Observer + phrase rotation + StrikeWave. Add static "VOCE" + arrow SVG element. Update i18n messages and CSS.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS (globals.css), next-intl

**Design doc:** `docs/plans/2026-02-24-hero-statusline-pivot.md`

---

### Task 1: Update i18n messages (both locales)

**Files:**
- Modify: `messages/pt-BR.json` — `home.hero` and `home.soundBath` sections
- Modify: `messages/en.json` — `home.hero` and `home.soundBath` sections

**Step 1: Update `messages/pt-BR.json`**

Replace the `home.hero` object with:

```json
"hero": {
  "title": "Sound Healing",
  "sub": "Uma pratica de regulacao para a vida moderna: ritmo, descanso e integracao.",
  "youLabel": "VOCE",
  "statusPhrases": [
    "deitandooo",
    "bowls vibrandooo",
    "sistema nervoso alimentando",
    "regulandooo",
    "dissolvendo no mat",
    "frequencia delta",
    "transmutando",
    "nao fazendo nadaaa",
    "zero mente",
    "reiniciandooo",
    "vibrandooo",
    "hibernando",
    "silencio carregando",
    "ondas lentas",
    "gongo processando",
    "rebuild completo"
  ],
  "statusCta": "agendar",
  "cta_primary": "Agendar 1:1",
  "cta_secondary": "Entrar no Sound Healing Live"
}
```

Remove the entire `home.soundBath` object.

**Step 2: Update `messages/en.json`**

Replace the `home.hero` object with:

```json
"hero": {
  "title": "Sound Healing",
  "sub": "Regulation practice for modern life: rhythm, rest, and integration.",
  "youLabel": "YOU",
  "statusPhrases": [
    "lying downnn",
    "bowls vibratinggg",
    "nervous system feeding",
    "regulatinggg",
    "dissolving on the mat",
    "delta frequency",
    "transmuting",
    "not doinggg",
    "zero mind",
    "restartinggg",
    "vibratinggg",
    "hibernating",
    "silence loading",
    "slow waves",
    "gong processing",
    "rebuild complete"
  ],
  "statusCta": "book",
  "cta_primary": "Book a 1:1",
  "cta_secondary": "Join Sound Healing Live"
}
```

Remove the entire `home.soundBath` object.

**Step 3: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/pt-BR.json','utf8')); console.log('pt-BR OK')" && node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8')); console.log('en OK')"`

Expected: Both print OK.

**Step 4: Commit**

```bash
git add messages/pt-BR.json messages/en.json
git commit -m "feat(i18n): hero status-line phrases, remove soundBath paragraphs"
```

---

### Task 2: Rewrite component — HeroTypewriter -> HeroStatusLine

**Files:**
- Delete (via rewrite): `src/components/HeroTypewriter.tsx`
- Create: `src/components/HeroStatusLine.tsx`

**Step 1: Create `src/components/HeroStatusLine.tsx`**

Write the complete new component:

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* =====================================================
   HeroStatusLine — minimal Claude Code status aesthetic
   Static "VOCE" + arrow over photo.
   Rotating glitch-style words in a status line.
   ===================================================== */

interface HeroStatusLineProps {
  youLabel: string;
  statusPhrases: string[];
  statusCta: string;
  ctaHref: string;
}

const PHRASE_INTERVAL = 3600;
const PHRASE_FADE = 500;

function StrikeWave() {
  return (
    <svg
      className="hero-sl__wave"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle className="hero-sl__ring hero-sl__r1" cx="100" cy="100" r="12" />
      <circle className="hero-sl__ring hero-sl__r2" cx="100" cy="100" r="24" />
      <circle className="hero-sl__ring hero-sl__r3" cx="100" cy="100" r="36" />
      <circle className="hero-sl__core" cx="100" cy="100" r="3" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      className="hero-you__arrow"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 48"
      aria-hidden="true"
    >
      <line x1="12" y1="0" x2="12" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <polyline points="6,34 12,42 18,34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroStatusLine(props: HeroStatusLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const [visible, setVisible] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseFading, setPhraseFading] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
      setVisible(true);
    }
  }, []);

  // Intersection Observer — reveal on viewport entry
  useEffect(() => {
    if (reducedMotion || hasStarted.current) return;

    const el = containerRef.current;
    if (!el) return;
    const target = el.closest(".home-hero") || el;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          setVisible(true);
        }
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Phrase rotation
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setPhraseFading(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % props.statusPhrases.length);
        setPhraseFading(false);
      }, PHRASE_FADE);
    }, PHRASE_INTERVAL);
    return () => clearInterval(interval);
  }, [visible, props.statusPhrases.length]);

  return (
    <div ref={containerRef} className="hero-sl">
      {/* Static "VOCE" + arrow */}
      <div className={`hero-you ${visible ? "hero-you--visible" : ""}`}>
        <span className="hero-you__label">{props.youLabel}</span>
        <ArrowDown />
      </div>

      {/* Status line */}
      <div
        className={`hero-sl__status ${visible ? "hero-sl__status--visible" : ""}`}
        aria-live="polite"
      >
        <StrikeWave />
        <span
          className={`hero-sl__phrase ${phraseFading ? "hero-sl__phrase--fading" : ""}`}
        >
          {props.statusPhrases[phraseIndex]}
        </span>
        <span className="hero-sl__dot" aria-hidden="true">&middot;</span>
        <Link href={props.ctaHref} className="hero-sl__cta">
          {props.statusCta} &rarr;
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Delete old component**

```bash
rm src/components/HeroTypewriter.tsx
```

**Step 3: Commit**

```bash
git add src/components/HeroStatusLine.tsx
git add src/components/HeroTypewriter.tsx
git commit -m "feat(hero): rewrite HeroTypewriter -> HeroStatusLine

Strip typewriter paragraph logic. Add static VOCE + arrow.
Keep phrase rotation, StrikeWave, Intersection Observer."
```

---

### Task 3: Update page.tsx — swap component + props

**Files:**
- Modify: `src/app/[locale]/page.tsx:10,139-151`

**Step 1: Update import (line 10)**

Replace:
```tsx
import { HeroTypewriter } from "@/components/HeroTypewriter";
```
With:
```tsx
import { HeroStatusLine } from "@/components/HeroStatusLine";
```

**Step 2: Update component usage (lines 139-151)**

Replace the entire `<HeroTypewriter ... />` block with:

```tsx
<HeroStatusLine
  youLabel={t("hero.youLabel")}
  statusPhrases={t.raw("hero.statusPhrases")}
  statusCta={t("hero.statusCta")}
  ctaHref="/contact"
/>
```

**Step 3: Commit**

```bash
git add 'src/app/[locale]/page.tsx'
git commit -m "feat(hero): wire HeroStatusLine in page.tsx"
```

---

### Task 4: Update CSS — remove old styles, add new

**Files:**
- Modify: `src/app/globals.css:258-476` (hero-tw section + media queries)

**Step 1: Replace the entire hero CSS section**

Replace everything from line 258 (`/* -- Hero Typewriter ...`) through line 476 (end of 480px media query for hero) with the new CSS below. Keep the existing `.hero-cta-strip` styles (lines 437-444) intact.

New CSS:

```css
/* == Hero Status Line -- minimal Claude Code aesthetic == */
.hero-sl {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 3.5rem;
  pointer-events: none;
}

/* -- "VOCE" + arrow -- */
.hero-you {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 1.2s ease-out;
}
.hero-you--visible {
  opacity: 1;
}
.hero-you__label {
  font-family: var(--sh-font-mono, 'DM Mono', monospace);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.6);
}
.hero-you__arrow {
  width: 16px;
  height: 32px;
  color: #fff;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
  animation: arrowPulse 2.5s ease-in-out infinite;
}
@keyframes arrowPulse {
  0%, 100% { opacity: 0.6; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(3px); }
}

/* -- Status line -- */
.hero-sl__status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 1s ease-out 0.4s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
  pointer-events: none;
}
.hero-sl__status--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* -- Strike-wave -- */
.hero-sl__wave {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  overflow: visible;
}
.hero-sl__ring {
  fill: none;
  stroke-width: 1.5;
  transform-origin: 100px 100px;
  animation: heroRipple 6000ms cubic-bezier(0.33, 0, 0.67, 1) infinite;
}
.hero-sl__r1 {
  stroke: var(--sh-organic-gold-primary, #C4A35A);
  animation-delay: 0ms;
}
.hero-sl__r2 {
  stroke: var(--sh-organic-gold-light, #E0C97F);
  animation-delay: 800ms;
}
.hero-sl__r3 {
  stroke: var(--sh-organic-liquid-glass-light, #8BC4A0);
  animation-delay: 1600ms;
}
.hero-sl__core {
  fill: var(--sh-organic-gold-primary, #C4A35A);
  animation: heroPulse 6000ms ease-in-out infinite;
}

@keyframes heroRipple {
  0% { opacity: 0; transform: scale(0.4); }
  10% { opacity: 0.6; }
  100% { opacity: 0; transform: scale(2); }
}
@keyframes heroPulse {
  0%, 100% { opacity: 0.25; r: 3; }
  50% { opacity: 0.8; r: 4; }
}

/* -- Phrase -- */
.hero-sl__phrase {
  font-family: var(--sh-font-mono, 'DM Mono', monospace);
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sh-organic-gold-primary, #C4A35A);
  opacity: 1;
  transition: opacity 0.5s ease;
  animation: phraseVibrate 3s ease-in-out infinite;
}
.hero-sl__phrase--fading { opacity: 0; }

@keyframes phraseVibrate {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-0.4px); }
  40% { transform: translateX(0.3px); }
  60% { transform: translateX(-0.2px); }
  80% { transform: translateX(0.4px); }
}

.hero-sl__dot {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.7rem;
}

.hero-sl__cta {
  font-family: var(--sh-font-mono, 'DM Mono', monospace);
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  pointer-events: auto;
  transition: color 0.3s ease;
}
.hero-sl__cta:hover {
  color: var(--sh-organic-gold-light, #E0C97F);
}

/* -- Mobile -- */
@media (max-width: 768px) {
  .home-hero__image {
    object-position: center center;
  }
  .hero-sl {
    padding-bottom: 2rem;
  }
  .hero-you__label {
    font-size: 0.7rem;
  }
  .hero-you__arrow {
    width: 14px;
    height: 28px;
  }
}

@media (max-width: 480px) {
  .hero-sl {
    padding-bottom: 1.5rem;
  }
  .hero-sl__wave { width: 20px; height: 20px; }
  .hero-sl__phrase, .hero-sl__cta { font-size: 0.62rem; }
}
```

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style(hero): status-line CSS, remove typewriter styles"
```

---

### Task 5: Build + Lint verification

**Step 1: Run lint**

Run: `npm run lint`
Expected: Exit 0, no errors.

**Step 2: Run build**

Run: `npm run build`
Expected: Exit 0, compiled successfully, all pages generated.

**Step 3: If errors, fix and re-verify**

Common issues:
- Unused imports in page.tsx (old soundBath translation keys)
- CSS class name typos
- Missing i18n keys referenced in page.tsx

**Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address lint/build issues from hero pivot"
```

---

### Task 6: Visual verification in browser

**Step 1: Open localhost:3000/pt-BR**

Verify:
- "VOCE" appears centered over the person lying down
- Arrow pulses subtly below the label
- Status line shows at bottom: `strike-wave . [word] . agendar ->`
- Words rotate every ~3.6s with cross-fade
- All text is UPPERCASE DM Mono
- Phrase has subtle vibrate animation
- StrikeWave ripples animate
- CTA "agendar ->" links to /contact

**Step 2: Open localhost:3000/en**

Verify same layout with English words ("YOU", "vibratinggg", "book ->").

**Step 3: Check mobile (resize to 375px)**

Verify responsive layout, smaller font sizes, adjusted padding.

**Step 4: Final commit with any visual tweaks**

```bash
git add -A
git commit -m "refine(hero): visual adjustments from browser testing"
```
