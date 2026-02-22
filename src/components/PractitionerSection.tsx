import Image from "next/image";
import Link from "next/link";

interface PractitionerSectionProps {
  label: string;
  title: string;
  identity: string;
  p1: string;
  p2: string;
  cta: string;
}

export function PractitionerSection({
  label,
  title,
  identity,
  p1,
  p2,
  cta,
}: PractitionerSectionProps) {
  return (
    <section className="journey-container journey-section">
      <div className="journey-label">{label}</div>
      <div className="journey-grid-2 mt-6 items-start gap-8">
        <div className="journey-hero-media ds-glass relative overflow-hidden rounded-2xl aspect-[3/4]">
          <Image
            src="/media/practitioner/portrait.jpg"
            alt={title}
            fill
            sizes="(max-width: 980px) 100vw, 50vw"
            className="object-cover object-top"
          />
          <div className="journey-photo-vignette" aria-hidden="true" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="journey-title">{title}</h2>
          <p className="mt-2 ds-font-display ds-italic ds-weight-light ds-size-xl text-secondary">
            {identity}
          </p>
          <p className="mt-5 text-secondary leading-relaxed">{p1}</p>
          <p className="mt-3 text-secondary leading-relaxed">{p2}</p>
          <div className="mt-6">
            <Link className="btn btn-ghost" href="/about">
              {cta} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
