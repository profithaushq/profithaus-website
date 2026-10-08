import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ's & Contact Us | profithaus.",
  // Hidden for now: the copy still describes the previous positioning.
  robots: { index: false, follow: false },
};

export default function Faq() {
  return (
    <>
      <PageHeader eyebrow="Got questions" title="Frequently Asked Questions" />

      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <Reveal>
          <FaqAccordion />
        </Reveal>
      </section>

      <section className="bg-[#e9e6e2] py-24 sm:py-32">
        <div className="mx-auto max-w-xl px-6 text-center">
          <Reveal>
            <p className="text-brand-grey">
              If you&apos;ve made it this far and still have questions, we
              respect the dedication.
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-2xl leading-tight font-extrabold tracking-tight text-brand-black sm:text-4xl">
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
