import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { TestimonialsPreview } from "@/components/TestimonialsPreview";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <section className="relative h-dvh overflow-hidden flex items-end">
        <Image
          src="/hero.jpg"
          alt="Soft natural landscape evoking calm and rest"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-neutral-900/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/35 via-neutral-900/10 to-transparent" />

        <div className="relative z-10 p-10 md:p-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl tracking-tight text-white">
            Sound Healing for a steadier nervous system.
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
            Through tone, vibration, and intentional rest, each session is designed to help your
            body move from overload into regulation and presence.
          </p>
          <div className="mt-6 flex gap-4 text-white/90">
            <Link className="underline underline-offset-4" href="/contact">
              Book a session
            </Link>
            <Link className="underline underline-offset-4" href="/portfolio">
              Explore portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-8 md:px-10 py-16">
        <h2 className="text-2xl md:text-3xl tracking-tight">Sound and the Nervous System</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed max-w-2xl">
          Sound Healing works through repetition, resonance, and breath pacing. These cues support
          downregulation, helping shift from chronic alertness into a calmer baseline where
          restoration is possible.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-8 md:px-10 pb-16">
        <h2 className="text-2xl md:text-3xl tracking-tight">What Happens in a Session</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed max-w-2xl">
          Sessions begin with a short check-in, followed by guided grounding and an immersive sound
          arc using bowls, gong, voice, and silence. We close with integration so the effects carry
          into daily life.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-8 md:px-10 pb-16">
        <h2 className="text-2xl md:text-3xl tracking-tight">Session Formats</h2>
        <ul className="mt-4 space-y-2 text-neutral-700">
          <li>1:1 Sessions: personalized support for stress, transitions, and recovery.</li>
          <li>Small Groups: shared regulation in intimate circles.</li>
          <li>Events and Retreat Collaborations: sound journeys for curated experiences.</li>
        </ul>
      </section>

      <section className="max-w-5xl mx-auto px-8 md:px-10 pb-16">
        <h2 className="text-2xl md:text-3xl tracking-tight">Who It Is For</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed max-w-2xl">
          This work is for people seeking nervous system support, deeper rest, emotional reset, or
          a non-verbal path to reconnection with body and breath.
        </p>
        <div className="mt-6 flex gap-4 text-neutral-800">
          <Link className="underline underline-offset-4" href="/contact">
            Start with a session
          </Link>
          <Link className="underline underline-offset-4" href="/portfolio">
            See previous work
          </Link>
        </div>
      </section>

      <PortfolioPreview />
      <TestimonialsPreview />

      <section className="max-w-5xl mx-auto px-8 md:px-10 pb-24" id="contact">
        <h2 className="text-2xl md:text-3xl tracking-tight">Contact</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed max-w-2xl">
          For sessions, collaborations, or events, reach out via WhatsApp or email.
        </p>

        <NewsletterForm source="home" />
      </section>
    </main>
  );
}
