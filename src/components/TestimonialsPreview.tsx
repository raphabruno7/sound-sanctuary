"use client";

import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../convex/_generated/api";

export function TestimonialsPreview() {
  const t = useTranslations("testimonialsPreview");
  const items = useQuery(api.testimonials.listPublished, { limit: 6 });

  return (
    <section className="max-w-5xl mx-auto px-8 md:px-10 pb-24">
      <h2 className="journey-title">{t("title")}</h2>
      <p className="journey-sub max-w-2xl">
        {t("sub")}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {(items ?? []).map((t) => (
          <figure key={t._id} className="rounded-2xl border border-border bg-card p-6">
            <blockquote className="text-foreground leading-relaxed">&ldquo;{t.text}&rdquo;</blockquote>
            <figcaption className="mt-4 ds-size-sm text-muted">
              - {t.name}
              {t.source ? `, ${t.source}` : ""}
            </figcaption>
          </figure>
        ))}
        {items === undefined ? <p className="ds-size-sm text-muted">{t("loading")}</p> : null}
      </div>
    </section>
  );
}
