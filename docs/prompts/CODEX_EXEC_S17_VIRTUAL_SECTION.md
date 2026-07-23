# CODEX EXEC S17 — "Does It Work Virtually?" Section

## Context

Add a new section to the home page explaining virtual/online sound healing sessions. Inspired by aboutgong.com's "DOES IT WORK VIRTUALLY?" section: split layout with text on the left and photo on the right.

A photo has already been placed at: `/public/media/sections/virtual-session.jpg` (1600x1066px, person lying down with headphones receiving an online sound healing session).

## Goal

Replace the current **Photo Split** section (#4) with a proper **"Virtual Sessions"** section that has:
- Text content on the left (title + 2 paragraphs + CTA button)
- Photo on the right
- Responsive: stacks vertically on mobile (photo on top, text below)

## Files to edit

| File | Action |
|------|--------|
| `src/app/[locale]/page.tsx` | Replace Photo Split section with Virtual section |
| `messages/en.json` | Replace `home.photoSplit.*` with `home.virtual.*` keys |
| `messages/pt-BR.json` | Replace `home.photoSplit.*` with `home.virtual.*` keys |

## 1. i18n keys

### messages/en.json — replace `photoSplit` with `virtual` under `"home"`:

Remove `photoSplit` block. Add:

```json
"virtual": {
  "title": "Does It Work Virtually?",
  "p1": "Yes. A virtual sound healing session is a powerful way to pause and reset from home. All you need is headphones, a comfortable place to lie down, and the willingness to close your eyes and listen.",
  "p2": "The sound entrains your brainwaves into a relaxed, restorative state. It's a way to access the benefits of deep meditation without any experience required — whenever you need it.",
  "cta": "Book a Virtual Session",
  "alt": "Person lying down with headphones receiving an online sound healing session"
}
```

### messages/pt-BR.json — replace `photoSplit` with `virtual` under `"home"`:

Remove `photoSplit` block. Add:

```json
"virtual": {
  "title": "Funciona Online?",
  "p1": "Sim. Uma sessão virtual de sound healing é uma forma poderosa de pausar e resetar sem sair de casa. Tudo que você precisa é um fone de ouvido, um lugar confortável para deitar, e a disposição de fechar os olhos e ouvir.",
  "p2": "O som conduz suas ondas cerebrais para um estado relaxado e restaurador. É uma forma de acessar os benefícios da meditação profunda sem nenhuma experiência prévia — sempre que você precisar.",
  "cta": "Agendar Sessão Virtual",
  "alt": "Pessoa deitada com fones de ouvido recebendo uma sessão online de sound healing"
}
```

## 2. Replace section in page.tsx

Find this block:

```tsx
{/* ── 4. PHOTO SPLIT ── */}
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

Replace with:

```tsx
{/* ── 4. VIRTUAL SESSIONS ── */}
<section className="journey-container journey-section">
  <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
    {/* Photo — shows first on mobile */}
    <div className="relative aspect-[3/2] overflow-hidden rounded-2xl md:order-2">
      <Image
        src="/media/sections/virtual-session.jpg"
        alt={t("virtual.alt")}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
    {/* Text — shows second on mobile, first on desktop */}
    <div className="md:order-1">
      <h2 className="journey-title">{t("virtual.title")}</h2>
      <p className="mt-4 text-secondary leading-relaxed">{t("virtual.p1")}</p>
      <p className="mt-3 text-secondary leading-relaxed">{t("virtual.p2")}</p>
      <Link className="btn btn-primary mt-6" href="/contact">
        {t("virtual.cta")}
      </Link>
    </div>
  </div>
</section>
```

### Layout notes:
- On **desktop** (md+): text left, photo right (using `md:order-1` / `md:order-2`)
- On **mobile**: photo on top (natural DOM order), text below
- Photo uses `aspect-[3/2]` to match the image ratio (~1600x1066)
- `items-center` vertically centers text with photo on desktop

## 3. Clean up old references

- Remove any remaining references to `photoSplit` keys in page.tsx
- The old `photoSplit` i18n keys can be removed from both JSON files since they are replaced by `virtual`

## Constraints

- Do NOT change any other section
- Do NOT add npm dependencies
- Do NOT create new component files
- The photo `/media/sections/virtual-session.jpg` already exists — do NOT modify it
- Run `npm run lint` and `npm run build` to verify
