"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TasterModal } from "./TasterModal";

export function TasterSection() {
  const t = useTranslations("home");
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="journey-container journey-section text-center">
        <h2 className="journey-title">{t("taster.title")}</h2>
        <p className="journey-sub mx-auto max-w-2xl">{t("taster.description")}</p>
        <button className="btn btn-primary mt-6" onClick={() => setOpen(true)}>
          {t("taster.cta")}
        </button>
      </section>
      <TasterModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

