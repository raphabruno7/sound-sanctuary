import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const primaryCta =
    "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 sm:px-8 md:px-10">
        <Link href="/" className="text-sm tracking-wide">
          Sound Sanctuary
        </Link>
        <div className="flex items-center gap-5">
          <nav aria-label="Primary navigation" className="flex gap-4 text-sm text-foreground/70">
            <Link className="hover:text-foreground" href="/portfolio">
              Portfolio
            </Link>
            <Link className="hover:text-foreground" href="/about">
              About
            </Link>
            <Link className="hover:text-foreground" href="/privacy">
              Privacy
            </Link>
          </nav>
          <Link className={primaryCta} href="/contact">
            Book
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
