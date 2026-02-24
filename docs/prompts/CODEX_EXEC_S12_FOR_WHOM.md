# Codex Exec — S12: Hero visual fixes + Refinar "Para quem e"

## Context

Sound Sanctuary is a Next.js 16 site for sound healing (banho de som).
The hero section was just pivoted to a minimal Claude Code status-line
aesthetic (commit `c982b23`). Visual review revealed positioning and
sizing issues that need fixing before moving to the next section.

**User journey:** sentir (hero) -> se reconhecer (para quem e) -> entender
-> decidir -> agendar.

**Design system:** CSS custom properties with `--sh-` prefix, fonts
Cormorant Garamond (display), DM Sans (body), DM Mono (labels/mono).
Tailwind v4 + globals.css. next-intl for i18n.

**Tom do site:** O site deve sentir-se como os primeiros 30 segundos de
uma sessao — o momento em que a pessoa deita e percebe que nao precisa
fazer nada. Frases curtas, diretas, sem jargao espiritual. Reconhecimento
sem diagnostico. Zero performance. Convite gentil, nunca pressao.

**Publico:** Tech-savvy em Portugal. Valoriza clareza, sem misticismo.

---

## Part 1: Hero visual fixes (PRIORITY — do this first)

Four issues identified from browser testing (see screenshot context):

### 1.1 "VOCE" label + arrow needs to be lower

The "VOCE" + arrow is currently at `top: 55%` — it needs to sit lower,
closer to the person lying down in the photo. The arrow must clearly
point AT the person, not float in the middle of the image.

**File:** `src/app/globals.css`

**Current CSS (line 274):**
```css
.hero-you {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  ...
}
```

**Fix:** Change `top: 55%` to `top: 68%`. This pushes VOCE + arrow down
closer to the person lying in the lower third of the photo. Test visually
and adjust if needed (65-72% range).

### 1.2 Status line phrases need to be larger

The rotating phrases (`SISTEMA NERVOSO ALIMENTANDO`, `VIBRATINGGG`, etc.)
are too small at `font-size: 0.68rem`. They are the main text element of
the hero and need more presence.

**File:** `src/app/globals.css`

**Current CSS (line ~398):**
```css
.hero-sl__phrase {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
}
```

**Fix:** Increase to `font-size: 0.82rem` and adjust letter-spacing to
`0.18em` (slightly tighter to compensate for larger size). Also increase
the CTA to match:

```css
.hero-sl__phrase {
  font-size: 0.82rem;
  letter-spacing: 0.18em;
}
.hero-sl__cta {
  font-size: 0.78rem;
  letter-spacing: 0.15em;
}
.hero-sl__dot {
  font-size: 0.82rem;
}
```

Update mobile breakpoints proportionally:
- 768px: `.hero-sl__phrase, .hero-sl__cta { font-size: 0.75rem; }`
- 480px: `.hero-sl__phrase, .hero-sl__cta { font-size: 0.68rem; }`

### 1.3 StrikeWave circle needs to be more visible and vibrant

The StrikeWave SVG (concentric ripple circles) is too subtle. It needs to
feel like it is actually vibrating — more visible, slightly larger, with
more dynamic animation.

**File:** `src/app/globals.css`

**Current CSS:**
```css
.hero-sl__wave {
  width: 22px;
  height: 22px;
}
.hero-sl__ring {
  stroke-width: 1.5;
  animation: heroRipple 6000ms ...;
}
.hero-sl__core {
  animation: heroPulse 6000ms ease-in-out infinite;
}
```

**Fix — make it larger, bolder, faster:**

```css
.hero-sl__wave {
  width: 28px;
  height: 28px;
}
.hero-sl__ring {
  stroke-width: 2;
  animation: heroRipple 4500ms cubic-bezier(0.33, 0, 0.67, 1) infinite;
}
.hero-sl__core {
  animation: heroPulse 4500ms ease-in-out infinite;
}
```

Also update the keyframes to be more dramatic:

```css
@keyframes heroRipple {
  0% { opacity: 0; transform: scale(0.3); }
  12% { opacity: 0.8; }
  100% { opacity: 0; transform: scale(2.2); }
}
@keyframes heroPulse {
  0%, 100% { opacity: 0.3; r: 3; }
  50% { opacity: 1; r: 5; }
}
```

