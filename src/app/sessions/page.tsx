import Link from "next/link";

export default function SessionsPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 md:px-10 py-16 space-y-16">
      <h1 className="ds-font-display ds-weight-light ds-size-5xl ds-tracking-tight text-foreground">
        Sessions
      </h1>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Session Formats</h2>
        <p className="text-muted-foreground leading-relaxed">
          Options for individual and group work, tuned to the depth and pace you need.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Preparation</h2>
        <p className="text-muted-foreground leading-relaxed">
          Arrive comfortably, hydrate, and plan to silence notifications. Wear layers so you can settle easily.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Booking Process</h2>
        <p className="text-muted-foreground leading-relaxed">
          Share your intent and schedule preference; we’ll confirm the format and timing that fits.
        </p>
        <div className="btn-row">
          <Link href="/contact" className="btn btn-primary">
            Book a session
          </Link>
          <Link href="/sound-healing" className="btn btn-secondary">
            About sound healing
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Follow-Up</h2>
        <p className="text-muted-foreground leading-relaxed">
          Expect a short debrief and simple at-home practices to help the session integrate.
        </p>
      </section>
    </main>
  );
}
