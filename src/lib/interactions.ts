"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

function canHover() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  strength = 0.35,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;

    const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    function onMove(e: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const reach = Math.max(rect.width, rect.height) * 1.2;
      if (Math.hypot(dx, dy) < reach) {
        moveX(dx * strength);
        moveY(dy * strength);
      } else {
        moveX(0);
        moveY(0);
      }
    }

    function onLeave() {
      moveX(0);
      moveY(0);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength]);
}

export function useScramble<T extends HTMLElement>(
  ref: RefObject<T | null>,
  label: string,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;

    const letters = label.replace(/\s/g, "").split("");
    const proxy = { p: 0 };
    let tween: gsap.core.Tween | undefined;

    function render() {
      if (!el) return;
      const revealed = Math.floor(proxy.p * label.length);
      el.textContent = label
        .split("")
        .map((char, i) =>
          char === " " || i < revealed
            ? char
            : letters[Math.floor(Math.random() * letters.length)],
        )
        .join("");
    }

    function onEnter() {
      tween?.kill();
      proxy.p = 0;
      tween = gsap.to(proxy, {
        p: 1,
        duration: 0.5,
        ease: "none",
        onUpdate: render,
        onComplete: () => {
          if (el) el.textContent = label;
        },
      });
    }

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("focus", onEnter);
    return () => {
      tween?.kill();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("focus", onEnter);
      el.textContent = label;
    };
  }, [ref, label]);
}
