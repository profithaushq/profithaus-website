"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Marquee from "@/components/Marquee";
import IntroBanner from "@/components/home/IntroBanner";
import FounderNote from "@/components/home/FounderNote";
import BrandMark from "@/components/home/BrandMark";
import SplitServiceRows from "@/components/home/SplitServiceRows";
import StackedPillars from "@/components/home/StackedPillars";
import Testimonial from "@/components/home/Testimonial";

const PHRASES = [
  "EX-OPERATORS. NOT AN AGENCY.",
  "SENIOR-LED, EVERY TIME.",
  "BUILT FROM YEARS IN-HOUSE.",
  "RUN IT LIKE YOU OWN IT.",
];

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <Preloader onComplete={() => setIntroDone(true)} />}

      <IntroBanner />
      <FounderNote />
      <BrandMark />

      <section className="border-y border-brand-black/10 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-center font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-grey">
            Previously operated
          </p>
          <Marquee
            items={[
              "LOOKFANTASTIC",
              "COGGLES",
              "KNOWN NUTRITION",
              "DMR JEWELLERY",
              "MYVITAMINS",
            ]}
          />
        </div>
      </section>

      <SplitServiceRows />

      <section className="overflow-hidden bg-brand-black py-10 text-white">
        <Marquee items={PHRASES} variant="phrase" duration={90} separator="·" />
      </section>

      <StackedPillars />
      <BrandMark />
      <Testimonial />
    </>
  );
}
