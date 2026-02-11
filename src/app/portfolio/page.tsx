import type { Metadata } from "next";
import { PortfolioClient } from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore published sessions, events, retreats, and collaborations from Sound Sanctuary.",
};

export default function Portfolio() {
  return <PortfolioClient />;
}
