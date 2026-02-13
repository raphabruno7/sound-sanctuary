export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 md:px-10 py-16 space-y-16">
      <h1 className="ds-font-display ds-weight-light ds-size-5xl ds-tracking-tight text-foreground">
        Contact
      </h1>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Session Inquiry</h2>
        <p className="text-muted-foreground leading-relaxed">
          Tell me what support you’re seeking, preferred timing, and whether you want 1:1 or group work.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Collaboration Requests</h2>
        <p className="text-muted-foreground leading-relaxed">
          For retreats, events, or creative collaborations, share the context, dates, and location.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Response Expectations</h2>
        <p className="text-muted-foreground leading-relaxed">
          You’ll get a reply within 1–2 business days with next steps and scheduling options.
        </p>
      </section>
    </main>
  );
}
