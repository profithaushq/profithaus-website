"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import Logo from "@/components/Logo";

const SESSION_KEY = "ph-preloader-seen";

/**
 * Opens on the brand's own idea: the divide draws and profit and haus slide
 * apart, then the panel wipes away. No counter, nothing to watch load.
 */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
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

    const tl = gsap.timeline({ onComplete: finish });

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
      .to({}, { duration: 0.45 });

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
    </div>
  );
}
