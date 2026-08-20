import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";
import { EMAIL } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata(locale, t("privacy.title"), t("privacy.description"), "confidentialite");
}

const SECTIONS = ["cookies", "retention", "rights", "contact"] as const;

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
          <div className="mx-auto max-w-3xl rounded-2xl border border-gold/30 bg-panel p-8 shadow-sm ring-1 ring-white/5 sm:p-10">
            <p className="leading-relaxed text-graytext">{t("privacy.text")}</p>

            <div className="mt-8 space-y-8">
              {SECTIONS.map((key) => (
                <div key={key}>
                  <h2 className="flex items-center gap-3 font-display text-lg font-semibold text-ivory">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    {t(`privacy.${key}Title`)}
                  </h2>
                  <p className="mt-3 leading-relaxed text-graytext">
                    {t(`privacy.${key}Text`)}
                    {key === "contact" && (
                      <>
                        {" "}
                        <a
                          href={`mailto:${EMAIL}`}
                          className="font-semibold text-royalblue underline-offset-2 hover:underline"
                          dir="ltr"
                        >
                          {EMAIL}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}