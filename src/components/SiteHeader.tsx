import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 sm:px-8 md:px-10">
        <Link href="/" className="text-sm tracking-wide">
          Sound Sanctuary
        </Link>
        <nav aria-label="Primary navigation" className="flex gap-4 text-sm text-neutral-700">
          <Link className="hover:text-neutral-950" href="/portfolio">
            Portfolio
          </Link>
          <Link className="hover:text-neutral-950" href="/about">
            About
          </Link>
          <Link className="hover:text-neutral-950" href="/privacy">
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
