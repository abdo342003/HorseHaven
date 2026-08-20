import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { routing } from "@/i18n/routing";
import CartToast from "@/components/CartToast";
import "../globals.css";

const sourceSans = localFont({
  src: "../fonts/source-sans-3-var.woff2",
  variable: "--font-source-sans",
  weight: "400 700",
  display: "swap",
});

const cairo = localFont({
  src: "../fonts/cairo-var.woff2",
  variable: "--font-cairo",
  weight: "400 700",
  display: "swap",
});

const cinzel = localFont({
  src: "../fonts/cinzel-var.woff2",
  variable: "--font-cinzel",
  weight: "400 900",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://horsehaven.store";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default:
        locale === "ar"
          ? "Horse Haven — ملاذ التميّز الفروسي"
          : locale === "en"
            ? "Horse Haven — The refuge for equestrian excellence"
            : "Horse Haven — Le refuge pour l'excellence équestre",
      template: "%s — Horse Haven",
    },
    description:
      locale === "ar"
        ? "متجر إلكتروني لمعدات الفروسية: سروج، لجم، أغطية، منتجات العناية وملابس الفارس."
        : locale === "en"
          ? "Online equestrian store: saddles, numnahs, bridles, blankets, grooming and rider clothing."
          : "Boutique en ligne d'équipement équestre : selles, tapis, bridons, licols, couvertures, soins et vêtements du cavalier.",
    alternates: {
      canonical: `/${locale === "fr" ? "" : locale}`,
      languages: {
        fr: "/",
        ar: "/ar",
        en: "/en",
      },
    },
    openGraph: {
      title: "Horse Haven",
      description:
        locale === "ar"
          ? "متجر إلكتروني لمعدات الفروسية."
          : locale === "en"
            ? "Online equestrian store."
            : "Boutique en ligne d'équipement équestre.",
      locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_FR",
      type: "website",
      siteName: "Horse Haven",
      images: [{ url: locale === "ar" ? "/opengraph/og-en.png" : `/opengraph/og-${locale}.png`, width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://horsehaven.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Horse Haven",
        alternateName:
          locale === "ar" ? "هورس هافن" : locale === "en" ? "Horse Haven Maroc" : "Horse Haven Maroc",
        url: siteUrl,
        email: "hhorsehaven@gmail.com",
        telephone: "+3368510101",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+3368510101",
          contactType: "customer service",
          areaServed: "MA",
        },
      },
      {
        "@type": "WebSite",
        url: siteUrl,
        name: "Horse Haven",
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/boutique?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${sourceSans.variable} ${cairo.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
          <CartToast />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}