import Link from "next/link";
import Reveal from "@/components/Reveal";

/** An oxblood closing band: one statement, then the call to act. */
export default function ClosingStatement({
  lead,
  statement,
  href = "/apply",
}: {
  lead: string;
  statement: string;
  href?: string;
}) {
  return (
    <section className="bg-oxblood px-6 py-24 text-white sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {lead}
          </p>
          <h2 className="mt-10 max-w-[22ch] font-serif text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.02] tracking-[-0.02em]">
            {statement}
          </h2>
          <Link
            href={href}
            className="mt-12 inline-block bg-porcelain px-7 py-4 font-sans font-medium text-xs tracking-[0.1em] text-oxblood uppercase transition-[transform,background-color] duration-500 ease-out hover:-translate-y-1 hover:bg-white"
          >
            Apply to work with us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
