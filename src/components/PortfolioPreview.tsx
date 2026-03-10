"use client";

import { Link } from "@/i18n/navigation";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../convex/_generated/api";

export function PortfolioPreview() {
  const t = useTranslations("portfolioPreview");
  const items = useQuery(api.portfolio.listPublished, { limit: 6 });

  return (
    <section className="max-w-5xl mx-auto px-8 md:px-10 pb-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="journey-title">{t("title")}</h2>
          <p className="journey-sub max-w-2xl">
            {t("sub")}
          </p>
        </div>
        <Link className="underline underline-offset-4 ds-size-sm" href="/portfolio">
          {t("viewAll")}
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {(items ?? []).map((it) => (
          <article key={it._id} className="rounded-2xl border border-border bg-card p-5">
            <p className="journey-label">{it.type}</p>
            <h3 className="mt-2 ds-font-display ds-size-lg ds-weight-light">{it.title}</h3>
            {it.excerpt ? (
              <p className="mt-2 text-secondary leading-relaxed">{it.excerpt}</p>
            ) : null}
            <div className="mt-4 ds-size-xs text-muted">
              {it.location ? <span>{it.location}</span> : null}
              {it.date ? <span>{it.location ? " • " : ""}{it.date}</span> : null}
            </div>
          </article>
        ))}

        {items === undefined ? <p className="ds-size-sm text-muted">{t("loading")}</p> : null}
      </div>
    </section>
  );
}
