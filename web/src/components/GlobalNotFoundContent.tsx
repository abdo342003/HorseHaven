"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { EMAIL, INSTAGRAM_URL, PHONE_MAIN, PHONE_MAIN_TEL } from "@/lib/config";

const CONTENT = {
  fr: {
    tagline: "Le refuge pour l'excellence équestre",
    title: "Page introuvable",
    text: "La page que vous cherchez n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
    home: "/fr",
    dir: "ltr" as const,
  },
  ar: {
    tagline: "ملاذ التميّز الفروسي",
    title: "الصفحة غير موجودة",
    text: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    cta: "العودة إلى الصفحة الرئيسية",
    home: "/ar",
    dir: "rtl" as const,
  },
  en: {
    tagline: "The refuge for equestrian excellence",
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    cta: "Back to home",
    home: "/en",
    dir: "ltr" as const,
  },
};

export default function GlobalNotFoundContent() {
  const [locale, setLocale] = useState<"fr" | "ar" | "en">("fr");

  const c = CONTENT[locale];

  useEffect(() => {
    const seg = window.location.pathname.split("/")[1];
    const detected: "fr" | "ar" | "en" =
      seg === "ar" || seg === "en" ? seg : "fr";
    document.documentElement.lang = detected;
    document.documentElement.dir = CONTENT[detected].dir;
    if (detected !== locale) {
      const id = requestAnimationFrame(() => setLocale(detected));
      return () => cancelAnimationFrame(id);
    }
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-lightblue bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-5 sm:px-6">
          <Image
            src="/images/logo-mark.png"
            alt="Horse Haven"
            width={212}
            height={130}
            className="h-14 w-auto"
          />
          <span className="hidden flex-col leading-none lg:flex">
            <span className="font-display font-semibold tracking-[0.18em] text-navy text-xl">
              HORSE HAVEN
            </span>
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-graytext">
              {c.tagline}
            </span>
          </span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="text-center">
          <p className="font-display text-7xl font-bold text-navy/15 sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-wide text-navy">
            {c.title}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-graytext">{c.text}</p>
          <a
            href={c.home}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-semibold tracking-wide text-gold transition-colors hover:bg-royalblue"
          >
            {c.cta}
          </a>
        </div>
      </main>

      <footer className="border-t border-lightblue bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-graytext sm:flex-row sm:px-6 sm:text-left">
          <p className="font-semibold tracking-[0.18em] text-navy">
            HORSE HAVEN
          </p>
          <p>© {new Date().getFullYear()} Horse Haven</p>
          <div className="flex items-center gap-4">
            <a href={`tel:${PHONE_MAIN_TEL}`} className="hover:text-royalblue">
              {PHONE_MAIN}
            </a>
            <a href={`mailto:${EMAIL}`} className="hover:text-royalblue">
              {EMAIL}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-royalblue"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}