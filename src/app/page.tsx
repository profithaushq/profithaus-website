"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/home/Hero";
import Idea from "@/components/home/Idea";
import Elements from "@/components/home/Elements";
import Work from "@/components/home/Work";
import About from "@/components/home/About";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <Preloader onComplete={() => setIntroDone(true)} />}

      <Hero ready={introDone} />
      <Idea />
      <Elements />
      <Work />
      <About />
      <CtaBand />
    </>
  );
}
