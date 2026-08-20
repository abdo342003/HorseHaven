"use client";

import { useEffect, useState } from "react";
import { PHONE_MAIN, PHONE_MAIN_TEL } from "@/lib/config";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getCart } from "@/lib/cart";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "shop", href: "/boutique" },
  { key: "about", href: "/a-propos" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      setCount(getCart().reduce((n, i) => n + i.qty, 0));
    };
    sync();
    window.addEventListener("hh-cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("hh-cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const localeLabel: Record<string, string> = { fr: "FR", ar: "ع", en: "EN" };
  const compact = scrolled || open;

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-luxury ${
          scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="relative bg-gradient-to-r from-navy via-[#223354] to-royalblue text-white">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px animate-[goldflow_7s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent_0%,rgba(212,197,169,0.75)_50%,transparent_100%)] bg-[length:200%_100%]"
            />
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-[11px] sm:px-6">
              <span className="hidden h-2.5 w-2.5 shrink-0 -rotate-45 bg-gold/60 lg:block" aria-hidden />

              <span className="flex items-center gap-2 font-medium tracking-[0.08em]">
                <svg className="h-3.5 w-3.5 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                  />
                </svg>
                {t("topbar.delivery")}
              </span>

              <span
                aria-hidden
                className="hidden h-1 w-1 shrink-0 rotate-45 bg-gold/70 lg:block"
              />

              <span className="hidden items-center gap-2 font-medium tracking-[0.08em] text-white/85 lg:flex">
                <svg className="h-3.5 w-3.5 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 3h12v18l-4.5-3-3.5 3-4-3V3Z"
                  />
                  <path strokeLinecap="round" d="M9 8h6M9 12h6" />
                </svg>
                {t("topbar.cod")}
              </span>

              <span
                aria-hidden
                className="hidden h-1 w-1 shrink-0 rotate-45 bg-gold/70 lg:block"
              />

              <a
                href={`tel:${PHONE_MAIN_TEL}`}
                dir="ltr"
                className="relative flex items-center gap-2 font-semibold tracking-wide transition-colors after:absolute after:-bottom-1 after:inset-x-0 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:text-gold hover:after:scale-x-100"
              >
                <svg className="h-3.5 w-3.5 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
                  />
                </svg>
                {PHONE_MAIN}
              </a>

              <span className="hidden h-2.5 w-2.5 shrink-0 -rotate-45 bg-gold/60 lg:block" aria-hidden />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`mx-auto w-full max-w-7xl px-4 transition-all duration-300 sm:px-6 ${
          compact ? "py-1.5" : "py-2.5"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex shrink-0 items-center md:hidden">
<button
              type="button"
              className="rounded-lg p-2 text-navy transition-colors hover:bg-lightblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royalblue md:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={t("nav.menu")}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="flex w-full items-center justify-center">
            <span
              aria-hidden
              className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-gold md:block"
            />
            <Link href="/" className="flex items-center gap-4 px-4" onClick={() => setOpen(false)}>
              <Image
                src="/images/logo-mark.png"
                alt="Horse Haven"
                width={212}
                height={130}
                priority
                className={`w-auto transition-all duration-300 ease-luxury ${
                  compact ? "h-12" : "h-16"
                }`}
              />
              <span className="hidden flex-col leading-none lg:flex">
                <span
                  className={`font-display font-semibold tracking-[0.18em] text-navy transition-all duration-300 ease-luxury ${
                    compact ? "text-xl" : "text-2xl"
                  }`}
                >
                  HORSE HAVEN
                </span>
                <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-graytext">
                  {t("hero.tagline")}
                </span>
              </span>
            </Link>
            <span
              aria-hidden
              className="hidden h-px flex-1 bg-gradient-to-l from-transparent via-gold/70 to-gold md:block"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <SearchBar />

            <div
              className="flex items-center overflow-hidden rounded-full border border-navy/15 text-xs font-semibold"
              role="group"
              aria-label={t("nav.langLabel")}
            >
              {routing.locales.map((locale) => (
                <Link
                  key={locale}
                  href={pathname}
                  locale={locale}
                  className={`px-2.5 py-1.5 transition-colors ${
                    currentLocale === locale
                      ? "bg-navy text-white"
                      : "text-graytext hover:bg-lightblue hover:text-navy"
                  }`}
                  aria-current={currentLocale === locale ? "page" : undefined}
                >
                  {localeLabel[locale]}
                </Link>
              ))}
            </div>

            <Link
              href="/panier"
              className="relative rounded-full bg-navy p-2.5 text-gold transition-colors hover:bg-royalblue"
              aria-label={t("nav.cart")}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 0 0 .9 1.4H19M10 21h.01M16 21h.01"
                />
              </svg>
              {count > 0 && (
                <span
                  key={count}
                  className="absolute -end-1.5 -top-1.5 flex h-5 min-w-5 animate-badge-pop items-center justify-center rounded-full bg-red px-1 text-[11px] font-bold text-white"
                >
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav
          className="mt-2 hidden items-center justify-center gap-1 border-t border-gold/40 pt-2 md:flex"
          aria-label={t("nav.menu")}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`relative rounded-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors after:absolute after:inset-x-4 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 after:ease-luxury hover:text-navy hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royalblue rtl:after:origin-right ${
                pathname === item.href
                  ? "text-navy after:scale-x-100"
                  : "text-graytext"
              }`}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div
          id="mobile-nav"
          className={`grid transition-[grid-template-rows] duration-300 ease-luxury md:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="mt-2 border-t border-gold/40 px-2 pb-2 pt-2" aria-label={t("nav.menu")}>
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center rounded-lg px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] transition-colors ${
                        pathname === item.href
                          ? "bg-lightblue text-navy"
                          : "text-graytext hover:bg-lightblue/60"
                      }`}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div aria-hidden className="h-px w-full bg-gold/60" />
    </header>
  );
}