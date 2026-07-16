import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function HouseStrip() {
  return (
    <section className="border-y bg-paper-1" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-12">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center md:gap-10">
            <div className="flex flex-col gap-3">
              <span className="house text-[30px] font-light text-ink-0">
                VIS&nbsp;MAJOR
              </span>
              <span className="caps text-[11px] font-medium text-ink-2">
                A Superior Force · Est. MMXXVI
              </span>
            </div>
            <p className="max-w-[560px] text-[15.5px] leading-[1.7] text-ink-2">
              Vis Major makes performance topicals for men. No theatre, no
              miracle claims. Just precise, fast-acting formulas built around a
              single result. PECTUS is the first.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
