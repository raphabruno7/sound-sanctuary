import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sessionsPage" });
  return buildPageMetadata({
    locale,
    pathname: "/sessions",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function SessionsPage() {
  const t = await getTranslations("sessionsPage");

  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section relative">
        <svg
          className="scapes-art"
          width="300"
          height="200"
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <style>{`
              .scape-path { transform-box: fill-box; transform-origin: bottom center; }
              .scape-path:nth-child(2) { animation-delay: 1.5s; }
              .scape-path:nth-child(3) { animation-delay: 3s; }
            `}</style>
          </defs>
          <path
            className="scape-path"
            d="M52 188C46 140 64 106 92 78C116 54 126 30 120 10"
            stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
          />
          <path
            className="scape-path"
            d="M146 190C136 146 148 112 178 84C204 60 218 36 210 12"
            stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <path
            className="scape-path"
            d="M234 190C224 154 234 124 254 100C274 76 288 52 286 28"
            stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          />

          <circle
            cx="120"
            cy="10"
            r="8"
            stroke="var(--sh-organic-liquid-glass-light, #8BC4A0)"
            strokeWidth="1.4"
            opacity="0.45"
          />
          <circle
            cx="210"
            cy="12"
            r="7"
            stroke="var(--sh-organic-liquid-glass-light, #8BC4A0)"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <circle
            cx="286"
            cy="28"
            r="6"
            stroke="var(--sh-organic-liquid-glass-light, #8BC4A0)"
            strokeWidth="1.1"
            opacity="0.35"
          />
        </svg>
        <div className="journey-label">{t("label")}</div>
        <h1 className="journey-title">{t("title")}</h1>
        <p className="journey-sub">{t("sub")}</p>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">{t("decisionLabel")}</div>
        <h2 className="journey-title">{t("decisionTitle")}</h2>
        <p className="journey-sub">{t("decisionSub")}</p>

        <div className="journey-grid-2 mt-8">
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">{t("oneOnOneTitle")}</h3>
            <p className="mt-2 text-sm text-secondary">{t("oneOnOneMeta")}</p>
            <p className="mt-3 text-secondary">{t("oneOnOneBody")}</p>
            <div className="btn-row mt-5">
              <Link className="btn btn-primary" href="/contact">
                {t("oneOnOneCtaPrimary")}
              </Link>
              <Link className="btn btn-ghost" href="/sound-healing">
                {t("oneOnOneCtaSecondary")}
              </Link>
            </div>
          </article>

          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">{t("groupTitle")}</h3>
            <p className="mt-2 text-sm text-secondary">{t("groupMeta")}</p>
            <p className="mt-3 text-secondary">{t("groupBody")}</p>
            <div className="btn-row mt-5">
              <Link className="btn btn-secondary" href="/newsletter">
                {t("groupCtaPrimary")}
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                {t("groupCtaSecondary")}
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">{t("timelineLabel")}</div>
        <h2 className="journey-title">{t("timelineTitle")}</h2>
        <div className="ds-timeline mt-8">
          <div className="ds-timeline__line" aria-hidden="true" />

          <div className="ds-timeline__event ds-timeline__event--completed">
            <div className="ds-timeline__marker" />
            <div className="ds-timeline__content">
              <strong className="ds-timeline__title">{t("timelineArrivalTitle")}</strong>
              <p className="ds-timeline__description">{t("timelineArrivalBody")}</p>
            </div>
          </div>

          <div className="ds-timeline__event ds-timeline__event--current">
            <div className="ds-timeline__marker" />
            <div className="ds-timeline__content">
              <strong className="ds-timeline__title">{t("timelineImmersionTitle")}</strong>
              <p className="ds-timeline__description">{t("timelineImmersionBody")}</p>
            </div>
          </div>

          <div className="ds-timeline__event">
            <div className="ds-timeline__marker" />
            <div className="ds-timeline__content">
              <strong className="ds-timeline__title">{t("timelineIntegrationTitle")}</strong>
              <p className="ds-timeline__description">{t("timelineIntegrationBody")}</p>
            </div>
          </div>

          <div className="ds-timeline__event">
            <div className="ds-timeline__marker" />
            <div className="ds-timeline__content">
              <strong className="ds-timeline__title">{t("timelineClosingTitle")}</strong>
              <p className="ds-timeline__description">{t("timelineClosingBody")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">{t("faqLabel")}</div>
        <h2 className="journey-title">{t("faqTitle")}</h2>
        <div className="mt-6">
          <div className="ds-accordion">
            {[
              { q: t("faq0q"), a: t("faq0a") },
              { q: t("faq1q"), a: t("faq1a") },
              { q: t("faq2q"), a: t("faq2a") },
              { q: t("faq3q"), a: t("faq3a") },
            ].map(({ q, a }) => (
              <details key={q} className="ds-accordion__item">
                <summary className="ds-accordion__trigger">
                  {q}
                  <span className="ds-accordion__icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                      <path d="M5.25 7.5l4.75 5 4.75-5H5.25z" />
                    </svg>
                  </span>
                </summary>
                <div className="ds-accordion__body">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
