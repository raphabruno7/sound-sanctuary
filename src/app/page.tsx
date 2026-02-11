import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { TestimonialsPreview } from "@/components/TestimonialsPreview";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <section className="relative flex min-h-[82svh] items-end overflow-hidden md:h-dvh">
        <Image
          src="/hero.jpg"
          alt="Soft natural landscape evoking calm and rest"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-neutral-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-neutral-900/26 to-neutral-900/8" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_76%,rgba(245,245,244,0.18),transparent_50%)]" />

        <div className="relative z-10 m-4 max-w-2xl rounded-3xl bg-neutral-950/18 px-6 py-8 backdrop-blur-[2px] sm:m-6 sm:px-8 sm:py-10 md:m-10 md:bg-transparent md:px-10 md:py-12 md:backdrop-blur-0">
          <h1 className="text-4xl leading-[1.06] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
            A place to slow down and listen.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/88 sm:text-lg md:mt-6">
            Through sound, stillness, and simple practices, this space supports your nervous system
            and helps you return to a steadier rhythm.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm tracking-[0.04em] text-white/92 sm:text-base">
            <a className="underline decoration-white/75 underline-offset-4 hover:decoration-white" href="#contact">
              Get in touch
            </a>
            <Link className="underline decoration-white/75 underline-offset-4 hover:decoration-white" href="/portfolio">
              View portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8 md:px-10 md:py-24">
        <h2 className="text-2xl leading-tight tracking-[-0.01em] md:text-3xl">About</h2>
        <p className="mt-5 max-w-2xl text-neutral-700 leading-relaxed">
          I offer sound-based and contemplative sessions with a simple, grounded approach, so you
          can soften, settle, and feel more at home in your body.
        </p>
        <div className="mt-7">
          <Link className="underline underline-offset-4 decoration-neutral-500 hover:decoration-neutral-800" href="/about">
            Read more
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 md:px-10 md:pb-24">
        <h2 className="text-2xl leading-tight tracking-[-0.01em] md:text-3xl">Offerings</h2>
        <ul className="mt-5 space-y-3 leading-relaxed text-neutral-700">
          <li>Sound Healing (Tibetan bowls, gong, ancestral instruments)</li>
          <li>Kundalini / Naad Yoga</li>
          <li>Numerology (integrative)</li>
        </ul>
      </section>

      <PortfolioPreview />
      <TestimonialsPreview />

      <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-8 md:px-10 md:pb-28" id="contact">
        <h2 className="text-2xl leading-tight tracking-[-0.01em] md:text-3xl">Contact</h2>
        <p className="mt-5 max-w-2xl text-neutral-700 leading-relaxed">
          For sessions, collaborations, or events, reach out via WhatsApp or email.
        </p>

        <NewsletterForm source="home" />
      </section>
    </main>
  );
}
