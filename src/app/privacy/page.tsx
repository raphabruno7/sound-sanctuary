import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for Sound Sanctuary website visitors and newsletter subscribers.",
};

export default function Privacy() {
  return (
    <main className="max-w-5xl mx-auto px-8 md:px-10 py-16">
      <h1 className="text-3xl md:text-5xl tracking-tight">Privacy</h1>
      <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
        Basic privacy notice placeholder. Expand when newsletter and analytics go live.
      </p>
    </main>
  );
}
