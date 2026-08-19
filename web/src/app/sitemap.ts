import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://horsehaven.store";

const ROUTES = [
  "",
  "/boutique",
  "/a-propos",
  "/contact",
  "/livraison-paiement",
  "/confidentialite",
  "/panier",
  "/commande",
];

function alternates(path: string) {
  return {
    languages: {
      fr: `${SITE_URL}${path === "" ? "" : path}`,
      ar: `${SITE_URL}/ar${path}`,
      en: `${SITE_URL}/en${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ROUTES.map((r) => ({
    url: `${SITE_URL}${r === "" ? "" : r}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.8,
    alternates: alternates(r),
  }));

  const products = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/boutique/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: alternates(`/boutique/${p.slug}`),
  }));

  return [...pages, ...products];
}