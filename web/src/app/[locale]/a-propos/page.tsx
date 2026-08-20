import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata(locale, t("about.title"), t("about.description"), "a-propos");
}
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const values = t.raw("about.values") as string[];
  const audience = t.raw("about.audience") as string[];

  return (
    <>
      <PageHero eyebrow={t("nav.about")} title={t("about.title")} />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-gold/40">
              <Image
                src="/images/hero/cheval-fog.jpg"
                alt={t("about.title")}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div aria-hidden className="absolute inset-0 bg-navy/20 mix-blend-multiply" />
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="font-display text-2xl font-semibold text-navy">
                  {t("about.missionTitle")}
                </h2>
                <p className="mt-3 leading-relaxed text-graytext">{t("about.mission")}</p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-navy">
                  {t("about.visionTitle")}
                </h2>
                <p className="mt-3 leading-relaxed text-graytext">{t("about.vision")}</p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gold/30 bg-lightblue p-8">
              <h2 className="font-display text-xl font-semibold text-navy">
                {t("about.valuesTitle")}
              </h2>
              <ul className="mt-5 space-y-3">
                {values.map((v) => (
                  <li key={v} className="flex items-center gap-3 text-navy">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gold/30 bg-white p-8 shadow-sm">
              <h2 className="font-display text-xl font-semibold text-navy">
                {t("about.audienceTitle")}
              </h2>
              <ul className="mt-5 space-y-3">
                {audience.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-navy">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}