export default function NewsletterPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 md:px-10 py-16 space-y-12">
      <h1 className="ds-font-display ds-weight-light ds-size-5xl ds-tracking-tight text-foreground">
        Newsletter
      </h1>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">What You Will Receive</h2>
        <p className="text-muted-foreground leading-relaxed">
          Quiet updates on session availability, new formats, and reflective notes on sound and regulation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Delivery Rhythm</h2>
        <p className="text-muted-foreground leading-relaxed">
          Sent occasionally—no spam. Expect a short note when there’s something genuinely useful to share.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl tracking-tight text-foreground">Signup Placeholder</h2>
        <p className="text-muted-foreground leading-relaxed">
          Newsletter sign-up is not live yet. To receive updates, use the contact form and mention
          “newsletter”.
        </p>
      </section>
    </main>
  );
}
