"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  const isEN = locale === "en";
  const targetLocale = isEN ? "pt-BR" : "en";
  const targetLabel = isEN ? "PT" : "EN";

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className="ds-header__link ds-size-sm"
      aria-label={`Switch to ${targetLocale}`}
    >
      {targetLabel}
    </Link>
  );
}
