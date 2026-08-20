"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { formatPrice, WA_URL } from "@/lib/config";
import { addToCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export default function ProductBuy({
  product,
  locale,
}: {
  product: Product;
  locale: "fr" | "ar" | "en";
}) {
  const t = useTranslations();
  const [qty, setQty] = useState(1);
  const out = !product.inStock;

  const waHref = `${WA_URL}?text=${encodeURIComponent(
    `${t("product.waMessage")} ${product.name[locale]} ×${qty} — ${formatPrice(product.price, locale)} MAD`,
  )}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-navy">{t("product.quantity")}</span>
        <div className="inline-flex items-center overflow-hidden rounded-lg border border-gold/50">
          <button
            type="button"
            aria-label={t("product.qtyDecrease")}
            disabled={out || qty <= 1}
            onClick={() => setQty((v) => Math.max(1, v - 1))}
            className="h-10 w-10 text-lg font-bold text-navy transition-colors hover:bg-lightblue disabled:opacity-40"
          >
            −
          </button>
          <span
            aria-live="polite"
            className="w-12 text-center font-display text-lg font-semibold text-navy"
          >
            {qty}
          </span>
          <button
            type="button"
            aria-label={t("product.qtyIncrease")}
            disabled={out || qty >= 99}
            onClick={() => setQty((v) => Math.min(99, v + 1))}
            className="h-10 w-10 text-lg font-bold text-navy transition-colors hover:bg-lightblue disabled:opacity-40"
          >
            +
          </button>
        </div>
        {out && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red/10 px-3 py-1 text-xs font-bold text-red">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
            {t("product.outOfStock")}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={out}
          onClick={() =>
            addToCart({
              id: product.id,
              slug: product.slug,
              name: product.name[locale],
              price: product.price,
              image: product.image,
              qty,
            })
          }
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-[#c2ae8d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50"
        >
          <svg aria-hidden className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 006 19h11M16 21a1 1 0 100-2 1 1 0 000 2zm-6 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          {t("product.addToCart")}
        </button>
        <a
          href={out ? undefined : waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={out}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-green px-6 py-3.5 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green ${
            out ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <svg aria-hidden className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a9.7 9.7 0 00-8.3 14.7L2 22l5.4-1.6A9.7 9.7 0 1012 2zm0 17.7c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.9.9-3.1-.2-.3A8 8 0 1112 19.7zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 01-2.4-1.5 9 9 0 01-1.7-2.1c-.2-.3 0-.4.1-.6s.3-.3.4-.5l.2-.3v-.5c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.3 5.3 0 001.1 2.8 12 12 0 004.6 4.1 15.4 15.4 0 001.5.6 3.7 3.7 0 001.7.1 2.8 2.8 0 001.8-1.3 2.3 2.3 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z" />
          </svg>
          {t("product.orderWhatsApp")}
        </a>
      </div>
    </div>
  );
}