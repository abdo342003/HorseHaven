import type { ReactNode } from "react";
import { formatPrice } from "@/lib/config";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  number,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  number?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`mb-8 ${centered ? "text-center" : "text-start"}`}>
      {(number || eyebrow) && (
        <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
          {centered && <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />}
          {number && <span className="font-display text-sm tracking-[0.25em] text-gold">{number}</span>}
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>
          )}
          {centered && <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />}
        </div>
      )}
      <h2 className="mt-2 font-display text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-graytext">{subtitle}</p>}
    </div>
  );
}

export function Badge({
  children,
  color = "gold",
}: {
  children: ReactNode;
  color?: "gold" | "green" | "red" | "royalblue";
}) {
  const colors: Record<string, string> = {
    gold: "bg-gold text-navy",
    green: "bg-green text-white",
    red: "bg-red text-white",
    royalblue: "bg-royalblue text-white",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${colors[color]}`}>
      {children}
    </span>
  );
}

export function PriceTag({
  price,
  eur,
  locale = "fr",
  className = "",
}: {
  price: number;
  eur?: number;
  locale?: "fr" | "ar" | "en";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="text-lg font-bold text-navy">
        {formatPrice(price, locale)} <span className="text-sm font-semibold text-graytext">MAD</span>
      </span>
      {eur !== undefined && (
        <span className="text-sm text-graytext">
          ≈ {formatPrice(eur, locale)} €
        </span>
      )}
    </span>
  );
}
