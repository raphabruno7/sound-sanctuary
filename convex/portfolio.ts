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
        slug: "lisbon-private-regulation-series",
        title: "Private Regulation Series",
        type: "session" as const,
        date: "2025-10-12",
        location: "Lisbon, Portugal",
        excerpt: "Four 1:1 sessions supporting sleep, grounding, and nervous system balance.",
        tags: ["1:1", "nervous-system"],
        order: 10,
        published: true,
      },
      {
        slug: "sunset-sound-bath-cascais",
        title: "Sunset Sound Bath",
        type: "event" as const,
        date: "2025-08-24",
        location: "Cascais, Portugal",
        excerpt: "Community evening practice with bowls, gong, and guided rest by the coast.",
        tags: ["community", "sound-bath"],
        order: 20,
        published: true,
      },
      {
        slug: "sintra-rest-retreat-weekend",
        title: "Rest & Reset Weekend Retreat",
        type: "retreat" as const,
        date: "2025-06-15",
        location: "Sintra, Portugal",
        excerpt: "Two-day retreat with silence windows, gentle movement, and evening sound journeys.",
        tags: ["retreat", "rest"],
        order: 30,
        published: true,
      },
      {
        slug: "trauma-informed-yoga-sound-collab",
        title: "Trauma-Informed Yoga x Sound",
        type: "collab" as const,
        date: "2025-04-07",
        location: "Lisbon, Portugal",
        excerpt: "Co-led practice blending breathwork, restorative yoga, and live therapeutic sound.",
        tags: ["collaboration", "trauma-informed"],
        order: 40,
        published: true,
      },
      {
        slug: "corporate-wellbeing-listening-lab",
        title: "Workplace Listening Lab",
        type: "event" as const,
        date: "2025-03-19",
        location: "Porto, Portugal",
        excerpt: "Focused session for team reset, attention training, and practical nervous system tools.",
        tags: ["wellbeing", "focus"],
        order: 50,
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
