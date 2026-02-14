import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="ds-header">
      <div className="ds-header__inner mx-auto max-w-5xl">
        <Link href="/" className="ds-header__brand">
          Sound Sanctuary
        </Link>
        <div className="flex items-center gap-5">
          <nav aria-label="Primary navigation" className="flex gap-4">
            <Link className="ds-header__link" href="/sound-healing">
              Sound Healing
            </Link>
            <Link className="ds-header__link" href="/sessions">
              Sessions
            </Link>
            <Link className="ds-header__link" href="/portfolio">
              Portfolio
            </Link>
            <Link className="ds-header__link" href="/about">
              About
            </Link>
            <Link className="ds-header__link" href="/contact">
              Contact
            </Link>
            <Link className="ds-header__link" href="/privacy">
              Privacy
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link className="btn btn-primary" href="/contact">
              Book 1:1
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
