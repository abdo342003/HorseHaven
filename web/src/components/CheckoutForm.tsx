"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { formatPrice, FREE_SHIPPING, SHIPPING_FEE } from "@/lib/config";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { getCart, clearCart, cartTotal, CART_EVENT, type CartItem } from "@/lib/cart";
import { Container } from "@/components/ui";
import PageHero from "@/components/PageHero";
import { Link } from "@/i18n/navigation";

const PAYMENT_METHODS = ["cod", "transfer", "whatsapp"] as const;
type Payment = (typeof PAYMENT_METHODS)[number];

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: { name: string; phone: string; email: string; city: string; address: string; notes: string };
  payment: Payment;
  subtotal: number;
  shipping: number;
  total: number;
};

export const ORDERS_KEY = "hh-orders";

function newOrderStamp() {
  return {
    id: `HH-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
}

export default function CheckoutForm() {
  const locale = useLocale() as "fr" | "ar" | "en";
  const t = useTranslations();
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [payment, setPayment] = useState<Payment>("cod");
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    function refresh() {
      setItems(getCart());
    }
    function onReady() {
      setMounted(true);
    }
    refresh();
    onReady();
    window.addEventListener(CART_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CART_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const subtotal = cartTotal(items);
  const free = subtotal >= FREE_SHIPPING;
  const shipping = free ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t("checkout.errors.name");
    if (!/^[+0-9 ()-]{8,20}$/.test(form.phone.trim())) e.phone = t("checkout.errors.phone");
    if (!form.city.trim()) e.city = t("checkout.errors.city");
    if (!form.address.trim()) e.address = t("checkout.errors.address");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function loadOrders(): Order[] {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]") as Order[];
    } catch {
      return [];
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const stamp = newOrderStamp();
    const order: Order = {
      ...stamp,
      items,
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        notes: form.notes.trim(),
      },
      payment,
      subtotal,
      shipping,
      total,
    };
    const existing = loadOrders();
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing]));
    clearCart();
    router.push(`/confirmation/${order.id}`);
  }

  const inputCls =
    "w-full rounded-xl border border-gold/40 bg-panel px-4 py-2.5 text-sm text-ivory placeholder:text-graytext focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

  if (!mounted) {
    return (
      <>
        <PageHero eyebrow={t("nav.checkout")} title={t("checkout.title")} />
        <section className="py-16">
          <Container>
            <div className="min-h-[40vh]" />
          </Container>
        </section>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <PageHero eyebrow={t("nav.checkout")} title={t("checkout.title")} />
        <section className="py-16">
          <Container>
            <div className="rounded-2xl border border-gold/30 bg-panel px-6 py-16 text-center shadow-sm">
              <p className="font-display text-xl font-semibold text-ivory">
                {t("checkout.errors.cartEmpty")}
              </p>
              <Link
                href="/boutique"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-goldlight"
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
      <PageHero eyebrow={t("nav.checkout")} title={t("checkout.title")} />
      <section className="py-12 sm:py-14">
        <Container>
          <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.6fr_1fr]" noValidate>
            <div className="space-y-6">
              <div className="rounded-2xl border border-gold/30 bg-panel p-6 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-ivory">
                  {t("checkout.contactSection")}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="o-name" className="mb-1.5 block text-sm font-semibold text-ivory">
                      {t("checkout.name")} *
                    </label>
                    <input id="o-name" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
                    {errors.name && <p className="mt-1 text-xs font-semibold text-red">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="o-phone" className="mb-1.5 block text-sm font-semibold text-ivory">
                      {t("checkout.phone")} *
                    </label>
                    <input id="o-phone" dir="ltr" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+212 6 00 00 00 00" className={inputCls} />
                    {errors.phone && <p className="mt-1 text-xs font-semibold text-red">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="o-email" className="mb-1.5 block text-sm font-semibold text-ivory">
                      {t("checkout.email")}
                    </label>
                    <input id="o-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="o-city" className="mb-1.5 block text-sm font-semibold text-ivory">
                      {t("checkout.city")} *
                    </label>
                    <input id="o-city" value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
                    {errors.city && <p className="mt-1 text-xs font-semibold text-red">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="o-address" className="mb-1.5 block text-sm font-semibold text-ivory">
                      {t("checkout.address")} *
                    </label>
                    <input id="o-address" value={form.address} onChange={(e) => set("address", e.target.value)} className={inputCls} />
                    {errors.address && <p className="mt-1 text-xs font-semibold text-red">{errors.address}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="o-notes" className="mb-1.5 block text-sm font-semibold text-ivory">
                      {t("checkout.notes")}
                    </label>
                    <textarea id="o-notes" rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gold/30 bg-panel p-6 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-ivory">
                  {t("checkout.paymentSection")}
                </h2>
                <div className="mt-5 space-y-3" role="radiogroup" aria-label={t("checkout.paymentSection")}>
                  {PAYMENT_METHODS.map((key) => (
                    <label
                      key={key}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                        payment === key ? "border-gold bg-white/10" : "border-gold/40 bg-panel hover:border-gold/70"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={key}
                        checked={payment === key}
                        onChange={() => setPayment(key)}
                        className="mt-0.5 accent-[#D4B87A]"
                      />
                      <span>
                        <span className="block text-sm font-bold text-ivory">
                          {t(`checkout.paymentMethods.${key}.title`)}
                        </span>
                        <span className="mt-0.5 block text-xs text-graytext">
                          {t(`checkout.paymentMethods.${key}.desc`)}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-gold/30 bg-panel p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-semibold text-ivory">{t("checkout.summary")}</h2>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-lightblue ring-1 ring-gold/40">
                      <Image src={item.image ?? "/images/products/selle.svg"} alt={item.name} width={48} height={48} className="h-full w-full object-cover" />
                    </span>
                    <span className="flex-1">
                      <span className="block line-clamp-1 text-sm font-semibold text-ivory">{item.name}</span>
                      <span className="text-xs text-graytext">× {item.qty}</span>
                    </span>
                    <span className="text-sm font-bold text-ivory">
                      {formatPrice(item.price * item.qty, locale)} MAD
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2.5 border-t border-gold/30 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-graytext">{t("cart.subtotal")}</dt>
                  <dd className="font-semibold text-ivory">{formatPrice(subtotal, locale)} MAD</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-graytext">{t("cart.shipping")}</dt>
                  <dd className={`font-semibold ${free ? "text-green" : "text-ivory"}`}>
                    {free ? t("cart.shippingFree") : `${formatPrice(SHIPPING_FEE, locale)} MAD`}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gold/30 pt-3">
                  <dt className="font-semibold text-ivory">{t("cart.total")}</dt>
                  <dd className="font-display text-lg font-semibold text-ivory">
                    {formatPrice(total, locale)} MAD
                  </dd>
                </div>
              </dl>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gold px-6 py-3.5 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-goldlight"
              >
                {t("checkout.placeOrder")}
              </button>
              <Link
                href="/panier"
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-royalblue px-6 py-3 text-sm font-semibold text-royalblue transition-colors hover:bg-white/10"
              >
                {t("checkout.backToCart")}
              </Link>
            </aside>
          </form>
        </Container>
      </section>
    </>
  );
}