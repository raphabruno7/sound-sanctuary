"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface HeroTypewriterProps {
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

type SegmentTag = "span" | "p";

type Segment = {
  key: string;
  tag: SegmentTag;
  cssClass: string;
  text: string;
  pauseBefore: number;
  pauseAfter: number;
};

function getCharPauseMs(character: string): number {
  switch (character) {
    case ",":
      return 150;
    case ".":
      return 400;
    case "—":
      return 200;
    case "\n":
      return 600;
    default:
      return 0;
  }
}

export function HeroTypewriter(props: HeroTypewriterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);

  const prefersReducedMotionRef = useRef<boolean | null>(null);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isReducedMotionRevealed, setIsReducedMotionRevealed] = useState(false);

  const segments = useMemo<Segment[]>(() => {
    return [
      {
        key: "label",
        tag: "span",
        cssClass: "hero-tw__label",
        text: props.label,
        pauseBefore: 0,
        pauseAfter: 0,
      },
      {
        key: "title",
        tag: "span",
        cssClass: "hero-tw__title",
        text: props.title,
        pauseBefore: 300,
        pauseAfter: 0,
      },
      {
        key: "opening",
        tag: "p",
        cssClass: "hero-tw__body",
        text: props.opening,
        pauseBefore: 600,
        pauseAfter: 0,
      },
      {
        key: "p1",
        tag: "p",
        cssClass: "hero-tw__body",
        text: props.p1,
        pauseBefore: 600,
        pauseAfter: 0,
      },
      {
        key: "p2",
        tag: "p",
        cssClass: "hero-tw__body",
        text: props.p2,
        pauseBefore: 600,
        pauseAfter: 0,
      },
      {
        key: "reset",
        tag: "span",
        cssClass: "hero-tw__reset",
        text: props.reset,
        pauseBefore: 800,
        pauseAfter: 0,
      },
      {
        key: "p3",
        tag: "p",
        cssClass: "hero-tw__body",
        text: props.p3,
        pauseBefore: 600,
        pauseAfter: 0,
      },
      {
        key: "p4",
        tag: "p",
        cssClass: "hero-tw__body",
        text: props.p4,
        pauseBefore: 600,
        pauseAfter: 0,
      },
      {
        key: "closing",
        tag: "p",
        cssClass: "hero-tw__closing",
        text: props.closing,
        pauseBefore: 1000,
        pauseAfter: 0,
      },
    ];
  }, [props]);

  const totalChars = useMemo(() => {
    return segments.reduce((acc, segment) => acc + segment.text.length, 0);
  }, [segments]);

  const segmentOffsets = useMemo(() => {
    let offset = 0;
    return segments.map((segment) => {
      const start = offset;
      offset += segment.text.length;
      return { start, end: offset, segment };
    });
  }, [segments]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observeTarget = node.parentElement ?? node;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasPlayedRef.current) return;
        hasPlayedRef.current = true;

        const prefersReducedMotion =
          prefersReducedMotionRef.current ??
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        prefersReducedMotionRef.current = prefersReducedMotion;

        if (prefersReducedMotion) {
          setDisplayedChars(totalChars);
          setIsReducedMotionRevealed(true);
          return;
        }

        const baseCharMs = 35;
        let currentIndex = 0;
        let nextCharAt = performance.now();

        const getSegmentForIndex = (index: number) => {
          for (const { start, end, segment } of segmentOffsets) {
            if (index >= start && index < end) return { start, end, segment };
          }
          return null;
        };

        const tick = (now: number) => {
          if (currentIndex >= totalChars) {
            rafIdRef.current = null;
            return;
          }

          if (now < nextCharAt) {
            rafIdRef.current = requestAnimationFrame(tick);
            return;
          }

          const segmentInfo = getSegmentForIndex(currentIndex);
          if (segmentInfo) {
            const { start, segment } = segmentInfo;
            if (currentIndex === start) {
              nextCharAt = now + segment.pauseBefore;
              rafIdRef.current = requestAnimationFrame(tick);
              return;
            }
          }

          let remaining = currentIndex;
          let typedChar = "";
          for (const segment of segments) {
            if (remaining < segment.text.length) {
              typedChar = segment.text[remaining] ?? "";
              break;
            }
            remaining -= segment.text.length;
          }

          currentIndex += 1;
          setDisplayedChars(currentIndex);

          const extraPauseMs = getCharPauseMs(typedChar);
          nextCharAt = now + baseCharMs + extraPauseMs;

          if (segmentInfo && currentIndex === segmentInfo.end) {
            nextCharAt += segmentInfo.segment.pauseAfter;
          }

          rafIdRef.current = requestAnimationFrame(tick);
        };

        rafIdRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(observeTarget);
    return () => observer.disconnect();
  }, [segmentOffsets, segments, totalChars]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div
      className={`hero-tw${isReducedMotionRevealed ? " hero-tw--revealed" : ""}`}
      ref={containerRef}
    >
      {segmentOffsets.map(({ start, end, segment }) => {
        const visibleCount = Math.min(
          Math.max(displayedChars - start, 0),
          end - start,
        );

        if (visibleCount <= 0) return null;
        const visibleText = segment.text.slice(0, visibleCount);

        if (segment.tag === "p") {
          return (
            <p key={segment.key} className={segment.cssClass}>
              {visibleText}
            </p>
          );
        }

        return (
          <span key={segment.key} className={segment.cssClass}>
            {visibleText}
          </span>
        );
      })}
    </div>
  );
}
