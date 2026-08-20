import localFont from "next/font/local";
import "./globals.css";
import GlobalNotFoundContent from "@/components/GlobalNotFoundContent";

const sourceSans = localFont({
  src: "./fonts/source-sans-3-var.woff2",
  variable: "--font-source-sans",
  weight: "400 700",
  display: "swap",
});

const cairo = localFont({
  src: "./fonts/cairo-var.woff2",
  variable: "--font-cairo",
  weight: "400 700",
  display: "swap",
});

const cinzel = localFont({
  src: "./fonts/cinzel-var.woff2",
  variable: "--font-cinzel",
  weight: "400 900",
  display: "swap",
});

export default function GlobalNotFound() {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${sourceSans.variable} ${cairo.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalNotFoundContent />
      </body>
    </html>
  );
}