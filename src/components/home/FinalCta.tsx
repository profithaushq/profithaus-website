import Button from "@/components/Button";
import LineMotif from "@/components/LineMotif";
import { CONTACT_EMAIL } from "@/config/site";

export default function FinalCta() {
  return (
    <section aria-label="Apply" className="px-4 pb-20 sm:px-8 sm:pb-32">
      <div className="on-dark grain relative mx-auto grid max-w-[1280px] gap-12 overflow-hidden rounded-[14px] bg-brand-black px-7 py-16 text-white sm:px-16 sm:py-24 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16">
        <LineMotif className="top-1/2 right-0 h-[170%] -translate-y-1/2 translate-x-[34%] text-white/[0.09]" />

        <p className="display relative max-w-[17ch] text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.02]">
          If the brand&apos;s <em>worth protecting</em>, it&apos;s worth growing
          properly.
        </p>

        <div className="relative flex flex-col items-start gap-6 lg:items-end">
          <Button href="/apply" variant="white">
            Apply to work with us
          </Button>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
