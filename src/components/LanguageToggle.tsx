"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(pt-BR)/, "") || "/";

  const isEN = locale === "en";
  const targetLocale = isEN ? "pt-BR" : "en";
  const targetLabel = isEN ? "PT" : "EN";
  const targetHref = isEN ? `/pt-BR${pathWithoutLocale}` : pathWithoutLocale;

  return (
    <Link
      href={targetHref}
      className="ds-header__link text-sm"
      aria-label={`Switch to ${targetLocale}`}
    >
      {targetLabel}
    </Link>
  );
}
