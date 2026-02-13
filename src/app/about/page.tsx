import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the sound healing and contemplative approach behind Sound Sanctuary sessions.",
};

export default function About() {
  return (
    <main className="max-w-5xl mx-auto px-8 md:px-10 py-16 space-y-10">
      <h1 className="ds-font-display ds-weight-light ds-size-5xl ds-tracking-tight text-foreground">
        About
      </h1>
      <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
        My work brings together sound healing, music, and contemplative practice to create a calm
        and supportive space. Each session is paced gently, with care for how your body feels in the
        moment, so rest and regulation can happen naturally.
      </p>
      <div className="grid gap-6 md:grid-cols-2 text-muted-foreground leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-xl tracking-tight text-foreground">Approach</h2>
          <p>Rhythm, resonance, and silence are used intentionally to help the nervous system settle.</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl tracking-tight text-foreground">Sessions</h2>
          <p>Each session is paced slowly with clear openings and closings so integration feels natural.</p>
        </div>
      </div>
    </main>
  );
}
