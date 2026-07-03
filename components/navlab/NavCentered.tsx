import { Container } from "@/components/ui/Container";
import { PRODUCTS, CartGlyph } from "@/components/navlab/parts";

/** 02 — Centered mark. Links left, VIS·MAJOR dead-centre, actions right.
 *  Symmetric and editorial. */
export function NavCentered() {
  return (
    <div className="border-b border-[var(--hair)] bg-paper-0">
      <Container className="relative flex h-[74px] items-center justify-between">
        <nav className="hidden items-center gap-6 md:flex">
          {PRODUCTS.map((p) => (
            <a key={p} href="#" className="caps text-[11px] font-medium text-ink-3 transition-colors hover:text-ink-0">
              {p}
            </a>
          ))}
        </nav>

        <a href="#" className="house absolute left-1/2 -translate-x-1/2 text-[17px] text-ink-0">
          VIS·MAJOR
        </a>

        <div className="flex items-center gap-3">
          <a href="#" className="hidden items-center rounded-[5px] border border-[var(--hair-strong)] px-3.5 py-1.5 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0 md:inline-flex">
            Pre-order
          </a>
          <CartGlyph className="text-ink-0" />
        </div>
      </Container>
    </div>
  );
}
