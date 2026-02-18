"use client";

export function ScapesEmpty({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="ds-glass journey-card relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
        <svg viewBox="0 0 900 420" width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M0 280 C140 240 220 310 340 270 C460 230 520 180 640 210 C760 240 820 330 900 300 L900 420 L0 420 Z"
            fill="var(--sh-organic-liquid-glass-ghost, #C8E6D0)"
          />
          <path
            d="M0 310 C160 270 250 350 370 320 C490 290 560 220 690 250 C820 280 860 360 900 340"
            fill="none"
            stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <path
            d="M40 170 C170 120 260 210 390 160 C520 110 610 60 760 120"
            fill="none"
            stroke="var(--sh-organic-gold-light, #E0C97F)"
            strokeWidth="1.2"
            opacity="0.7"
            strokeDasharray="6 10"
          />
        </svg>
      </div>

      <div className="relative">
        <h2 className="ds-font-display ds-size-2xl ds-weight-light">
          {title}
        </h2>
        <p className="mt-3 text-secondary max-w-2xl">{description}</p>
      </div>
    </div>
  );
}
