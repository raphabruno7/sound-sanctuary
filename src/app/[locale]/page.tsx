import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { TestimonialsPreview } from "@/components/TestimonialsPreview";
import { PractitionerSection } from "@/components/PractitionerSection";

// Reusable vine divider SVG — copy from existing page.tsx
function VineDivider() {
  return (
    <div aria-hidden="true" className="journey-container journey-divider">
      <svg
        className="vine-divider"
        viewBox="0 0 400 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Decorative vine divider"
      >
        <defs>
          <style>{`.vine-path:nth-child(2) { animation-delay: 0.4s; }`}</style>
        </defs>
        <path
          className="vine-path"
          d="M10 58C38 22 72 20 98 46C124 72 152 74 178 48C204 22 236 22 262 48C288 74 322 76 390 44"
          stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="620"
          strokeDashoffset="620"
        />
        <path
          className="vine-path"
          d="M10 74C44 38 76 36 102 60C126 84 150 84 174 62C198 40 228 40 252 62C276 84 308 84 390 56"
          stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          strokeDasharray="620"
          strokeDashoffset="620"
        />
        <path d="M72 38C78 28 90 28 96 38C90 48 78 48 72 38Z" fill="var(--sh-organic-liquid-glass-light, #8BC4A0)" opacity="0.2" />
        <path d="M146 64C152 54 164 54 170 64C164 74 152 74 146 64Z" fill="var(--sh-organic-liquid-glass-light, #8BC4A0)" opacity="0.2" />
        <path d="M218 40C224 30 236 30 242 40C236 50 224 50 218 40Z" fill="var(--sh-organic-liquid-glass-light, #8BC4A0)" opacity="0.2" />
        <path d="M292 66C298 56 310 56 316 66C310 76 298 76 292 66Z" fill="var(--sh-organic-liquid-glass-light, #8BC4A0)" opacity="0.2" />
      </svg>
    </div>
  );
}

