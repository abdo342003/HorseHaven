import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata(locale, t("shippingPage.title"), t("shippingPage.description"), "livraison-paiement");
}

const CARDS = ["delivery", "fees", "delays", "payment"] as const;

export default async function ShippingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <>
      <PageHero eyebrow={t("nav.shop")} title={t("shippingPage.title")} />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {CARDS.map((key, i) => (
              <div
                key={key}
                className={`rounded-2xl border border-gold/30 p-8 ${i % 2 === 1 ? "bg-lightblue" : "bg-panel shadow-sm"}`}
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                  <h2 className="font-display text-xl font-semibold text-ivory">
                    {t(`shippingPage.${key}Title`)}
                  </h2>
                </div>
                <p className="mt-4 leading-relaxed text-graytext">{t(`shippingPage.${key}Text`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}