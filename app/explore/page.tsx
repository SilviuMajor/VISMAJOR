import { Container } from "@/components/ui/Container";
import {
  HeroKinetic,
  HeroCinematic,
  HeroEditorial,
  HeroStatement,
  HeroPlinth,
} from "@/components/explore/Heroes";

export const metadata = {
  title: "GY-NO! — Landing Concepts · VIS MAJOR",
};

const CONCEPTS = [
  { n: "01", name: "Kinetic Wordmark", desc: "The live hero — giant GY-NO! with the product tucked in.", Comp: HeroKinetic },
  { n: "02", name: "Cinematic Classical", desc: "Full-bleed temple scene, product in-frame, white type.", Comp: HeroCinematic },
  { n: "03", name: "Editorial Split", desc: "Type left, the new angled product on a specimen card right.", Comp: HeroEditorial },
  { n: "04", name: "Statement Type", desc: "Type-forward on ink, product as a small accent.", Comp: HeroStatement },
  { n: "05", name: "Centred Plinth", desc: "Quiet luxury — product centred, minimal tracked type.", Comp: HeroPlinth },
];

function ConceptLabel({ n, name, desc }: { n: string; name: string; desc: string }) {
  return (
    <div className="sticky top-0 z-30 border-y bg-paper-0/95 backdrop-blur py-4" style={{ borderColor: "var(--hair)" }}>
      <Container className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="caps text-[11px] font-semibold text-ink-3">Concept {n}</span>
          <span className="text-[16px] font-bold tracking-tight text-ink-0 md:text-[18px]">{name}</span>
        </div>
        <span className="hidden caps text-[10.5px] font-medium text-ink-3 md:block">{desc}</span>
      </Container>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="bg-paper-0">
      {/* top bar */}
      <header className="border-b bg-paper-0 py-6" style={{ borderColor: "var(--hair-strong)" }}>
        <Container className="flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <span className="house text-[15px] font-light text-ink-0">VIS&nbsp;MAJOR</span>
            <span className="caps text-[10.5px] font-semibold text-ink-3">Landing Concepts</span>
          </div>
          <a href="/" className="caps inline-flex items-center gap-2 rounded-xs border border-[var(--hair-strong)] px-3 py-1.5 text-[11px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0">
            ← Back to site
          </a>
        </Container>
      </header>

      {/* intro */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-semibold text-ink-2">Explore · Hero Directions</span>
          </div>
          <h1 className="mt-6 max-w-3xl font-bold uppercase text-ink-0" style={{ fontSize: "clamp(34px, 5vw, 68px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}>
            Five takes on the first section.
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.6] text-ink-1">
            Same brand system, five different opening moves — from type-forward to
            cinematic to quiet-luxury. Scroll through and tell me which direction
            (or which mix) you want on the live site. Reference them by number.
          </p>
        </Container>
      </section>

      {/* concepts */}
      {CONCEPTS.map(({ n, name, desc, Comp }) => (
        <div key={n}>
          <ConceptLabel n={n} name={name} desc={desc} />
          <Comp />
        </div>
      ))}

      {/* footer note */}
      <footer className="border-t bg-ink-0 py-16 text-paper-0" style={{ borderColor: "var(--hair)" }}>
        <Container>
          <p className="caps-loose text-[11px] font-semibold text-paper-0/60">Pick a direction</p>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-paper-0/85">
            Tell me e.g. “Concept 03, but with the temple image from 02” and I’ll
            wire it onto the live homepage.
          </p>
          <a href="/" className="caps mt-8 inline-flex items-center gap-2.5 rounded-sm border border-paper-0 bg-paper-0 px-8 py-4 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0">
            ← Back to the live site
          </a>
        </Container>
      </footer>
    </div>
  );
}
