import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for Sound Sanctuary website visitors and newsletter subscribers.",
};

export default function Privacy() {
  return (
    <main className="min-h-dvh pb-24">
      <section className="journey-container journey-section">
        <div className="journey-label">Privacy</div>
        <h1 className="journey-title">Privacy</h1>
        <p className="journey-sub">
          A short, practical notice about what is collected and why. No hidden tracking and no
          data resale.
        </p>
      </section>

      <section className="journey-container journey-section">
        <div className="journey-grid-2 gap-6">
          <article className="ds-glass journey-card">
            <h2 className="ds-font-display ds-size-2xl ds-weight-light">What we collect</h2>
            <p className="mt-3 text-secondary">
              Your email address if you subscribe to the newsletter. If you contact us, you may
              also share your name and message content.
            </p>
          </article>
          <article className="ds-glass journey-card">
            <h2 className="ds-font-display ds-size-2xl ds-weight-light">What we use it for</h2>
            <p className="mt-3 text-secondary">
              Sending newsletter updates and replying to session inquiries. We do not sell your
              personal data.
            </p>
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
        <div className="journey-grid-2 gap-6">
          <article className="ds-glass journey-card">
            <h2 className="ds-font-display ds-size-2xl ds-weight-light">How to remove your data</h2>
            <p className="mt-3 text-secondary">
              Every newsletter email includes an unsubscribe link. You can also email us requesting
              removal.
            </p>
          </article>
          <article className="ds-glass journey-card">
            <h2 className="ds-font-display ds-size-2xl ds-weight-light">Cookies</h2>
            <p className="mt-3 text-secondary">
              We do not use advertising or tracking cookies. If anything changes in the future,
              this page will be updated.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
