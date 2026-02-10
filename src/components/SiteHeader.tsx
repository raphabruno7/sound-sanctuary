import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-8 md:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-wide">
          Sound Sanctuary
        </Link>
        <nav className="flex gap-4 text-sm text-neutral-700">
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

