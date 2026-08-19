import type { ReactNode } from "react";

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

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type,
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "gold" | "whatsapp" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royalblue disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    primary: "bg-navy text-white hover:bg-royalblue",
    gold: "bg-gold text-navy hover:bg-[#c2ae8d]",
    whatsapp: "bg-green text-white hover:bg-[#005632]",
    outline: "border border-royalblue text-royalblue hover:bg-lightblue",
    ghost: "text-royalblue hover:bg-lightblue",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
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
  className = "",
}: {
  price: number;
  eur?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="text-lg font-bold text-navy">
        {price.toLocaleString("fr-FR")} <span className="text-sm font-semibold text-graytext">MAD</span>
      </span>
      {eur !== undefined && (
        <span className="text-sm text-graytext">
          ≈ {eur.toLocaleString("fr-FR")} €
        </span>
      )}
    </span>
  );
}

export function formatMAD(n: number) {
  return `${n.toLocaleString("fr-FR")} MAD`;
}