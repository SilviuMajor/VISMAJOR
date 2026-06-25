import { Container } from "@/components/ui/Container";

/**
 * A small classical quote band placed near the top of each product page.
 * Italic Latin, a lighter translation. Lore lives in the framing, never in
 * the product or benefit copy.
 */
export function ProductQuote({
  latin,
  translation,
}: {
  latin: string;
  translation: string;
}) {
  return (
    <section className="border-b bg-paper-0" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-7 md:py-8">
        <p className="text-center text-[14.5px] leading-relaxed md:text-[15.5px]">
          <span className="italic text-ink-1">&ldquo;{latin}&rdquo;</span>
          <span className="text-ink-3"> &mdash; {translation}</span>
        </p>
      </Container>
    </section>
  );
}
