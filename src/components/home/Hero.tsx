import Image from "next/image";
import Label from "@/components/Label";
import { TextLink } from "@/components/Button";
import { IMAGES } from "@/config/images";
import { BRAND_NAME } from "@/config/site";

export default function Hero() {
  const hero = IMAGES.hero;

  return (
    <section className="lg:grid lg:min-h-[100svh] lg:grid-cols-[1.2fr_1fr]">
      {/* Campaign image, full bleed to the left and top edges; wipes open on load */}
      <div className="px-0 pt-[4.75rem] lg:pt-0">
        <div className="ph-wipe relative h-[78svh] overflow-hidden bg-bone-deep lg:h-full">
          {hero.src ? (
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={`Image placeholder: ${hero.caption}`}
              className="flex h-full w-full items-end p-6 sm:p-10"
            >
              <p className="caps max-w-[34ch] text-ink-soft">{hero.caption}</p>
            </div>
          )}
        </div>
      </div>

      {/* Type sits alongside, low on the page like a cover line */}
      <div className="flex flex-col justify-end px-6 pt-14 pb-20 sm:px-10 lg:px-14 lg:pt-32 lg:pb-24 xl:px-20">
        <div className="ph-fade-up" style={{ ["--d" as string]: "1.1s" }}>
          <Label>Growth and marketing strategy for fashion and beauty</Label>
        </div>

        <h1
          className="display ph-fade-up mt-8 text-[clamp(3rem,5.6vw,6rem)]"
          style={{ ["--d" as string]: "1.25s" }}
        >
          Brands people pay full price for.
        </h1>

        <div className="ph-fade-up" style={{ ["--d" as string]: "1.45s" }}>
          <p className="mt-10 max-w-md text-ink-soft">
            {BRAND_NAME} is a senior growth partner for mid-luxury fashion and
            beauty brands. Brand, content, channels and the website, run as one
            plan.
          </p>
          <p className="mt-10">
            <TextLink href="/apply">Apply to work with us</TextLink>
          </p>
        </div>
      </div>
    </section>
  );
}
