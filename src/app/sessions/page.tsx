import Link from "next/link";

export default function SessionsPage() {
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
          <Link href="/contact" className="underline underline-offset-4">
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
