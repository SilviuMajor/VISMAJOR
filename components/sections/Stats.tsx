import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";

type Stat = {
  value: number;
  prefix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 5, prefix: "≈", label: "Minutes to onset" },
  { value: 60, label: "Minutes, up to" },
  { value: 20, label: "Millilitres net" },
  { value: 1, label: "Job. Done well." },
];

export function Stats() {
  return (
    <section className="border-y bg-paper-1" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col px-2 md:px-8 ${i !== 0 ? "md:border-l" : ""}`}
              style={{ borderColor: "var(--hair)" }}
            >
              <div
                className="flex items-baseline font-extrabold text-ink-0"
                style={{ fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.03em" }}
              >
                {s.prefix && (
                  <span className="mr-1 text-ink-3" style={{ fontSize: "0.5em" }}>
                    {s.prefix}
                  </span>
                )}
                <Counter value={s.value} />
              </div>
              <span className="caps mt-4 text-[10.5px] font-semibold text-ink-2">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
