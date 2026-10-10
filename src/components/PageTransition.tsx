"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import Mark from "@/components/Mark";

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pending = useRef<string | null>(null);
  const reveal = useRef<() => void>(() => {});
  const revealing = useRef(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    gsap.set(panel, { clipPath: "inset(100% 0 0 0)", visibility: "hidden" });

    reveal.current = () => {
      if (revealing.current) return;
      revealing.current = true;
      window.scrollTo(0, 0);
      getLenis()?.scrollTo(0, { immediate: true });
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        delay: 0.2,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(panel, { visibility: "hidden" });
          busy.current = false;
          revealing.current = false;
          pending.current = null;
          getLenis()?.start();
          ScrollTrigger.refresh();
        },
      });
    };

    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        busy.current
      ) {
        return;
      }

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      busy.current = true;
      pending.current = url.pathname;

      getLenis()?.stop();
      gsap.set(panel, { visibility: "visible", clipPath: "inset(100% 0 0 0)" });
      gsap.to(panel, {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.55,
        ease: "expo.inOut",
        onComplete: () => {
          router.push(url.pathname + url.search + url.hash);
          window.setTimeout(() => {
            if (busy.current) reveal.current();
          }, 3500);
        },
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (busy.current && pending.current === pathname) reveal.current();
  }, [pathname]);

  return (
    <div
      ref={panelRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-brand-black"
      style={{ visibility: "hidden", clipPath: "inset(100% 0 0 0)" }}
    >
      <div className="h-24 w-24 sm:h-32 sm:w-32">
        <Mark className="h-full w-full" />
      </div>
    </div>
  );
}
