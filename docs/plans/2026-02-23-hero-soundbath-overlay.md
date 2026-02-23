# Hero Sound Bath Overlay — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current 16:9 cropped hero with a full 3:2 photo showing both Raphael playing and the person lying down, with the Sound Bath text living as an overlay inside the photo (anchored to the floor/ground area), removing the separate Sound Bath section below.

**Architecture:** Two-zone hero: top zone = current H1 + CTAs (bottom-left); bottom zone = Sound Bath text block overlaid on the ground/floor of the photo with a vignette covering only the lower ~45%. The `home-hero__soundbath` block is positioned absolute at the bottom-right, so the two text blocks are spatially separated across the width of the photo — mirroring the physical composition (Raphael top-left playing, person lying bottom-right). The separate `soundBath` section after the hero is removed since the content now lives inside the photo.

**Tech Stack:** Next.js App Router, next-intl, Tailwind v4, CSS custom properties (`--sh-` namespace), Cormorant Garamond (display), DM Mono (labels)

---

### Task 1: CSS — Hero proportion + dual-zone vignette

**Files:**
- Modify: `src/app/globals.css` — `.home-hero`, `.home-hero__image`, `.home-hero__overlay`, `.home-hero__vignette`, new `.home-hero__soundbath`

**What changes:**
1. `aspect-ratio: 16/9` → `aspect-ratio: 3/2` (matches the 6720×4480 source photo exactly)
2. `object-position: center 25%` → `object-position: center center` (show full frame)
3. Remove the full-frame overlay gradient — replace with a bottom-only vignette covering ~45% of height
4. Add `.home-hero__soundbath` — absolute positioned block, bottom-right quadrant, for the Sound Bath text overlay
5. Mobile: `aspect-ratio: 3/2` kept (no change needed — just remove the `4/3` override and let it breathe)

**CSS to replace in `.home-hero`:**
```css
.home-hero {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
}
```

**CSS to replace in `.home-hero__image`:**
```css
.home-hero__image {
  object-fit: cover;
  object-position: center center;
}
```

**CSS to replace `.home-hero__overlay` (becomes bottom vignette only):**
```css
.home-hero__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(26, 26, 22, 0.92) 0%,
    rgba(26, 26, 22, 0.72) 20%,
    rgba(26, 26, 22, 0.35) 38%,
    transparent 55%
  );
}

:root:not(.dark) .home-hero__overlay {
  background: linear-gradient(
    to top,
    rgba(26, 26, 22, 0.82) 0%,
    rgba(26, 26, 22, 0.55) 20%,
    rgba(26, 26, 22, 0.2) 38%,
    transparent 55%
  );
}
```

**Keep `.home-hero__vignette` as-is** (amber glow at bottom center — complements the new layout).

**New `.home-hero__soundbath` block:**
```css
.home-hero__soundbath {
  position: absolute;
  bottom: 4.5rem;
  right: 0;
  left: 50%;                   /* right half of photo */
  padding-right: var(--journey-px, 2rem);
  padding-left: 2rem;
  pointer-events: none;
  z-index: 2;
}

.home-hero__soundbath-label {
  font-family: var(--sh-font-mono, 'DM Mono', monospace);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sh-organic-gold-primary, #C4A35A);
  opacity: 0.9;
  margin-bottom: 0.6rem;
}

.home-hero__soundbath-title {
  font-family: var(--sh-font-display, 'Cormorant Garamond', serif);
  font-weight: 300;
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  line-height: 1.15;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
}

.home-hero__soundbath-body {
  font-family: var(--sh-font-sans, 'DM Sans', sans-serif);
  font-size: clamp(0.78rem, 1.4vw, 0.9rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.82);
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
  max-width: 38ch;
}

.home-hero__soundbath-reset {
  font-family: var(--sh-font-display, 'Cormorant Garamond', serif);
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--sh-organic-gold-light, #E0C97F);
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  display: block;
}

.home-hero__soundbath-closing {
  font-family: var(--sh-font-display, 'Cormorant Garamond', serif);
  font-style: italic;
  font-size: clamp(0.9rem, 1.6vw, 1.1rem);
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .home-hero {
    aspect-ratio: 3 / 2;
  }
  .home-hero__soundbath {
    left: 0;
    right: 0;
    bottom: 1rem;
    padding: 0 var(--journey-px, 1.25rem);
  }
  .home-hero__soundbath-body {
    display: none;          /* mobile: label + title only, body hidden */
  }
  .home-hero__soundbath-closing {
    display: none;
  }
}
```

