import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import ProductBuy from "@/components/ProductBuy";
import ProductCard from "@/components/ProductCard";
import StickyBuyBar from "@/components/StickyBuyBar";
import { Container, Badge, PriceTag } from "@/components/ui";
import { PRODUCTS, getProductBySlug, getProductsByCategory, BADGE_COLOR } from "@/lib/products";
import { SITE_URL, formatPrice } from "@/lib/config";
import Image from "next/image";

const HERO_TRUST = ["delivery", "cod", "eu"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" | "en"; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const name = product.name[locale];
  const description = product.description[locale];
  const base = `${SITE_URL}/${locale === "fr" ? "" : `${locale}/`}boutique/${product.slug}`;
  return {
    title: name,
    description,
    alternates: {
      canonical: base,
      languages: {
        fr: `${SITE_URL}/boutique/${product.slug}`,
        ar: `${SITE_URL}/ar/boutique/${product.slug}`,
        en: `${SITE_URL}/en/boutique/${product.slug}`,
      },
    },
    openGraph: {
      title: name,
      description,
      type: "website",
      images: [{ url: `${SITE_URL}${product.image}`, width: 900, height: 900 }],
    },
  };
}

export function generateStaticParams() {
  return PRODUCTS.flatMap((p) =>
    (["fr", "ar", "en"] as const).map((locale) => ({ locale, slug: p.slug })),
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    description: product.description[locale],
    image: `${SITE_URL}${product.image}`,
    sku: product.id,
    brand: { "@type": "Brand", name: "Horse Haven" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/${locale === "fr" ? "" : `${locale}/`}boutique/${product.slug}`,
      priceCurrency: "MAD",
      price: product.price,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10),
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-10 sm:py-14">
        <Container>
          <nav aria-label="breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            <Link href="/" className="text-graytext transition-colors hover:text-navy">
              {t("nav.home")}
            </Link>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold" />
            <Link href="/boutique" className="text-graytext transition-colors hover:text-navy">
              {t("nav.shop")}
            </Link>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold" />
            <span className="line-clamp-1 font-semibold text-navy">{product.name[locale]}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-lightblue ring-1 ring-gold/40">
              <Image
                src={product.image}
                alt={product.name[locale]}
                width={800}
                height={800}
                priority
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <span className="absolute start-4 top-4">
                  <Badge color={BADGE_COLOR[product.badge]}>
                    {t(`product.${product.badge === "eu" ? "euOrigin" : product.badge}`)}
                  </Badge>
                </span>
              )}
              {product.inStock && (
                <span className="absolute end-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green shadow-sm">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" />
                  {t("product.inStock")}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <Link
                href={`/boutique?categorie=${product.category}`}
                className="text-sm font-semibold uppercase tracking-[0.25em] text-gold transition-colors hover:text-navy"
              >
                {t(`categories.${product.category}.name`)}
              </Link>
              <h1 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
                {product.name[locale]}
              </h1>
              <div className="mt-4">
                <PriceTag price={product.price} eur={product.priceEur} locale={locale} className="text-2xl" />
              </div>
              <p className="mt-5 leading-relaxed text-graytext">
                {product.description[locale]}
              </p>

              <div className="mt-6 border-t border-gold/30 pt-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  {t("product.highlights")}
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {product.highlights[locale].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-relaxed text-graytext"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="my-7 border-t border-gold/30" />

              <ProductBuy product={product} locale={locale} />

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-gold/30 pt-6">
                {HERO_TRUST.map((key, i) => (
                  <span key={key} className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-graytext">
                    {i > 0 && <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/70" />}
                    {t(`hero.stats.${key}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 font-display text-xl font-semibold text-navy sm:text-2xl">
                {t("boutique.related")}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
      <StickyBuyBar
        item={{
          id: product.id,
          slug: product.slug,
          name: product.name[locale],
          price: product.price,
          image: product.image,
          qty: 1,
        }}
        priceText={`${formatPrice(product.price, locale)} MAD`}
      />
      <div aria-hidden className="h-16 lg:hidden" />
    </>
  );
}