import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ and contact | profithaus",
};

export default function Faq() {
  return (
    <>
      <section className="bg-porcelain px-6 pt-24 pb-14 text-oxblood sm:px-10 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-sans text-xs font-medium tracking-[0.12em] text-burgundy uppercase">
            Got questions
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.03em]">
            Frequently asked <em>questions.</em>
          </h1>
        </div>
      </section>

      <section className="bg-porcelain px-6 pb-32 text-oxblood sm:px-10 sm:pb-44">
        <div className="mx-auto grid max-w-[1400px] items-start gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
          <Reveal>
            <FaqAccordion />
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div className="bg-oxblood p-8 text-white sm:p-12">
              <p className="font-sans text-[11px] font-medium tracking-[0.2em] text-powder uppercase">
                Still wondering
              </p>
              <h2 className="mt-5 font-serif text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.02em]">
                Pop us a message and we&apos;ll reply within{" "}
                <em className="text-powder">one to two working days.</em>
              </h2>
              <p className="mt-4 text-white/75">
                If you&apos;ve made it this far and still have questions, we
                respect the dedication.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
