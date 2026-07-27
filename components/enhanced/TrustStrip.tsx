import { Container } from "@/components/ui/Container";

/**
 * A black strip carrying the delivery terms — same design as the Ticker strip
 * below the quote, so the classical quote sits framed between two dark bands.
 * (Was the first-batch pre-order count; the house sells outright now, so it
 * carries the shipping line instead.)
 */
export function TrustStrip({ shipMonth }: { shipMonth?: string }) {
  const items = [
    shipMonth ? `Ships ${shipMonth}` : null,
    "Free UK delivery",
    "30-day returns",
    "Made in the UK",
  ].filter(Boolean) as string[];

  return (
    <div className="bg-ink-0 py-3.5 text-paper-0">
      <Container>
        <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-[11px] font-bold uppercase leading-none tracking-[0.14em]">
          {items.map((t, i) => (
            <span key={t} className="inline-flex items-center gap-2.5">
              {i > 0 && <span className="text-paper-0/40">·</span>}
              {t}
            </span>
          ))}
        </p>
      </Container>
    </div>
  );
}
