import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/ui/TextReveal";

const OCCASIONS = [
  "The shirt that matters.",
  "The beach.",
  "The night out.",
  "The gym mirror.",
];

export function UseBefore() {
  return (
    <section className="bg-ink-0 py-24 text-paper-0 md:py-32">
      <Container>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-8 bg-paper-0/40" />
          <span className="caps-loose text-[12px] font-semibold text-paper-0/70">
            Use Before
          </span>
        </div>

        <TextReveal
          as="div"
          className="mt-10 max-w-5xl font-bold uppercase text-paper-0"
          stagger={0.09}
          lines={OCCASIONS.map((o) => (
            <span
              key={o}
              style={{
                fontSize: "clamp(38px, 6.2vw, 88px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
                display: "block",
              }}
            >
              {o}
            </span>
          ))}
        />

        <p className="mt-12 caps text-[12px] font-medium text-paper-0/55">
          Whenever you want to feel sharper in your own skin.
        </p>
      </Container>
    </section>
  );
}
