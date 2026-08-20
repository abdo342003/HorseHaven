import { Container } from "@/components/ui";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-12 sm:py-14">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,169,110,0.10),transparent_55%)]"
      />
      <Container className="relative">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-xl text-white/75">{subtitle}</p>}
      </Container>
    </section>
  );
}