import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";

type Locale = "fr" | "ar" | "en";

export function pageMetadata(locale: Locale, title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale === "fr" ? "" : `${locale}/`}${path}`,
      languages: {
        fr: `${SITE_URL}/${path}`,
        ar: `${SITE_URL}/ar/${path}`,
        en: `${SITE_URL}/en/${path}`,
      },
    },
  };
}