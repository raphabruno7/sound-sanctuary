"use client";

import type { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "http://localhost:3210";
const client = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    console.warn("NEXT_PUBLIC_CONVEX_URL is not set yet. Using localhost fallback.");
  }
  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
