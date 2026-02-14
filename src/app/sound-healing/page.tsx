import Image from "next/image";
import Link from "next/link";

export default function SoundHealingPage() {
  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section">
        <div className="journey-label">Sound Healing</div>
        <h1 className="journey-title">Sound as liquid light</h1>
        <p className="journey-sub">
          O som das tigelas percorre o sistema nervoso como a seiva percorre as nervuras de uma
          folha, encontrando caminhos e restaurando conexoes.
        </p>

        <div className="journey-grid-2 mt-8">
          <div className="journey-hero-media ds-glass">
            <Image
              src="/media/sections/2633.jpg"
              alt="Wide view of a sound healing session outdoors"
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="journey-photo-vignette" aria-hidden="true" />
            <div className="absolute left-4 bottom-4 z-10 rounded-full border border-border bg-popover px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground">
              Photo 02 - 2633
            </div>
          </div>

          <article className="ds-glass journey-card">
            <div className="journey-label">Principio fundador</div>
            <h2 className="mt-3 ds-font-display ds-size-3xl ds-weight-light">Mechanism, without hype</h2>
            <p className="mt-4 text-secondary">
              Rhythm, resonance, and structured stillness create conditions where the system can
              settle and integrate.
            </p>
          </article>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="ds-glass journey-card">
          <p className="text-secondary">O corpo humano e 70% agua. O som viaja pela agua.</p>
          <p className="text-secondary mt-2">O sistema nervoso esta imerso nessa agua.</p>
          <p className="text-secondary mt-2">
            Quando a tigela toca, a vibracao encontra o liquido, se propaga como onda, e alcanca
            cada nervo por dentro.
          </p>
          <p className="mt-3 ds-font-display ds-size-2xl ds-weight-light">
            O som reconstrói o sistema nervoso.
          </p>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="ds-glass rounded-2xl p-6 flex flex-wrap items-center justify-between gap-5">
          <p className="text-secondary">Want to feel this in your body?</p>
          <div className="btn-row !mb-0">
            <Link className="btn btn-primary" href="/contact">
              Book a 1:1
            </Link>
            <Link className="btn btn-secondary" href="/sessions">
              See formats
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
