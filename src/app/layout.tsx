import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Sound Sanctuary",
  description: "A calm space for sound, presence, and nervous system support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-950 antialiased">
        <ConvexClientProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
