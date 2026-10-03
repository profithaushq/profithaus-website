import type { Metadata } from "next";
import ApplyForm from "./apply-form";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Apply to Work With Us | profithaus.",
};

export default function Apply() {
  return (
    <>
      <PageHeader
        eyebrow="Apply to work with us"
        title="Let's see if we're the right fit."
        subcopy="A few quick questions about your brand. Takes about two minutes."
      />

      <section className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
        <Reveal>
          <ApplyForm />
        </Reveal>
      </section>
    </>
  );
}
