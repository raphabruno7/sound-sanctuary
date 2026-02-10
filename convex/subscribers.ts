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
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    if (!isValidEmail(email)) {
      throw new Error("Invalid email");
    }

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) {
      if (existing.status === "unsubscribed") {
        await ctx.db.patch(existing._id, { status: "active" });
        return { ok: true, alreadySubscribed: false, reactivated: true };
      }
      return { ok: true, alreadySubscribed: true, reactivated: false };
    }

    await ctx.db.insert("subscribers", {
      email,
      createdAt: Date.now(),
      status: "active",
      source: args.source,
    });

    return { ok: true, alreadySubscribed: false, reactivated: false };
  },
});
