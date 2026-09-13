import type { Metadata } from "next";
import ApplyForm from "./apply-form";
import HeroBand from "@/components/HeroBand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Apply to Work With Us | profithaus.",
};

export default function Apply() {
  return (
    <HeroBand>
      <div className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
        <div className="text-center">
          <p className="font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            Apply to work with us
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-3xl font-light italic leading-tight sm:text-5xl">
            Let&apos;s see if we&apos;re the right fit.
          </h1>
          <p className="mt-4 text-white/80">
            A few quick questions about your brand. Takes about two minutes.
          </p>
        </div>

        <Reveal className="mt-12 text-ink">
          <ApplyForm />
        </Reveal>
      </div>
    </HeroBand>
  );
}
