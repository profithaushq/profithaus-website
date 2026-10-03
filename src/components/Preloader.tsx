"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import Mark from "@/components/Mark";

const SESSION_KEY = "ph-preloader-seen";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const html = document.documentElement;
    const panel = panelRef.current;
    const mark = markRef.current;
    if (!panel || !mark) return;

    if (!html.classList.contains("ph-preload")) {
      completeRef.current();
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    const q = gsap.utils.selector(mark);
    gsap.set(q(".ph-mark-disc"), { opacity: 0 });
    gsap.set(q(".ph-mark-ring"), { opacity: 1 });
    gsap.set(q(".ph-mark-dot"), { scale: 0, svgOrigin: "447 568" });

    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      tl.kill();
      setCount(100);
      document.body.style.overflow = "";
      getLenis()?.start();
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "expo.inOut",
        onComplete: () => {
          html.classList.remove("ph-preload");
          completeRef.current();
        },
      });
    }

    const tl = gsap.timeline({
      onUpdate: () => setCount(Math.round(tl.progress() * 100)),
      onComplete: finish,
    });

    tl.fromTo(
      q(".ph-mark-ring, .ph-mark-stem, .ph-mark-bowl"),
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.8, ease: "power2.inOut", stagger: 0.12 },
      0,
    )
      .to(
        q(".ph-mark-dot"),
        { scale: 1, svgOrigin: "447 568", duration: 0.25, ease: "back.out(2)" },
        0.7,
      )
      .to(q(".ph-mark-disc"), { opacity: 1, duration: 0.3 }, 0.9)
      .to(q(".ph-mark-ring"), { opacity: 0, duration: 0.2 }, 1.0);

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
      className="ph-preloader fixed inset-0 z-[100] cursor-pointer flex-col items-center justify-center bg-brand-black text-white"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div ref={markRef} className="h-24 w-24 sm:h-32 sm:w-32">
        <Mark className="h-full w-full" />
      </div>
      <p className="mt-8 font-[family-name:var(--font-manrope)] text-6xl font-extrabold tabular-nums tracking-tight">
        {count}
      </p>
      <p className="mt-4 font-[family-name:var(--font-manrope)] text-xs uppercase tracking-[0.2em] text-white/40">
        Click to skip
      </p>
    </div>
  );
}
