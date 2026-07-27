import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/products";

// Shipping, returns, privacy and terms were four thin pages; they are now two,
// /help and /legal. The footer keeps the five familiar labels and deep-links
// into the right anchor, so nothing here is a dead end.
const LINKS = [
  { label: "Contact", href: "/help#contact" },
  { label: "Shipping", href: "/help#shipping" },
  { label: "Returns", href: "/help#returns" },
  { label: "Terms", href: "/legal#terms" },
  { label: "Privacy", href: "/legal#privacy" },
];

export function Footer() {
  return (
    <footer
      className="border-t bg-ink-0 text-paper-0"
      style={{ borderColor: "var(--hair-inverse)" }}
    >
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
            <p className="caps mt-5 text-[11px] font-medium text-paper-0/70">
              Performance Topicals for Men · Est. MMXXVI
            </p>
            <p className="mt-7 max-w-[440px] text-[10px] leading-[1.8] text-paper-0/70">
              Cosmetic use only. Temporary effect. Not a treatment for any
              medical condition. PECTUS, SCULPT and STONE are products of Vis
              Major.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="caps-loose text-[11px] font-semibold text-paper-0/70">
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
              <li>
                <a
                  href="/steel"
                  className="caps inline-flex items-center gap-2 text-[11.5px] font-semibold text-paper-0/90 transition-colors hover:text-paper-0"
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--metal-300)" }}
                  />
                  STEEL
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="caps-loose text-[11px] font-semibold text-paper-0/70">
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
          style={{ borderColor: "var(--hair-inverse)" }}
        >
          <p className="caps text-[10px] font-medium text-paper-0/70">
            © {new Date().getFullYear()} VIS MAJOR LTD · Made in the UK
          </p>
          <p className="caps text-[10px] font-medium text-paper-0/70">
            One Job. Done Well.
          </p>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-paper-0/70">
          <span className="italic">Mens sana in corpore sano</span>
          <span className="text-paper-0/55">: a sound mind in a sound body.</span>
        </p>
      </Container>
    </footer>
  );
}
