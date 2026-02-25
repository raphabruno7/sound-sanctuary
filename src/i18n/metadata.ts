import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_NAME = "Sound Sanctuary";
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sound-sanctuary.vercel.app";

const OPEN_GRAPH_LOCALES: Record<string, string> = {
  en: "en_US",
  "pt-BR": "pt_BR",
};

function normalizePathname(pathname: string) {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocalizedPathname(locale: string, pathname: string) {
  const normalized = normalizePathname(pathname);
  const defaultLocale = routing.defaultLocale;
  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: string;
  pathname: string;
  title: string;
  description: string;
}): Metadata {
  const canonicalPath = getLocalizedPathname(locale, pathname);
  const url = new URL(canonicalPath, BASE_URL);

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getLocalizedPathname(l, pathname);
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OPEN_GRAPH_LOCALES[locale] ?? OPEN_GRAPH_LOCALES.en,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

