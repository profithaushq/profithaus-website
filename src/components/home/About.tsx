import Image from "next/image";
import Label from "@/components/Label";
import { FOUNDER_FIRST_NAME, FOUNDER_PHOTO } from "@/config/site";

const BRANDS = [
  "LOOKFANTASTIC",
  "Coggles",
  "Myprotein",
  "Known Nutrition",
  "DMR Jewellery",
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-stone px-6 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
        <div>
          {FOUNDER_PHOTO && (
            <div className="relative mb-12 aspect-[4/5] max-w-sm overflow-hidden">
              <Image
                src={FOUNDER_PHOTO}
                alt={`${FOUNDER_FIRST_NAME}, founder`}
                fill
                sizes="(min-width: 1024px) 24rem, 90vw"
                className="object-cover"
              />
            </div>
          )}
          <Label>Who you&apos;ll work with</Label>
          <h2
            id="about-heading"
            className="display mt-8 text-[clamp(3.6rem,9vw,8.5rem)] leading-[0.92]"
          >
            Hi, I&apos;m <em>{FOUNDER_FIRST_NAME}</em>.
          </h2>
        </div>

        <div className="max-w-2xl lg:border-l lg:border-brand-black/10 lg:pl-16">
          <p className="display text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.22] tracking-[-0.005em] !font-normal">
            I&apos;ve spent six years in ecommerce, brand-side then agency-side,
            including running brands in-house across the THG group and at Known
            Nutrition, with over £50M of revenue managed.
          </p>
          <p className="mt-8 text-lg leading-relaxed text-brand-black/80">
            That meant trading calls, launch calendars, forecasts, and the
            slightly awkward meeting when a number got missed. It also taught me
            that the brands that grow well are the ones where brand and revenue
            stop arguing with each other.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-brand-black/80">
            Profithaus is senior-led on purpose. You work with me, not a junior
            account manager reading my notes.
          </p>

          <hr className="mt-12 border-brand-black/15" />

          <p className="mt-8 text-sm text-brand-grey">
            Brands I&apos;ve worked on
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-9 gap-y-3 text-lg font-bold tracking-[-0.01em]">
            {BRANDS.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
