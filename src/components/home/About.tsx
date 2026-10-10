import WordReveal, { type Segment } from "@/components/WordReveal";
import Reveal from "@/components/Reveal";

const NOTE: Segment[] = [
  { text: "We started profithaus because we were tired of watching " },
  { text: "good brands", em: true },
  {
    text: " get let down by agencies who'd never actually run one. We've been ",
  },
  { text: "in-house,", em: true },
  {
    text: " made the calls, and lived with the results. That's the only way we work now: ",
  },
  { text: "senior, hands-on,", em: true },
  { text: " and invested in your numbers like they're " },
  { text: "our own.", em: true },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-white px-6 pb-28 text-oxblood sm:px-10 sm:pb-36"
    >
      <div className="mx-auto max-w-[1400px] border-t border-line-strong pt-12">
        <Reveal>
          <p className="font-sans font-medium text-xs tracking-[0.12em] text-burgundy uppercase">
            About
          </p>
          <h2 id="about-heading" className="sr-only">
            A note from the founders
          </h2>
        </Reveal>
        <WordReveal
          segments={NOTE}
          className="mt-8 max-w-6xl font-serif text-[clamp(1.9rem,3.9vw,3.5rem)] leading-[1.1] tracking-[-0.015em]"
        />
        <Reveal delay={200}>
          <p className="mt-10 font-sans font-medium text-xs tracking-[0.12em] text-burgundy uppercase">
            Nearly 10 years in the industry · £50m+ in revenue managed
          </p>
        </Reveal>
      </div>
    </section>
  );
}
