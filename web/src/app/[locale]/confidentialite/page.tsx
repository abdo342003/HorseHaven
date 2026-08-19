import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";

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