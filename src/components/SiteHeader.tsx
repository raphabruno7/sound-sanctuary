import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-neutral-50/70 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-50/55">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8 md:h-[4.5rem] md:px-10">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-[0.72rem] uppercase tracking-[0.28em] text-neutral-500 transition-colors group-hover:text-neutral-700">
            Sound
          </span>
          <span className="mt-1 text-base tracking-[0.04em] text-neutral-900">Sanctuary</span>
        </Link>
        <nav aria-label="Primary navigation" className="flex gap-5 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-600 sm:gap-6">
          <Link className="transition-colors hover:text-neutral-950" href="/portfolio">
            Portfolio
          </Link>
          <Link className="transition-colors hover:text-neutral-950" href="/about">
            About
          </Link>
          <Link className="transition-colors hover:text-neutral-950" href="/privacy">
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
