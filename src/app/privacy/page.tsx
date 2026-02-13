import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for Sound Sanctuary website visitors and newsletter subscribers.",
};

export default function Privacy() {
  return (
    <main className="max-w-5xl mx-auto px-8 md:px-10 py-16 space-y-10">
      <h1 className="ds-font-display ds-weight-light ds-size-5xl ds-tracking-tight text-foreground">
        Privacy
      </h1>
      <p className="text-muted-foreground leading-relaxed max-w-2xl">
        Basic privacy notice placeholder. Expand when newsletter and analytics go live.
      </p>
      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">What we collect</h2>
        <p className="text-muted-foreground leading-relaxed">
          Currently limited to contact details provided voluntarily through forms (name, email).
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">How it is used</h2>
        <p className="text-muted-foreground leading-relaxed">
          To respond to session inquiries, collaborations, and newsletter updates when available.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Retention</h2>
        <p className="text-muted-foreground leading-relaxed">
          Data is retained only while needed for the stated purpose; you can request removal anytime.
        </p>
      </section>
    </main>
  );
}
