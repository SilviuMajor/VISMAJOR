import { Container } from "@/components/ui/Container";
import { PRODUCTS, CartGlyph } from "@/components/navlab/parts";

/** 03 — Inscription. Mark + a hairline rule + wide-tracked links; a dated
 *  right side. More classical, more air. */
export function NavInscription() {
  return (
    <div className="border-b border-[var(--hair)] bg-paper-0">
      <Container className="flex h-[78px] items-center justify-between">
        <div className="flex items-center gap-5">
          <a href="#" className="house text-[16px] text-ink-0" style={{ letterSpacing: "0.2em" }}>
            VIS·MAJOR
          </a>
          <span className="hidden h-5 w-px bg-[var(--hair-strong)] md:block" />
          <nav className="hidden items-center gap-6 md:flex">
            {PRODUCTS.map((p) => (
              <a key={p} href="#" className="caps-loose text-[10.5px] font-medium text-ink-3 transition-colors hover:text-ink-0" style={{ letterSpacing: "0.22em" }}>
                {p}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden caps-loose text-[10px] font-medium text-ink-3 lg:inline" style={{ letterSpacing: "0.22em" }}>
            Est · MMXXVI
          </span>
          <a href="#" className="hidden items-center rounded-[5px] border border-ink-0 px-4 py-1.5 text-[11px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0 md:inline-flex">
            Pre-order
          </a>
          <CartGlyph className="text-ink-0" />
        </div>
      </Container>
    </div>
  );
}
