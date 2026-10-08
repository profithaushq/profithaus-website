import type { Metadata } from "next";
import Label from "@/components/Label";
import { BRAND_NAME, CONTACT_EMAIL } from "@/config/site";
import ApplyForm from "./apply-form";

export const metadata: Metadata = {
  title: `Apply | ${BRAND_NAME}`,
  description: `Apply to work with ${BRAND_NAME}, the growth and marketing strategy partner for mid-luxury fashion and beauty brands.`,
};

const NEXT_STEPS = [
  "I read every application myself.",
  "If it looks like a fit, we book a call to talk through the brand and where it's stuck.",
  "If it doesn't, I'll tell you straight, and point you somewhere better if I can.",
];

export default function Apply() {
  return (
    <section className="px-6 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <div>
          <Label dot>Apply to work with us</Label>
          <h1 className="display mt-8 text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.98]">
            Tell us about <em>the brand</em>.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-brand-grey">
            We work with a small number of mid-luxury fashion and beauty brands
            at a time, so we ask a few questions first. It takes a few minutes.
            No deck required.
          </p>

          <hr className="mt-10 max-w-md border-hairline" />

          <h2 className="mt-8 text-lg font-bold">What happens next</h2>
          <ol className="mt-6 max-w-md space-y-5">
            {NEXT_STEPS.map((step, i) => (
              <li key={step} className="flex gap-4 leading-snug">
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white"
                >
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-sm text-brand-grey">
            Rather just email?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-4 transition-colors hover:text-brand-red"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="rounded-[14px] bg-stone p-6 sm:p-10">
          <ApplyForm />
        </div>
      </div>
    </section>
  );
}
