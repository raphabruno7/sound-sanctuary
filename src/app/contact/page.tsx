import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section">
        <div className="journey-label">Contact</div>
        <h1 className="journey-title">Book a 1:1</h1>
        <p className="journey-sub">Three questions. I reply within 48 hours.</p>
      </section>

      <section className="journey-container journey-section">
        <div className="ds-glass rounded-2xl p-6">
          <div className="journey-grid-2">
            <article className="space-y-3">
              <h2 className="ds-font-display ds-size-2xl ds-weight-light">Session inquiry</h2>
              <p className="text-secondary">
                Tell me what support you are seeking, your preferred timing, and if this is 1:1 or
                group context.
              </p>
            </article>
            <article className="space-y-3">
              <h2 className="ds-font-display ds-size-2xl ds-weight-light">What happens next</h2>
              <p className="text-secondary">
                I send next steps with format and scheduling options, with the minimum friction
                needed to start.
              </p>
            </article>
          </div>
          <div className="btn-row mt-6 !mb-0">
            <a className="btn btn-primary" href="mailto:hello@soundsanctuary.com">
              Send inquiry
            </a>
            <Link className="btn btn-secondary" href="/sessions">
              Review sessions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
