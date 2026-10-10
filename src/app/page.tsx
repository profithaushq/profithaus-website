"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/home/Hero";
import FounderNote from "@/components/home/FounderNote";
import BrandsMarquee from "@/components/home/BrandsMarquee";
import PhScale from "@/components/home/PhScale";
import ServicesZoom from "@/components/home/ServicesZoom";
import WorkReel from "@/components/home/WorkReel";
import DealtPillars from "@/components/home/DealtPillars";
import TestimonialLine from "@/components/home/TestimonialLine";
import { REEL } from "@/data/reel";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <Preloader onComplete={() => setIntroDone(true)} />}

      <Hero ready={introDone} />
      <FounderNote />
      <BrandsMarquee />
      <PhScale />
      <ServicesZoom />
      <WorkReel items={REEL} />
      <DealtPillars />
      <TestimonialLine />
    </>
  );
}
