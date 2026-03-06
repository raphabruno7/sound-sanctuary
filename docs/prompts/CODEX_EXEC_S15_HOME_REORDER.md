# CODEX EXEC S15 — Home Page Reorganization

## Context

Reorganize the home page to follow a leaner, conversion-focused sequence inspired by aboutgong.com. Remove redundant sections, add placeholder sections for new content, and prepare the structure for future text and photos.

## New Section Order

| # | Section | Source | Action |
|---|---------|--------|--------|
| 1 | **Hero** | existing | KEEP as-is |
| 2 | **Current Offers** (3 cards) | existing | KEEP as-is |
| 3 | **Taster** (free session lead capture) | existing | KEEP as-is |
| 4 | **Photo Split** | NEW | CREATE — 2 photos side by side |
| 5 | **What is Sound Healing** | existing "whatItIs" | KEEP — simplify to single focused section |
| 6 | **Benefits** | merge from "forWhom" | REWORK — rename to Benefits, keep symptom list, drop photo |
| 7 | **Testimonials** | existing | KEEP — move up |
| 8 | **Practitioner** | existing | KEEP — move up |
| 9 | **Workplace** | NEW | CREATE — placeholder for corporate sessions |
| 10 | **Training** | NEW | CREATE — placeholder for practitioner training |
| 11 | **Social Proof** | NEW | CREATE — placeholder logo strip "As Seen In" |
| 12 | **Newsletter + Contact** | existing | KEEP as-is |

## Sections to REMOVE from home

These are either redundant with the new layout or better suited to subpages:

- **CTA Strip** (hero-cta-strip) — redundant, offers cards + taster already have CTAs
- **Why It Works** + Framework Elemental (4 cards) — too verbose for home, move content to `/sound-healing` page later
- **How It Works** (5 steps) — move to `/sound-healing` or `/sessions` page later
- **Formats** (1:1 + Group cards) — redundant with Offers section
- **Sound Healing Live** — redundant with Offers card 3
- **Portfolio Preview** — lives on its own page `/portfolio`
- **VineDivider** — remove (simpler visual flow)
- **ImpulseSeparator** — remove (simpler visual flow)

Do NOT delete the VineDivider/ImpulseSeparator functions yet — just stop rendering them. Do NOT delete any i18n keys — just stop referencing the removed sections in page.tsx.

## File changes

| File | Action |
|------|--------|
| `src/app/[locale]/page.tsx` | REWRITE section order |
| `messages/en.json` | ADD new keys for sections 4, 9, 10, 11 |
| `messages/pt-BR.json` | ADD same keys in Portuguese |

## Implementation

### page.tsx — New structure

