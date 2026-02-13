"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function TestimonialsPreview() {
  const items = useQuery(api.testimonials.listPublished, { limit: 6 });

  return (
    <section className="max-w-5xl mx-auto px-8 md:px-10 pb-24">
      <h2 className="text-2xl md:text-3xl tracking-tight">Words</h2>
      <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
        Short reflections from sessions and collaborations.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {(items ?? []).map((t) => (
          <figure key={t._id} className="rounded-2xl border border-border bg-card p-6">
            <blockquote className="text-foreground leading-relaxed">&ldquo;{t.text}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              - {t.name}
              {t.source ? `, ${t.source}` : ""}
            </figcaption>
          </figure>
        ))}
        {items === undefined ? <p className="text-sm text-muted-foreground">Loading...</p> : null}
      </div>
    </section>
  );
}
