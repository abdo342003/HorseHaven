"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";

export default function NotFoundContent() {
  const t = useTranslations();

  return (
    <section className="flex min-h-[60vh] items-center py-16">
      <Container>
        <div className="mx-auto max-w-md rounded-2xl border border-gold/30 bg-panel px-6 py-16 text-center shadow-sm">
          <p className="font-display text-6xl font-semibold text-gold">404</p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ivory">{t("notFound.title")}</h1>
          <p className="mt-2 text-graytext">{t("notFound.text")}</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-goldlight"
          >
            {t("notFound.cta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}