"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* =====================================================
   HeroStatusLine — minimal Claude Code status aesthetic
   Static "VOCE" + arrow over photo.
   Rotating glitch-style words in a status line.
   ===================================================== */

interface HeroStatusLineProps {
  youLabel: string;
  statusPhrases: string[];
  statusCta: string;
  ctaHref: string;
}

const PHRASE_INTERVAL = 3600;
const PHRASE_FADE = 500;

function StrikeWave() {
  return (
    <svg
      className="hero-sl__wave"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle className="hero-sl__ring hero-sl__r1" cx="100" cy="100" r="12" />
      <circle className="hero-sl__ring hero-sl__r2" cx="100" cy="100" r="24" />
      <circle className="hero-sl__ring hero-sl__r3" cx="100" cy="100" r="36" />
      <circle className="hero-sl__core" cx="100" cy="100" r="3" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      className="hero-you__arrow"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 48"
      aria-hidden="true"
    >
      <line x1="12" y1="0" x2="12" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <polyline points="6,34 12,42 18,34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroStatusLine(props: HeroStatusLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const [visible, setVisible] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseFading, setPhraseFading] = useState(false);

  // Intersection Observer — reveal on viewport entry
  useEffect(() => {
    if (hasStarted.current) return;

    const el = containerRef.current;
    if (!el) return;
    const target = el.closest(".home-hero") || el;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          setVisible(true);
        }
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Phrase rotation
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setPhraseFading(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % props.statusPhrases.length);
        setPhraseFading(false);
      }, PHRASE_FADE);
    }, PHRASE_INTERVAL);
    return () => clearInterval(interval);
  }, [visible, props.statusPhrases.length]);

  return (
    <div ref={containerRef} className="hero-sl">
      {/* Static "VOCE" + arrow */}
      <div className={`hero-you ${visible ? "hero-you--visible" : ""}`}>
        <span className="hero-you__label">{props.youLabel}</span>
        <ArrowDown />
      </div>

      {/* Status line */}
      <div
        className={`hero-sl__status ${visible ? "hero-sl__status--visible" : ""}`}
        aria-live="polite"
      >
        <StrikeWave />
        <span
          className={`hero-sl__phrase ${phraseFading ? "hero-sl__phrase--fading" : ""}`}
        >
          {props.statusPhrases[phraseIndex]}
        </span>
        <span className="hero-sl__dot" aria-hidden="true">&middot;</span>
        <Link href={props.ctaHref} className="hero-sl__cta">
          {props.statusCta} &rarr;
        </Link>
      </div>
    </div>
  );
}
