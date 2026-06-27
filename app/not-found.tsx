import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-20">
      <Container className="flex flex-col items-center text-center">
        <Link href="/" className="house text-[15px] text-ink-0">
          VIS·MAJOR
        </Link>
        <p
          className="mt-10 font-extrabold text-ink-0"
          style={{ fontSize: "clamp(72px, 16vw, 150px)", lineHeight: 0.86, letterSpacing: "-0.045em" }}
        >
          404
        </p>
        <p className="mt-5 caps-loose text-[12px] font-semibold text-ink-2">
          The page isn&rsquo;t here
        </p>
        <p className="mt-5 max-w-sm text-[16px] leading-[1.6] text-ink-2">
          It may have moved, or never existed. Everything that does is one of
          three.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-ink-0 bg-ink-0 px-9 py-[15px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
        >
          Back to VIS·MAJOR &rarr;
        </Link>
      </Container>
    </main>
  );
}
