"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";
import Mark from "@/components/Mark";
import PH from "@/components/PH";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Test your pH" },
  { href: "/about-us", label: "About" },
  { href: "/faq", label: "FAQ and contact" },
];

// "haus" is italic in the logo, so the second half of the line is too
const CLOSING_WORDS = [
  { w: "Find", i: false },
  { w: "out", i: false },
  { w: "where", i: false },
  { w: "yours", i: true },
  { w: "reads.", i: true },
];

export default function FooterSignOff() {
  const footerRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const root = document.documentElement;
    let refreshTimer: number | undefined;

    function measure() {
      if (!footer) return;
      root.style.setProperty("--ph-footer-h", `${footer.offsetHeight}px`);
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    }

    function updateLive() {
      if (!footer) return;
      const remaining =
        root.scrollHeight - window.innerHeight - window.scrollY;
      setLive(remaining < footer.offsetHeight + 120);
    }

    measure();
    updateLive();

    const ro = new ResizeObserver(measure);
    ro.observe(footer);
    window.addEventListener("scroll", updateLive, { passive: true });
    window.addEventListener("resize", updateLive);

    return () => {
      ro.disconnect();
      window.clearTimeout(refreshTimer);
      window.removeEventListener("scroll", updateLive);
      window.removeEventListener("resize", updateLive);
    };
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    const mark = markRef.current;
    if (!footer || !mark) return;

    const words = footer.querySelectorAll(".signoff-word");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }

    const q = gsap.utils.selector(mark);
    gsap.set(words, { yPercent: 110 });
    gsap.set(q(".ph-mark-disc"), { opacity: 0 });
    gsap.set(q(".ph-mark-p, .ph-mark-h"), { opacity: 0, y: 6 });
    gsap.set(q(".ph-mark-divide"), { scaleY: 0, svgOrigin: "50 50" });

    const page = document.querySelector(".ph-page");
    if (!page) return;

    const trigger = ScrollTrigger.create({
      trigger: page,
      start: "bottom 88%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(words, {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power4.out",
        })
          .to(
            q(".ph-mark-disc"),
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            0.2,
          )
          .to(
            q(".ph-mark-divide"),
            { scaleY: 1, svgOrigin: "50 50", duration: 0.9, ease: "power3.inOut" },
            0.3,
          )
          .to(
            q(".ph-mark-p, .ph-mark-h"),
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
            0.7,
          );
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="fixed right-0 bottom-0 left-0 z-0 isolate min-h-[80svh] overflow-hidden bg-oxblood text-white"
    >
      <LivingBackground className="absolute inset-0" paused={!live} />

      <div className="relative z-10 flex min-h-[80svh] flex-col justify-between px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex items-start justify-between gap-8">
          <p className="max-w-[12ch] font-serif text-[clamp(3.2rem,9.5vw,10rem)] leading-[0.95] tracking-[-0.03em]">
            {CLOSING_WORDS.map(({ w, i: italic }, i) => (
              <span
                key={i}
                className="mr-[0.22em] -mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-top"
              >
                <span
                  className={`signoff-word inline-block ${italic ? "italic text-powder" : ""}`}
                >
                  {w}
                </span>
              </span>
            ))}
          </p>

          <div
            ref={markRef}
            className="hidden h-28 w-28 shrink-0 sm:block lg:h-44 lg:w-44"
            style={{ ["--mark-disc" as string]: "var(--burgundy)" }}
          >
            <Mark className="h-full w-full" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-10 border-t border-white/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href="mailto:team@profithaus.co.uk"
              className="font-serif text-3xl tracking-[-0.01em] underline decoration-pink decoration-1 underline-offset-8 hover:decoration-white"
            >
              team@profithaus.co.uk
            </a>
            <div className="mt-5 flex gap-6 font-mono text-xs tracking-[0.1em] text-powder uppercase">
              <span>Instagram</span>
              <span>LinkedIn</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 sm:items-end">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs tracking-[0.1em] text-powder uppercase hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 flex flex-wrap justify-between gap-4 font-mono text-[11px] tracking-[0.1em] text-powder/70 uppercase">
          <span>© {new Date().getFullYear()} profithaus</span>
          <span>
            <PH /> 7.0 · Neutral
          </span>
        </p>
      </div>
    </footer>
  );
}
