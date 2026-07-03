import { Container } from "@/components/ui/Container";
import { PRODUCTS, CartGlyph } from "@/components/navlab/parts";

/** 01 — Standard. Mark left, links, Pre-order + basket right. A clean refine of
 *  the current bar. */
export function NavStandard() {
  return (
    <div className="border-b border-[var(--hair)] bg-paper-0">
      <Container className="flex h-[68px] items-center justify-between">
        <a href="#" className="house text-[15px] text-ink-0">VIS·MAJOR</a>
        <nav className="hidden items-center gap-7 md:flex">
          {PRODUCTS.map((p) => (
            <a key={p} href="#" className="caps text-[11.5px] font-medium text-ink-3 transition-colors hover:text-ink-0">
              {p}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <a href="#" className="hidden items-center rounded-[5px] border border-[var(--hair-strong)] px-3.5 py-1.5 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0 md:inline-flex">
            Pre-order
          </a>
          <CartGlyph className="text-ink-0" />
        </div>
      </Container>
    </div>
  );
}