And **also increase the SVG circle radii** in the component to make the
rings more spread out. In `src/components/HeroStatusLine.tsx`, the
StrikeWave function currently has:

```tsx
<circle ... r="12" />
<circle ... r="24" />
<circle ... r="36" />
<circle ... r="3" />  // core
```

Change to:
```tsx
<circle ... r="15" />
<circle ... r="30" />
<circle ... r="45" />
<circle ... r="4" />  // core
```

### 1.4 Add vibrate/pulse to the entire status line container

The phrases already have `phraseVibrate` but the whole status line
(including the StrikeWave) should feel alive. Add a very subtle shared
pulse to the status container:

**File:** `src/app/globals.css`

Add after `.hero-sl__status--visible`:

```css
.hero-sl__status--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  animation: statusPulse 4s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}
```

### 1.5 Commit hero fixes

```bash
git add src/app/globals.css src/components/HeroStatusLine.tsx
git commit -m "fix(hero): VOCE lower, phrases larger, strike-wave more visible

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Part 2: Refinar "Para quem e" section

### What to do

1. **Update i18n messages** — Raphael will provide the new text. Replace
   the `home.forWhom` object in both `messages/pt-BR.json` and
   `messages/en.json` with the new content he provides.

2. **Refine the section in `src/app/[locale]/page.tsx`** (lines 157-202):

   Current structure:
   ```
   section.journey-container.journey-section
     div.journey-label    -> "Para quem e"
     h2.journey-title     -> "Quando a vida acelera demais"
     div.journey-grid-2
       div.journey-hero-media  -> photo with "voce ->" annotation
       div                     -> symptom list (ul>li) + CTA glass card
   ```

   Refinement guidelines:
   - Keep the 2-column grid layout (photo left, text right)
   - The photo currently reuses the hero image (`/media/hero/2627.jpg`).
     This may change — check if Raphael specifies a different image.
   - **Remove the "voce ->" annotation on the photo** — it is redundant
     now that the hero already has "VOCE" + arrow pointing at the person.
     Remove the `<span>` element and the `forWhom.annotation` i18n key.
   - The symptom list items should feel like gentle recognition, not a
     clinical checklist. Use the tone described above.
   - The CTA glass card at the bottom should maintain the current
     dual-CTA pattern (primary + secondary).
   - Ensure spacing, typography, and transitions match the rest of
     the journey sections.

3. **CSS refinements** in `src/app/globals.css`:
   - The section uses existing `.journey-*` utility classes.
   - If the text changes require layout adjustments (e.g., fewer items,
     different hierarchy), update accordingly.
   - Consider adding a subtle reveal animation (fade-in on scroll)
     using Intersection Observer or CSS-only approach, matching the
     hero's gentle entrance.

4. **Verify:**
   - `npm run lint` — exit 0
   - `npm run build` — exit 0
   - Both locales render correctly (pt-BR and en)

5. **Commit:**
   ```bash
   git add messages/pt-BR.json messages/en.json \
     'src/app/[locale]/page.tsx' src/app/globals.css
   git commit -m "refine(home): Para quem e section — tone and layout

   Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
   ```

---

## Files

| File | Action | Part |
|------|--------|------|
| `src/app/globals.css` | Hero CSS fixes + section CSS | 1 + 2 |
| `src/components/HeroStatusLine.tsx` | StrikeWave SVG radii | 1 |
| `messages/pt-BR.json` | Modify `home.forWhom` | 2 |
| `messages/en.json` | Modify `home.forWhom` | 2 |
| `src/app/[locale]/page.tsx` | Modify section 2 (lines 157-202) | 2 |

## Current hero CSS (relevant sections in globals.css)

```css
/* VOCE + arrow — line 272 */
.hero-you {
  position: absolute;
  top: 55%;          /* <- needs to be ~68% */
  left: 50%;
  transform: translate(-50%, -50%);
}
.hero-you__label {
  font-size: 0.75rem;
  letter-spacing: 0.25em;
}

/* Status line — line 308 */
.hero-sl__status { ... }

/* Strike-wave — line 326 */
.hero-sl__wave {
  width: 22px;       /* <- needs to be 28px */
  height: 22px;
}
.hero-sl__ring {
  stroke-width: 1.5; /* <- needs to be 2 */
  animation: heroRipple 6000ms ...;  /* <- needs to be 4500ms */
}

