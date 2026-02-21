import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sound Healing",
  description:
    "How sound travels through the nervous system. The practice behind Sound Sanctuary sessions.",
};

export default function SoundHealingPage() {
  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section relative">
        <div className="journey-label">Sound Healing</div>
        <h1 className="journey-title">Sound as liquid light</h1>
        <p className="journey-sub">
          O som das tigelas percorre o sistema nervoso como a seiva percorre as nervuras de uma
          folha, encontrando caminhos e restaurando conexoes.
        </p>

        <div className="nervura-art" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" role="img" aria-label="draw-on-nervura">
            <defs>
              <style>{`
                .spine, .branch {
                  fill: none;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                }
                .spine {
                  stroke: var(--sh-organic-liquid-glass-forest, #2D5A3E);
                  stroke-width: 3;
                  stroke-dasharray: 320;
                  stroke-dashoffset: 320;
                  animation: slowDraw 8000ms cubic-bezier(0.33, 0, 0.67, 1) infinite;
                }
                .branch {
                  stroke: var(--sh-organic-liquid-glass-leaf, #5A9E6F);
                  stroke-width: 2;
                  stroke-dasharray: 120;
                  stroke-dashoffset: 120;
                  animation: branchDraw 8000ms cubic-bezier(0.33, 0, 0.67, 1) infinite;
                }
                .b1 { animation-delay: 900ms; }
                .b2 { animation-delay: 1300ms; }
                .b3 { animation-delay: 1700ms; }
                .b4 { animation-delay: 2200ms; }
                .b5 { animation-delay: 2700ms; }
                .b6 { animation-delay: 3200ms; }
                .node {
                  fill: var(--sh-organic-gold-primary, #C4A35A);
                  opacity: 0;
                  animation: dotAppear 8000ms cubic-bezier(0.37, 0, 0.63, 1) infinite;
                }
                .n1 { animation-delay: 2200ms; }
                .n2 { animation-delay: 2800ms; }
                .n3 { animation-delay: 3400ms; }
                .n4 { animation-delay: 4000ms; }
                .n5 { animation-delay: 4600ms; }
                .n6 { animation-delay: 5200ms; }
                @keyframes slowDraw {
                  0%, 8% { stroke-dashoffset: 320; opacity: 0.1; }
                  45%, 100% { stroke-dashoffset: 0; opacity: 0.8; }
                }
                @keyframes branchDraw {
                  0%, 20% { stroke-dashoffset: 120; opacity: 0; }
                  55%, 100% { stroke-dashoffset: 0; opacity: 0.7; }
                }
                @keyframes dotAppear {
                  0%, 40% { opacity: 0; transform: scale(0.5); }
                  55%, 90% { opacity: 1; transform: scale(1); }
                  100% { opacity: 0.2; }
                }
              `}</style>
            </defs>

            <path className="spine" d="M100 20 C102 80, 98 140, 100 200 C102 260, 98 320, 100 380" />
            <path className="branch b1" d="M100 70 C75 58, 52 58, 28 66" />
            <path className="branch b2" d="M100 110 C126 98, 148 98, 172 108" />
            <path className="branch b3" d="M100 150 C72 140, 50 144, 24 160" />
            <path className="branch b4" d="M100 195 C130 184, 154 190, 176 206" />
            <path className="branch b5" d="M100 245 C72 238, 48 246, 22 268" />
            <path className="branch b6" d="M100 300 C128 292, 152 304, 174 326" />

            <circle className="node n1" cx="28" cy="66" r="3" />
            <circle className="node n2" cx="172" cy="108" r="3" />
            <circle className="node n3" cx="24" cy="160" r="3" />
            <circle className="node n4" cx="176" cy="206" r="3" />
            <circle className="node n5" cx="22" cy="268" r="3" />
            <circle className="node n6" cx="174" cy="326" r="3" />
          </svg>
        </div>

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
          </div>

          <article className="ds-glass journey-card">
            <div className="journey-label">Princípio fundador</div>
            <h2 className="mt-3 ds-font-display ds-size-3xl ds-weight-light">Mechanism, without hype</h2>
            <p className="mt-4 text-secondary">
              Rhythm, resonance, and structured stillness create conditions where the system can
              settle and integrate.
            </p>
          </article>
        </div>
      </section>

      <section className="journey-container journey-section">
        <div className="ds-glass journey-card relative overflow-hidden">
          <svg
            className="jornada-art"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 700 320"
            role="img"
            aria-label="jornada-sonora"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <style>{`
                .membrane {
                  fill: rgba(242, 239, 232, 0.08);
                  stroke: rgba(242, 239, 232, 0.3);
                }
                .wave {
                  fill: none;
                  stroke: var(--sh-organic-gold-light, #E0C97F);
                  stroke-width: 2;
                  opacity: 0;
                  transform-origin: 120px 160px;
                  animation: jWave 8000ms cubic-bezier(0.33, 0, 0.67, 1) infinite;
                }
                .w2 { animation-delay: 700ms; }
                .w3 { animation-delay: 1400ms; }
                .nerve {
                  fill: none;
                  stroke: var(--sh-organic-liquid-glass-leaf, #5A9E6F);
                  stroke-width: 2;
                  stroke-dasharray: 180;
                  stroke-dashoffset: 180;
                  animation: nerveIllum 8000ms cubic-bezier(0.33, 0, 0.67, 1) infinite;
                }
                .n2 { animation-delay: 500ms; }
                .n3 { animation-delay: 1000ms; }
                .n4 { animation-delay: 1500ms; }
                .node {
                  fill: var(--sh-organic-gold-primary, #C4A35A);
                  opacity: 0.15;
                  animation: nodeGlow 8000ms cubic-bezier(0.37, 0, 0.63, 1) infinite;
                }
                .d2 { animation-delay: 600ms; }
                .d3 { animation-delay: 1200ms; }
                .d4 { animation-delay: 1800ms; }
                .d5 { animation-delay: 2400ms; }
                .d6 { animation-delay: 3000ms; }
                .impact { fill: var(--sh-organic-gold-primary, #C4A35A); }

                @keyframes jWave {
                  0%, 10% { opacity: 0; transform: scale(0.5); }
                  35% { opacity: 0.8; }
                  100% { opacity: 0; transform: scale(2.4); }
                }
                @keyframes nerveIllum {
                  0%, 18% { stroke-dashoffset: 180; opacity: 0; }
                  60%, 100% { stroke-dashoffset: 0; opacity: 0.9; }
                }
                @keyframes nodeGlow {
                  0%, 100% { opacity: 0.2; r: 3; }
                  50% { opacity: 1; r: 5; }
                }
              `}</style>
            </defs>

            <ellipse className="membrane" cx="430" cy="160" rx="235" ry="130" />
            <circle className="wave w1" cx="120" cy="160" r="18" />
            <circle className="wave w2" cx="120" cy="160" r="30" />
            <circle className="wave w3" cx="120" cy="160" r="42" />
            <circle className="impact" cx="190" cy="160" r="7" />

            <path className="nerve n1" d="M200 160 C280 150, 360 140, 460 110" />
            <path className="nerve n2" d="M200 160 C280 170, 360 180, 470 200" />
            <path className="nerve n3" d="M210 155 C300 130, 390 100, 520 90" />
            <path className="nerve n4" d="M210 165 C300 190, 390 220, 520 230" />

            <circle className="node d1" cx="300" cy="150" r="3" />
            <circle className="node d2" cx="360" cy="142" r="3" />
            <circle className="node d3" cx="430" cy="122" r="3" />
            <circle className="node d4" cx="330" cy="176" r="3" />
            <circle className="node d5" cx="410" cy="188" r="3" />
            <circle className="node d6" cx="500" cy="210" r="3" />
          </svg>
          <p className="text-secondary">O corpo humano é 70% água. O som viaja pela água.</p>
          <p className="text-secondary mt-2">O sistema nervoso está imerso nessa água.</p>
          <p className="text-secondary mt-2">
            Quando a tigela toca, a vibração encontra o líquido, se propaga como onda, e alcança
            cada nervo por dentro.
          </p>
          <p className="mt-3 ds-text-overline journey-breathe">
            O som reconstrói o sistema nervoso.
          </p>
        </div>
      </section>

      <div aria-hidden="true" className="journey-container">
        <svg
          className="vine-divider"
          viewBox="0 0 400 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Decorative vine islimi divider"
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
          <path
            d="M72 38C78 28 90 28 96 38C90 48 78 48 72 38Z"
            fill="var(--sh-organic-liquid-glass-light, #8BC4A0)"
            opacity="0.2"
          />
          <path
            d="M146 64C152 54 164 54 170 64C164 74 152 74 146 64Z"
            fill="var(--sh-organic-liquid-glass-light, #8BC4A0)"
            opacity="0.2"
          />
          <path
            d="M218 40C224 30 236 30 242 40C236 50 224 50 218 40Z"
            fill="var(--sh-organic-liquid-glass-light, #8BC4A0)"
            opacity="0.2"
          />
          <path
            d="M292 66C298 56 310 56 316 66C310 76 298 76 292 66Z"
            fill="var(--sh-organic-liquid-glass-light, #8BC4A0)"
            opacity="0.2"
          />
        </svg>
      </div>

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
