"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import Logo from "@/components/Logo";
import PH from "@/components/PH";

const SESSION_KEY = "ph-preloader-seen";

/**
 * Opens on the brand's own idea: the divide draws, profit and haus slide
 * apart, and the pH reading climbs from 0.0 to 7.0 (neutral) before the
 * panel wipes away.
 */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [reading, setReading] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const html = document.documentElement;
    const panel = panelRef.current;
    const logo = logoRef.current;
    if (!panel || !logo) return;

    if (!html.classList.contains("ph-preload")) {
      completeRef.current();
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    const q = gsap.utils.selector(logo);
    gsap.set(q(".ph-logo-profit"), { x: -48, opacity: 0 });
    gsap.set(q(".ph-logo-haus"), { x: 48, opacity: 0 });
    gsap.set(q(".ph-divide"), { scaleY: 0, transformOrigin: "50% 0%" });

    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      tl.kill();
      setReading(7);
      document.body.style.overflow = "";
      getLenis()?.start();
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => {
          html.classList.remove("ph-preload");
          completeRef.current();
        },
      });
    }

    const tl = gsap.timeline({
      onUpdate: () => setReading(Math.round(tl.progress() * 70) / 10),
      onComplete: finish,
    });

    tl.to(
      q(".ph-divide"),
      { scaleY: 1, duration: 0.8, ease: "power3.inOut" },
      0,
    )
      .to(
        q(".ph-logo-profit"),
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0.35,
      )
      .to(
        q(".ph-logo-haus"),
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0.35,
      )
      .to({}, { duration: 0.5 });

    panel.addEventListener("click", finish);

    return () => {
      panel.removeEventListener("click", finish);
      tl.kill();
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="ph-preloader fixed inset-0 z-[100] cursor-pointer flex-col items-center justify-center bg-oxblood text-white"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div ref={logoRef} className="text-[clamp(3.5rem,13vw,9rem)]">
        <Logo tone="light" />
      </div>
      <p className="mt-10 font-mono text-xs tracking-[0.14em] text-powder uppercase tabular-nums">
        <PH /> {reading.toFixed(1)}
        {reading >= 7 ? " · Neutral" : ""}
      </p>
      <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-powder/50 uppercase">
        Click to skip
      </p>
    </div>
  );
}
