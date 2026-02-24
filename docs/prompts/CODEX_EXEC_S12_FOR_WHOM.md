# Codex Exec — S12: Refinar "Para quem e" section

## Context

Sound Sanctuary is a Next.js 16 site for sound healing (banho de som).
The hero section was just pivoted to a minimal Claude Code status-line
aesthetic (commit `c982b23`). The next section in the page flow is
"Para quem e" — the user identification/recognition section.

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

## Task

Refine the "Para quem e" section (section 2 on the homepage). The user
(Raphael) will provide new text content in the i18n messages before this
runs. This prompt covers the code/CSS refinement.

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
   - The "voce ->" annotation on the photo may be redundant now that
     the hero already has "VOCE" + arrow. Consider removing it or
     making it more subtle. Ask Raphael if unclear.
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

## Files

| File | Action |
|------|--------|
| `messages/pt-BR.json` | Modify `home.forWhom` |
| `messages/en.json` | Modify `home.forWhom` |
| `src/app/[locale]/page.tsx` | Modify section 2 (lines 157-202) |
| `src/app/globals.css` | Modify if layout changes needed |

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

- Wait for Raphael to provide the new text content before updating i18n
- If he does not provide new text, keep the current content and focus
  only on code/CSS/layout refinement
- The "voce ->" annotation on the photo is likely redundant now — the
  hero already has "VOCE" + arrow. Suggest removing or simplifying.
- Run lint + build before committing
- Use the verification-before-completion skill
