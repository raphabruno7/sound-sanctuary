"use client";

import { useRef, useState, useEffect } from "react";

/* =====================================================
   HeroStatusLine — minimal Claude Code status aesthetic
   Static "VOCE" + arrow over photo.
   Rotating glitch-style words in a status line.
   ===================================================== */

interface HeroStatusLineProps {
  youLabel: string;
  statusPhrases: string[];
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
      <circle className="hero-sl__ring hero-sl__r1" cx="100" cy="100" r="18" />
      <circle className="hero-sl__ring hero-sl__r2" cx="100" cy="100" r="34" />
      <circle className="hero-sl__ring hero-sl__r3" cx="100" cy="100" r="50" />
      <circle className="hero-sl__core" cx="100" cy="100" r="5" />
    </svg>
  );
}

function ArrowPointing() {
  /* Horizontal arrow pointing right toward the person lying on the right */
  return (
    <svg
      className="hero-you__arrow"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 24"
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="60" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <polyline points="52,6 64,12 52,18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
      {/* Static "VOCE" + arrow pointing right toward the person */}
      <div className={`hero-you ${visible ? "hero-you--visible" : ""}`}>
        <span className="hero-you__label">{props.youLabel}</span>
        <ArrowPointing />
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
      </div>
    </div>
  );
}
