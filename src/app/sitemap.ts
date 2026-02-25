import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { BASE_URL, getLocalizedPathname } from "@/i18n/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const pathnames = [
    "/",
    "/sound-healing",
    "/sessions",
    "/contact",
    "/about",
    "/portfolio",
    "/newsletter",
    "/privacy",
  ];

  return routing.locales.flatMap((locale) =>
    pathnames.map((pathname) => ({
      url: `${BASE_URL}${getLocalizedPathname(locale, pathname)}`,
    }))
  );
}
