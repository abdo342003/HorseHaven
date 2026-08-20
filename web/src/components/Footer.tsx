import { useTranslations } from "next-intl";
import { EMAIL, INSTAGRAM_URL, PHONE_MAIN, PHONE_MAIN_TEL, PHONE_SECONDARY, PHONE_SECONDARY_TEL } from "@/lib/config";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";
import Image from "next/image";

const BADGES = [
  { key: "quality", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { key: "secure", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { key: "delivery", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
  { key: "support", icon: "M18.364 5.636a9 9 0 010 12.728m-4.243-8.485a4 4 0 010 5.657m-5.657 0a4 4 0 010-5.657m-4.243 8.485a9 9 0 010-12.728" },
] as const;

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-auto bg-navy text-white">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {BADGES.map((badge) => (
            <div
              key={badge.key}
              className="flex items-center gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-bold">{t(`footer.badges.${badge.key}.title`)}</span>
                <span className="text-xs text-white/60">{t(`footer.badges.${badge.key}.text`)}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-white p-1.5 leading-none">
                <Image src="/images/logo-sm.png" alt="Horse Haven" width={120} height={36} className="h-9 w-auto" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-wide text-gold">HORSE HAVEN</span>
                <span className="text-[11px] uppercase tracking-widest text-white/60">
                  {t("footer.tagline")}
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              {t("meta.description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gold">{t("footer.shop")}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/boutique" className="text-white/75 transition-colors hover:text-gold">
                  {t("nav.shop")}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-white/75 transition-colors hover:text-gold">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/75 transition-colors hover:text-gold">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gold">{t("footer.contactTitle")}</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li>
                <a href={`tel:${PHONE_MAIN_TEL}`} dir="ltr" className="hover:text-gold">
                  {PHONE_MAIN}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_SECONDARY_TEL}`} dir="ltr" className="hover:text-gold">
                  {PHONE_SECONDARY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-gold" dir="ltr">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold" dir="ltr">
                  @horse_haven.store
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Horse Haven. {t("footer.rights")}</span>
          <div className="flex gap-5">
            <Link href="/livraison-paiement" className="hover:text-gold">
              {t("footer.shipping")}
            </Link>
            <Link href="/confidentialite" className="hover:text-gold">
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}