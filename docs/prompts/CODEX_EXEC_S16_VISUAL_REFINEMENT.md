# CODEX EXEC S16 — Visual Refinement (Mobile-First)

## Context

The home page structure (S15) is correct but the visual execution has several issues visible in browser testing:

1. **Typography too large** — section titles are oversized, especially on mobile
2. **Cards too heavy** — thick glass borders, too much padding, gold dot decoration makes them feel clunky
3. **Benefits section too heavy** — each benefit in its own glass card is excessive
4. **Photo split has 2 photos** — should be just 1 photo, full-width
5. **Taster section title is massive** — overflows on mobile
6. **Overall: site is mobile-first** — everything must look good on small screens first, then scale up

## Files to edit

| File | Action |
|------|--------|
| `src/app/globals.css` | Reduce typography sizes, lighten card styles |
| `src/app/[locale]/page.tsx` | Simplify benefits to list, photo split to 1 photo, tighten spacing |

## 1. Typography — globals.css

### Reduce journey-title sizes

Current:
```css
.journey-title {
  font-size: clamp(1.8rem, 4.2vw, 3.3rem);
}
```

Change to:
```css
.journey-title {
  font-size: clamp(1.4rem, 3vw, 2.2rem);
}
```

### Mobile breakpoints

At `max-width: 768px`:
```css
.journey-title {
  font-size: clamp(1.2rem, 4vw, 1.6rem);
}
```

At `max-width: 480px`:
```css
.journey-title {
  font-size: 1.15rem;
}
```

### Reduce journey-sub size

Add if not present:
```css
.journey-sub {
  font-size: clamp(0.9rem, 1.8vw, 1.05rem);
}
```

## 2. Cards — globals.css

### Lighten journey-card

Current:
```css
.journey-card {
  position: relative;
  overflow: hidden;
  padding: 1.4rem;
}
```

Change to:
```css
.journey-card {
  position: relative;
  overflow: hidden;
  padding: 1rem 1.2rem;
}
```

### Remove the gold dot decoration from offer and benefit cards

The `::after` pseudo-element adds a pulsing gold dot on every card. It's too much visual noise for a clean layout. Hide it on home page cards by adding:

```css
.journey-card--clean::after {
  display: none;
}
```

Then add `journey-card--clean` class to the offer cards and benefit items in page.tsx.

## 3. Benefits section — page.tsx

Replace the current grid of 6 glass cards with a **simple 2-column list without cards**:

Current:
```tsx
<ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
  {(["item1", ...]).map((key) => (
    <li key={key} className="ds-glass journey-card text-center">
      <p className="text-secondary">{t(`benefits.${key}`)}</p>
    </li>
  ))}
</ul>
```

Change to:
```tsx
<ul className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-3 md:grid-cols-2 text-left">
  {(["item1", "item2", "item3", "item4", "item5", "item6"] as const).map((key) => (
    <li key={key} className="flex items-start gap-2 text-secondary">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" aria-hidden="true" />
      {t(`benefits.${key}`)}
    </li>
  ))}
</ul>
```

This gives a clean bullet list without heavy glass boxes.

## 4. Photo Split → Single Photo — page.tsx

Replace the 2-photo grid with a single full-width photo:

Current:
```tsx
<section className="journey-container journey-section" aria-label={t("photoSplit.aria")}>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      <Image src="/media/sections/2641.jpg" ... />
    </div>
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      <Image src="/media/sections/2633.jpg" ... />
    </div>
  </div>
</section>
```

Change to:
```tsx
<section className="journey-container journey-section" aria-label={t("photoSplit.aria")}>
  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
    <Image
      src="/media/sections/2641.jpg"
      alt={t("photoSplit.alt1")}
      fill
      sizes="100vw"
      className="object-cover"
    />
  </div>
</section>
```

Single photo, 16:9 aspect ratio, full container width.

## 5. Offer cards — page.tsx

Make the offer cards lighter. Replace `ds-size-2xl` with `ds-size-xl` for card titles:

```tsx
<h3 className="ds-font-display ds-size-xl ds-weight-light">
```

And add `journey-card--clean` to suppress the gold dot:

```tsx
<article key={key} className="ds-glass journey-card journey-card--clean flex h-full w-full flex-col items-center text-center">
```

## 6. Taster section spacing

In `TasterSection.tsx`, the title uses `journey-title` which will be smaller after the CSS fix. No code changes needed there — the CSS reduction handles it.

## 7. Overall spacing reduction

In globals.css, reduce section margins slightly for mobile:

At `max-width: 768px`:
```css
.journey-section {
  margin: 2rem auto;
}
```

At `max-width: 480px`:
```css
.journey-section {
  margin: 1.5rem auto;
}
```

## Summary of changes

| What | Before | After |
|------|--------|-------|
| Title max size | 3.3rem | 2.2rem |
| Title mobile | 1.3rem | 1.15rem |
| Card padding | 1.4rem | 1rem 1.2rem |
| Benefits | 6 glass cards | Simple bullet list |
| Photo split | 2 photos | 1 photo 16:9 |
| Offer card titles | ds-size-2xl | ds-size-xl |
| Gold dot on cards | Always visible | Hidden on home cards |
| Section margin mobile | 3rem | 2rem |
| Section margin 480px | 2.5rem | 1.5rem |

## Constraints

- Do NOT change the section order (S15 structure)
- Do NOT remove any i18n keys
- Do NOT add npm dependencies
- Do NOT create new component files
- Mobile-first: test at 375px width first, then scale up
- Run `npm run lint` and `npm run build` to verify
