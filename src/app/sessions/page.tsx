import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sessions",
  description: "1:1 Sound Therapy and Group Sound Journey — formats, durations, and how to book.",
};

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
            <p className="mt-2 text-sm text-secondary">Evento ritual · 90 min</p>
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

      <section className="journey-container journey-section">
        <div className="journey-label">O que acontece</div>
        <h2 className="journey-title">Quatro fases de uma sessão</h2>
        <div className="ds-timeline mt-8">
          <div className="ds-timeline__line" aria-hidden="true" />

          <div className="ds-timeline__event ds-timeline__event--completed">
            <div className="ds-timeline__marker" />
            <div className="ds-timeline__content">
              <strong className="ds-timeline__title">Chegada</strong>
              <p className="ds-timeline__description">Assentar. Respirar. Deixar o corpo chegar.</p>
            </div>
          </div>

          <div className="ds-timeline__event ds-timeline__event--current">
            <div className="ds-timeline__marker" />
            <div className="ds-timeline__content">
              <strong className="ds-timeline__title">Imersão sonora</strong>
              <p className="ds-timeline__description">O campo sonoro se forma. O corpo responde.</p>
            </div>
          </div>

          <div className="ds-timeline__event">
            <div className="ds-timeline__marker" />
            <div className="ds-timeline__content">
              <strong className="ds-timeline__title">Integração</strong>
              <p className="ds-timeline__description">Silêncio guiado. O sistema nervoso processa.</p>
            </div>
          </div>

          <div className="ds-timeline__event">
            <div className="ds-timeline__marker" />
            <div className="ds-timeline__content">
              <strong className="ds-timeline__title">Fechamento</strong>
              <p className="ds-timeline__description">Retorno gradual. Chá. Partida com espaço.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">Perguntas frequentes</div>
        <h2 className="journey-title">O que esperar</h2>
        <div className="mt-6">
          <div className="ds-accordion">
            {[
              {
                q: "Preciso de experiência com meditação?",
                a: "Não. As sessões são acessíveis para qualquer pessoa. Não há técnica para aprender.",
              },
              {
                q: "Como me vestir?",
                a: "Roupas confortáveis. Você ficará deitado ou sentado a maior parte do tempo.",
              },
              {
                q: "E se eu adormecer?",
                a: "Ótimo. O corpo sabe o que precisa. O sono durante a sessão é integração.",
              },
              {
                q: "Há contraindicações?",
                a: "Sessões individuais são adaptadas. Epilepsia fotossensível ou implantes metálicos — informe antes.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="ds-accordion__item">
                <summary className="ds-accordion__trigger">
                  {q}
                  <span className="ds-accordion__icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                      <path d="M5.25 7.5l4.75 5 4.75-5H5.25z" />
                    </svg>
                  </span>
                </summary>
                <div className="ds-accordion__body">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
