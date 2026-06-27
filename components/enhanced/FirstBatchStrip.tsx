import { Container } from "@/components/ui/Container";

/**
 * A black strip carrying the first-batch count — same design as the Ticker
 * strip below the quote, so the classical quote sits framed between two dark
 * bands. Replaces the cramped two-line badge that used to live in the hero.
 */
export function FirstBatchStrip({ shipMonth }: { shipMonth: string }) {
  return (
    <div className="bg-ink-0 py-3.5 text-paper-0">
      <Container>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[10.5px] font-medium uppercase leading-none tracking-[0.13em]">
          <span className="inline-flex items-center gap-2 font-bold">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-paper-0" />
            2,000+ joined
          </span>
          <span className="text-paper-0/55">
            the first-batch list · ships {shipMonth}
          </span>
        </p>
      </Container>
    </div>
  );
}
