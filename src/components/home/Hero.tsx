"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";
import Mark from "@/components/Mark";

const WORD = "profithaus.";
const BASE_SPACING = "-0.1em";

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const markWrapRef = useRef<HTMLDivElement>(null);
  const markInnerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const played = useRef(false);

  // Layout effect so cleanup reverts pin-spacers before React removes the nodes.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const word = wordRef.current;
    const markWrap = markWrapRef.current;
    const markInner = markInnerRef.current;
    if (!section || !wrap || !word || !markWrap || !markInner) return;
    const sectionEl = section;
    const markWrapEl = markWrap;
    const markInnerEl = markInner;
    const fadeEls = sectionEl.querySelectorAll(".ph-hero-fade");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function fit() {
      if (!wrap || !word) return;
      const probe = document.createElement("span");
      probe.textContent = WORD;
      probe.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-family:${getComputedStyle(word).fontFamily};font-weight:800;letter-spacing:${BASE_SPACING};font-size:100px;line-height:1;`;
      wrap.appendChild(probe);
      const width = probe.getBoundingClientRect().width;
      probe.remove();
      if (width > 0) {
        word.style.fontSize = `${(wrap.clientWidth / width) * 100 * 0.995}px`;
      }
    }

    function headerBottom() {
      const header = document
        .getElementById("ph-header-mark")
        ?.closest("header");
      return header ? header.getBoundingClientRect().height : 104;
    }

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    function setup() {
      if (cancelled) return;
      fit();
      splitRef.current?.revert();
      splitRef.current = SplitText.create(word, {
        type: "chars",
        mask: "chars",
      });
      gsap.set(word, { autoAlpha: 1 });

      // The masks only exist to hide letters rising into place. Once settled
      // they must not clip glyph overhang (the f hook, overlapping letters).
      const releaseMasks = () =>
        splitRef.current?.masks.forEach((m) => {
          (m as HTMLElement).style.clipPath = "none";
        });

      // While letters rise into place, hide only what is below the line.
      // Sideways and above stay open so overhangs (the f hook) never clip.
      splitRef.current.masks.forEach((m) => {
        const el = m as HTMLElement;
        el.style.overflow = "visible";
        el.style.clipPath = "inset(-0.3em -0.6em -0.02em -0.6em)";
      });

      if (reduceMotion) {
        releaseMasks();
        gsap.set(markWrapEl, { opacity: 0 });
        gsap.set(sectionEl.querySelectorAll(".ph-hero-row"), { opacity: 1 });
        const slot = document.getElementById("ph-header-mark");
        if (slot) gsap.set(slot, { opacity: 1 });
        return;
      }

      gsap.set(splitRef.current.chars, { yPercent: 115 });

      const headerMark = document.getElementById("ph-header-mark");

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: () => `top ${headerBottom()}px`,
            end: () => `+=${window.innerHeight * 0.9}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            refreshPriority: 5,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          word,
          {
            fontWeight: 200,
            letterSpacing: "0.035em",
            ease: "none",
            duration: 0.96,
          },
          0,
        )
          .fromTo(
            fadeEls,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -24,
              ease: "none",
              duration: 0.35,
              immediateRender: false,
            },
            0,
          )
          .to(
            markInnerEl,
            {
              x: () => {
                const slot = document.getElementById("ph-header-mark");
                if (!slot) return 0;
                const s = slot.getBoundingClientRect();
                const w = markWrapEl.getBoundingClientRect();
                const sr = sectionEl.getBoundingClientRect();
                const wrapCx = w.left - sr.left + w.width / 2;
                return s.left + s.width / 2 - wrapCx;
              },
              y: () => {
                const slot = document.getElementById("ph-header-mark");
                if (!slot) return 0;
                const s = slot.getBoundingClientRect();
                const w = markWrapEl.getBoundingClientRect();
                const sr = sectionEl.getBoundingClientRect();
                const wrapCy = headerBottom() + (w.top - sr.top) + w.height / 2;
                return s.top + s.height / 2 - wrapCy;
              },
              scale: () => {
                const slot = document.getElementById("ph-header-mark");
                if (!slot) return 1;
                return (
                  slot.getBoundingClientRect().width / markWrapEl.offsetWidth
                );
              },
              ease: "power2.inOut",
              duration: 0.96,
            },
            0,
          )
          .set(headerMark, { opacity: 1 }, 0.96)
          .set(markWrapEl, { opacity: 0 }, 0.96);
      }, sectionEl);

      ScrollTrigger.refresh();
    }

    document.fonts.ready.then(setup);

    const ro = new ResizeObserver(() => fit());
    ro.observe(wrap);

    return () => {
      cancelled = true;
      ro.disconnect();
      ctx?.revert();
      splitRef.current?.revert();
      splitRef.current = null;
      gsap.set("#ph-header-mark", { clearProps: "opacity" });
    };
  }, []);

  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;

    const run = () => {
      const split = splitRef.current;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!split || reduceMotion) return;
      gsap.to(split.chars, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.04,
        ease: "power4.out",
        onComplete: () =>
          split.masks.forEach((m) => {
            (m as HTMLElement).style.clipPath = "none";
          }),
      });
      gsap.fromTo(
        ".ph-hero-row",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" },
      );
    };

    document.fonts.ready.then(() => requestAnimationFrame(run));
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      data-ph-hero
      className="relative z-[45] overflow-x-clip bg-brand-black text-white"
      style={{ height: "calc(100svh - var(--ph-header-h, 6.5rem))" }}
    >
      <LivingBackground className="absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col px-4 pt-6 pb-8 sm:px-8 sm:pt-10 sm:pb-12">
        <div ref={wrapRef} className="w-full">
          <h1
            ref={wordRef}
            className="ph-hero-word block whitespace-nowrap font-[family-name:var(--font-manrope)] font-extrabold"
            style={{
              fontSize: "min(17.5vw, 24rem)",
              lineHeight: 1,
              letterSpacing: BASE_SPACING,
              fontWeight: 800,
              // Pull the p stem onto the same left edge as the copy below.
              marginLeft: "-0.069em",
            }}
          >
            {WORD}
          </h1>
        </div>

        <div
          className="ph-hero-row"
          // Clears the p descender, which hangs below the wordmark's line box.
          style={{ marginTop: "max(1.5rem, calc(min(17.5vw, 24rem) * 0.24))" }}
        >
          <div className="max-w-xl">
            <p className="ph-hero-fade font-[family-name:var(--font-manrope)] text-lg font-semibold sm:text-2xl">
              Ex-operators. Not an agency.
            </p>
            <p className="ph-hero-fade mt-2 text-sm leading-relaxed font-medium text-white/80 sm:text-base">
              The ecommerce partner for luxury fashion, beauty and wellness
              brands. Trading, website builds and digital business management.
            </p>
          </div>
        </div>

        <div className="ph-hero-row mt-auto flex items-end justify-end pt-6">
          <div className="flex items-center gap-6 sm:gap-10">
            <Link
              href="/apply"
              className="ph-hero-fade inline-block font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide underline decoration-white decoration-2 underline-offset-8"
            >
              Book a call
            </Link>
            <div ref={markWrapRef} className="h-14 w-14 sm:h-20 sm:w-20">
              <div ref={markInnerRef} className="h-full w-full">
                <Mark className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
