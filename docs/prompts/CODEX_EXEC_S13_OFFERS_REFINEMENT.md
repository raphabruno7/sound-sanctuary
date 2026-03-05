# CODEX EXEC S13.1 — Offers Section Refinement

## Context

The "Current Offers" section was added in S13 but needs refinement:
- Cards use background photos with overlay text — hard to read
- Section is left-aligned instead of centered
- Portuguese text has missing accents ("SESSOES" instead of "SESSOES")
- Layout does not match the project's design system

## Goal

Replace the photo-based cards with **Neuron Cards** (`ds-glass journey-card`) — the signature component of this design system. No photos. Clean, glass-material cards with gold accents, centered layout.

## Files to edit

| File | Action |
|------|--------|
| `src/app/[locale]/page.tsx` | Replace the offers section JSX |
| `messages/pt-BR.json` | Fix accents in `home.offers.*` keys |

## 1. Fix accents in messages/pt-BR.json

Replace the `offers` block under `"home"`:

```json
"offers": {
  "title": "Ofertas Atuais",
  "card1_title": "Sessoes Individuais",
  "card1_sub": "Sound Healing Personalizado",
  "card1_cta": "Saiba Mais",
  "card2_title": "Sessoes em Grupo",
  "card2_sub": "Jornadas Sonoras Compartilhadas",
  "card2_cta": "Saiba Mais",
  "card3_title": "Sound Healing Ao Vivo",
  "card3_sub": "Performances Imersivas",
  "card3_cta": "Saiba Mais"
}
```

Change to:

```json
"offers": {
  "title": "Ofertas Atuais",
  "card1_title": "Sessões Individuais",
  "card1_sub": "Sound Healing Personalizado",
  "card1_cta": "Saiba Mais",
  "card2_title": "Sessões em Grupo",
  "card2_sub": "Jornadas Sonoras Compartilhadas",
  "card2_cta": "Saiba Mais",
  "card3_title": "Sound Healing Ao Vivo",
  "card3_sub": "Performances Imersivas",
  "card3_cta": "Saiba Mais"
}
```

Only two changes: `Sessoes` → `Sessões` in card1_title and card2_title.

## 2. Replace offers section JSX in page.tsx

Find the `{/* -- CURRENT OFFERS -- */}` section and replace it entirely with:

```tsx
{/* -- CURRENT OFFERS -- */}
<section className="journey-container journey-section text-center">
  <h2 className="journey-title">{t("offers.title")}</h2>
  <div className="journey-grid-3 mt-8">
    {[
      { key: "card1", href: "/contact" },
      { key: "card2", href: "/sessions" },
      { key: "card3", href: "/sessions" },
    ].map(({ key, href }) => (
      <article key={key} className="ds-glass journey-card flex flex-col items-center text-center">
        <h3 className="ds-font-display ds-size-2xl ds-weight-light">
          {t(`offers.${key}_title`)}
        </h3>
        <p className="mt-2 text-sm text-secondary">
          {t(`offers.${key}_sub`)}
        </p>
        <div className="mt-auto pt-6">
          <Link className="btn btn-primary" href={href}>
            {t(`offers.${key}_cta`)}
          </Link>
        </div>
      </article>
    ))}
  </div>
</section>
```

### Key design decisions

- **`ds-glass journey-card`** — uses the Neuron Card glass material (blur + noise + gold border), the signature element of this design system
- **`journey-grid-3`** — if this class does not exist, use `grid grid-cols-1 md:grid-cols-3 gap-6` instead
- **`text-center` + `items-center`** — centers all content (title, subtitle, button) within each card and the section as a whole
- **`flex flex-col` + `mt-auto`** — pushes the CTA button to the bottom so all cards align even if title text wraps differently
- **No `<Image>` tags** — remove all photo imports from the offers section. No background images, no overlays
- **No `minHeight` inline style** — let the glass card content determine height naturally
- **Gold button** — `btn btn-primary` already maps to the gold tone

### Verify `journey-grid-3` exists

Check if `journey-grid-3` is defined in the project CSS. Search for it:

```bash
grep -r "journey-grid-3" src/ design-system/
```

If it does NOT exist, use this Tailwind fallback instead:

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
```

## 3. Clean up

- Remove the `style={{ minHeight: "320px" }}` from any card element
- Remove any `<Image>` imports or references that were only used by the offers section (do not remove Image imports used by other sections)
- Remove any gradient overlay divs that were part of the old offers cards

## Constraints

- Do NOT modify any other section in page.tsx
- Do NOT add new CSS files or classes — use existing design system classes
- Do NOT add npm dependencies
- Do NOT change design system tokens
- Run `npm run lint` and `npm run build` to verify