```tsx
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/i18n/metadata";
import { NewsletterForm } from "@/components/NewsletterForm";
import { TestimonialsPreview } from "@/components/TestimonialsPreview";
import { PractitionerSection } from "@/components/PractitionerSection";
import { HeroStatusLine } from "@/components/HeroStatusLine";
import { TasterSection } from "@/components/TasterSection";

// ... keep generateMetadata as-is ...

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="min-h-dvh pb-24">

      {/* ── 1. HERO ── */}
      <section className="home-hero">
        <Image
          src="/media/hero/2627.jpg"
          alt={t("hero.alt")}
          fill
          priority
          sizes="100vw"
          className="home-hero__image"
        />
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__vignette" aria-hidden="true" />
        <HeroStatusLine
          youLabel={t("hero.youLabel")}
          statusPhrases={t.raw("hero.statusPhrases")}
        />
      </section>

      {/* ── 2. CURRENT OFFERS ── */}
      <section className="journey-container journey-section text-center">
        <h2 className="journey-title">{t("offers.title")}</h2>
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { key: "card1", href: "/contact" },
            { key: "card2", href: "/sessions" },
            { key: "card3", href: "/sessions" },
          ].map(({ key, href }) => (
            <article
              key={key}
              className="ds-glass journey-card flex h-full w-full flex-col items-center text-center"
            >
              <h3 className="ds-font-display ds-size-2xl ds-weight-light">
                {t(`offers.${key}_title`)}
              </h3>
              <p className="mt-2 text-sm text-secondary">
                {t(`offers.${key}_sub`)}
              </p>
              <div className="mt-auto flex w-full justify-center pt-6">
                <Link className="btn btn-primary" href={href}>
                  {t(`offers.${key}_cta`)}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 3. TASTER SESSION ── */}
      <TasterSection />

      {/* ── 4. PHOTO SPLIT ── */}
      <section className="journey-container journey-section" aria-label={t("photoSplit.aria")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/media/sections/2641.jpg"
              alt={t("photoSplit.alt1")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/media/sections/2633.jpg"
              alt={t("photoSplit.alt2")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 5. WHAT IS SOUND HEALING ── */}
      <section className="journey-container journey-section">
        <h2 className="journey-title">{t("whatItIs.title")}</h2>
        <p className="journey-sub">{t("whatItIs.sub")}</p>
        <div className="journey-grid-2 mt-6 text-secondary leading-relaxed">
          <p>{t("whatItIs.p1")}</p>
          <p>{t("whatItIs.p2")}</p>
        </div>
      </section>

      {/* ── 6. BENEFITS ── */}
      <section className="journey-container journey-section text-center">
        <h2 className="journey-title">{t("benefits.title")}</h2>
        <p className="journey-sub max-w-2xl mx-auto">{t("benefits.sub")}</p>
        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 md:grid-cols-2 gap-4">
          {(["item1", "item2", "item3", "item4", "item5", "item6"] as const).map((key) => (
            <li key={key} className="ds-glass journey-card text-center">
              <p className="text-secondary">{t(`benefits.${key}`)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 7. TESTIMONIALS ── */}
      <TestimonialsPreview />

      {/* ── 8. PRACTITIONER ── */}
      <PractitionerSection
        label={t("practitioner.label")}
        title={t("practitioner.title")}
        identity={t("practitioner.identity")}
        p1={t("practitioner.p1")}
        p2={t("practitioner.p2")}
        cta={t("practitioner.cta")}
      />

      {/* ── 9. WORKPLACE ── */}
      <section className="journey-container journey-section text-center">
        <h2 className="journey-title">{t("workplace.title")}</h2>
        <p className="journey-sub max-w-2xl mx-auto">{t("workplace.sub")}</p>
        <p className="mt-6 text-secondary max-w-2xl mx-auto">{t("workplace.body")}</p>
        <Link className="btn btn-primary mt-8" href="/contact">
          {t("workplace.cta")}
        </Link>
      </section>

      {/* ── 10. TRAINING ── */}
      <section className="journey-container journey-section text-center">
        <h2 className="journey-title">{t("training.title")}</h2>
        <p className="journey-sub max-w-2xl mx-auto">{t("training.sub")}</p>
        <p className="mt-6 text-secondary max-w-2xl mx-auto">{t("training.body")}</p>
        <Link className="btn btn-secondary mt-8" href="/contact">
          {t("training.cta")}
        </Link>
      </section>

      {/* ── 11. SOCIAL PROOF ── */}
      <section className="journey-container journey-section text-center">
        <p className="ds-text-overline text-secondary">{t("socialProof.label")}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-50">
          {/* Placeholder — replace with real logos later */}
          <span className="text-secondary ds-size-lg">Logo 1</span>
          <span className="text-secondary ds-size-lg">Logo 2</span>
          <span className="text-secondary ds-size-lg">Logo 3</span>
          <span className="text-secondary ds-size-lg">Logo 4</span>
        </div>
      </section>

      {/* ── 12. NEWSLETTER + CONTACT ── */}
      <section className="journey-container journey-section" id="contact">
        <div className="journey-label">{t("contact.label")}</div>
        <h2 className="journey-title">{t("contact.title")}</h2>
        <p className="journey-sub">{t("contact.sub")}</p>
        <div className="mt-6">
          <Link className="btn btn-primary" href="/contact">
            {t("contact.cta_primary")}
          </Link>
          <Link className="btn btn-secondary ml-3" href="/contact">
            {t("contact.cta_secondary")}
          </Link>
        </div>
        <NewsletterForm source="home" />
      </section>

    </main>
  );
}
```

