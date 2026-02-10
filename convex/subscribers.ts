import { v } from "convex/values";
import { mutation } from "./_generated/server";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  // Simple pragmatic check (not RFC-perfect, but good enough for v0)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const subscribe = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    if (!isValidEmail(email)) {
      throw new Error("Invalid email");
    }

    const name = args.name?.trim() ? args.name.trim() : undefined;

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) {
      if (existing.status === "unsubscribed") {
        await ctx.db.patch(existing._id, { status: "active", name: name ?? existing.name });
        return { ok: true, alreadySubscribed: false, reactivated: true };
      }
      if (name && existing.name !== name) {
        await ctx.db.patch(existing._id, { name });
      }
      return { ok: true, alreadySubscribed: true, reactivated: false };
    }

    await ctx.db.insert("subscribers", {
      email,
      name,
      createdAt: Date.now(),
      status: "active",
      source: args.source,
    });

    return { ok: true, alreadySubscribed: false, reactivated: false };
  },
});

export const unsubscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    if (!isValidEmail(email)) {
      // Avoid leaking whether an email exists; treat as no-op.
      return { ok: true };
    }

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (!existing) {
      return { ok: true };
    }

    if (existing.status !== "unsubscribed") {
      await ctx.db.patch(existing._id, { status: "unsubscribed" });
    }

    return { ok: true };
  },
});
