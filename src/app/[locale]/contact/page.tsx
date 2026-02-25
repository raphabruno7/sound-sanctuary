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
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return buildPageMetadata({
    locale,
    pathname: "/contact",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contactPage");

  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section">
        <div className="journey-label">{t("label")}</div>
        <h1 className="journey-title">{t("title")}</h1>
        <p className="journey-sub">{t("sub")}</p>
      </section>

      <section className="journey-container journey-section">
        <div className="ds-glass rounded-2xl p-6">
          <div className="journey-grid-2">
            <article className="space-y-3">
              <h2 className="ds-font-display ds-size-2xl ds-weight-light">{t("inquiryTitle")}</h2>
              <p className="text-secondary">{t("inquiryBody")}</p>
            </article>
            <article className="space-y-3">
              <h2 className="ds-font-display ds-size-2xl ds-weight-light">{t("nextTitle")}</h2>
              <p className="text-secondary">{t("nextBody")}</p>
            </article>
          </div>
          <div className="btn-row mt-6 !mb-0">
            <a className="btn btn-primary" href="mailto:hello@soundsanctuary.com">
              {t("ctaPrimary")}
            </a>
            <Link className="btn btn-secondary" href="/sessions">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
