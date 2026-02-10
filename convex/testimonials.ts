import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listPublished = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    const items = await ctx.db
      .query("testimonials")
      .withIndex("by_published_order", (q) => q.eq("published", true))
      .order("asc")
      .take(limit);

    if (items.length > 0) return items;

    return await ctx.db.query("testimonials").withIndex("by_createdAt").order("desc").take(limit);
  },
});

export const upsert = mutation({
  args: {
    name: v.string(),
    text: v.string(),
    source: v.optional(v.string()),
    order: v.optional(v.number()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Simple upsert by exact (name + text). Good enough for v0.
    const existing = await ctx.db
      .query("testimonials")
      .filter((q) =>
        q.and(q.eq(q.field("name"), args.name), q.eq(q.field("text"), args.text))
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { ...args });
      return { ok: true, updated: true };
    }

    await ctx.db.insert("testimonials", { ...args, createdAt: Date.now() });
    return { ok: true, updated: false };
  },
});

export const seedDemo = mutation({
  args: {},
  handler: async (ctx) => {
    const demo = [
      {
        name: "Client",
        text: "I felt my whole system slow down. The night after, I slept deeply.",
        source: "Online session",
        order: 10,
        published: true,
      },
      {
        name: "Participant",
        text: "A gentle journey — grounding, clarity, and a sense of safety in my body.",
        source: "Event",
        order: 20,
        published: true,
      },
      {
        name: "Therapist",
        text: "Professional, sensitive, and very precise with the sound field.",
        source: "Collaboration",
        order: 30,
        published: true,
      },
    ];

    for (const t of demo) {
      const existing = await ctx.db
        .query("testimonials")
        .filter((q) => q.and(q.eq(q.field("name"), t.name), q.eq(q.field("text"), t.text)))
        .first();

      if (!existing) {
        await ctx.db.insert("testimonials", { ...t, createdAt: Date.now() });
      }
    }

    return { ok: true, insertedIfMissing: demo.length };
  },
});

