import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/i18n/metadata";
import { NewsletterForm } from "@/components/NewsletterForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsletterPage" });
  return buildPageMetadata({
    locale,
    pathname: "/newsletter",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function NewsletterPage() {
  const t = await getTranslations("newsletterPage");
  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section">
        <div className="journey-label">{t("label")}</div>
        <h1 className="journey-title">{t("title")}</h1>
        <p className="journey-sub">{t("sub")}</p>
      </section>

      <div aria-hidden="true" className="journey-container">
        <svg
          className="vine-divider"
          viewBox="0 0 400 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
        </svg>
      </div>

      <section className="journey-container journey-section">
        <h2 className="journey-title">{t("sectionReceiveTitle")}</h2>
        <p className="journey-sub">{t("sectionReceiveBody")}</p>
      </section>

      <div aria-hidden="true" className="journey-container">
        <svg
          className="vine-divider"
          viewBox="0 0 400 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
        </svg>
      </div>

      <section className="journey-container journey-section">
        <h2 className="journey-title">{t("sectionRhythmTitle")}</h2>
        <p className="journey-sub">{t("sectionRhythmBody")}</p>
      </section>

      <div aria-hidden="true" className="journey-container">
        <svg
          className="vine-divider"
          viewBox="0 0 400 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
        </svg>
      </div>

      <section className="journey-container journey-section">
        <NewsletterForm source="newsletter" />
      </section>
    </main>
  );
}
