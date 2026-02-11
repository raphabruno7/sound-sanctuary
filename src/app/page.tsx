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

        <div className="relative z-10 p-10 md:p-16 max-w-xl">
          <h1 className="text-4xl md:text-6xl tracking-tight text-white">
            A place to slow down and listen.
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
            Through sound, stillness, and simple practices, this space supports your nervous system
            and helps you return to a steadier rhythm.
          </p>
          <div className="mt-6 flex gap-4 text-white/90">
            <a className="underline underline-offset-4" href="#contact">
              Get in touch
            </a>
            <Link className="underline underline-offset-4" href="/portfolio">
              View portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-8 md:px-10 py-16">
        <h2 className="text-2xl md:text-3xl tracking-tight">About</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed max-w-2xl">
          I offer sound-based and contemplative sessions with a simple, grounded approach, so you
          can soften, settle, and feel more at home in your body.
        </p>
        <div className="mt-6">
          <Link className="underline underline-offset-4" href="/about">
            Read more
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-8 md:px-10 pb-16">
        <h2 className="text-2xl md:text-3xl tracking-tight">Offerings</h2>
        <ul className="mt-4 space-y-2 text-neutral-700">
          <li>Sound Healing (Tibetan bowls, gong, ancestral instruments)</li>
          <li>Kundalini / Naad Yoga</li>
          <li>Numerology (integrative)</li>
        </ul>
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
