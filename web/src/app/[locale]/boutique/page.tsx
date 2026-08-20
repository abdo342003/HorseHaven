import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import ShopControls from "@/components/ShopControls";
import ProductCard from "@/components/ProductCard";
import { Container } from "@/components/ui";
import { CATEGORIES, PRODUCTS, type CategorySlug } from "@/lib/products";
import { SITE_URL } from "@/lib/config";

type SearchParams = {
  q?: string | string[];
  categorie?: string | string[];
  sort?: string | string[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("boutique.title"),
    description: t("boutique.description"),
    alternates: {
      canonical: `${SITE_URL}/${locale === "fr" ? "" : `${locale}/`}boutique`,
      languages: { fr: `${SITE_URL}/boutique`, ar: `${SITE_URL}/ar/boutique`, en: `${SITE_URL}/en/boutique` },
    },
  };
}

function first(v: string | string[] | undefined) {
  return typeof v === "string" ? v : undefined;
}

function isCategory(v: string | undefined): v is CategorySlug {
  return !!v && CATEGORIES.some((c) => c.slug === v);
}

export default async function BoutiquePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const locale = (params as unknown as Promise<{ locale: "fr" | "ar" | "en" }>);
  const { locale: l } = await locale;
  const t = await getTranslations({ locale: l });

  const sp = await searchParams;
  const q = (first(sp.q) ?? "").trim().toLowerCase();
  const category = isCategory(first(sp.categorie)) ? (first(sp.categorie) as CategorySlug) : null;
  const sort = first(sp.sort) ?? "relevance";

  let items = PRODUCTS.filter(
    (p) =>
      (!category || p.category === category) &&
      (!q ||
        p.name[l].toLowerCase().includes(q) ||
        p.description[l].toLowerCase().includes(q)),
  );

  switch (sort) {
    case "priceAsc":
      items = [...items].sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      items = [...items].sort((a, b) => b.price - a.price);
      break;
    case "newest":
      items = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
  }

  function chipHref(cat: string | null) {
    const p = new URLSearchParams();
    if (cat) p.set("categorie", cat);
    if (q) p.set("q", q);
    if (sort !== "relevance") p.set("sort", sort);
    const qs = p.toString();
    return qs ? `/boutique?${qs}` : "/boutique";
  }

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-12 sm:py-14">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,197,169,0.10),transparent_55%)]"
        />
        <Container className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            {t("nav.shop")}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
            {t("nav.shop")}
          </h1>
          <p className="mt-3 max-w-xl text-white/75">{t("boutique.subtitle")}</p>
        </Container>
      </section>

      <section className="py-10 sm:py-12">
        <Container>
          <div className="mb-6 rounded-2xl border border-gold/30 bg-lightblue p-4 sm:p-5">
            <ShopControls initialQ={first(sp.q) ?? ""} initialSort={sort} />
          </div>

          <nav aria-label={t("product.category")} className="mb-8 flex flex-wrap gap-2">
            <Link
              href={chipHref(null)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                !category
                  ? "bg-navy text-white"
                  : "border border-gold/50 bg-white text-navy hover:border-navy"
              }`}
            >
              {t("product.all")}
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={chipHref(cat.slug)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  category === cat.slug
                    ? "bg-navy text-white"
                    : "border border-gold/50 bg-white text-navy hover:border-navy"
                }`}
              >
                {t(`categories.${cat.slug}.name`)}
              </Link>
            ))}
          </nav>

          <p className="mb-6 text-sm text-graytext" aria-live="polite">
            {t("boutique.results", { count: items.length })}
          </p>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-gold/30 bg-white px-6 py-16 text-center shadow-sm">
              <svg aria-hidden className="mx-auto h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
              </svg>
              <p className="mt-4 font-semibold text-navy">{t("product.noResults")}</p>
              <Link
                href="/boutique"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royalblue"
              >
                {t("product.backToShop")}
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}