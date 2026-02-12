import Link from "next/link";

export default function SessionsPage() {
  const primaryCta =
    "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <main>
      <h1>Sessions</h1>

      <section>
        <h2>Session Formats</h2>
      </section>

      <section>
        <h2>Preparation</h2>
      </section>

      <section>
        <h2>Booking Process</h2>
        <p>
          <Link href="/contact" className={primaryCta}>
            Book a session
          </Link>
        </p>
      </section>

      <section>
        <h2>Follow-Up</h2>
      </section>
    </main>
  );
}
