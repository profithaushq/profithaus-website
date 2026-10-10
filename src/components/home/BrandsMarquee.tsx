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
      className="overflow-hidden bg-brand-black py-10 text-white sm:py-14"
    >
      <p className="mb-5 px-6 font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-white/50 sm:px-10">
        Previously operated
      </p>
      <Marquee
        items={BRANDS}
        variant="display"
        duration={170}
        repeat={2}
        separator="·"
      />
    </section>
  );
}
