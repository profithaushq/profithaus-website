import Marquee from "@/components/Marquee";

const BRANDS = [
  "LookFantastic",
  "Coggles",
  "Known Nutrition",
  "DMR Jewellery",
  "Myvitamins",
];

export default function BrandsMarquee() {
  return (
    <section
      aria-label="Previously operated"
      className="overflow-hidden bg-oxblood py-10 text-white sm:py-14"
    >
      <p className="mb-5 px-6 font-mono text-xs tracking-[0.14em] text-powder uppercase sm:px-10">
        Previously operated · THG group, Known Nutrition
      </p>
      <Marquee
        items={BRANDS}
        variant="display"
        duration={170}
        repeat={2}
        separator="divide"
      />
    </section>
  );
}
