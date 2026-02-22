 "use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`ds-header header-transparent ${scrolled ? "header-scrolled" : ""}`}>
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
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle />
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
