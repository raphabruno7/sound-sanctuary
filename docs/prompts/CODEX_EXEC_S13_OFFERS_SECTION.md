# CODEX EXEC S13 — "Current Offers" Section

## Context

Add a **"Current Offers"** section to the home page, inspired by the card grid layout from aboutgong.com. The section displays 3 offer cards side-by-side, each with a background photo, overlay, title, subtitle, and CTA button.

**Placement:** immediately after the HERO `</section>` (line ~143 in `src/app/[locale]/page.tsx`) and **before** the `hero-cta-strip` div (line ~146).

## Reference (aboutgong.com)

- Centered section title in uppercase
- 3 cards in a horizontal grid (stacked on mobile)
- Each card: background photo + dark gradient overlay + title + subtitle + CTA button
- Gold-toned CTA buttons
- Dark background context

## Files to edit

| File | Action |
|------|--------|
| `src/app/[locale]/page.tsx` | Insert new section between hero and CTA strip |
| `messages/en.json` | Add `home.offers.*` keys |
| `messages/pt-BR.json` | Add `home.offers.*` keys |

## Implementation

### 1. i18n keys

Add under `"home"` object in both locale files:

**messages/en.json:**
```json
"offers": {
  "title": "Current Offers",
  "card1_title": "1:1 Sessions",
  "card1_sub": "Personalised Sound Healing",
  "card1_cta": "Learn More",
  "card2_title": "Group Sessions",
  "card2_sub": "Shared Sonic Journeys",
  "card2_cta": "Learn More",
  "card3_title": "Sound Healing Live",
  "card3_sub": "Immersive Performances",
  "card3_cta": "Learn More"
}
```

**messages/pt-BR.json:**
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

### 2. JSX section in page.tsx

Insert between the hero `</section>` closing tag and the `hero-cta-strip` div:

```tsx
{/* -- CURRENT OFFERS -- */}
<section className="journey-container journey-section">
  <h2 className="journey-title">{t("offers.title")}</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    {[
      { key: "card1", img: "/media/hero/2627.jpg", href: "/contact" },
      { key: "card2", img: "/media/sections/2641.jpg", href: "/sessions" },
      { key: "card3", img: "/media/sections/2633.jpg", href: "/sessions" },
    ].map(({ key, img, href }) => (
      <article
        key={key}
        className="relative overflow-hidden rounded-2xl"
        style={{ minHeight: "320px" }}
      >
        <Image
          src={img}
          alt={t(`offers.${key}_title`)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        {/* dark gradient overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)",
          }}
          aria-hidden="true"
        />
        {/* content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6">
          <h3 className="ds-font-display ds-size-2xl ds-weight-light uppercase tracking-wider text-white">
            {t(`offers.${key}_title`)}
          </h3>
          <p className="mt-1 text-sm text-white/80">
            {t(`offers.${key}_sub`)}
          </p>
          <Link className="btn btn-primary mt-6" href={href}>
            {t(`offers.${key}_cta`)}
          </Link>
        </div>
      </article>
    ))}
  </div>
</section>
```

### 3. Styling rules

- Follow the existing design system — do **not** add new CSS files or dependencies
- Gold button (`btn-primary`) already maps to `--sh-organic-gold-primary`
- Cards use the same `rounded-2xl` and `overflow-hidden` pattern already used in the site
- Responsive: single column on mobile, 3 columns on `md:` breakpoint
- The gradient overlay keeps text readable over any photo
- `minHeight: 320px` ensures cards have visual weight (adjust if needed)

### 4. Available photos

| Path | Content |
|------|---------|
| `/media/hero/2627.jpg` | Sound healing session outdoors |
| `/media/sections/2641.jpg` | Detail of instruments |
| `/media/sections/2633.jpg` | Session environment |

Use these 3 — one per card. If the owner adds new photos later, swap paths accordingly.

## Constraints

- Do NOT create new component files — inline in page.tsx
- Do NOT modify any existing sections
- Do NOT add npm dependencies
- Do NOT change the design system tokens or global CSS
- Keep the dark, organic, nature-inspired aesthetic
