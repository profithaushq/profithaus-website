import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import AmbientLines from "@/components/AmbientLines";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ's & Contact Us | profithaus.",
};

export default function Faq() {
  return (
    <>
      <PageHeader eyebrow="Got questions" title="Frequently Asked Questions" />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <FaqAccordion />
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <AmbientLines />
        <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
          <Reveal>
            <p className="text-brand-grey">
              If you&apos;ve made it this far and still have questions, we
              respect the dedication.
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-manrope)] text-lg font-extrabold text-brand-black">
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
