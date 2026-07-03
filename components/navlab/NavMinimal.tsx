import { Container } from "@/components/ui/Container";
import { PRODUCTS, CartGlyph } from "@/components/navlab/parts";

/** 05 — Minimal. Lots of air, quiet type, a text-link Pre-order. Apothecary
 *  restraint. */
export function NavMinimal() {
  return (
    <div className="bg-paper-0">
      <Container className="flex h-[84px] items-center justify-between">
        <a href="#" className="house text-[15px] text-ink-0">VIS·MAJOR</a>
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-6 md:flex">
            {PRODUCTS.map((p) => (
              <a key={p} href="#" className="caps text-[10px] font-medium text-ink-3 transition-colors hover:text-ink-0">
                {p}
              </a>
            ))}
          </nav>
          <a href="#" className="hidden caps text-[10px] font-semibold text-ink-0 underline-offset-4 hover:underline md:inline">
            Pre-order
          </a>
          <CartGlyph className="text-ink-0" />
        </div>
      </Container>
    </div>
  );
}
