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
    <section className="px-6 pt-36 pb-32 sm:px-10 sm:pt-44 sm:pb-40 lg:px-14">
      <div className="mx-auto grid max-w-[1440px] gap-y-24 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Label>Apply to work with us</Label>
          <h1 className="display mt-8 text-[clamp(3rem,6vw,6.5rem)]">
            Tell us about the brand.
          </h1>
          <p className="mt-10 max-w-md text-ink-soft">
            We work with a small number of mid-luxury fashion and beauty brands
            at a time, so we ask a few questions first. It takes a few minutes.
            No deck required.
          </p>

          <h2 className="caps mt-20 text-brand-black">What happens next</h2>
          <ol className="mt-6 max-w-md border-b border-hairline">
            {NEXT_STEPS.map((step, i) => (
              <li
                key={step}
                className="flex gap-6 border-t border-hairline py-5 text-ink-soft"
              >
                <span aria-hidden className="display text-xl text-ink-soft">
                  0{i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-sm text-ink-soft">
            Rather just email?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-4 transition-colors duration-300 hover:text-brand-red"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ApplyForm />
        </div>
      </div>
    </section>
  );
}
