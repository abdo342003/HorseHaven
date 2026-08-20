import { getTranslations } from "next-intl/server";
import { WA_URL, INSTAGRAM_URL, EMAIL, PHONE_MAIN, PHONE_MAIN_TEL, PHONE_SECONDARY, PHONE_SECONDARY_TEL } from "@/lib/config";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Container } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata(locale, t("contact.title"), t("contact.description"), "contact");
}
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <>
      <PageHero eyebrow={t("nav.contact")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <ContactForm />

            <div className="space-y-4">
              <div className="rounded-2xl border border-gold/30 bg-lightblue p-6">
                <h2 className="font-display text-lg font-semibold text-navy">
                  {t("contact.phoneTitle")}
                </h2>
                <a href={`tel:${PHONE_MAIN_TEL}`} dir="ltr" className="mt-2 block font-semibold text-royalblue hover:text-navy">
                  {PHONE_MAIN}
                </a>
                <a href={`tel:${PHONE_SECONDARY_TEL}`} dir="ltr" className="mt-1 block text-sm text-graytext hover:text-navy">
                  {PHONE_SECONDARY}
                </a>
              </div>

              <div className="rounded-2xl border border-gold/30 bg-lightblue p-6">
                <h2 className="font-display text-lg font-semibold text-navy">
                  {t("contact.emailTitle")}
                </h2>
                <a href={`mailto:${EMAIL}`} dir="ltr" className="mt-2 block font-semibold text-royalblue hover:text-navy">
                  {EMAIL}
                </a>
              </div>

              <div className="rounded-2xl border border-gold/30 bg-lightblue p-6">
                <h2 className="font-display text-lg font-semibold text-navy">
                  {t("contact.socialTitle")}
                </h2>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-green hover:text-[#005632]"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                    {t("contact.whatsapp")}
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-royalblue hover:text-navy"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                    @horse_haven.store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}