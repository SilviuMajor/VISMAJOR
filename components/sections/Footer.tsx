import { Container } from "@/components/ui/Container";

const LINKS = [
  { label: "Shipping & Returns", href: "#" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Contact", href: "mailto:hello@gy-no.co.uk" },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-ink-0 text-paper-0">
      <Container className="pb-12 pt-20 md:pt-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div
              className="house font-light"
              style={{ fontSize: "clamp(38px, 5vw, 72px)", lineHeight: 1 }}
            >
              VIS&nbsp;MAJOR
            </div>
            <p className="caps mt-5 text-[11px] font-medium text-ink-3">
              Performance Topicals for Men · Est. MMXXVI
            </p>
            <p className="mt-7 max-w-[440px] text-[10px] leading-[1.8] text-ink-3">
              Cosmetic use only. Temporary effect. Not a treatment for any
              medical condition. GY-NO!™ is a product of Vis Major.
            </p>
          </div>

          <div className="md:col-span-5">
            <p className="caps-loose text-[11px] font-semibold text-ink-3">
              Quick Links
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3">
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
            <p className="caps-loose mt-10 text-[11px] font-semibold text-ink-3">
              Home
            </p>
            <a
              href="https://gy-no.co.uk"
              className="mt-2 inline-block text-[22px] font-medium tracking-tight text-paper-0 hover:text-paper-0/70"
            >
              gy-no.co.uk
            </a>
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
      </Container>
    </footer>
  );
}
