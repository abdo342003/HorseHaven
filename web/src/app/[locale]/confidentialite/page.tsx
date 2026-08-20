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
  return pageMetadata(locale, t("privacy.title"), t("privacy.description"), "confidentialite");
}
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <>
      <PageHero eyebrow={t("nav.home")} title={t("privacy.title")} />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-gold/30 bg-white p-8 shadow-sm">
            <p className="leading-relaxed text-graytext">{t("privacy.text")}</p>
          </div>
        </Container>
      </section>
    </>
  );
}