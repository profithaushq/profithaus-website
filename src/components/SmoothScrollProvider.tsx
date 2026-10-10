"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

export default function SmoothScrollProvider() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    // Touch devices already have native momentum scrolling. Running the
    // smooth-scroll library there only adds per-frame work and jitter.
    if (window.matchMedia("(pointer: coarse)").matches) {
      document.fonts.ready.then(() =>
        window.setTimeout(() => ScrollTrigger.refresh(), 200),
      );
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    document.fonts.ready.then(() =>
      window.setTimeout(() => ScrollTrigger.refresh(), 200),
    );

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