// Silent visual separator — impulso section stripped of copy
function ImpulseSeparator() {
  return (
    <div aria-hidden="true" className="impulse-section">
      <div className="impulse-plate ds-glass">
        <div className="impulse-art">
          <svg className="impulse-svg" viewBox="0 0 800 420" preserveAspectRatio="none">
            <path
              className="path"
              d="M60,60 C220,50 260,140 340,160 C420,180 480,110 560,140 C640,170 640,270 740,310"
            />
            <path
              className="flash"
              d="M60,60 C220,50 260,140 340,160 C420,180 480,110 560,140 C640,170 640,270 740,310"
            />
            <circle className="node" cx="60" cy="60" r="3" />
            <circle className="node" cx="340" cy="160" r="3" />
            <circle className="node" cx="560" cy="140" r="3" />
            <circle className="node" cx="740" cy="310" r="3" />
          </svg>
        </div>
        <div className="strike-wave-art">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <defs>
              <style>{`
                .ring { fill: none; stroke-width: 2; transform-origin: 150px 150px; animation: strikeWave 6000ms cubic-bezier(0.33, 0, 0.67, 1) infinite; }
                .r1 { stroke: var(--sh-organic-gold-primary, #C4A35A); animation-delay: 0ms; }
                .r2 { stroke: var(--sh-organic-gold-light, #E0C97F); animation-delay: 800ms; }
                .r3 { stroke: var(--sh-organic-liquid-glass-light, #8BC4A0); animation-delay: 1600ms; }
                .r4 { stroke: var(--sh-organic-liquid-glass-ghost, #C8E6D0); animation-delay: 2400ms; }
                .r5 { stroke: var(--sh-organic-ocean-primary, #5A8A8A); animation-delay: 3200ms; }
                .core { fill: var(--sh-organic-gold-primary, #C4A35A); animation: strikeFlash 6000ms cubic-bezier(0.16, 1, 0.3, 1) infinite; }
                @keyframes strikeWave { 0% { opacity: 0; transform: scale(0.2); } 15% { opacity: 0.9; } 100% { opacity: 0; transform: scale(1.7); } }
                @keyframes strikeFlash { 0%, 70%, 100% { opacity: 0.25; r: 5px; } 74% { opacity: 1; r: 12px; } }
              `}</style>
            </defs>
            <rect width="300" height="300" fill="transparent" />
            <circle className="ring r5" cx="150" cy="150" r="80" />
            <circle className="ring r4" cx="150" cy="150" r="65" />
            <circle className="ring r3" cx="150" cy="150" r="50" />
            <circle className="ring r2" cx="150" cy="150" r="35" />
            <circle className="ring r1" cx="150" cy="150" r="20" />
            <circle className="core" cx="150" cy="150" r="6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="min-h-dvh pb-24">
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="home-hero">
        <Image
          src="/media/hero/2627.jpg"
          alt="Sound healing session in the forest"
          fill
          priority
          sizes="100vw"
          className="home-hero__image"
        />
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__vignette" aria-hidden="true" />
        <div className="home-hero__content journey-container">
          <div className="home-hero__copy">
            <h1 className="ds-font-display ds-weight-light ds-size-6xl ds-leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-3 ds-font-display ds-italic ds-weight-light ds-size-xl journey-breathe sh-breath-pulse text-secondary">
              {t("hero.poetic")}
            </p>
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

      {/* ── 2. FOR WHOM — "you →" photo annotation ──────────────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("forWhom.label")}</div>
        <h2 className="journey-title journey-title-regular">{t("forWhom.title")}</h2>
        <div className="journey-grid-2 mt-6">
          {/* Photo with annotation overlay */}
          <div className="journey-hero-media ds-glass relative overflow-hidden rounded-2xl">
            <Image
              src="/media/hero/2627.jpg"
              alt="Person lying down receiving sound healing in the forest"
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="journey-photo-vignette" aria-hidden="true" />
            {/* "you →" annotation pointing to person lying down */}
            <span
              className="absolute bottom-6 right-6 ds-font-display ds-italic ds-size-2xl text-white/90 pointer-events-none select-none"
              aria-hidden="true"
            >
              {t("forWhom.annotation")} →
            </span>
          </div>
          {/* Symptom list + CTA */}
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

      <VineDivider />

      {/* ── 3. WHAT IT IS ────────────────────────────────────────── */}
      <section className="journey-container journey-section journey-section-lg">
        <div className="journey-label">{t("whatItIs.label")}</div>
        <h2 className="journey-title">{t("whatItIs.title")}</h2>
        <p className="journey-sub">{t("whatItIs.sub")}</p>
        <div className="journey-grid-2 mt-6 text-secondary leading-relaxed">
          <p>{t("whatItIs.p1")}</p>
          <p>{t("whatItIs.p2")}</p>
        </div>
      </section>

      {/* ── 4. WHY IT WORKS — Princípio Fundador + Framework ────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("whyItWorks.label")}</div>
        <h2 className="journey-title journey-title-regular">{t("whyItWorks.title")}</h2>
        <div className="ds-glass journey-card mt-6">
          <p className="text-secondary">{t("whyItWorks.p1")}</p>
          <p className="text-secondary mt-2">{t("whyItWorks.p2")}</p>
          <p className="text-secondary mt-2">{t("whyItWorks.p3")}</p>
          <p className="mt-3 ds-text-overline journey-breathe">{t("whyItWorks.overline")}</p>
        </div>

        {/* Framework Elemental — integrated as methodology */}
        <div className="mt-10">
          <p className="journey-label">{t("whyItWorks.framework_label")}</p>
          <div className="journey-grid-4 mt-4">
            <article className="ds-glass journey-card">
              <h3 className="ds-font-display ds-size-xl ds-weight-light">{t("whyItWorks.sun_name")}</h3>
              <p className="mt-2 text-sm text-secondary">{t("whyItWorks.sun_sub")}</p>
              <p className="mt-3 text-secondary">{t("whyItWorks.sun_body")}</p>
            </article>
            <article className="ds-glass journey-card">
              <h3 className="ds-font-display ds-size-xl ds-weight-light">{t("whyItWorks.moon_name")}</h3>
              <p className="mt-2 text-sm text-secondary">{t("whyItWorks.moon_sub")}</p>
              <p className="mt-3 text-secondary">{t("whyItWorks.moon_body")}</p>
            </article>
            <article className="ds-glass journey-card relative overflow-hidden">
              <svg
                className="venation-art"
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
              <defs>
                <style>{`
                  .segment-fill { fill: var(--sh-organic-liquid-glass-ghost, #C8E6D0); opacity: 0.08; }
                  .membrane     { stroke: var(--sh-organic-liquid-glass-forest, #2D5A3E); stroke-width: 1.6; fill: none; }
                  .vein         { stroke: var(--sh-organic-liquid-glass-leaf, #5A9E6F); stroke-width: 0.8; fill: none; opacity: 0.5; }
                  .core         { fill: var(--sh-organic-gold-primary, #C4A35A); opacity: 0.7; }
                `}</style>
              </defs>
              <path className="segment-fill" d="M150,150 L270,150 A120,120 0 0,1 234.85,234.85 Z" />
              <path className="membrane" d="M150,150 L270,150 A120,120 0 0,1 234.85,234.85 Z" />
              <line className="vein" x1="150" y1="150" x2="260.3" y2="169.45" />
              <line className="vein" x1="150" y1="150" x2="253.47" y2="192.86" />
              <line className="vein" x1="150" y1="150" x2="241.75" y2="214.24" />
              <path className="segment-fill" d="M150,150 L234.85,234.85 A120,120 0 0,1 150,270 Z" />
              <path className="membrane" d="M150,150 L234.85,234.85 A120,120 0 0,1 150,270 Z" />
              <line className="vein" x1="150" y1="150" x2="214.24" y2="241.75" />
              <line className="vein" x1="150" y1="150" x2="192.86" y2="253.47" />
              <line className="vein" x1="150" y1="150" x2="169.45" y2="260.3" />
              <path className="segment-fill" d="M150,150 L150,270 A120,120 0 0,1 65.15,234.85 Z" />
              <path className="membrane" d="M150,150 L150,270 A120,120 0 0,1 65.15,234.85 Z" />
              <line className="vein" x1="150" y1="150" x2="130.55" y2="260.3" />
              <line className="vein" x1="150" y1="150" x2="107.14" y2="253.47" />
              <line className="vein" x1="150" y1="150" x2="85.76" y2="241.75" />
              <path className="segment-fill" d="M150,150 L65.15,234.85 A120,120 0 0,1 30,150 Z" />
              <path className="membrane" d="M150,150 L65.15,234.85 A120,120 0 0,1 30,150 Z" />
              <line className="vein" x1="150" y1="150" x2="58.25" y2="214.24" />
              <line className="vein" x1="150" y1="150" x2="46.53" y2="192.86" />
              <line className="vein" x1="150" y1="150" x2="39.7" y2="169.45" />
              <path className="segment-fill" d="M150,150 L30,150 A120,120 0 0,1 65.15,65.15 Z" />
              <path className="membrane" d="M150,150 L30,150 A120,120 0 0,1 65.15,65.15 Z" />
              <line className="vein" x1="150" y1="150" x2="39.7" y2="130.55" />
              <line className="vein" x1="150" y1="150" x2="46.53" y2="107.14" />
              <line className="vein" x1="150" y1="150" x2="58.25" y2="85.76" />
              <path className="segment-fill" d="M150,150 L65.15,65.15 A120,120 0 0,1 150,30 Z" />
              <path className="membrane" d="M150,150 L65.15,65.15 A120,120 0 0,1 150,30 Z" />
              <line className="vein" x1="150" y1="150" x2="85.76" y2="58.25" />
              <line className="vein" x1="150" y1="150" x2="107.14" y2="46.53" />
              <line className="vein" x1="150" y1="150" x2="130.55" y2="39.7" />
              <path className="segment-fill" d="M150,150 L150,30 A120,120 0 0,1 234.85,65.15 Z" />
              <path className="membrane" d="M150,150 L150,30 A120,120 0 0,1 234.85,65.15 Z" />
              <line className="vein" x1="150" y1="150" x2="169.45" y2="39.7" />
              <line className="vein" x1="150" y1="150" x2="192.86" y2="46.53" />
              <line className="vein" x1="150" y1="150" x2="214.24" y2="58.25" />
              <path className="segment-fill" d="M150,150 L234.85,65.15 A120,120 0 0,1 270,150 Z" />
              <path className="membrane" d="M150,150 L234.85,65.15 A120,120 0 0,1 270,150 Z" />
              <line className="vein" x1="150" y1="150" x2="241.75" y2="85.76" />
              <line className="vein" x1="150" y1="150" x2="253.47" y2="107.14" />
              <line className="vein" x1="150" y1="150" x2="260.3" y2="130.55" />
              <circle className="core" cx="150" cy="150" r="8" />
              </svg>
              <div className="relative z-10">
                <h3 className="ds-font-display ds-size-xl ds-weight-light">{t("whyItWorks.ocean_name")}</h3>
                <p className="mt-2 text-sm text-secondary">{t("whyItWorks.ocean_sub")}</p>
                <p className="mt-3 text-secondary">{t("whyItWorks.ocean_body")}</p>
              </div>
            </article>
            <article className="ds-glass journey-card">
              <h3 className="ds-font-display ds-size-xl ds-weight-light">{t("whyItWorks.forest_name")}</h3>
              <p className="mt-2 text-sm text-secondary">{t("whyItWorks.forest_sub")}</p>
              <p className="mt-3 text-secondary">{t("whyItWorks.forest_body")}</p>
            </article>
          </div>
        </div>
      </section>

      <VineDivider />

      {/* ── 5. HOW IT WORKS — Five steps ─────────────────────────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("howItWorks.label")}</div>
        <h2 className="journey-title">{t("howItWorks.title")}</h2>
        <div className="journey-grid-2 mt-6">
          <div className="ds-glass journey-card">
            <ol className="list-decimal pl-6 space-y-2 text-secondary">
              <li>{t("howItWorks.step1")}</li>
              <li>{t("howItWorks.step2")}</li>
              <li>{t("howItWorks.step3")}</li>
              <li>{t("howItWorks.step4")}</li>
              <li>{t("howItWorks.step5")}</li>
            </ol>
          </div>
          <div className="journey-hero-media ds-glass">
            <Image
              src="/media/sections/2641.jpg"
              alt="Detail of instruments used in a session"
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="journey-photo-vignette" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── 6. QUEM SOU EU — Practitioner ────────────────────────── */}
      <PractitionerSection
        label={t("practitioner.label")}
        title={t("practitioner.title")}
        identity={t("practitioner.identity")}
        p1={t("practitioner.p1")}
        p2={t("practitioner.p2")}
        cta={t("practitioner.cta")}
      />

      <ImpulseSeparator />

      {/* ── 7. TESTIMONIALS — before the offer ───────────────────── */}
      <TestimonialsPreview />

      {/* ── 8. FORMATS ───────────────────────────────────────────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("formats.label")}</div>
        <h2 className="journey-title journey-title-regular">{t("formats.title")}</h2>
        <div className="journey-grid-2 mt-6">
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">{t("formats.oneOnOne_title")}</h3>
            <p className="mt-2 text-sm text-secondary">
              {t("formats.oneOnOne_for")} · {t("formats.oneOnOne_duration")}
            </p>
            <p className="mt-3 text-secondary">{t("formats.oneOnOne_body")}</p>
            <div className="btn-row mt-5">
              <Link className="btn btn-primary" href="/contact">
                {t("formats.oneOnOne_cta_primary")}
              </Link>
              <Link className="btn btn-ghost" href="/sessions">
                {t("formats.oneOnOne_cta_secondary")}
              </Link>
            </div>
          </article>
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">{t("formats.group_title")}</h3>
            <p className="mt-2 text-sm text-secondary">
              {t("formats.group_for")} · {t("formats.group_duration")}
            </p>
            <p className="mt-3 text-secondary">{t("formats.group_body")}</p>
            <div className="btn-row mt-5">
              <Link className="btn btn-secondary" href="/sessions">
                {t("formats.group_cta_primary")}
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                {t("formats.group_cta_secondary")}
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ── 9. SOUND HEALING LIVE ─────────────────────────────────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("live.label")}</div>
        <h2 className="journey-title">{t("live.title")}</h2>
        <p className="journey-sub">{t("live.sub")}</p>
        <div className="ds-glass mt-6 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
          <p className="text-secondary max-w-2xl">{t("live.body")}</p>
          <div className="btn-row !mb-0">
            <Link className="btn btn-primary" href="/newsletter">
              {t("live.cta_primary")}
            </Link>
            <Link className="btn btn-secondary" href="/sessions">
              {t("live.cta_secondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. PORTFOLIO ─────────────────────────────────────────── */}
      <PortfolioPreview />

      {/* ── 11. CTA FINAL + NEWSLETTER ───────────────────────────── */}
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
