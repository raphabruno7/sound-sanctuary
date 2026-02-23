"use client";

import { useRef, useState, useEffect, useMemo } from "react";

interface HeroTypewriterProps {
  label: string;
  title: string;
  opening: string;
  p1: string;
  p2: string;
  reset: string;
  p3: string;
  p4: string;
  closing: string;
}

interface Segment {
  text: string;
  tag: "span" | "p";
  className: string;
  pauseBefore: number;
}

const BASE_SPEED = 35;

function getPauseForChar(char: string): number {
  if (char === ",") return 150;
  if (char === ".") return 400;
  if (char === "—") return 200;
  if (char === "?" || char === "!") return 300;
  if (char === ":") return 200;
  if (char === ";") return 150;
  return 0;
}

export function HeroTypewriter(props: HeroTypewriterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);
  const rafRef = useRef<number>(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const segments: Segment[] = useMemo(
    () => [
      { text: props.label, tag: "span", className: "hero-tw__label", pauseBefore: 0 },
      { text: props.title, tag: "span", className: "hero-tw__title", pauseBefore: 300 },
      { text: props.opening, tag: "p", className: "hero-tw__body", pauseBefore: 600 },
      { text: props.p1, tag: "p", className: "hero-tw__body", pauseBefore: 600 },
      { text: props.p2, tag: "p", className: "hero-tw__body", pauseBefore: 600 },
      { text: props.reset, tag: "span", className: "hero-tw__reset", pauseBefore: 800 },
      { text: props.p3, tag: "p", className: "hero-tw__body", pauseBefore: 600 },
      { text: props.p4, tag: "p", className: "hero-tw__body", pauseBefore: 600 },
      { text: props.closing, tag: "p", className: "hero-tw__closing", pauseBefore: 1000 },
    ],
    [props.label, props.title, props.opening, props.p1, props.p2, props.reset, props.p3, props.p4, props.closing]
  );

  const { boundaries, totalChars } = useMemo(() => {
    const b: number[] = [];
    let total = 0;
    for (const seg of segments) {
      b.push(total);
      total += seg.text.length;
    }
    return { boundaries: b, totalChars: total };
  }, [segments]);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
      setDisplayedChars(totalChars);
    }
  }, [totalChars]);

  // Intersection Observer + animation in one effect — no dep on displayedChars
  useEffect(() => {
    if (reducedMotion || hasPlayed.current) return;

    const el = containerRef.current;
    if (!el) return;
    const target = el.closest(".home-hero") || el;

    function startAnimation() {
      let charIndex = 0;
      let currentSegIndex = 0;
      let waitUntil = 0;

      function findSegment(ci: number): { seg: number; pos: number } {
        for (let i = segments.length - 1; i >= 0; i--) {
          if (ci >= boundaries[i]) {
            return { seg: i, pos: ci - boundaries[i] };
          }
        }
        return { seg: 0, pos: 0 };
      }

      function step(time: number) {
        if (charIndex >= totalChars) {
          setDisplayedChars(totalChars);
          return;
        }

        if (time < waitUntil) {
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        const { seg, pos } = findSegment(charIndex);

        // Pause before new segment
        if (pos === 0 && seg !== currentSegIndex) {
          currentSegIndex = seg;
          const pause = segments[seg].pauseBefore;
          if (pause > 0) {
            waitUntil = time + pause;
            rafRef.current = requestAnimationFrame(step);
            return;
          }
        }

        charIndex++;
        setDisplayedChars(charIndex);

        const currentChar = segments[seg].text[pos];
        const charPause = getPauseForChar(currentChar);
        waitUntil = time + BASE_SPEED + charPause;

        rafRef.current = requestAnimationFrame(step);
      }

      rafRef.current = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          startAnimation();
        }
      },
      { threshold: 0 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, segments, boundaries, totalChars]);

  // Render
  const elements: React.ReactNode[] = [];
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const segStart = boundaries[i];
    const segEnd = segStart + seg.text.length;
    const visibleEnd = Math.min(displayedChars, segEnd);
    const visibleCount = Math.max(0, visibleEnd - segStart);

    if (visibleCount <= 0) continue;

    const visibleText = seg.text.slice(0, visibleCount);
    const Tag = seg.tag;

    elements.push(
      <Tag key={i} className={seg.className}>
        {visibleText}
      </Tag>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`hero-tw${reducedMotion ? " hero-tw--revealed" : ""}`}
      style={{ minHeight: "1em" }}
    >
      {elements}
    </div>
  );
}