/* Phrase — line 396 */
.hero-sl__phrase {
  font-size: 0.68rem;  /* <- needs to be 0.82rem */
  letter-spacing: 0.2em;
}
.hero-sl__cta {
  font-size: 0.68rem;  /* <- needs to be 0.78rem */
}
```

## Current StrikeWave component (HeroStatusLine.tsx)

```tsx
function StrikeWave() {
  return (
    <svg className="hero-sl__wave" viewBox="0 0 200 200" ...>
      <circle className="hero-sl__ring hero-sl__r1" r="12" />  /* -> 15 */
      <circle className="hero-sl__ring hero-sl__r2" r="24" />  /* -> 30 */
      <circle className="hero-sl__ring hero-sl__r3" r="36" />  /* -> 45 */
      <circle className="hero-sl__core" r="3" />                /* -> 4 */
    </svg>
  );
}
```

## Current i18n keys (`home.forWhom`)

```json
// pt-BR
"forWhom": {
  "label": "Para quem e",
  "title": "Quando a vida acelera demais",
  "annotation": "voce",
  "items": [
    "ansiedade / estresse",
    "dificuldades com o sono",
    "superestimulacao",
    "integracao apos periodos intensos"
  ],
  "cta_prompt": "Pronto para desacelerar? Dois caminhos. Mesma intencao.",
  "cta_primary": "Agendar 1:1",
  "cta_secondary": "Ver portfolio"
}

// en
"forWhom": {
  "label": "Who It Is For",
  "title": "When life runs hot",
  "annotation": "you",
  "items": [
    "anxiety / stress",
    "sleep issues",
    "overstimulation",
    "integration after intense periods"
  ],
  "cta_prompt": "Ready to downshift? Two paths. Same intention.",
  "cta_primary": "Book a 1:1",
  "cta_secondary": "Explore portfolio"
}
```

## Current page.tsx section (lines 157-202)

```tsx
{/* 2. FOR WHOM */}
<section className="journey-container journey-section">
  <div className="journey-label">{t("forWhom.label")}</div>
  <h2 className="journey-title journey-title-regular">{t("forWhom.title")}</h2>
  <div className="journey-grid-2 mt-6">
    <div className="journey-hero-media ds-glass relative overflow-hidden rounded-2xl">
      <Image
        src="/media/hero/2627.jpg"
        alt="Person lying down receiving sound healing in the forest"
        fill
        sizes="(max-width: 980px) 100vw, 50vw"
        className="object-cover object-center"
      />
      <div className="journey-photo-vignette" aria-hidden="true" />
      <span
        className="absolute bottom-6 right-6 ds-font-display ds-italic ds-size-2xl text-white/90 pointer-events-none select-none"
        aria-hidden="true"
      >
        {t("forWhom.annotation")} ->
      </span>
    </div>
    <div className="flex flex-col justify-center">
      <ul className="space-y-3">
        {(["items.0", "items.1", "items.2", "items.3"] as const).map((key) => (
          <li key={key} className="ds-size-lg text-secondary">
            {t(`forWhom.${key}`)}
          </li>
        ))}
      </ul>
      <div className="ds-glass mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
        <p className="text-secondary">{t("forWhom.cta_prompt")}</p>
        <div className="btn-row !mb-0">
          <Link className="btn btn-primary" href="/contact">
            {t("forWhom.cta_primary")}
          </Link>
          <Link className="btn btn-secondary" href="/portfolio">
            {t("forWhom.cta_secondary")}
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Tone guidelines

- Frases curtas, diretas, sem jargao espiritual
- Reconhecimento sem diagnostico — "isso acontece" em vez de "voce sofre de"
- Sem exclamacoes, sem urgencia, sem marketing agressivo
- Espaco em branco como elemento de design
- Normalizar — listar sintomas como estados comuns, nao problemas
- Zero performance — o usuario nao precisa fazer nada para merecer estar ali
- Convite gentil, nunca pressao

## Important

- **Do Part 1 (hero fixes) FIRST, commit, then Part 2**
- Wait for Raphael to provide the new text content before updating i18n
- If he does not provide new text, keep the current content and focus
  only on code/CSS/layout refinement
- Remove the "voce ->" annotation on the photo — redundant with hero
- Run lint + build before each commit
- Use the verification-before-completion skill
