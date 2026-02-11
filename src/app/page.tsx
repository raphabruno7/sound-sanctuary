import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { TestimonialsPreview } from "@/components/TestimonialsPreview";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <section className="relative min-h-[80svh] overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Soft natural landscape evoking calm and rest"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-neutral-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-neutral-900/20 to-transparent" />

        <div className="relative z-10 max-w-xl px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16">
          <h1 className="text-4xl text-white sm:text-5xl md:text-6xl">
            A place to slow down and listen.
          </h1>
          <p className="mt-4 text-base text-white/85 sm:text-lg">
            Through sound, stillness, and simple practices, this space supports your nervous system
            and helps you return to a steadier rhythm.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90 sm:text-base">
            <a className="underline underline-offset-4" href="#contact">
              Get in touch
            </a>
            <Link className="underline underline-offset-4" href="/portfolio">
              View portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8 md:px-10">
        <h2 className="text-2xl md:text-3xl">About</h2>
        <p className="mt-4 max-w-2xl text-neutral-700 leading-relaxed">
          I offer sound-based and contemplative sessions with a simple, grounded approach, so you
          can soften, settle, and feel more at home in your body.
        </p>
        <div className="mt-6">
          <Link className="underline underline-offset-4" href="/about">
            Read more
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 md:px-10">
        <h2 className="text-2xl md:text-3xl">Offerings</h2>
        <ul className="mt-4 space-y-2 text-neutral-700">
          <li>Sound Healing (Tibetan bowls, gong, ancestral instruments)</li>
          <li>Kundalini / Naad Yoga</li>
          <li>Numerology (integrative)</li>
        </ul>
      </section>

      <PortfolioPreview />
      <TestimonialsPreview />

      <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-8 md:px-10" id="contact">
        <h2 className="text-2xl md:text-3xl">Contact</h2>
        <p className="mt-4 max-w-2xl text-neutral-700 leading-relaxed">
          For sessions, collaborations, or events, reach out via WhatsApp or email.
        </p>

        <NewsletterForm source="home" />
      </section>
    </main>
  );
}
