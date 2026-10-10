"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";
import Mark from "@/components/Mark";
import PH from "@/components/PH";

const PROFIT = "profit".split("");
const HAUS = "haus".split("");

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const markWrapRef = useRef<HTMLDivElement>(null);
  const markInnerRef = useRef<HTMLDivElement>(null);
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
    const wrapEl = wrap;
    const markWrapEl = markWrap;
    const markInnerEl = markInner;
    const fadeEls = sectionEl.querySelectorAll(".ph-hero-fade");
    const letters = Array.from(
      sectionEl.querySelectorAll<HTMLElement>(".ph-hero-letter"),
    );
    const profitLetters = letters.filter((l) => l.dataset.side === "profit");
    const divide = sectionEl.querySelector<HTMLElement>(".ph-hero-divide");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Size the wordmark so profit | haus runs edge to edge.
    function fit() {
      const inner = word?.firstElementChild as HTMLElement | null;
      if (!inner) return;
      wrapEl.style.fontSize = "100px";
      const width = inner.getBoundingClientRect().width;
      if (width > 0) {
        const byWidth = (wrapEl.clientWidth / width) * 100 * 0.995;
        // Leave room under it for the tagline and the button: the wordmark
        // window is about 1.36em tall, and everything else needs ~410px.
        const byHeight = (sectionEl.clientHeight - 410) / 1.36;
        wrapEl.style.fontSize = `${Math.max(96, Math.min(byWidth, byHeight))}px`;
      }
    }

    function headerBottom() {
      const header = document
        .getElementById("ph-header-mark")
        ?.closest("header");
      return header ? header.getBoundingClientRect().height : 90;
    }

    let ctx: gsap.Context | undefined;
    let cancelled = false;
    let removePhoneListener: (() => void) | undefined;

    function setup() {
      if (cancelled) return;
      fit();
      gsap.set(word, { autoAlpha: 1 });

      if (reduceMotion) {
        gsap.set(markWrapEl, { opacity: 0 });
        gsap.set(sectionEl.querySelectorAll(".ph-hero-row"), { opacity: 1 });
        const slot = document.getElementById("ph-header-mark");
        if (slot) gsap.set(slot, { opacity: 1 });
        return;
      }

      gsap.set(letters, { yPercent: 140 });
      gsap.set(divide, { scaleY: 0, transformOrigin: "50% 50%" });

      const headerMark = document.getElementById("ph-header-mark");
      const phone = window.matchMedia("(max-width: 767px)");

      function markTarget() {
        const slot = document.getElementById("ph-header-mark");
        if (!slot) return null;
        const s = slot.getBoundingClientRect();
        const w = markWrapEl.getBoundingClientRect();
        const natural = Math.max(
          120,
          w.top + w.height / 2 + window.scrollY - (s.top + s.height / 2),
        );
        const distance = Math.min(natural, window.innerHeight * 0.45);
        return {
          dx: s.left + s.width / 2 - (w.left + w.width / 2),
          dy: distance - natural,
          scale: s.width / markWrapEl.offsetWidth,
          distance,
        };
      }

      function buildPhone() {
        // Phones: no pin and nothing that re-lays out the giant type. The
        // letters lift away with transforms only while the seal glides up.
        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: () => `top ${headerBottom()}px`,
              end: () =>
                `+=${markTarget()?.distance ?? window.innerHeight * 0.45}`,
              scrub: true,
              refreshPriority: 5,
              invalidateOnRefresh: true,
            },
          });

          tl.to(
            letters,
            {
              yPercent: -60,
              opacity: 0,
              ease: "none",
              duration: 0.6,
              stagger: { each: 0.05, from: "start" },
            },
            0,
          )
            .fromTo(
              fadeEls,
              { opacity: 1 },
              {
                opacity: 0,
                ease: "none",
                duration: 0.4,
                immediateRender: false,
              },
              0,
            )
            .to(
              markInnerEl,
              {
                x: () => markTarget()?.dx ?? 0,
                y: () => markTarget()?.dy ?? 0,
                scale: () => markTarget()?.scale ?? 1,
                "--mark-disc": "#5e1424",
                "--mark-glyph": "#ffffff",
                ease: "none",
                duration: 1.1,
              },
              0,
            )
            .set(headerMark, { opacity: 1 }, 1.1)
            .set(markWrapEl, { opacity: 0 }, 1.1);
        }, sectionEl);
      }

      function buildDesktop() {
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

          const inner = word?.firstElementChild as HTMLElement;

          // The crop: the wordmark zooms in on the divide inside its own
          // window, so profit leaves the frame and haus bleeds off the edge.
          const divideX = () => {
            const i = inner.getBoundingClientRect();
            const d = divide?.getBoundingClientRect();
            return d ? d.left + d.width / 2 - i.left : i.width / 2;
          };

          tl.fromTo(
            inner,
            { scale: 1, x: 0 },
            {
              scale: 2.35,
              x: () => wrapEl.clientWidth * 0.1 - divideX(),
              transformOrigin: () => `${divideX()}px 56%`,
              ease: "power2.inOut",
              duration: 0.96,
            },
            0,
          )
            .to(
              profitLetters,
              { opacity: 0, ease: "none", duration: 0.4 },
              0.45,
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
                  const wrapCy =
                    headerBottom() + (w.top - sr.top) + w.height / 2;
                  return s.top + s.height / 2 - wrapCy;
                },
                scale: () => {
                  const slot = document.getElementById("ph-header-mark");
                  if (!slot) return 1;
                  return (
                    slot.getBoundingClientRect().width / markWrapEl.offsetWidth
                  );
                },
                "--mark-disc": "#5e1424",
                "--mark-glyph": "#ffffff",
                ease: "power2.inOut",
                duration: 0.96,
              },
              0,
            )
            .set(headerMark, { opacity: 1 }, 0.96)
            .set(markWrapEl, { opacity: 0 }, 0.96);
        }, sectionEl);
      }

      let built = false;
      function build() {
        ctx?.revert();
        if (built) {
          // Switching between phone and desktop layouts: start clean.
          gsap.set(markWrapEl, { clearProps: "opacity" });
          gsap.set(letters, { clearProps: "opacity,transform" });
        }
        built = true;
        if (phone.matches) buildPhone();
        else buildDesktop();
        ScrollTrigger.refresh();
      }

      build();
      phone.addEventListener("change", build);
      removePhoneListener = () => phone.removeEventListener("change", build);
    }

    // Size the wordmark only once the serif (roman and italic) has really
    // loaded; fonts.ready alone can resolve before the request starts.
    Promise.all([
      document.fonts.load('100px "Instrument Serif"'),
      document.fonts.load('italic 100px "Instrument Serif"'),
    ])
      .catch(() => undefined)
      .then(() => document.fonts.ready)
      .then(setup);

    const ro = new ResizeObserver(() => fit());
    ro.observe(wrapEl);

    return () => {
      cancelled = true;
      removePhoneListener?.();
      ro.disconnect();
      ctx?.revert();
      gsap.set("#ph-header-mark", { clearProps: "opacity" });
    };
  }, []);

  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;

    const run = () => {
      const section = sectionRef.current;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!section || reduceMotion) return;
      const letters = section.querySelectorAll(".ph-hero-letter");
      // The divide draws first, then the two sides rise out of it.
      gsap.to(".ph-hero-divide", {
        scaleY: 1,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(letters, {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.045,
        delay: 0.25,
        ease: "power4.out",
      });
      gsap.fromTo(
        ".ph-hero-row",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power3.out" },
      );
    };

    document.fonts.ready.then(() => requestAnimationFrame(run));
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      data-ph-hero
      className="relative z-[45] overflow-x-clip bg-oxblood text-white"
      style={{ height: "calc(100svh - var(--ph-header-h, 6.5rem))" }}
    >
      <LivingBackground className="absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col px-4 pt-5 pb-8 sm:px-8 sm:pt-8 sm:pb-12">
        {/* Readings, top of frame, in mono */}
        <div className="ph-hero-row ph-hero-fade flex items-baseline justify-between font-mono text-[10px] tracking-[0.14em] text-powder uppercase sm:text-xs">
          <span>E-commerce partner</span>
          <span>Neutral · 7.0</span>
        </div>

        {/* Wordmark and copy: centred on phones, at the top from sm up */}
        <div className="flex flex-1 flex-col justify-center sm:flex-none sm:justify-start">
          <div
            ref={wrapRef}
            className="mt-6 w-full overflow-hidden leading-none sm:mt-8"
            style={{ padding: "0.06em 0 0.3em" }}
          >
            <h1
              ref={wordRef}
              aria-label="profithaus"
              className="ph-hero-word ph-nokern leading-none"
            >
              <span
                aria-hidden
                className="inline-flex items-baseline font-serif leading-none tracking-[-0.04em] whitespace-nowrap"
              >
                {PROFIT.map((c, i) => (
                  <span
                    key={`p${i}`}
                    data-side="profit"
                    className="ph-hero-letter inline-block"
                  >
                    {c}
                  </span>
                ))}
                <span
                  className="ph-hero-divide self-center bg-pink"
                  style={{
                    width: "max(3px, 0.0165em)",
                    height: "0.82em",
                    margin: "0 0.1em 0 0.12em",
                  }}
                />
                {HAUS.map((c, i) => (
                  <span
                    key={`h${i}`}
                    data-side="haus"
                    className="ph-hero-letter inline-block italic"
                  >
                    {c}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div className="ph-hero-row mt-4 sm:mt-6">
            <p className="ph-hero-fade max-w-3xl font-serif text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.05] tracking-[-0.015em]">
              Making brands harder to ignore and{" "}
              <em className="text-powder">easier to buy from.</em>
            </p>
            <p className="ph-hero-fade mt-4 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-base">
              An e-commerce consultancy for small and medium brands, run by
              people who have done the job in-house.
            </p>
          </div>
        </div>

        <div className="ph-hero-row mt-auto flex items-end justify-between gap-6 pt-6">
          <Link
            href="/apply"
            className="ph-hero-fade inline-block bg-porcelain px-6 py-3.5 font-mono text-xs tracking-[0.1em] text-oxblood uppercase transition-colors duration-300 hover:bg-white"
          >
            Test your <PH />
          </Link>
          <div
            ref={markWrapRef}
            className="h-14 w-14 shrink-0 sm:h-20 sm:w-20"
          >
            <div
              ref={markInnerRef}
              className="h-full w-full"
              style={{
                ["--mark-disc" as string]: "#faf7f4",
                ["--mark-glyph" as string]: "#5e1424",
              }}
            >
              <Mark className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
