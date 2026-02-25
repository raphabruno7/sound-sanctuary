import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10 text-muted-foreground sm:px-8 md:px-10">
        <div className="ds-glass rounded-2xl p-6 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-2xl">{t("ctaText")}</p>
          <div className="btn-row !mb-0">
            <Link className="btn btn-primary" href="/contact">
              {t("ctaPrimary")}
            </Link>
            <Link className="btn btn-secondary" href="/newsletter">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
        <p className="mt-6">© {new Date().getFullYear()} Sound Sanctuary</p>
        <div className="mt-3 flex gap-4 text-xs">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            {t("privacy")}
          </Link>
          <Link href="/newsletter" className="transition-colors hover:text-foreground">
            {t("newsletter")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
