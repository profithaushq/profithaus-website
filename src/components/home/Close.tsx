import { TextLink } from "@/components/Button";
import { CONTACT_EMAIL } from "@/config/site";

export default function Close() {
  return (
    <section
      aria-labelledby="close-heading"
      className="bg-bone px-6 py-40 sm:px-10 sm:py-52 lg:px-14 lg:py-64"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="close-heading"
          className="display max-w-[14ch] text-[clamp(3.2rem,8.4vw,9.5rem)]"
        >
          Grow without looking like everyone else.
        </h2>

        <p className="mt-16">
          <TextLink href="/apply">Apply to work with us</TextLink>
        </p>
        <p className="mt-8">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="caps text-ink-soft transition-colors duration-300 hover:text-brand-red"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
