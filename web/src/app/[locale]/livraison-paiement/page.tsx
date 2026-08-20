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
            <div className="rounded-2xl border border-gold/30 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                <h2 className="font-display text-xl font-semibold text-navy">
                  {t("shippingPage.deliveryTitle")}
                </h2>
              </div>
              <p className="mt-4 leading-relaxed text-graytext">{t("shippingPage.deliveryText")}</p>
            </div>
            <div className="rounded-2xl border border-gold/30 bg-lightblue p-8">
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                <h2 className="font-display text-xl font-semibold text-navy">
                  {t("shippingPage.paymentTitle")}
                </h2>
              </div>
              <p className="mt-4 leading-relaxed text-graytext">{t("shippingPage.paymentText")}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}