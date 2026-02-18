"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ScapesEmpty } from "@/components/artwork/ScapesEmpty";

export default function Portfolio() {
  const items = useQuery(api.portfolio.listPublished, { limit: 100 });

  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section">
        <div className="journey-label">Portfolio</div>
        <h1 className="journey-title">Portfolio</h1>
        <p className="journey-sub">Sessions, events, retreats, and collaborations.</p>
      </section>

      <section className="journey-container journey-section">
        <div className="grid gap-6 md:grid-cols-3">
          {items === undefined ? (
            <>
              <div className="ds-skeleton ds-skeleton--card" />
              <div className="ds-skeleton ds-skeleton--card" />
              <div className="ds-skeleton ds-skeleton--card" />
            </>
          ) : null}

          {(items ?? []).map((it) => (
            <article key={it._id} className="ds-glass journey-card">
              <p className="journey-label">{it.type}</p>
              <h2 className="mt-3 ds-font-display ds-size-2xl ds-weight-light">{it.title}</h2>
              {it.excerpt ? <p className="mt-3 text-secondary">{it.excerpt}</p> : null}
              <div className="mt-4 text-xs text-muted-foreground">
                {it.location ? <span>{it.location}</span> : null}
                {it.date ? <span>{it.location ? " • " : ""}{it.date}</span> : null}
              </div>
              {it.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {it.tags.map((tag) => (
                    <span key={tag} className="ds-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}

          {items && items.length === 0 ? (
            <div className="md:col-span-3">
              <ScapesEmpty
                title="Portfolio em construção"
                description="Sessions, events, and retreats — coming soon."
              />
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
