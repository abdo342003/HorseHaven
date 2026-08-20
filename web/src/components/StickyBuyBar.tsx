"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { addToCart, type CartItem } from "@/lib/cart";

export default function StickyBuyBar({
  item,
  priceText,
}: {
  item: CartItem;
  priceText: string;
}) {
  const t = useTranslations("product");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-white/95 shadow-[0_-8px_24px_rgba(26,39,68,0.10)] backdrop-blur-md transition-transform duration-300 ease-luxury motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-semibold text-navy">
            {item.name}
          </p>
          <p className="mt-0.5 text-sm font-bold text-gold">
            {priceText}
          </p>
        </div>
        <button
          type="button"
          onClick={() => addToCart({ ...item, qty: 1 })}
          className="shrink-0 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-royalblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          {t("addToCart")}
        </button>
      </div>
    </div>
  );
}