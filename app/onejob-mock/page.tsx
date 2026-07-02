import type { Metadata } from "next";
import { OneJobA, OneJobB, OneJobC, OneJobD } from "@/components/enhanced/OneJobVariants";

export const metadata: Metadata = {
  title: "One job — layout options · VIS MAJOR",
  description: "Internal mockup: four organisations of the PECTUS 'One job. Done well.' section.",
  robots: { index: false, follow: false },
};

function Label({ n, name, desc }: { n: string; name: string; desc: string }) {
  return (
    <div className="border-y bg-ink-0 py-5 text-paper-0" style={{ borderColor: "var(--hair)" }}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-4 gap-y-1 px-6">
        <span className="font-mono text-[13px] text-paper-0">Option {n}</span>
        <span className="caps text-[13px] font-semibold">{name}</span>
        <span className="text-[12.5px] text-paper-0/60">{desc}</span>
      </div>
    </div>
  );
}

export default function OneJobMockPage() {
  return (
    <main className="bg-paper-0">
      <div className="py-14 text-center">
        <h1 className="caps text-[12px] font-semibold text-ink-2">
          PECTUS · &ldquo;One job. Done well.&rdquo; — four layouts to choose from
        </h1>
      </div>
      <div id="opt-a">
        <Label n="A" name="Row of four" desc="Centred head, figure faint behind, four points across." />
        <OneJobA />
      </div>
      <div id="opt-b">
        <Label n="B" name="Figure + numbered list" desc="David prominent left, 01–04 vertical list right." />
        <OneJobB />
      </div>
      <div id="opt-c">
        <Label n="C" name="Product centrepiece" desc="Dispensed shot centre, two points each side." />
        <OneJobC />
      </div>
      <div id="opt-d">
        <Label n="D" name="Manifesto + figure" desc="Big headline & 2×2 left, David tall right." />
        <OneJobD />
      </div>
      <div className="py-24" />
    </main>
  );
}
