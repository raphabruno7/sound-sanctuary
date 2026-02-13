export default function SoundHealingPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 md:px-10 py-16 space-y-16">
      <h1 className="ds-font-display ds-weight-light ds-size-5xl ds-tracking-tight text-foreground">
        Sound Healing
      </h1>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">What Sound Healing Is</h2>
        <p className="text-muted-foreground leading-relaxed">
          A focused use of sound, silence, and paced breath to support regulation and rest.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">System Nervous Framework</h2>
        <p className="text-muted-foreground leading-relaxed">
          Sessions pair rhythm and resonance with gentle transitions to help the nervous system downshift.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Who This Is For</h2>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2">
          <li>Stress, anxiety, or overstimulation</li>
          <li>Sleep support</li>
          <li>Integration after intense periods</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">What to Expect</h2>
        <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
          <li>Arrival & settling</li>
          <li>Grounding & breath pacing</li>
          <li>Sound immersion</li>
          <li>Integration</li>
          <li>Closing</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Booking</h2>
        <div className="btn-row">
          <a className="btn btn-primary" href="/contact">
            Book a session
          </a>
          <a className="btn btn-secondary" href="/sessions">
            View session formats
          </a>
        </div>
      </section>
    </main>
  );
}
