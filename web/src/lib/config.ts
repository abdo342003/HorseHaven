export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://horsehaven.store";

export const WA_NUMBER = "3368510101";
export const WA_URL = `https://wa.me/${WA_NUMBER}`;

export const PHONE_MAIN = "+33 6 85 10 1 01";
export const PHONE_MAIN_TEL = "+3368510101";
export const PHONE_SECONDARY = "+212 6 00 00 00 00";
export const PHONE_SECONDARY_TEL = "+212600000000";

export const EMAIL = "hhorsehaven@gmail.com";

export const INSTAGRAM_URL = "https://instagram.com/horse_haven.store";

export const FREE_SHIPPING = 1500;
export const SHIPPING_FEE = 30;

export function formatPrice(value: number, locale: "fr" | "ar" | "en" = "fr") {
  const lc = locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-FR";
  return value.toLocaleString(lc);
}