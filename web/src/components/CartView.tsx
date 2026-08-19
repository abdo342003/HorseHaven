"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getCart, updateQty, removeFromCart, cartTotal, type CartItem } from "@/lib/cart";
import { Container } from "@/components/ui";
import PageHero from "@/components/PageHero";

const FREE_SHIPPING = 1500;

export default function CartView() {
  const t = useTranslations();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    function refresh() {
      setItems(getCart());
    }
    refresh();
    window.addEventListener("hh-cart-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("hh-cart-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const subtotal = cartTotal(items);
  const free = subtotal >= FREE_SHIPPING;
  const total = free ? subtotal : subtotal + 30;

  if (items.length === 0) {
    return (
      <>
        <PageHero eyebrow={t("nav.cart")} title={t("cart.title")} />
        <section className="py-16">
          <Container>
            <div className="rounded-2xl border border-gold/30 bg-white px-6 py-16 text-center shadow-sm">
              <p className="font-display text-xl font-semibold text-navy">{t("cart.empty")}</p>
              <Link
                href="/boutique"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-[#c2ae8d]"
              >
                {t("cart.emptyCta")}
              </Link>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow={t("nav.cart")} title={t("cart.title")} />
      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-gold/30 bg-white p-4 shadow-sm"
                >
                  <Link href={`/boutique/${item.slug}`} className="shrink-0">
                    <span className="relative block h-20 w-20 overflow-hidden rounded-xl bg-lightblue ring-1 ring-gold/40">
                      <Image
                        src={item.image ?? "/images/products/selle.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/boutique/${item.slug}`}
                      className="line-clamp-1 font-semibold text-navy hover:text-royalblue"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-sm font-bold text-navy">
                      {item.price.toLocaleString("fr-FR")}{" "}
                      <span className="text-xs font-semibold text-graytext">MAD</span>
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center overflow-hidden rounded-lg border border-gold/50">
                        <button
                          type="button"
                          aria-label="-1"
                          disabled={item.qty <= 1}
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="h-8 w-8 text-base font-bold text-navy transition-colors hover:bg-lightblue disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-navy">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="+1"
                          disabled={item.qty >= 99}
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="h-8 w-8 text-base font-bold text-navy transition-colors hover:bg-lightblue disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-semibold text-red transition-colors hover:text-[#a32424]"
                      >
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl border border-gold/30 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-semibold text-navy">
                {t("checkout.summary")}
              </h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-graytext">
                    {t("cart.subtotal")}{" "}
                    <span className="text-xs">
                      ({items.length} {items.length > 1 ? t("cart.items") : t("cart.item")})
                    </span>
                  </dt>
                  <dd className="font-semibold text-navy">
                    {subtotal.toLocaleString("fr-FR")} MAD
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-graytext">{t("cart.shipping")}</dt>
                  <dd className={`font-semibold ${free ? "text-green" : "text-navy"}`}>
                    {free ? t("cart.shippingFree") : "30 MAD"}
                  </dd>
                </div>
                {!free && (
                  <p className="rounded-lg bg-lightblue px-3 py-2 text-xs text-graytext">
                    {t("cart.freeShippingHint", { amount: "1 500" })}
                  </p>
                )}
                <div className="flex justify-between border-t border-gold/30 pt-3">
                  <dt className="font-semibold text-navy">{t("cart.total")}</dt>
                  <dd className="font-display text-lg font-semibold text-navy">
                    {total.toLocaleString("fr-FR")} MAD
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/commande"
                  className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-3 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-[#c2ae8d]"
                >
                  {t("cart.checkout")}
                </Link>
                <Link
                  href="/boutique"
                  className="inline-flex items-center justify-center rounded-lg border border-royalblue px-6 py-3 text-sm font-semibold text-royalblue transition-colors hover:bg-lightblue"
                >
                  {t("cart.continueShopping")}
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}