**Commit:** `style(hero): 3:2 aspect ratio + bottom-only vignette + soundbath overlay CSS`

---

### Task 2: TSX — Hero markup + Sound Bath overlay block

**Files:**
- Modify: `src/app/[locale]/page.tsx`

**What changes:**
1. Remove the `{t("hero.poetic")}` paragraph (the italic "O prana canta enquanto flui")
2. Add `.home-hero__soundbath` div inside `<section className="home-hero">`, after `.home-hero__vignette`
3. Remove the entire `{/* ── 1.5. SOUND BATH ── */}` section that currently appears after the hero

**Hero section — new JSX:**
```tsx
<section className="home-hero">
  <Image
    src="/media/hero/2627.jpg"
    alt="Sound healing session outdoors — Raphael playing and a person lying down receiving sound"
    fill
    priority
    sizes="100vw"
    className="home-hero__image"
  />
  <div className="home-hero__overlay" aria-hidden="true" />
  <div className="home-hero__vignette" aria-hidden="true" />

  {/* Sound Bath text — lives in the floor/ground of the photo */}
  <div className="home-hero__soundbath">
    <p className="home-hero__soundbath-label">{t("soundBath.label")}</p>
    <h2 className="home-hero__soundbath-title">{t("soundBath.title")}</h2>
    <div className="home-hero__soundbath-body">
      <p>{t("soundBath.opening")}</p>
      <p>{t("soundBath.p1")}</p>
      <p>{t("soundBath.p2")}</p>
      <span className="home-hero__soundbath-reset">{t("soundBath.reset")}</span>
      <p>{t("soundBath.p3")}</p>
      <p>{t("soundBath.p4")}</p>
    </div>
    <p className="home-hero__soundbath-closing">{t("soundBath.closing")}</p>
  </div>

  <div className="home-hero__content journey-container">
    <div className="home-hero__copy">
      <h1 className="ds-font-display ds-weight-light ds-size-6xl ds-leading-tight">
        {t("hero.title")}
      </h1>
      <p className="journey-sub ds-size-lg">{t("hero.sub")}</p>
      <div className="journey-axon" aria-hidden="true">
        <span className="journey-node left" />
        <span className="journey-node right" />
      </div>
      <div className="btn-row">
        <Link className="btn btn-primary" href="/contact">
          {t("hero.cta_primary")}
        </Link>
        <Link className="btn btn-secondary" href="/sessions">
          {t("hero.cta_secondary")}
        </Link>
      </div>
    </div>
  </div>
</section>
```

**Remove** the entire section block starting with `{/* ── 1.5. SOUND BATH — what it is ──────────────────────── */}` down to its closing `</section>` tag.

**Commit:** `feat(hero): sound bath text overlay inside photo, remove poetic subtitle`

---

### Task 3: Messages — remove hero.poetic key

**Files:**
- Modify: `messages/pt-BR.json`
- Modify: `messages/en.json`

**What to remove** from `home.hero` in both files:
```json
"poetic": "O prana canta enquanto flui",
```

(The `soundBath` keys already exist and are correct — no changes needed there.)

**Commit:** `chore(i18n): remove hero.poetic key (replaced by soundBath overlay)`

---

### Task 4: Build + lint verification

```bash
npm run lint && npm run build
```

Expected: lint clean, build exits 0. The `hero.poetic` key removal will be caught at build time if any reference remains in TSX — fix if needed.

---

### Task 5: Final commit + push

```bash
git add src/app/globals.css src/app/\[locale\]/page.tsx messages/pt-BR.json messages/en.json
git commit -m "feat(hero): full 3:2 photo with sound bath overlay — S11"
```
