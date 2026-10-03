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

/**
 * Hover effect for large links: each letter rolls up and its twin rolls in,
 * staggered left to right. Quiet and precise, no random characters.
 */
export function useRoll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  label: string,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;

    el.textContent = "";
    el.setAttribute("data-rolling", "");
    const tracks: HTMLElement[] = [];

    label.split(" ").forEach((word, wi, words) => {
      const w = document.createElement("span");
      w.setAttribute("aria-hidden", "true");
      w.style.cssText = "display:inline-block;white-space:nowrap;";
      word.split("").forEach((char) => {
        const mask = document.createElement("span");
        // One line tall (with room for descenders); the twin waits below it.
        mask.style.cssText =
          "display:inline-block;overflow:hidden;vertical-align:top;line-height:1.25;";
        const track = document.createElement("span");
        track.style.cssText =
          "display:block;position:relative;will-change:transform;";
        const top = document.createElement("span");
        top.style.cssText = "display:block;";
        top.textContent = char;
        const bottom = document.createElement("span");
        bottom.style.cssText =
          "display:block;position:absolute;left:0;top:100%;";
        bottom.textContent = char;
        track.append(top, bottom);
        mask.append(track);
        w.append(mask);
        tracks.push(track);
      });
      el.append(w);
      if (wi < words.length - 1) el.append(" ");
    });

    function roll(toY: number) {
      gsap.to(tracks, {
        yPercent: toY,
        duration: 0.6,
        stagger: 0.018,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    }

    const onEnter = () => roll(-100);
    const onLeave = () => roll(0);

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focus", onEnter);
    el.addEventListener("blur", onLeave);
    return () => {
      gsap.killTweensOf(tracks);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focus", onEnter);
      el.removeEventListener("blur", onLeave);
      el.removeAttribute("data-rolling");
      el.textContent = label;
    };
  }, [ref, label]);
}
