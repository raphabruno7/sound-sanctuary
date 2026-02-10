import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sound Sanctuary",
  description: "A calm space for sound, presence, and nervous system support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-950 antialiased">{children}</body>
    </html>
  );
}
