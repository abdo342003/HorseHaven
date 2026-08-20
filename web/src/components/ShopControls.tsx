"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function ShopControls({
  initialQ,
  initialSort,
}: {
  initialQ: string;
  initialSort: string;
}) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(initialQ);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function update(search: string) {
    const qs = search.replace(/^[?&]/, "");
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }

  function onSearchChange(value: string) {
    setQ(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const sp = new URLSearchParams();
      if (value.trim()) sp.set("q", value.trim());
      if (initialSort !== "relevance") sp.set("sort", initialSort);
      update(sp.toString());
    }, 250);
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const sp = new URLSearchParams();
          if (q.trim()) sp.set("q", q.trim());
          if (initialSort !== "relevance") sp.set("sort", initialSort);
          update(sp.toString());
        }}
        className="relative flex-1"
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graytext"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("product.searchPlaceholder")}
          aria-label={t("product.searchPlaceholder")}
          className="w-full rounded-xl border border-gold/40 bg-panel py-2.5 ps-10 pe-4 text-sm text-ivory placeholder:text-graytext focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </form>
      <div className="flex items-center gap-3">
        <label
          htmlFor="sort"
          className="shrink-0 text-sm font-semibold text-ivory"
        >
          {t("product.sort")}
        </label>
        <select
          id="sort"
          value={initialSort}
          onChange={(e) => {
            const sp = new URLSearchParams();
            if (q.trim()) sp.set("q", q.trim());
            if (e.target.value !== "relevance") sp.set("sort", e.target.value);
            update(sp.toString());
          }}
          className="rounded-xl border border-gold/40 bg-panel px-3 py-2.5 text-sm text-ivory focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        >
          <option value="relevance">{t("product.sortRelevance")}</option>
          <option value="priceAsc">{t("product.sortPriceAsc")}</option>
          <option value="priceDesc">{t("product.sortPriceDesc")}</option>
          <option value="newest">{t("product.sortNewest")}</option>
        </select>
      </div>
    </div>
  );
}