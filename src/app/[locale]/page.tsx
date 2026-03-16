import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/i18n/metadata";
import { TestimonialsPreview } from "@/components/TestimonialsPreview";
import { HeroStatusLine } from "@/components/HeroStatusLine";
import { TasterSection } from "@/components/TasterSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildPageMetadata({
    locale,
    pathname: "/",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

// Reusable vine divider SVG — kept for potential reuse
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
        <path
          d="M72 38C78 28 90 28 96 38C90 48 78 48 72 38Z"
          fill="var(--sh-organic-liquid-glass-light, #8BC4A0)"
          opacity="0.2"
        />
        <path
          d="M146 64C152 54 164 54 170 64C164 74 152 74 146 64Z"
          fill="var(--sh-organic-liquid-glass-light, #8BC4A0)"
          opacity="0.2"
        />
        <path
          d="M218 40C224 30 236 30 242 40C236 50 224 50 218 40Z"
          fill="var(--sh-organic-liquid-glass-light, #8BC4A0)"
          opacity="0.2"
        />
        <path
          d="M292 66C298 56 310 56 316 66C310 76 298 76 292 66Z"
          fill="var(--sh-organic-liquid-glass-light, #8BC4A0)"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}

// Silent visual separator — kept for potential reuse
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

void VineDivider;
void ImpulseSeparator;

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="min-h-dvh pb-10">
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
        <HeroStatusLine youLabel={t("hero.youLabel")} statusPhrases={t.raw("hero.statusPhrases")} />
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
              className="ds-glass journey-card journey-card--clean flex h-full w-full flex-col items-center text-center"
            >
              <h3 className="ds-font-display ds-size-xl ds-weight-light">{t(`offers.${key}_title`)}</h3>
              <p className="mt-2 ds-size-sm text-secondary">{t(`offers.${key}_sub`)}</p>
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

      {/* ── 4. WHAT IS SOUND HEALING ── */}
      <section className="journey-container journey-section">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
            <Image
              src="/media/sections/2641.jpg"
              alt={t("whatItIs.alt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="journey-title">{t("whatItIs.title")}</h2>
            <p className="mt-3 journey-sub">{t("whatItIs.sub")}</p>
            <p className="mt-4 text-secondary leading-relaxed">
              {t("whatItIs.p1").split(/\n{2,}/)[0]}
            </p>
            <Link className="btn btn-primary mt-6" href="/sound-healing">
              {t("whatItIs.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. VIRTUAL SESSIONS ── */}
      <section className="journey-container journey-section">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl md:order-2">
            <Image
              src="/media/sections/virtual-session.jpg"
              alt={t("virtual.alt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <h2 className="journey-title">{t("virtual.title")}</h2>
            <p className="mt-4 leading-relaxed text-secondary">{t("virtual.p1")}</p>
            <p className="mt-3 leading-relaxed text-secondary">{t("virtual.p2")}</p>
            <Link className="btn btn-primary mt-6" href="/contact">
              {t("virtual.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ── */}
      <TestimonialsPreview />

    </main>
  );
}
