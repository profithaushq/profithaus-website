import Hero from "@/components/home/Hero";
import Problem from "@/components/home/Problem";
import ScrollBand from "@/components/home/ScrollBand";
import WhatWeDo from "@/components/home/WhatWeDo";
import About from "@/components/home/About";
import WhoItsFor from "@/components/home/WhoItsFor";
import HowItWorks from "@/components/home/HowItWorks";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ScrollBand />
      <WhatWeDo />
      <About />
      <WhoItsFor />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
