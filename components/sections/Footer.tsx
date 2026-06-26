import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/products";

const LINKS = [
  { label: "Shipping & Returns", href: "#" },
  { label: "Contact", href: "mailto:hello@vismajor.co.uk" },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-ink-0 text-paper-0">
      <Container className="pb-12 pt-20 md:pt-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <a
              href="/"
              className="house inline-block"
              style={{ fontSize: "clamp(38px, 5vw, 72px)", lineHeight: 1 }}
            >
              VIS·MAJOR
            </a>
            <p className="caps mt-5 text-[11px] font-medium text-ink-3">
              Performance Topicals for Men · Est. MMXXVI
            </p>
            <p className="mt-7 max-w-[440px] text-[10px] leading-[1.8] text-ink-3">
              Cosmetic use only. Temporary effect. Not a treatment for any
              medical condition. GY-NO!, CHISEL and SHARP are products of Vis
              Major.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="caps-loose text-[11px] font-semibold text-ink-3">
              The House
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.href}
                    className="caps inline-flex items-center gap-2 text-[11.5px] font-semibold text-paper-0/90 transition-colors hover:text-paper-0"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--metal-300)" }}
                    />
                    {p.wordmark}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="caps-loose text-[11px] font-semibold text-ink-3">
              Quick Links
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="caps text-[11.5px] font-semibold text-paper-0/90 transition-colors hover:text-paper-0"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col items-start justify-between gap-3 border-t pt-7 md:flex-row md:items-center"
          style={{ borderColor: "rgba(244,242,236,0.16)" }}
        >
          <p className="caps text-[10px] font-medium text-ink-3">
            © {new Date().getFullYear()} VIS MAJOR LTD · Made in the UK
          </p>
          <p className="caps text-[10px] font-medium text-ink-3">
            One Job. Done Well.
          </p>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-ink-3">
          <span className="italic">Mens sana in corpore sano</span>
          <span className="text-ink-3/70"> — a sound mind in a sound body.</span>
        </p>
      </Container>
    </footer>
  );
}
