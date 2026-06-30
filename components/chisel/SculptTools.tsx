import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const TOOLS = [
  {
    t: "The Short Tool",
    use: "Control · jaw, neck, forearms",
    b: "A compact weighted bar with a contoured edge, for detail and control on the smaller lines of the face and arms.",
  },
  {
    t: "The Long Tool",
    use: "Reach · chest, back, legs",
    b: "A longer weighted bar for reach and leverage across the broad planes — chest, back and legs.",
  },
];

/** "The Tools (optional)" — the steel tools are an add-on, never the product. */
export function SculptTools() {
  return (
    <section
      className="border-t bg-paper-0 py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        <Reveal>
          <div className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-medium text-ink-2">
              The Tools · Optional
            </span>
          </div>
          <h2
            className="mt-5 max-w-2xl font-bold uppercase text-ink-0"
            style={{ fontSize: "clamp(28px, 4.2vw, 56px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
          >
            Add steel, if you want more.
          </h2>
          <p className="mt-5 max-w-xl text-[16.5px] leading-[1.6] text-ink-1">
            The cream is the product. The SCULPT steel tools are an optional
            add-on for anyone who wants more from the ritual — weighted steel with
            a contoured edge, made for massage and for working the cream in. Not
            medical, not a treatment.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {TOOLS.map((t, i) => (
            <Reveal key={t.t} delay={i * 0.06}>
              <div
                className="flex h-full flex-col border-t pt-7"
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-bold tracking-tight text-ink-0">
                    {t.t}
                  </h3>
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "#14130F" }}
                  />
                </div>
                <span
                  className="caps mt-2 text-[10px] font-medium"
                  style={{ color: "#14130F" }}
                >
                  {t.use}
                </span>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-2">{t.b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link
            href="/steel"
            className="caps group mt-12 inline-flex items-center gap-2 border-t pt-6 text-[11px] font-medium text-ink-0"
            style={{ borderColor: "var(--hair)" }}
          >
            See the full steel range
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
