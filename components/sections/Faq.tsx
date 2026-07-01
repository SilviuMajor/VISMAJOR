import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

const FAQS = [
  {
    q: "How fast does it work?",
    a: "Cooling and tightening take hold within minutes of applying.",
  },
  {
    q: "How long does it last?",
    a: "A temporary effect, typically around 30 to 60 minutes. Reapply whenever you like.",
  },
  {
    q: "Is it discreet?",
    a: "Yes. A pocket-size tube, non-greasy and fast-drying, with a light fragrance.",
  },
  {
    q: "Who is it for?",
    a: "Any man who wants a quick confidence boost — gym, beach, a night out, or just a fitted shirt.",
  },
  {
    q: "Is it safe?",
    a: "It is a cosmetic product made to UK standards. Patch test before first use and avoid broken skin.",
  },
  {
    q: "When will my pre-order ship?",
    a: "The first batch ships in the launch month shown at checkout. You'll get confirmation and tracking by email.",
  },
];

export function Faq({ shipMonth }: { shipMonth: string }) {
  return (
    <section id="faq" className="border-y bg-paper-1 py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
      <Container>
        <SectionHead n="06" title="FAQ." />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[4fr_8fr] lg:gap-16">
          <Reveal>
            <h3
              className="font-bold uppercase text-ink-0"
              style={{
                fontSize: "clamp(40px, 5vw, 68px)",
                letterSpacing: "-0.025em",
                lineHeight: 0.96,
              }}
            >
              Everything,<br />upfront.
            </h3>
            <p className="mt-6 max-w-sm text-[16.5px] leading-[1.6] text-ink-2">
              First batch ships {shipMonth}. Anything else, write to{" "}
              <a
                href="mailto:hello@vismajor.co.uk"
                className="text-ink-0 underline underline-offset-4 hover:text-ink-1"
              >
                hello@vismajor.co.uk
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <Accordion
              defaultOpen={0}
              items={FAQS.map((f, i) => ({
                q: f.q,
                a: f.a,
                index: String(i + 1).padStart(2, "0"),
              }))}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
