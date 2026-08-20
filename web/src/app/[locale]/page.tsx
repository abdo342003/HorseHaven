import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { Container, SectionHeading } from "@/components/ui";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { formatPrice, WA_URL, INSTAGRAM_URL } from "@/lib/config";
import Image from "next/image";

const HERO_STATS = ["delivery", "cod", "eu"] as const;
const WHY_ITEMS = ["quality", "advice", "eu", "passion"] as const;

const TESTIMONIALS_AVATARS = [
  "/images/testimonials/avatar-1.jpg",
  "/images/testimonials/avatar-2.jpg",
  "/images/testimonials/avatar-3.jpg",
];

const INSTA_IMAGES = [
  "/images/logo-circle.png",
  "/images/business-card.png",
  "/images/hero-gold.png",
  "/images/hero-dark.png",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" | "en" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const saddle = PRODUCTS.find((p) => p.slug === "selle-entree-de-gamme");
  const testimonials = t.raw("home.testimonials") as {
    name: string;
    city: string;
    quote: string;
  }[];
  const values = t.raw("home.values") as string[];
  const bullets = t.raw("home.bestsellerBullets") as string[];

  return (
    <>
      <Header />

      <main>
        <section className="relative grid overflow-hidden bg-navy lg:grid-cols-2">
          <div className="relative flex flex-col justify-center px-4 py-16 sm:px-10 lg:py-24 xl:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,197,169,0.10),transparent_55%)]"
            />
            <div className="relative max-w-xl">
              <div className="mb-8 inline-block rounded-2xl bg-white p-2.5 shadow-xl">
                <Image
                  src="/images/logo-mark.png"
                  alt="Horse Haven"
                  width={212}
                  height={130}
                  priority
                  className="h-20 w-auto sm:h-24"
                />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold sm:text-base">
                {t("hero.tagline")}
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-[0.08em] text-white sm:text-5xl xl:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-4 max-w-md text-lg text-white/80 sm:text-xl">
                {t("hero.subtitle")}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/boutique"
                  className="inline-flex items-center justify-center rounded-lg bg-gold px-8 py-3.5 text-base font-bold text-navy shadow-lg transition-colors hover:bg-[#c2ae8d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {t("hero.cta")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-4 border-t border-gold/30 pt-6 sm:gap-6">
                {HERO_STATS.map((key, i) => (
                  <div key={key} className="flex items-center gap-4 sm:gap-6">
                    {i > 0 && (
                      <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/70" />
                    )}
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-[13px]">
                      {t(`hero.stats.${key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-[640px]">
            <Image
              src="/images/hero/cheval-noir.jpg"
              alt={t("home.heroAlt")}
              fill
              priority
              className="object-cover object-[center_30%]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div aria-hidden className="absolute inset-0 bg-[#8B7355]/30 mix-blend-color" />
            <div
              aria-hidden
              className="absolute inset-y-0 start-0 hidden w-40 bg-gradient-to-r from-navy to-transparent lg:block"
            />
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gold/50 lg:hidden" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-2 ring-1 ring-gold/40 sm:inset-3"
            />
          </div>

          <a
            href="#univers"
            aria-label={t("home.scroll")}
            className="absolute bottom-5 start-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-gold/70 transition-colors hover:text-gold rtl:translate-x-1/2"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
              {t("home.scroll")}
            </span>
            <span className="relative h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-gold" />
            </span>
          </a>
        </section>

        <section className="border-b border-gold/30 bg-white py-12">
          <Container>
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow={t("home.valuesEyebrow")}
                title={values.join(" · ")}
              />
            </Reveal>
          </Container>
        </section>

        <section id="univers" className="py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                number="02"
                eyebrow={t("home.categoriesEyebrow")}
                title={t("home.categoriesTitle")}
                subtitle={t("home.categoriesSubtitle")}
              />
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/boutique?categorie=${cat.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-gold/40 bg-white p-6 text-center shadow-sm transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-gold/60 transition-transform duration-300 ease-luxury group-hover:scale-105">
                    <Image
                      src={cat.icon}
                      alt={t(`categories.${cat.slug}.name`)}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {t(`categories.${cat.slug}.name`)}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-sm text-graytext">
                    {t(`categories.${cat.slug}.desc`)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors duration-300 group-hover:text-navy">
                    {t("home.explore")}
                    <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {saddle && (
          <section className="relative overflow-hidden bg-navy py-14 sm:py-16">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,197,169,0.12),transparent_55%)]"
            />
            <Container className="relative">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <Reveal className="order-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gold/40">
                    <Image
                      src="/images/bestseller/saddle.jpg"
                      alt={saddle.name[locale]}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-navy/20 mix-blend-multiply"
                    />
                    <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy shadow-sm">
                      <svg aria-hidden className="h-3.5 w-3.5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
                      </svg>
                      {t("home.bestsellerEyebrow")}
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                    {t("home.bestsellerEyebrow")}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                    {saddle.name[locale]}
                  </h2>
                  <p className="mt-4 max-w-md text-white/75">{t("home.bestsellerText")}</p>
                  <ul className="mt-6 space-y-2.5">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-white/85">
                        <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <span className="font-display text-3xl font-semibold text-gold">
                      {formatPrice(saddle.price, locale)}{" "}
                      <span className="text-base text-white/60">MAD</span>
                    </span>
                    {saddle.priceEur !== undefined && (
                      <span className="text-sm text-white/60">
                        ≈ {formatPrice(saddle.priceEur, locale)} €
                      </span>
                    )}
                    <Link
                      href="/boutique"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-[#c2ae8d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      {t("home.bestsellerCta")}
                    </Link>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        )}

        <section className="bg-lightblue py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                number="04"
                eyebrow={t("home.featuredEyebrow")}
                title={t("home.featuredTitle")}
                subtitle={t("home.featuredSubtitle")}
              />
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royalblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royalblue"
              >
                {t("home.seeAll")}
              </Link>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                number="05"
                eyebrow={t("home.whyEyebrow")}
                title={t("home.whyTitle")}
                subtitle={t("home.whySubtitle")}
              />
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_ITEMS.map((key, i) => (
                <div
                  key={key}
                  className="relative rounded-xl border border-gold/30 bg-white p-6 pt-9 text-center shadow-sm"
                >
                  <span className="absolute -top-4 start-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-navy font-display text-sm text-gold rtl:translate-x-1/2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {t(`home.whyItems.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-graytext">
                    {t(`home.whyItems.${key}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-gold/30 bg-lightblue py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                number="06"
                eyebrow={t("home.testimonialsEyebrow")}
                title={t("home.testimonialsTitle")}
                subtitle={t("home.testimonialsSubtitle")}
              />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((item, i) => (
                <Reveal key={item.name} delay={i * 120}>
                  <figure className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm">
                    <div aria-hidden className="flex gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg key={s} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-graytext">
                      « {item.quote} »
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-gold/25 pt-4">
                      <Image
                        src={TESTIMONIALS_AVATARS[i]}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/60"
                      />
                      <div>
                        <p className="text-sm font-bold text-navy">{item.name}</p>
                        <p className="text-xs text-graytext">{item.city}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                number="07"
                eyebrow={t("home.instaEyebrow")}
                title={t("home.instaTitle")}
                subtitle={t("home.instaSubtitle")}
              />
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {INSTA_IMAGES.map((img) => (
                <a
                  key={img}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("home.instaEyebrow")}
                  className="group relative aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 ease-luxury group-hover:scale-110"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/45"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <svg className="h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 2c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.8.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.2.7-.3 1.8-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.8.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.7.2 1.8.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.8-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.2-.7.3-1.8.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.8-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.1-.7-.2-1.8-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.4a5.4 5.4 0 110 10.8 5.4 5.4 0 010-10.8zm0 2a3.4 3.4 0 100 6.8 3.4 3.4 0 000-6.8zm5.6-3.1a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6z" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royalblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royalblue"
              >
                <svg aria-hidden className="h-4 w-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 2c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.8.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.2.7-.3 1.8-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.8.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.7.2 1.8.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.8-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.2-.7.3-1.8.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.8-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.1-.7-.2-1.8-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.4a5.4 5.4 0 110 10.8 5.4 5.4 0 010-10.8zm0 2a3.4 3.4 0 100 6.8 3.4 3.4 0 000-6.8zm5.6-3.1a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6z" />
                </svg>
                {t("home.instaCta")}
              </a>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-navy py-14 sm:py-16">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,197,169,0.12),transparent_55%)]"
          />
          <Container className="relative">
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-start">
              <div>
                <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {t("home.contactTitle")}
                </h2>
                <p className="mt-2 text-white/75">{t("home.contactText")}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#005632] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                >
                  {t("home.whatsappCta")}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t("home.contactCta")}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}