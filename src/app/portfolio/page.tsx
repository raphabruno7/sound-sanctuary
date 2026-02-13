"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Portfolio() {
  const items = useQuery(api.portfolio.listPublished, { limit: 100 });

  return (
    <main className="max-w-5xl mx-auto px-8 md:px-10 py-16">
      <h1 className="text-3xl md:text-5xl tracking-tight">Portfolio</h1>
      <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
        Sessions, events, retreats, and collaborations.
      </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(items ?? []).map((it) => (
            <article key={it._id} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">{it.type}</p>
              <h2 className="mt-2 text-lg tracking-tight">{it.title}</h2>
              {it.excerpt ? (
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.excerpt}</p>
              ) : null}
              <div className="mt-4 text-xs text-muted-foreground">
                {it.location ? <span>{it.location}</span> : null}
                {it.date ? <span>{it.location ? " • " : ""}{it.date}</span> : null}
              </div>
              {it.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {it.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs rounded-full border border-border px-2 py-1 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}

          {items === undefined ? <p className="text-sm text-muted-foreground">Loading...</p> : null}
          {items && items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No items yet. Run the seed mutation in Convex to add demo content.
            </p>
          ) : null}
        </div>
    </main>
  );
}
