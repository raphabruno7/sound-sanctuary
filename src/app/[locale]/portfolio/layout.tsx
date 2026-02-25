import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Sessions, events, retreats, and collaborations — proof and context from Sound Sanctuary.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

