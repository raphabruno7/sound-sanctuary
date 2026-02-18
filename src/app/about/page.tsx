import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the sound healing and contemplative approach behind Sound Sanctuary sessions.",
};

export default function About() {
  return (
    <main className="min-h-dvh pb-24">
      <svg
        className="neuron-field-bg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 400"
        role="img"
        aria-label="Neuron field light"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <style>{`
            .bg { fill: #F8F6F1; }
            .dendrite { fill: none; stroke: rgba(59, 122, 84, 0.18); stroke-width: 1.2; }
            .node { fill: rgba(196, 163, 90, 0.75); animation: glowPulse 4000ms ease-in-out infinite; }
            .n2 { animation-delay: 500ms; }
            .n3 { animation-delay: 1000ms; }
            .n4 { animation-delay: 1500ms; }
            .n5 { animation-delay: 2000ms; }
            @keyframes glowPulse {
              0%, 100% { opacity: 0.5; r: 3; }
              50% { opacity: 1; r: 5; }
            }
          `}</style>
        </defs>
        <rect className="bg" width="600" height="400" />
        <path className="dendrite" d="M60 300 C140 220, 220 260, 300 180 C370 120, 450 140, 540 90" />
        <path className="dendrite" d="M70 120 C160 170, 220 120, 310 200 C390 270, 460 250, 550 310" />
        <path className="dendrite" d="M80 210 C170 200, 250 220, 340 170 C430 120, 500 150, 570 130" />
        <circle className="node n1" cx="140" cy="220" r="3" />
        <circle className="node n2" cx="260" cy="210" r="3" />
        <circle className="node n3" cx="340" cy="170" r="3" />
        <circle className="node n4" cx="450" cy="150" r="3" />
        <circle className="node n5" cx="520" cy="110" r="3" />
      </svg>

      <section className="journey-container journey-section">
        <div className="journey-label">About</div>
        <h1 className="journey-title">About</h1>
        <p className="journey-sub text-lg">
          My work brings together sound healing, music, and contemplative practice to create a calm
          and supportive space. Each session is paced gently, with care for how your body feels in the
          moment, so rest and regulation can happen naturally.
        </p>
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
        <div className="grid gap-6 md:grid-cols-2 text-muted-foreground leading-relaxed">
          <div className="space-y-2">
            <h2 className="ds-font-display ds-weight-light ds-size-2xl text-foreground">Approach</h2>
            <p>
              Rhythm, resonance, and silence are used intentionally to help the nervous system settle.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="ds-font-display ds-weight-light ds-size-2xl text-foreground">Sessions</h2>
            <p>
              Each session is paced slowly with clear openings and closings so integration feels natural.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
