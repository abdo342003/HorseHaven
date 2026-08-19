"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CartToast() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    function show() {
      setVisible(true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 2600);
    }
    window.addEventListener("hh-cart-updated", show);
    return () => {
      window.removeEventListener("hh-cart-updated", show);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-6 start-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-luxury rtl:translate-x-1/2 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center gap-4 rounded-xl border border-gold/50 bg-navy px-5 py-3.5 shadow-2xl">
        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
        <p className="text-sm font-semibold text-white">{t("cart.added")}</p>
        <Link
          href="/panier"
          className="rounded-lg bg-gold px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-navy transition-colors hover:bg-[#c2ae8d]"
        >
          {t("nav.cart")}
        </Link>
      </div>
    </div>
  );
}