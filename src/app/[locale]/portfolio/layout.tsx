import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolioPage" });
  return buildPageMetadata({
    locale,
    pathname: "/portfolio",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
