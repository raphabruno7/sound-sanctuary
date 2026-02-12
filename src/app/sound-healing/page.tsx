export default function SoundHealingPage() {
  const primaryCta =
    "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <main>
      <h1>Sound Healing</h1>

      <section>
        <h2>What Sound Healing Is</h2>
      </section>

      <section>
        <h2>System Nervous Framework</h2>
      </section>

      <section>
        <h2>Who This Is For</h2>
      </section>

      <section>
        <h2>What to Expect</h2>
      </section>

      <section>
        <h2>Booking</h2>
        <p>
          <a className={primaryCta} href="/contact">
            Book a session
          </a>
        </p>
      </section>
    </main>
  );
}
