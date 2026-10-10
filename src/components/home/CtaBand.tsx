import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="bg-oxblood text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 px-6 py-16 sm:px-10 sm:py-20 md:flex-row md:items-center">
        <Reveal>
          <h2
            id="cta-heading"
            className="font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-none tracking-[-0.02em]"
          >
            Find out where <em className="text-powder">yours reads.</em>
          </h2>
          <p className="mt-5 font-sans font-medium text-[11px] tracking-[0.12em] text-powder uppercase">
            £50m+ in revenue managed
          </p>
        </Reveal>
        <Reveal delay={140}>
          <Link
            href="/apply"
            className="inline-block bg-porcelain px-7 py-4 font-sans font-medium text-xs tracking-[0.1em] text-oxblood uppercase transition-[transform,background-color] duration-500 ease-out hover:-translate-y-1 hover:bg-white"
          >
            Apply to work with us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
