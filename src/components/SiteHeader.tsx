"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on route change / resize past mobile */
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 769px)");
    function close() { setMenuOpen(false); }
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [menuOpen]);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={`ds-header header-transparent ${scrolled ? "header-scrolled" : ""}`}>
      <div className="ds-header__inner mx-auto max-w-5xl">
        <Link href="/" className="ds-header__brand" onClick={closeMenu}>
          Sound Sanctuary
        </Link>

        {/* Hamburger button — mobile only */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>

        {/* Desktop nav + actions */}
        <div className={`header-nav-group ${menuOpen ? "header-nav-group--open" : ""}`}>
          <nav aria-label="Primary navigation" className="header-nav">
            <Link className="ds-header__link" href="/sound-healing" onClick={closeMenu}>
              {t("soundHealing")}
            </Link>
            <Link className="ds-header__link" href="/sessions" onClick={closeMenu}>
              {t("sessions")}
            </Link>
            <Link className="ds-header__link" href="/portfolio" onClick={closeMenu}>
              {t("portfolio")}
            </Link>
            <Link className="ds-header__link" href="/about" onClick={closeMenu}>
              {t("about")}
            </Link>
            <Link className="ds-header__link" href="/contact" onClick={closeMenu}>
              {t("contact")}
            </Link>
          </nav>
          <div className="header-actions">
            <LanguageToggle />
            <ThemeToggle />
            <Link className="btn btn-primary" href="/contact" onClick={closeMenu}>
              {t("book")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
