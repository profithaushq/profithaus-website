"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const SESSION_KEY = "ph-preloader-seen";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);

    if (reduceMotion || alreadySeen) {
      onComplete();
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 100,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => setCount(Math.round(counter.value)),
      onComplete: finish,
    });

    function finish() {
      if (doneRef.current) return;
      doneRef.current = true;
      tween.kill();
      const panel = panelRef.current;
      if (!panel) {
        onComplete();
        return;
      }
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        ease: "expo.inOut",
        onComplete,
      });
    }

    function handleClick() {
      finish();
    }

    const panel = panelRef.current;
    panel?.addEventListener("click", handleClick);

    return () => {
      tween.kill();
      panel?.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-brand-black text-white"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <p className="font-[family-name:var(--font-manrope)] text-6xl font-extrabold tabular-nums tracking-tight">
        {count}
      </p>
      <p className="mt-4 font-[family-name:var(--font-manrope)] text-xs uppercase tracking-[0.2em] text-white/40">
        Click to skip
      </p>
    </div>
  );
}
