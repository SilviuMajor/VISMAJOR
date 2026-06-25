import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const EFFECTS = [
  {
    n: "01",
    t: "Firmer-Looking",
    b: "Massage draws blood to the surface, for skin that looks firmer and more toned.",
  },
  {
    n: "02",
    t: "Smoother",
    b: "Worked in slow strokes, the surface looks smoother and more even — the appearance of dimpling softened.",
  },
  {
    n: "03",
    t: "Worked & Recovered",
    b: "A massage ritual that leaves muscle feeling worked, eased and recovered.",
  },
];

/** Three effect cards — appearance and feel only. */
export function SculptEffects() {
  return (
    <section
      className="border-y bg-paper-1 py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {EFFECTS.map((e, i) => (
            <Reveal key={e.t} delay={i * 0.06}>
              <div
                className="flex h-full flex-col border bg-paper-2 p-7"
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="caps text-[10px] font-semibold text-ink-3">{e.n}</span>
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--ember)" }}
                  />
                </div>
                <h3 className="caps mt-8 text-[16px] font-bold text-ink-0" style={{ letterSpacing: "0.04em" }}>
                  {e.t}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-2">{e.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
