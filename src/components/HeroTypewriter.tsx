"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   HeroTypewriter — cross-dissolve sequence with status line
   One paragraph at a time. Types in → holds → fades out → next.
   After all segments, a persistent vibrating status line stays.
   ═══════════════════════════════════════════════════════════ */

interface HeroTypewriterProps {
  title: string;
  opening: string;
  p1: string;
  p2: string;
  reset: string;
  p3: string;
  p4: string;
  closing: string;
  statusPhrases: string[];
  statusCta: string;
  ctaHref: string;
}

interface Segment {
  text: string;
  className: string;
}

// ── Timing — slow, deliberate, human ──
const BASE_SPEED = 82;
const JITTER = 20;
const HOLD_AFTER_TYPING = 2800;
const DISSOLVE_DURATION = 1400;
const PHRASE_INTERVAL = 3600;
const PHRASE_FADE = 500;

function getPauseForChar(char: string): number {
  if (char === " ") return 30;
  if (char === ",") return 320;
  if (char === ".") return 800;
  if (char === "—") return 500;
  if (char === "?" || char === "!") return 650;
  if (char === ":") return 500;
  if (char === ";") return 320;
  if (char === "\n") return 400;
  return 0;
}

function jitter(): number {
  return (Math.random() - 0.5) * 2 * JITTER;
}

// ── Strike-wave inline SVG — refined concentric ripple ──
function StrikeWave() {
  return (
    <svg
      className="hero-tw__wave"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle className="hero-tw__ring hero-tw__r1" cx="100" cy="100" r="12" />
      <circle className="hero-tw__ring hero-tw__r2" cx="100" cy="100" r="24" />
      <circle className="hero-tw__ring hero-tw__r3" cx="100" cy="100" r="36" />
      <circle className="hero-tw__core" cx="100" cy="100" r="3" />
    </svg>
  );
}

export function HeroTypewriter(props: HeroTypewriterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const rafRef = useRef<number>(0);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [typedChars, setTypedChars] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "dissolving" | "done">("typing");
  const [entered, setEntered] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseFading, setPhraseFading] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const segments: Segment[] = useMemo(
    () => [
      { text: props.title, className: "hero-tw__title" },
      { text: props.opening, className: "hero-tw__body" },
      { text: props.p1, className: "hero-tw__body" },
      { text: props.p2, className: "hero-tw__body" },
      { text: props.reset, className: "hero-tw__accent" },
      { text: props.p3, className: "hero-tw__body" },
      { text: props.p4, className: "hero-tw__body" },
      { text: props.closing, className: "hero-tw__accent" },
    ],
    [props.title, props.opening, props.p1, props.p2, props.reset, props.p3, props.p4, props.closing]
  );

  // ── Reduced motion ──
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
      setActiveIndex(segments.length);
      setPhase("done");
    }
  }, [segments.length]);

  // ── Typewriter animation for active segment ──
  const typeSegment = useCallback(
    (segIdx: number) => {
      const text = segments[segIdx].text;
      let charIndex = 0;
      let waitUntil = 0;

      function step(time: number) {
        if (charIndex >= text.length) {
          setTypedChars(text.length);
          setTimeout(() => {
            setPhase("dissolving");
            setTimeout(() => {
              if (segIdx < segments.length - 1) {
                setTypedChars(0);
                setPhase("typing");
                setActiveIndex(segIdx + 1);
              } else {
                setPhase("done");
                setActiveIndex(segments.length);
              }
            }, DISSOLVE_DURATION);
          }, HOLD_AFTER_TYPING);
          return;
        }

        if (time < waitUntil) {
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        charIndex++;
        setTypedChars(charIndex);

        const currentChar = text[charIndex - 1];
        const charPause = getPauseForChar(currentChar);
        waitUntil = time + BASE_SPEED + jitter() + charPause;

        rafRef.current = requestAnimationFrame(step);
      }

      rafRef.current = requestAnimationFrame(step);
    },
    [segments]
  );

  // ── Trigger slide-up entrance on new segment ──
  useEffect(() => {
    if (activeIndex < 0 || activeIndex >= segments.length) return;
    setEntered(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, segments.length]);

  // ── Start typing when activeIndex changes ──
  useEffect(() => {
    if (reducedMotion) return;
    if (activeIndex < 0 || activeIndex >= segments.length) return;
    if (phase !== "typing") return;

    typeSegment(activeIndex);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, phase, reducedMotion, typeSegment, segments.length]);

  // ── Intersection Observer to start ──
  useEffect(() => {
    if (reducedMotion || hasStarted.current) return;

    const el = containerRef.current;
    if (!el) return;
    const target = el.closest(".home-hero") || el;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          setActiveIndex(0);
          setPhase("typing");
        }
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // ── Status line phrase rotation ──
  useEffect(() => {
    if (phase !== "done") return;
    const interval = setInterval(() => {
      setPhraseFading(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % props.statusPhrases.length);
        setPhraseFading(false);
      }, PHRASE_FADE);
    }, PHRASE_INTERVAL);
    return () => clearInterval(interval);
  }, [phase, props.statusPhrases.length]);

  // ── Render ──
  const activeText = activeIndex >= 0 && activeIndex < segments.length
    ? segments[activeIndex].text.slice(0, typedChars)
    : "";

  const activeClass = activeIndex >= 0 && activeIndex < segments.length
    ? segments[activeIndex].className
    : "";

  const showStatus = phase === "done" || activeIndex >= segments.length;

  return (
    <div
      ref={containerRef}
      className="hero-tw"
    >
      {/* One segment at a time — no accumulation */}
      {activeIndex >= 0 && activeIndex < segments.length && (
        <div
          className={`hero-tw__slide ${phase === "dissolving" ? "hero-tw__slide--out" : entered ? "hero-tw__slide--in" : ""}`}
        >
          <span className={activeClass}>{activeText}</span>
          {phase === "typing" && <span className="hero-tw__cursor" aria-hidden="true" />}
        </div>
      )}

      {/* Status line — vibrating phrases + CTA */}
      <div
        className={`hero-tw__status ${showStatus ? "hero-tw__status--visible" : ""}`}
        aria-live="polite"
      >
        <StrikeWave />
        <span
          className={`hero-tw__phrase ${phraseFading ? "hero-tw__phrase--fading" : ""}`}
        >
          {props.statusPhrases[phraseIndex]}
        </span>
        <span className="hero-tw__dot" aria-hidden="true">&middot;</span>
        <Link href={props.ctaHref} className="hero-tw__cta">
          {props.statusCta} &rarr;
        </Link>
      </div>
    </div>
  );
}
