import Button from "@/components/Button";
import { CONTACT_EMAIL } from "@/config/site";

export default function FinalCta() {
  return (
    <section aria-label="Apply" className="px-4 pb-16 sm:px-8 sm:pb-24">
      <div className="on-dark mx-auto grid max-w-[1280px] gap-10 rounded-[14px] bg-brand-black px-7 py-12 text-white sm:px-14 sm:py-16 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16">
        <p className="max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.75rem)] leading-[1.06] font-light tracking-[-0.045em]">
          If the brand&apos;s worth protecting, it&apos;s worth growing
          properly.
        </p>

        <div className="flex flex-col items-start gap-5 lg:items-end">
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
