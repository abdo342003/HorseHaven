"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { addToCart } from "@/lib/cart";
import { Badge, PriceTag } from "@/components/ui";
import Image from "next/image";
import type { Product } from "@/lib/products";

const BADGE_COLOR: Record<string, "gold" | "green" | "red" | "royalblue"> = {
  new: "gold",
  promo: "red",
  eu: "green",
};

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations();
  const locale = useLocale() as "fr" | "ar" | "en";

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/boutique/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-lightblue"
      >
        <Image
          src={product.image}
          alt={product.name[locale]}
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 ease-luxury group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute start-3 top-3">
            <Badge color={BADGE_COLOR[product.badge]}>
              {t(`product.${product.badge === "eu" ? "euOrigin" : product.badge}`)}
            </Badge>
          </span>
        )}
        {product.inStock && (
          <span className="absolute end-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-green shadow-sm">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" />
            {t("product.inStock")}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/boutique/${product.slug}`}
          className="line-clamp-1 font-semibold text-navy transition-colors hover:text-royalblue"
        >
          {product.name[locale]}
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-graytext">
          {product.description[locale]}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <PriceTag price={product.price} eur={product.priceEur} />
          <button
            type="button"
            onClick={() =>
              addToCart({
                id: product.id,
                slug: product.slug,
                name: product.name[locale],
                price: product.price,
                image: product.image,
                qty: 1,
              })
            }
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gold px-3 py-2 text-xs font-bold text-navy shadow-sm transition-all duration-300 ease-luxury hover:bg-[#c2ae8d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100"
          >
            <svg aria-hidden className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 006 19h11M16 21a1 1 0 100-2 1 1 0 000 2zm-6 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {t("product.addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}