"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Marquee from "@/components/Marquee";
import HeroPinned from "@/components/home/HeroPinned";
import FounderNote from "@/components/home/FounderNote";
import HorizontalGallery from "@/components/home/HorizontalGallery";
import SplitServiceRows from "@/components/home/SplitServiceRows";
import StackedPillars from "@/components/home/StackedPillars";
import WorkTiles from "@/components/home/WorkTiles";
import SocialGrid from "@/components/home/SocialGrid";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <Preloader onComplete={() => setIntroDone(true)} />}

      <HeroPinned ready={introDone} />
      <FounderNote />
      <HorizontalGallery />

      <section className="border-y border-brand-black/10 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-center font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-grey">
            Previously operated
          </p>
          <Marquee
            items={["LOOKFANTASTIC", "COGGLES", "KNOWN NUTRITION", "DMR JEWELLERY"]}
          />
        </div>
      </section>

      <SplitServiceRows />
      <StackedPillars />
      <WorkTiles />
      <SocialGrid />
    </>
  );
}
