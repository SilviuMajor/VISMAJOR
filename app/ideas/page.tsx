import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

import { HowItWorksScrollSeq } from "@/components/ideas/HowItWorksScrollSeq";
import { HowItWorksStepper } from "@/components/ideas/HowItWorksStepper";
import { HowItWorksTimeline } from "@/components/ideas/HowItWorksTimeline";
import { WhyElimination } from "@/components/ideas/WhyElimination";
import { WhyScorecard } from "@/components/ideas/WhyScorecard";
import { WhyVersus } from "@/components/ideas/WhyVersus";

export const metadata = { title: "GY-NO! — Section Ideas · VIS MAJOR" };

function IdeaLabel({
  group,
  letter,
  name,
  desc,
}: {
  group: string;
  letter: string;
  name: string;
  desc: string;
}) {
  return (
    <div
      className="sticky top-0 z-40 bg-ink-0 py-4 text-paper-0"
      style={{ borderBottom: "1px solid rgba(244,242,236,0.16)" }}
    >
      <Container className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="caps text-[11px] font-semibold text-paper-0/45">
            {group} · Idea {letter}
          </span>
          <span className="text-[17px] font-bold tracking-tight md:text-[19px]">{name}</span>
        </div>
        <span className="caps hidden text-[10px] font-medium text-paper-0/45 md:block">{desc}</span>
      </Container>
    </div>
  );
}

function Idea({
  group,
  letter,
  name,
  desc,
  children,
}: {
  group: string;
  letter: string;
  name: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <section>
      <IdeaLabel group={group} letter={letter} name={name} desc={desc} />
      {children}
    </section>
  );
}

function GroupIntro({ n, title, blurb }: { n: string; title: string; blurb: string }) {
  return (
    <div className="border-y bg-paper-1 py-14 md:py-20" style={{ borderColor: "var(--hair)" }}>
      <Container>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">{n}</span>
        </div>
        <h2
          className="mt-5 font-extrabold uppercase text-ink-0"
          style={{ fontSize: "clamp(30px, 4.4vw, 60px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
        >
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-ink-1">{blurb}</p>
      </Container>
    </div>
  );
}

export default function IdeasPage() {
  return (
    <div className="bg-paper-0">
      <header className="border-b bg-paper-0 py-6" style={{ borderColor: "var(--hair-strong)" }}>
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="house text-[15px] font-light text-ink-0">VIS&nbsp;MAJOR</span>
            <span className="caps text-[10.5px] font-semibold text-ink-3">Section Ideas</span>
          </div>
          <a
            href="/"
            className="caps inline-flex items-center gap-2 rounded-xs border border-[var(--hair-strong)] px-3 py-1.5 text-[11px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0"
          >
            ← Back to site
          </a>
        </Container>
      </header>

      <div className="py-14 md:py-20">
        <Container>
          <div className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-semibold text-ink-2">Explore · Inventive takes</span>
          </div>
          <h1
            className="mt-6 max-w-3xl font-extrabold uppercase text-ink-0"
            style={{ fontSize: "clamp(34px, 5vw, 68px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}
          >
            Six animated ideas.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-ink-1">
            Three ways to tell <b>“How it works”</b> and three ways to tell{" "}
            <b>“Why GY-NO!”</b> — each fully animated. Scroll through, hover and
            click the interactive ones, and tell me which you want (e.g.{" "}
            <b>“How it works: B, Why: A”</b>).
          </p>
        </Container>
      </div>

      <GroupIntro
        n="How it works"
        title="Three ways."
        blurb="Same three steps — Apply, Wait, Step Out — told as a scroll-scrubbed storyboard, an interactive instrument panel, or a minutes-on-skin timeline."
      />
      <Idea group="How it works" letter="A" name="Scroll Storyboard" desc="Scroll scrubs the 3 phases; pinned, cinematic.">
        <HowItWorksScrollSeq />
      </Idea>
      <Idea group="How it works" letter="B" name="Instrument Stepper" desc="Click 01/02/03 — bespoke animated diagram each.">
        <HowItWorksStepper />
      </Idea>
      <Idea group="How it works" letter="C" name="Minutes Timeline" desc="An animated finish-curve over the hour.">
        <HowItWorksTimeline />
      </Idea>

      <GroupIntro
        n="Why GY-NO!"
        title="Three ways."
        blurb="The same claim-safe comparison — GY-NO! vs the cold trick vs nothing — as a process of elimination, an animated scorecard, or an interactive head-to-head."
      />
      <Idea group="Why GY-NO!" letter="A" name="Elimination" desc="Scroll strikes out the pretenders one by one.">
        <WhyElimination />
      </Idea>
      <Idea group="Why GY-NO!" letter="B" name="Scorecard" desc="Fill-bars animate in; tally counts to 6/6.">
        <WhyScorecard />
      </Idea>
      <Idea group="Why GY-NO!" letter="C" name="Versus Toggle" desc="Pick the opponent; marks flip head-to-head.">
        <WhyVersus />
      </Idea>

      <footer className="bg-ink-0 py-16 text-paper-0">
        <Container>
          <p className="caps-loose text-[11px] font-semibold text-paper-0/60">Pick your favourites</p>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-paper-0/85">
            Reply e.g. “How it works: B, Why: A” and I'll wire the winners onto
            the live site in place of the current sections.
          </p>
          <a
            href="/"
            className="caps mt-8 inline-flex items-center gap-2.5 rounded-sm border border-paper-0 bg-paper-0 px-8 py-4 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
          >
            ← Back to the live site
          </a>
        </Container>
      </footer>
    </div>
  );
}
