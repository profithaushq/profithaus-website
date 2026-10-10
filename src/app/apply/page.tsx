import type { Metadata } from "next";
import ApplyForm from "./apply-form";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Apply | profithaus",
};

export default function Apply() {
  return (
    <>
      <PageHeader
        eyebrow="Apply to work with us"
        title="Let's see if we're the right fit."
        subcopy="A few quick questions about your brand. Takes about two minutes. We advise first, and can build what we recommend if you want us to."
      />

      <section className="mx-auto max-w-2xl px-6 py-28 sm:py-36">
        <Reveal>
          <ApplyForm />
        </Reveal>
      </section>
    </>
  );
}
