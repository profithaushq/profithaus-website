"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";
import Mark from "@/components/Mark";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply to work with us" },
  { href: "/about-us", label: "About Us" },
  { href: "/faq", label: "FAQ's & Contact Us" },
];

const CLOSING_LINE = "Run it like you own it.";

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
    gsap.set(q(".ph-mark-stem, .ph-mark-bowl"), { drawSVG: "0%" });
    gsap.set(q(".ph-mark-dot"), { scale: 0, svgOrigin: "447 568" });

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
            q(".ph-mark-stem, .ph-mark-bowl"),
            { drawSVG: "100%", duration: 1, stagger: 0.15, ease: "power2.inOut" },
            0.2,
          )
          .to(
            q(".ph-mark-dot"),
            { scale: 1, svgOrigin: "447 568", duration: 0.4, ease: "back.out(2)" },
            1.1,
          );
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="fixed right-0 bottom-0 left-0 z-0 isolate min-h-[80svh] overflow-hidden bg-brand-black text-white"
    >
      <LivingBackground className="absolute inset-0" paused={!live} />

      <div className="relative z-10 flex min-h-[80svh] flex-col justify-between px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex items-start justify-between gap-8">
          <p className="max-w-[16ch] font-[family-name:var(--font-manrope)] text-[clamp(3rem,9.5vw,10rem)] leading-[0.95] font-extrabold tracking-tight">
            {CLOSING_LINE.split(" ").map((word, i) => (
              <span key={i} className="mr-[0.25em] -mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-top">
                <span className="signoff-word inline-block">{word}</span>
              </span>
            ))}
          </p>

          <div
            ref={markRef}
            className="hidden h-28 w-28 shrink-0 sm:block lg:h-44 lg:w-44"
          >
            <Mark className="h-full w-full" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-10 border-t border-white/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href="mailto:team@profithaus.co.uk"
              className="font-[family-name:var(--font-manrope)] text-xl font-semibold underline decoration-white/40 decoration-2 underline-offset-8 hover:decoration-white"
            >
              team@profithaus.co.uk
            </a>
            <div className="mt-5 flex gap-6 font-[family-name:var(--font-manrope)] text-sm text-white/60">
              <span>Instagram</span>
              <span>LinkedIn</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 sm:items-end">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-white/75 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 font-[family-name:var(--font-manrope)] text-xs text-white/40">
          © {new Date().getFullYear()} profithaus.
        </p>
      </div>
    </footer>
  );
}
