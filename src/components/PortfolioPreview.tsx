"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function PortfolioPreview() {
  const items = useQuery(api.portfolio.listPublished, { limit: 6 });

  return (
    <section className="max-w-5xl mx-auto px-8 md:px-10 pb-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl tracking-tight">Portfolio</h2>
          <p className="mt-3 text-neutral-700 max-w-2xl leading-relaxed">
            Selected sessions, events, retreats, and collaborations.
          </p>
        </div>
        <Link className="underline underline-offset-4 text-sm" href="/portfolio">
          View all
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {(items ?? []).map((it) => (
          <article key={it._id} className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-xs tracking-wide text-neutral-500 uppercase">{it.type}</p>
            <h3 className="mt-2 text-lg tracking-tight">{it.title}</h3>
            {it.excerpt ? (
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{it.excerpt}</p>
            ) : null}
            <div className="mt-4 text-xs text-neutral-500">
              {it.location ? <span>{it.location}</span> : null}
              {it.date ? <span>{it.location ? " • " : ""}{it.date}</span> : null}
            </div>
          </article>
        ))}

        {items === undefined ? <p className="text-sm text-neutral-500">Loading...</p> : null}
      </div>
    </section>
  );
}
