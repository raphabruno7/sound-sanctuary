import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const Type = v.union(
  v.literal("session"),
  v.literal("event"),
  v.literal("retreat"),
  v.literal("collab")
);

export const listPublished = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    // Prefer manual ordering when present; fallback to createdAt.
    const items = await ctx.db
      .query("portfolioItems")
      .withIndex("by_published_order", (q) => q.eq("published", true))
      .order("asc")
      .take(limit);

    if (items.length > 0) return items;

    return await ctx.db.query("portfolioItems").withIndex("by_createdAt").order("desc").take(limit);
  },
});

export const upsert = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    type: Type,
    date: v.optional(v.string()),
    location: v.optional(v.string()),
    coverUrl: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("portfolioItems")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { ...args });
      return { ok: true, updated: true };
    }

    await ctx.db.insert("portfolioItems", { ...args, createdAt: Date.now() });
    return { ok: true, updated: false };
  },
});

export const seedDemo = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    const demo = [
      {
        slug: "forest-sound-journey",
        title: "Sound Journey (Forest)",
        type: "event" as const,
        date: "2026-02-06",
        location: "Portugal",
        excerpt: "A deep rest experience combining bowls, gong, and guided stillness.",
        tags: ["nervous-system", "deep-rest"],
        order: 10,
        published: true,
      },
      {
        slug: "private-sound-session",
        title: "Private Sound Healing Session",
        type: "session" as const,
        excerpt: "One-on-one session focused on regulation, grounding, and clarity.",
        tags: ["1:1", "regulation"],
        order: 20,
        published: true,
      },
      {
        slug: "collab-yoga-naad",
        title: "Naad Yoga Collaboration",
        type: "collab" as const,
        excerpt: "A collaboration combining breath, mantra, and live sound.",
        tags: ["naad-yoga", "collab"],
        order: 30,
        published: true,
      },
    ];

    for (const item of demo) {
      const existing = await ctx.db
        .query("portfolioItems")
        .withIndex("by_slug", (q) => q.eq("slug", item.slug))
        .unique();

      if (!existing) {
        await ctx.db.insert("portfolioItems", { ...item, coverUrl: undefined, createdAt: now });
      }
    }

    return { ok: true, insertedIfMissing: demo.length };
  },
});

