"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { formatPrice, WA_URL } from "@/lib/config";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { clearCart } from "@/lib/cart";
import { ORDERS_KEY, type Order } from "@/components/CheckoutForm";
import { Container } from "@/components/ui";
import PageHero from "@/components/PageHero";

export default function ConfirmationView({ orderId }: { orderId: string }) {
  const locale = useLocale() as "fr" | "ar" | "en";
  const t = useTranslations();
  const [order, setOrder] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      clearCart();
      let stored: Order[] = [];
      try {
        stored = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]") as Order[];
      } catch {
        stored = [];
      }
      setOrder(stored.find((o) => o.id === orderId) ?? null);
      setMounted(true);
    }, 0);
    return () => clearTimeout(t);
  }, [orderId]);

  if (!mounted) {
    return (
      <>
        <PageHero eyebrow={t("nav.checkout")} title={t("confirmation.title")} />
        <section className="py-16">
          <Container>
            <div className="min-h-[40vh]" />
          </Container>
        </section>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <PageHero eyebrow={t("nav.home")} title={t("confirmation.title")} />
        <section className="py-16">
          <Container>
            <div className="rounded-2xl border border-gold/30 bg-white px-6 py-16 text-center shadow-sm">
              <p className="font-display text-xl font-semibold text-navy">{t("common.error")}</p>
              <Link
                href="/"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-[#c2ae8d]"
              >
                {t("confirmation.backHome")}
              </Link>
            </div>
          </Container>
        </section>
      </>
    );
  }

  const waHref = `${WA_URL}?text=${encodeURIComponent(
    t("confirmation.whatsappMsg", { order: order.id }),
  )}`;

  return (
    <>
      <PageHero eyebrow={t("nav.checkout")} title={t("confirmation.title")} />
      <section className="py-12 sm:py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-gold/30 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-2 w-2 rotate-45 bg-green" />
                <p className="text-sm font-bold uppercase tracking-wide text-green">
                  {t("confirmation.orderNumber")} {order.id}
                </p>
              </div>

              <h2 className="mt-6 font-display text-lg font-semibold text-navy">
                {t("confirmation.summary")}
              </h2>
              <ul className="mt-4 space-y-3">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-lightblue ring-1 ring-gold/40">
                      <Image src={item.image ?? "/images/products/selle.svg"} alt={item.name} width={48} height={48} className="h-full w-full object-cover" />
                    </span>
                    <span className="flex-1">
                      <span className="block line-clamp-1 text-sm font-semibold text-navy">{item.name}</span>
                      <span className="text-xs text-graytext">× {item.qty}</span>
                    </span>
                    <span className="text-sm font-bold text-navy">
                      {formatPrice(item.price * item.qty, locale)} MAD
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-5 space-y-2.5 border-t border-gold/30 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-graytext">{t("confirmation.payment")}</dt>
                  <dd className="font-semibold text-navy">
                    {t(`checkout.paymentMethods.${order.payment}.title`)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-graytext">{t("cart.shipping")}</dt>
                  <dd className={`font-semibold ${order.shipping === 0 ? "text-green" : "text-navy"}`}>
                    {order.shipping === 0 ? t("cart.shippingFree") : `${formatPrice(order.shipping, locale)} MAD`}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gold/30 pt-3">
                  <dt className="font-semibold text-navy">{t("confirmation.total")}</dt>
                  <dd className="font-display text-lg font-semibold text-navy">
                    {formatPrice(order.total, locale)} MAD
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#005632]"
                >
                  {t("confirmation.tracking")}
                </a>
                <Link
                  href="/"
                  className="inline-flex flex-1 items-center justify-center rounded-lg border border-royalblue px-6 py-3 text-sm font-semibold text-royalblue transition-colors hover:bg-lightblue"
                >
                  {t("confirmation.backHome")}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}