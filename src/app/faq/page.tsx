import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ and contact | profithaus",
};

export default function Faq() {
  return (
    <>
      <PageHeader eyebrow="Got questions" title="Frequently asked questions" />

      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <Reveal>
          <FaqAccordion />
        </Reveal>
      </section>

      <section className="bg-porcelain py-24 sm:py-32">
        <div className="mx-auto max-w-xl px-6 text-center">
          <Reveal>
            <p className="text-brand-grey">
              If you&apos;ve made it this far and still have questions, we
              respect the dedication.
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em] text-brand-black sm:text-4xl">
              Pop us a message below and we&apos;ll reply within one to two
              working days.
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
