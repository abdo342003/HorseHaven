import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Container } from "@/components/ui";

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
                <a href="tel:+3368510101" dir="ltr" className="mt-2 block font-semibold text-royalblue hover:text-navy">
                  +33 6 85 10 1 01
                </a>
                <a href="tel:+337061671" dir="ltr" className="mt-1 block text-sm text-graytext hover:text-navy">
                  07 06 16 71
                </a>
              </div>

              <div className="rounded-2xl border border-gold/30 bg-lightblue p-6">
                <h2 className="font-display text-lg font-semibold text-navy">
                  {t("contact.emailTitle")}
                </h2>
                <a href="mailto:hhorsehaven@gmail.com" dir="ltr" className="mt-2 block font-semibold text-royalblue hover:text-navy">
                  hhorsehaven@gmail.com
                </a>
              </div>

              <div className="rounded-2xl border border-gold/30 bg-lightblue p-6">
                <h2 className="font-display text-lg font-semibold text-navy">
                  {t("contact.socialTitle")}
                </h2>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href="https://wa.me/3368510101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-green hover:text-[#005632]"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                    {t("contact.whatsapp")}
                  </a>
                  <a
                    href="https://instagram.com/horse_haven.store"
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