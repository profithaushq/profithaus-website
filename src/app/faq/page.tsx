import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import HeroBand from "@/components/HeroBand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ's & Contact Us | profithaus.",
};

export default function Faq() {
  return (
    <>
      <HeroBand>
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-extrabold uppercase tracking-wide leading-tight sm:text-4xl">
            Frequently Asked Questions
          </h1>
        </div>
      </HeroBand>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <FaqAccordion />
        </Reveal>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-xl px-6 text-center">
          <Reveal>
            <p className="text-ink-soft">
              If you&apos;ve made it this far and still have questions, we
              respect the dedication.
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-bold">
              Pop us a message below and we&apos;ll reply within 1–2 working
              days.
            </h2>
            <div className="mt-10 text-left">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