### Removed imports (no longer rendered)

Remove these imports from page.tsx since they are no longer used:
- `PortfolioPreview`

Keep VineDivider and ImpulseSeparator functions in the file but do NOT render them (they may be reused later). Or remove them entirely if you prefer — they can be recovered from git.

### i18n keys to ADD

#### messages/en.json — add under `"home"`:

```json
"photoSplit": {
  "aria": "Session photos",
  "alt1": "Sound healing instruments in a session setting",
  "alt2": "Person receiving a sound healing session"
},
"benefits": {
  "title": "Benefits",
  "sub": "What a sound healing session can offer you.",
  "item1": "Deep relaxation and stress relief",
  "item2": "Better sleep quality",
  "item3": "Nervous system regulation",
  "item4": "Reduced anxiety and mental chatter",
  "item5": "Emotional release and clarity",
  "item6": "Restored sense of inner balance"
},
"workplace": {
  "title": "Workplace Sessions",
  "sub": "Sound healing for teams and organisations.",
  "body": "Bring sound healing into your workplace. Tailored group sessions designed to reduce stress, improve focus, and support team wellbeing.",
  "cta": "Enquire for Your Team"
},
"training": {
  "title": "Practitioner Training",
  "sub": "Learn the art of sound healing.",
  "body": "Interested in becoming a sound healing practitioner? Training programmes and mentorship available for those called to this path.",
  "cta": "Learn About Training"
},
"socialProof": {
  "label": "As Featured In"
}
```

#### messages/pt-BR.json — add under `"home"`:

```json
"photoSplit": {
  "aria": "Fotos de sessao",
  "alt1": "Instrumentos de sound healing em ambiente de sessao",
  "alt2": "Pessoa recebendo uma sessao de sound healing"
},
"benefits": {
  "title": "Beneficios",
  "sub": "O que uma sessao de sound healing pode oferecer.",
  "item1": "Relaxamento profundo e alivio do estresse",
  "item2": "Melhora na qualidade do sono",
  "item3": "Regulacao do sistema nervoso",
  "item4": "Reducao da ansiedade e ruido mental",
  "item5": "Liberacao emocional e clareza",
  "item6": "Restauracao do equilibrio interior"
},
"workplace": {
  "title": "Sessoes Corporativas",
  "sub": "Sound healing para equipes e organizacoes.",
  "body": "Leve o sound healing para o seu ambiente de trabalho. Sessoes em grupo personalizadas para reduzir o estresse, melhorar o foco e apoiar o bem-estar da equipe.",
  "cta": "Consulte para Sua Equipe"
},
"training": {
  "title": "Formacao de Praticantes",
  "sub": "Aprenda a arte do sound healing.",
  "body": "Interesse em se tornar um praticante de sound healing? Programas de formacao e mentoria disponiveis para quem sente o chamado deste caminho.",
  "cta": "Saiba Sobre a Formacao"
},
"socialProof": {
  "label": "Como Visto Em"
}
```

**Note on accents:** Portuguese text above is written without special characters for safety. The agent MUST add proper accents: Sessoes→Sessões, Beneficios→Benefícios, sessao→sessão, alivio→alívio, Regulacao→Regulação, Reducao→Redução, Liberacao→Liberação, Restauracao→Restauração, equilibrio→equilíbrio, organizacoes→organizações, Formacao→Formação, disponiveis→disponíveis.

## Photos note

Only 3 photos exist currently:
- `/media/hero/2627.jpg`
- `/media/sections/2641.jpg`
- `/media/sections/2633.jpg`

The Photo Split section uses 2641 and 2633. When the owner adds more photos, paths can be swapped. No new photos are required for this task.

## Constraints

- Do NOT delete any i18n keys from en.json or pt-BR.json — only add new ones
- Do NOT delete VineDivider/ImpulseSeparator functions — just stop rendering them (or remove entirely, up to agent)
- Do NOT create new component files for sections 4, 9, 10, 11 — inline in page.tsx
- Do NOT add npm dependencies
- Run `npm run lint` and `npm run build` to verify
