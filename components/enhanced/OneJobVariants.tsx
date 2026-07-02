import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ShieldIcon, CoolingIcon, DropletIcon, ShirtIcon } from "@/components/ui/Icons";

/**
 * MOCK ONLY (/onejob-mock) — four reorganisations of the PECTUS "One job. Done
 * well." section for Silviu to pick from. Same ingredients throughout: the four
 * icon+text points, the David figure, and the dispensed product shot. Only the
 * ORGANISATION changes. Static (no scroll motion) so each reads clearly.
 */
const POINTS = [
  {
    Icon: ShieldIcon,
    title: "Formulated for Men",
    body: "A precision topical engineered around a single, deliberate result.",
  },
  {
    Icon: CoolingIcon,
    title: "Cools on Contact, Firms & Tightens",
    body: "A menthol cooling complex you feel on application. Visibly firmer.",
  },
  {
    Icon: DropletIcon,
    title: "Fast-Absorbing, Matte Finish",
    body: "No residue, no shine. Dries down clean within moments.",
  },
  {
    Icon: ShirtIcon,
    title: "Lightly Fragranced, Undetectable",
    body: "Sits invisibly under any shirt. Pocket-size, go-out ready.",
  },
];

function Kicker() {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-[13px] font-medium text-ink-3">01</span>
      <h3
        className="m-0 font-semibold tracking-tight text-ink-0"
        style={{ fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.02em" }}
      >
        One job. Done well.
      </h3>
    </div>
  );
}

function David({
  className = "",
  opacity = 0.16,
  side = "left",
  object = "object-bottom",
}: {
  className?: string;
  opacity?: number;
  side?: "left" | "right" | "center";
  object?: string;
}) {
  const mask =
    side === "center"
      ? "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)"
      : `linear-gradient(to ${side === "left" ? "right" : "left"}, black 42%, transparent 96%)`;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <Image
        src="/figures/david.png"
        alt=""
        fill
        sizes="50vw"
        className={`object-contain ${object} mix-blend-multiply`}
        style={{ opacity }}
      />
    </div>
  );
}

function Dispensed({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-3 top-2 z-10 caps text-[9px] font-medium text-ink-3">
        On Contact
      </span>
      <Image
        src="/product/squeeze.png"
        alt="PECTUS cream dispensed"
        width={900}
        height={520}
        className="h-auto w-full object-contain drop-shadow-[0_24px_40px_rgba(20,19,15,0.12)]"
      />
    </div>
  );
}

/* ── Variant A — row of four, figure centred faint behind ───────────────── */
export function OneJobA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <David
        className="inset-y-0 left-1/2 aspect-[3/4] w-[42vw] -translate-x-1/2"
        side="center"
        opacity={0.12}
        object="object-center"
      />
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="caps-loose text-[11px] font-medium text-ink-3">01 — The Standard</span>
          <h3
            className="mt-4 font-semibold tracking-tight text-ink-0"
            style={{ fontSize: "clamp(30px, 4.5vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.02 }}
          >
            One job. Done well.
          </h3>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-2">
            A precision topical engineered around a single, deliberate result — the whole
            product pointed at one thing.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {POINTS.map((p) => (
            <div key={p.title} className="flex flex-col items-center text-center">
              <p.Icon size={34} className="text-ink-0" />
              <h4 className="caps mt-4 text-[13px] font-bold leading-snug text-ink-0" style={{ letterSpacing: "0.06em" }}>
                {p.title}
              </h4>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Variant B — David prominent left, numbered list right ──────────────── */
export function OneJobB() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <Container>
        <Kicker />
        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="relative h-[52vh] min-h-[360px] w-full">
            <Image
              src="/figures/david.png"
              alt="A classical figure — the standard"
              fill
              sizes="(max-width:1024px) 80vw, 40vw"
              className="object-contain object-bottom opacity-[0.55] mix-blend-multiply"
              style={{ maskImage: "linear-gradient(to right, black 70%, transparent)", WebkitMaskImage: "linear-gradient(to right, black 70%, transparent)" }}
            />
          </div>
          <div className="divide-y" style={{ borderColor: "var(--hair)" }}>
            {POINTS.map((p, i) => (
              <div key={p.title} className="grid grid-cols-[auto_auto_1fr] items-start gap-5 py-6 first:pt-0" style={{ borderColor: "var(--hair)" }}>
                <span className="font-mono text-[13px] font-medium text-ink-3">0{i + 1}</span>
                <p.Icon size={28} className="mt-0.5 text-ink-0" />
                <div>
                  <h4 className="caps text-[13.5px] font-bold leading-snug text-ink-0" style={{ letterSpacing: "0.05em" }}>
                    {p.title}
                  </h4>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Variant C — product centrepiece, points flank 2 + 2 ────────────────── */
export function OneJobC() {
  const left = POINTS.slice(0, 2);
  const right = POINTS.slice(2);
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <David className="bottom-0 right-[-6%] aspect-[3/4] w-[40vw]" side="right" opacity={0.12} />
      <Container className="relative z-10">
        <div className="text-center">
          <Kicker />
        </div>
        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <div className="flex flex-col gap-12 lg:text-right">
            {left.map((p) => (
              <div key={p.title} className="flex flex-col gap-3 lg:items-end">
                <p.Icon size={32} className="text-ink-0" />
                <h4 className="caps text-[13.5px] font-bold leading-snug text-ink-0" style={{ letterSpacing: "0.05em" }}>{p.title}</h4>
                <p className="max-w-[240px] text-[14px] leading-relaxed text-ink-2">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto w-[min(320px,70vw)]">
            <Dispensed />
          </div>
          <div className="flex flex-col gap-12">
            {right.map((p) => (
              <div key={p.title} className="flex flex-col gap-3">
                <p.Icon size={32} className="text-ink-0" />
                <h4 className="caps text-[13.5px] font-bold leading-snug text-ink-0" style={{ letterSpacing: "0.05em" }}>{p.title}</h4>
                <p className="max-w-[240px] text-[14px] leading-relaxed text-ink-2">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Variant D — manifesto + 2×2 left, David tall right ─────────────────── */
export function OneJobD() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <span className="caps-loose text-[11px] font-medium text-ink-3">01 — The Standard</span>
            <h3
              className="mt-4 font-semibold uppercase tracking-tight text-ink-0"
              style={{ fontSize: "clamp(34px, 5.5vw, 74px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
            >
              One job.
              <br />
              Done well.
            </h3>
            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
              {POINTS.map((p) => (
                <div key={p.title} className="flex flex-col gap-3">
                  <p.Icon size={30} className="text-ink-0" />
                  <h4 className="caps text-[13px] font-bold leading-snug text-ink-0" style={{ letterSpacing: "0.05em" }}>{p.title}</h4>
                  <p className="text-[14px] leading-relaxed text-ink-2">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[64vh] min-h-[420px] w-full">
            <Image
              src="/figures/david.png"
              alt="A classical figure — the standard"
              fill
              sizes="(max-width:1024px) 80vw, 36vw"
              className="object-contain object-bottom opacity-[0.55] mix-blend-multiply"
              style={{ maskImage: "linear-gradient(to left, black 68%, transparent)", WebkitMaskImage: "linear-gradient(to left, black 68%, transparent)" }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
