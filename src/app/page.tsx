import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { TestimonialsPreview } from "@/components/TestimonialsPreview";

export default function Home() {
  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section">
        <div className="journey-label">00 - Home</div>
        <div className="journey-hero-grid mt-6">
          <div>
            <h1 className="ds-font-display ds-weight-light ds-size-6xl ds-leading-tight">Sound Healing</h1>
            <p className="mt-3 ds-font-display ds-italic ds-weight-light ds-size-xl journey-breathe sh-breath-pulse text-secondary">
              O prana canta enquanto flui
            </p>
            <p className="journey-sub ds-size-lg">
              Regulation practice for modern life: rhythm, rest, and integration.
            </p>
            <div className="journey-axon" aria-hidden="true">
              <span className="journey-node left" />
              <span className="journey-node right" />
            </div>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/contact">
                Book a 1:1
              </Link>
              <Link className="btn btn-secondary" href="/sessions">
                Join Sound Healing Live
              </Link>
            </div>
            <p className="journey-label mt-4">Upstream care · regulation before breakdown</p>
          </div>

          <div className="journey-hero-media ds-glass">
            <Image
              src="/media/hero/2627.jpg"
              alt="Sound healing session outdoors with bowls and gong"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="journey-photo-vignette" aria-hidden="true" />
            <div className="absolute left-4 bottom-4 z-10 rounded-full border border-border bg-popover px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground">
              Photo 01 - 2627
            </div>
          </div>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">01 - What It Is</div>
        <h2 className="journey-title">A calm, structured sound practice</h2>
        <p className="journey-sub">
          Sound Healing uses resonance, rhythm, and guided rest to help the nervous system
          downshift without performance.
        </p>
        <div className="journey-grid-2 mt-6 text-secondary leading-relaxed">
          <p>
            It is simple: you arrive, you settle, sound creates a field, and your body has room to
            integrate. Nothing to achieve.
          </p>
          <p>
            The promise is not medical treatment. It is training capacity: downshifting, returning
            to rhythm, and leaving with more space inside.
          </p>
        </div>
      </section>

      <div aria-hidden="true" className="journey-container">
        <svg
          className="vine-divider"
          viewBox="0 0 400 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <style>{`.vine-path:nth-child(2) { animation-delay: 0.4s; }`}</style>
          </defs>
          <path
            className="vine-path"
            d="M10 58C38 22 72 20 98 46C124 72 152 74 178 48C204 22 236 22 262 48C288 74 322 76 390 44"
            stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="620"
            strokeDashoffset="620"
          />
          <path
            className="vine-path"
            d="M10 74C44 38 76 36 102 60C126 84 150 84 174 62C198 40 228 40 252 62C276 84 308 84 390 56"
            stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
            strokeDasharray="620"
            strokeDashoffset="620"
          />
        </svg>
      </div>

      <section className="journey-container journey-section">
        <div className="journey-label">02 - Sound and the Nervous System</div>
        <h2 className="journey-title">Principio fundador</h2>
        <div className="ds-glass journey-card mt-6">
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
        <div className="journey-label">03 - What Happens in a Session</div>
        <h2 className="journey-title">Five steps, no mystery</h2>
        <div className="journey-grid-2 mt-6">
          <div className="ds-glass journey-card">
            <ol className="list-decimal pl-6 space-y-2 text-secondary">
              <li>Arrival</li>
              <li>Grounding</li>
              <li>Sound immersion</li>
              <li>Integration</li>
              <li>Closing</li>
            </ol>
          </div>
          <div className="journey-hero-media ds-glass">
            <Image
              src="/media/sections/2641.jpg"
              alt="Detail of instruments used in a session"
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="journey-photo-vignette" aria-hidden="true" />
            <div className="absolute left-4 bottom-4 z-10 rounded-full border border-border bg-popover px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground">
              Photo 03 - 2641
            </div>
          </div>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">04 - Session Formats</div>
        <h2 className="journey-title">Choose depth</h2>
        <div className="journey-grid-2 mt-6">
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">1:1 Sound Therapy</h3>
            <p className="mt-2 text-sm text-secondary">
              For whom: deeper pacing + integration support · 60 min
            </p>
            <p className="mt-3 text-secondary">
              Personalized support for transitions, sleep stress, and chronic overstimulation.
            </p>
            <div className="btn-row mt-5">
              <Link className="btn btn-primary" href="/contact">
                Book a 1:1
              </Link>
              <Link className="btn btn-ghost" href="/sessions">
                See session details
              </Link>
            </div>
          </article>

          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">Group Sound Journey</h3>
            <p className="mt-2 text-sm text-secondary">
              For whom: collective rest without performance · 90 min
            </p>
            <p className="mt-3 text-secondary">
              A shared field for settling and connection. Low barrier and high felt sense.
            </p>
            <div className="btn-row mt-5">
              <Link className="btn btn-secondary" href="/sessions">
                See next live
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                Contact
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">06 - Framework Elemental</div>
        <h2 className="journey-title">Quatro forcas do som</h2>
        <div className="journey-grid-4 mt-6">
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-xl ds-weight-light">The Sun</h3>
            <p className="mt-2 text-sm text-secondary">heals, charges, warms</p>
            <p className="mt-3 text-secondary">Frequencia do fogo. Calor que dissolve.</p>
          </article>
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-xl ds-weight-light">The Moon</h3>
            <p className="mt-2 text-sm text-secondary">connects, manifests, unlocks</p>
            <p className="mt-3 text-secondary">Frequencia da agua interna e ritmo do corpo sutil.</p>
          </article>
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-xl ds-weight-light">The Ocean</h3>
            <p className="mt-2 text-sm text-secondary">cleanses, refreshes, opens</p>
            <p className="mt-3 text-secondary">Ondulacao que limpa e abre centros de energia.</p>
          </article>
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-xl ds-weight-light">The Forest</h3>
            <p className="mt-2 text-sm text-secondary">grounds, balances, stabilizes</p>
            <p className="mt-3 text-secondary">Raiz. Aterramento. Som grave que ancora na terra.</p>
          </article>
        </div>
      </section>

      <div aria-hidden="true" className="journey-container">
        <svg
          className="vine-divider"
          viewBox="0 0 400 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <style>{`.vine-path:nth-child(2) { animation-delay: 0.4s; }`}</style>
          </defs>
          <path
            className="vine-path"
            d="M10 58C38 22 72 20 98 46C124 72 152 74 178 48C204 22 236 22 262 48C288 74 322 76 390 44"
            stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="620"
            strokeDashoffset="620"
          />
          <path
            className="vine-path"
            d="M10 74C44 38 76 36 102 60C126 84 150 84 174 62C198 40 228 40 252 62C276 84 308 84 390 56"
            stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
            strokeDasharray="620"
            strokeDashoffset="620"
          />
        </svg>
      </div>

      <section className="journey-container journey-section">
        <div className="journey-label">07 - Animacao · Impulsos</div>
        <h2 className="journey-title">Nada e inerte</h2>
        <div className="impulse-plate ds-glass mt-6">
          <p className="ds-font-display ds-size-2xl ds-italic ds-weight-light journey-breathe">
            Nada e inerte.
          </p>
          <p className="journey-sub mt-3">
            Textos respiram. Cards pulsam como nos nervosos. Elementos acendem como impulso nervoso.
          </p>
          <div className="impulse-art" aria-hidden="true">
            <svg className="impulse-svg" viewBox="0 0 800 420" preserveAspectRatio="none">
              <path
                className="path"
                d="M60,60 C220,50 260,140 340,160 C420,180 480,110 560,140 C640,170 640,270 740,310"
              />
              <path
                className="flash"
                d="M60,60 C220,50 260,140 340,160 C420,180 480,110 560,140 C640,170 640,270 740,310"
              />
              <circle className="node" cx="60" cy="60" r="3" />
              <circle className="node" cx="340" cy="160" r="3" />
              <circle className="node" cx="560" cy="140" r="3" />
              <circle className="node" cx="740" cy="310" r="3" />
            </svg>
          </div>
          <div className="strike-wave-art" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" role="img" aria-label="Strike wave ripple">
              <defs>
                <style>{`
                  .ring {
                    fill: none;
                    stroke-width: 2;
                    transform-origin: 150px 150px;
                    animation: strikeWave 6000ms cubic-bezier(0.33, 0, 0.67, 1) infinite;
                  }
                  .r1 { stroke: var(--sh-organic-gold-primary, #C4A35A); animation-delay: 0ms; }
                  .r2 { stroke: var(--sh-organic-gold-light, #E0C97F); animation-delay: 800ms; }
                  .r3 { stroke: var(--sh-organic-liquid-glass-light, #8BC4A0); animation-delay: 1600ms; }
                  .r4 { stroke: var(--sh-organic-liquid-glass-ghost, #C8E6D0); animation-delay: 2400ms; }
                  .r5 { stroke: var(--sh-organic-ocean-primary, #5A8A8A); animation-delay: 3200ms; }
                  .core {
                    fill: var(--sh-organic-gold-primary, #C4A35A);
                    animation: strikeFlash 6000ms cubic-bezier(0.16, 1, 0.3, 1) infinite;
                  }
                  @keyframes strikeWave {
                    0% { opacity: 0; transform: scale(0.2); }
                    15% { opacity: 0.9; }
                    100% { opacity: 0; transform: scale(1.7); }
                  }
                  @keyframes strikeFlash {
                    0%, 70%, 100% { opacity: 0.25; r: 5px; }
                    74% { opacity: 1; r: 12px; }
                  }
                `}</style>
              </defs>

              <rect width="300" height="300" fill="transparent" />
              <circle className="ring r5" cx="150" cy="150" r="80" />
              <circle className="ring r4" cx="150" cy="150" r="65" />
              <circle className="ring r3" cx="150" cy="150" r="50" />
              <circle className="ring r2" cx="150" cy="150" r="35" />
              <circle className="ring r1" cx="150" cy="150" r="20" />
              <circle className="core" cx="150" cy="150" r="6" />
            </svg>
          </div>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">09 - Who It Is For</div>
        <h2 className="journey-title">When life runs hot</h2>
        <ul className="mt-4 list-disc pl-6 space-y-2 text-secondary">
          <li>anxiety / stress</li>
          <li>sleep</li>
          <li>overstimulation</li>
          <li>integration after intense periods</li>
        </ul>
        <div className="ds-glass mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
          <p className="text-secondary">Ready to downshift? Two paths. Same intention: rhythm and regulation.</p>
          <div className="btn-row !mb-0">
            <Link className="btn btn-primary" href="/contact">
              Book a 1:1
            </Link>
            <Link className="btn btn-secondary" href="/portfolio">
              Explore portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-label">08 - Live</div>
        <h2 className="journey-title">Sound Healing Live</h2>
        <p className="journey-sub">
          A weekly ritual to keep your nervous system tended. Join for a reset and return for
          rhythm.
        </p>
        <div className="ds-glass mt-6 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
          <p className="text-secondary max-w-2xl">
            Texts breathe. Elements ignite like nervous impulse. Keep it minimal. Keep it calm.
          </p>
          <div className="btn-row !mb-0">
            <Link className="btn btn-primary" href="/newsletter">
              Join the loop
            </Link>
            <Link className="btn btn-secondary" href="/sessions">
              See sessions
            </Link>
          </div>
        </div>
      </section>

      <PortfolioPreview />
      <TestimonialsPreview />

      <section className="journey-container journey-section" id="contact">
        <div className="journey-label">Contact</div>
        <h2 className="journey-title">Book a 1:1</h2>
        <p className="journey-sub">Three questions. I reply within 48 hours.</p>
        <div className="mt-6">
          <Link className="btn btn-primary" href="/contact">
            Start with a session
          </Link>
          <Link className="btn btn-secondary ml-3" href="/contact">
            Open contact
          </Link>
        </div>
        <NewsletterForm source="home" />
      </section>
    </main>
  );
}
