import Link from "next/link";

export default function SessionsPage() {
  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section">
        <div className="journey-label">Sessions</div>
        <h1 className="journey-title">Choose your depth</h1>
        <p className="journey-sub">
          Availability and timezone details appear in booking flow, not in global navigation.
        </p>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">Pontos de decisao</div>
        <h2 className="journey-title">Book 1:1 or Join Live</h2>
        <p className="journey-sub">Glow on hover, gentle response on click. Each button is a synapse.</p>

        <div className="journey-grid-2 mt-8">
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">Sound Bath</h3>
            <p className="mt-2 text-sm text-secondary">Sessao individual · 60min</p>
            <p className="mt-3 text-secondary">
              Peter Hess bowls sobre o corpo. O som encontra a agua.
            </p>
            <div className="btn-row mt-5">
              <Link className="btn btn-primary" href="/contact">
                Book 1:1
              </Link>
              <Link className="btn btn-ghost" href="/sound-healing">
                How it works
              </Link>
            </div>
          </article>

          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">Group Sound Journey</h3>
            <p className="mt-2 text-sm text-secondary">Evento ritual · Duration placeholder</p>
            <p className="mt-3 text-secondary">Collective rest and connection without performance.</p>
            <div className="btn-row mt-5">
              <Link className="btn btn-secondary" href="/newsletter">
                Join Live
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                Contact
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
