import { Container } from "@/components/ui/Container";

/**
 * A black strip carrying the first-batch count — same design as the Ticker
 * strip below the quote, so the classical quote sits framed between two dark
 * bands. Replaces the cramped two-line badge that used to live in the hero.
 */
export function FirstBatchStrip({
  count = "2,000+",
}: {
  count?: string;
  /** kept for call-site compatibility; no longer shown */
  shipMonth?: string;
}) {
  return (
    <div className="bg-ink-0 py-3.5 text-paper-0">
      <Container>
        <p className="flex items-center justify-center gap-2.5 text-center text-[11px] font-bold uppercase leading-none tracking-[0.14em]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-paper-0" />
          {count} pre-orders
        </p>
      </Container>
    </div>
  );
}
