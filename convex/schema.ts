import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  subscribers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    createdAt: v.number(),
    status: v.union(v.literal("active"), v.literal("unsubscribed")),
    source: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"]),

  portfolioItems: defineTable({
    title: v.string(),
    slug: v.string(),
    type: v.union(
      v.literal("session"),
      v.literal("event"),
      v.literal("retreat"),
      v.literal("collab")
    ),
    date: v.optional(v.string()), // ISO date string, e.g. "2026-02-10"
    location: v.optional(v.string()),
    coverUrl: v.optional(v.string()), // URL for now; later: file storage
    excerpt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    order: v.optional(v.number()), // manual ordering
    createdAt: v.number(),
    published: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_createdAt", ["createdAt"])
    .index("by_published_order", ["published", "order"]),

  testimonials: defineTable({
    name: v.string(),
    text: v.string(),
    source: v.optional(v.string()),
    createdAt: v.number(),
    published: v.boolean(),
    order: v.optional(v.number()),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_published_order", ["published", "order"]),
});
