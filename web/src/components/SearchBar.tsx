"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/lib/config";
import { Link } from "@/i18n/navigation";
import { PRODUCTS } from "@/lib/products";
import Image from "next/image";

export default function SearchBar() {
  const t = useTranslations();
  const locale = useLocale() as "fr" | "ar" | "en";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const q = query.trim().toLowerCase();
  const results = q
    ? PRODUCTS.filter((p) =>
        [p.name[locale], p.description[locale]].join(" ").toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  const magIcon = (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </svg>
  );

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={`hidden items-center overflow-hidden rounded-full border transition-all duration-300 ease-luxury md:flex ${
          open
            ? "w-72 border-navy/20 bg-lightblue"
            : "w-11 border-transparent bg-transparent"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="p-2.5 text-navy transition-colors hover:text-royalblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royalblue"
          aria-label={t("search.open")}
          aria-expanded={open}
        >
          {magIcon}
        </button>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          tabIndex={open ? 0 : -1}
          aria-hidden={!open}
          placeholder={t("search.placeholder")}
          aria-label={t("search.placeholder")}
          className={`w-full bg-transparent pe-4 text-sm text-ink outline-none placeholder:text-graytext ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-navy transition-colors hover:bg-lightblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royalblue md:hidden"
        aria-label={t("search.open")}
        aria-expanded={open}
      >
        {magIcon}
      </button>

      {open && (
        <div
          className="absolute inset-x-0 top-full z-40 mt-0 border-t border-gold/40 bg-white px-4 pb-4 pt-3 shadow-xl md:hidden"
          role="search"
        >
          <div className="flex items-center gap-2 rounded-full border border-navy/20 bg-lightblue px-4">
            <span className="text-navy">{magIcon}</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              aria-label={t("search.placeholder")}
              className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-graytext"
            />
          </div>
          {q !== "" && (
            <div className="mt-2 overflow-hidden rounded-xl border border-gold/40 bg-white">
              {results.length > 0 ? (
                <ul>
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/boutique/${p.slug}`}
                        onClick={close}
                        className="flex items-center gap-3 border-b border-gold/20 px-3 py-2.5 transition-colors hover:bg-lightblue"
                      >
                        <Image
                          src={p.image}
                          alt={p.name[locale]}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span className="flex-1 text-sm font-semibold text-navy">
                          {p.name[locale]}
                        </span>
                        <span className="text-sm font-semibold text-graytext">
                          {formatPrice(p.price, locale)} MAD
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-5 text-center text-sm text-graytext">
                  {t("search.empty")}
                </p>
              )}
              <Link
                href={`/boutique?q=${encodeURIComponent(query)}`}
                onClick={close}
                className="block px-4 py-2.5 text-center text-sm font-semibold text-navy transition-colors hover:bg-lightblue"
              >
                {t("search.allResults")}
              </Link>
            </div>
          )}
        </div>
      )}

      {open && q !== "" && (
        <div
          className="absolute end-0 top-full z-40 mt-2 hidden w-96 overflow-hidden rounded-xl border border-gold/40 bg-white shadow-xl md:block"
          role="search"
        >
          {results.length > 0 ? (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/boutique/${p.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 border-b border-gold/20 px-4 py-3 transition-colors hover:bg-lightblue"
                  >
                    <Image
                      src={p.image}
                      alt={p.name[locale]}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-lg object-cover"
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-navy">
                        {p.name[locale]}
                      </span>
                      <span className="block text-xs text-graytext">
                        {formatPrice(p.price, locale)} MAD
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-graytext">
              {t("search.empty")}
            </p>
          )}
          <Link
            href={`/boutique?q=${encodeURIComponent(query)}`}
            onClick={close}
            className="block border-t border-gold/30 px-4 py-2.5 text-center text-sm font-semibold text-navy transition-colors hover:bg-lightblue"
          >
            {t("search.allResults")}
          </Link>
        </div>
      )}
    </div>
  );
}