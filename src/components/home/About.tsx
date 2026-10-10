import ImageSlot from "@/components/ImageSlot";
import Label from "@/components/Label";
import { FOUNDER_FULL_NAME } from "@/config/site";

const PREVIOUSLY = [
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
      className="scroll-mt-20 bg-bone px-6 py-32 sm:px-10 sm:py-40 lg:px-14 lg:py-48"
    >
      <div className="mx-auto grid max-w-[1440px] gap-y-16 lg:grid-cols-12 lg:gap-x-10">
        <ImageSlot
          slot="portrait"
          className="aspect-[4/5] w-full max-w-md lg:col-span-5 lg:max-w-none"
          sizes="(min-width: 1024px) 38vw, 90vw"
        />

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-24">
          <Label>The founder</Label>
          <h2
            id="about-heading"
            className="display mt-8 text-[clamp(2.8rem,5.6vw,6rem)]"
          >
            <span className="serif-italic">{FOUNDER_FULL_NAME}</span>
          </h2>

          <p className="mt-10 text-lg leading-relaxed">
            Six years in ecommerce, brand-side then agency-side, including
            running brands in-house across the THG group and at Known Nutrition,
            with over £50M of revenue managed.
          </p>
          <p className="mt-6 max-w-md text-ink-soft">
            The brands that grow well are the ones where brand and revenue stop
            arguing. Profithaus is senior-led on purpose - you work with me
            directly.
          </p>

          <p className="caps mt-14 border-t border-hairline pt-6 text-ink-soft">
            Previously - {PREVIOUSLY.join(", ")}
          </p>
        </div>
      </div>
    </section>
  );
}
