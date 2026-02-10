import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <section className="relative h-dvh overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-neutral-900/20" />

        <div className="relative z-10 p-10 md:p-16 max-w-xl">
          <h1 className="text-4xl md:text-6xl tracking-tight text-white">
            Sound. Silence. Sanctuary.
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
            A calm space for regulation, presence, and deep rest.
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
          Sound healing, music, and contemplative practices designed to support the nervous system
          with a minimal, grounded approach.
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

      <section className="max-w-5xl mx-auto px-8 md:px-10 pb-24" id="contact">
        <h2 className="text-2xl md:text-3xl tracking-tight">Contact</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed max-w-2xl">
          For sessions, collaborations, or events, reach out via WhatsApp or email. Newsletter
          signup will be added in M2.
        </p>
      </section>
    </main>
  );
}
