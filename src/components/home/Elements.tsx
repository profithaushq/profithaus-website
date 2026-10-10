"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import PH from "@/components/PH";
import Reveal from "@/components/Reveal";
import { ELEMENTS, type Element } from "@/data/elements";

const STEPS = Array.from({ length: 15 }, (_, i) => i);

type Zone = "profit" | "lean-profit" | "neutral" | "lean-haus" | "haus";

const ZONE_COPY: Record<Zone, { tag: string; line: string }> = {
  profit: {
    tag: "Too profit",
    line: "Discount every Friday. Wonder why nobody pays full price.",
  },
  "lean-profit": {
    tag: "Leaning profit",
    line: "Selling fine. Feels cheaper than it should.",
  },
  neutral: { tag: "Neutral", line: "Wanted, and easy to buy from." },
  "lean-haus": {
    tag: "Leaning haus",
    line: "Looks right. Converts less than it could.",
  },
  haus: {
    tag: "Too haus",
    line: "Beautiful site. Checkout nobody can find.",
  },
};

function zoneOf(v: number): Zone {
  if (v <= 4.4) return "profit";
  if (v >= 9.6) return "haus";
  if (Math.abs(v - 7) < 0.75) return "neutral";
  return v < 7 ? "lean-profit" : "lean-haus";
}

/**
 * "What's your brand's pH?" The instrument and the six elements. Everything
 * here answers a touch: bars set the reading, tiles move the needle to their
 * side and hold it there, and the detail panel changes with the element.
 */
export default function Elements() {
  const sectionRef = useRef<HTMLElement>(null);
  const needle = useRef({ v: 7 });
  const tween = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const touched = useRef(false);
  const [v, setV] = useState(7);
  const [active, setActive] = useState<Element>(ELEMENTS[0]);

  const goTo = useCallback((target: number, duration = 0.7) => {
    tween.current?.kill();
    tween.current = gsap.to(needle.current, {
      v: target,
      duration,
      ease: "lux",
      onUpdate: () => setV(Math.round(needle.current.v * 10) / 10),
    });
  }, []);

  // One gentle sweep the first time the instrument comes into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => {
          if (touched.current) return;
          const tl = gsap.timeline({
            onUpdate: () => setV(Math.round(needle.current.v * 10) / 10),
          });
          needle.current.v = 2;
          tl.to(needle.current, { v: 2, duration: 0.01 })
            .to(needle.current, { v: 12, duration: 1.3, ease: "power2.inOut" })
            .to(needle.current, { v: 7, duration: 1.1, ease: "lux" });
          tween.current = tl;
        },
      });
      return () => st.kill();
    });
    return () => {
      mm.revert();
      tween.current?.kill();
    };
  }, []);

  function pickBar(n: number) {
    touched.current = true;
    goTo(n);
  }

  function pickElement(el: Element) {
    touched.current = true;
    setActive(el);
    // The element pulls the brand towards its side and the reading stays
    // there until something else is picked
    goTo(el.side === "haus" ? 10 : 4, 0.8);
  }

  const zone = zoneOf(v);
  const whole = Math.round(v);
  const profitSide = active.side === "profit";

  return (
    <section
      id="elements"
      ref={sectionRef}
      aria-labelledby="elements-heading"
      className="scroll-mt-20 bg-white px-6 py-32 text-oxblood sm:px-10 sm:py-44"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-baseline lg:gap-16">
            <h2
              id="elements-heading"
              className="font-serif text-[clamp(2.6rem,5vw,4.4rem)] leading-none tracking-[-0.02em]"
            >
              What&apos;s your brand&apos;s p<em>H</em>?
            </h2>
            <p className="max-w-md text-base leading-relaxed text-ink">
              Six elements. We test which ones are off, then fix them until the
              brand reads neutral.
            </p>
          </div>
        </Reveal>

        {/* The instrument */}
        <Reveal delay={120} className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <p className="font-sans font-medium text-xs tracking-[0.1em] text-burgundy uppercase">
              <PH /> {v.toFixed(1)} · {ZONE_COPY[zone].tag}
            </p>
            <p
              aria-live="polite"
              className="min-h-[1.5rem] text-sm text-ink-soft"
            >
              {ZONE_COPY[zone].line}
            </p>
          </div>

          <div
            role="group"
            aria-label="pH scale, 0 to 14. Choose a reading."
            className="mt-4 grid items-end gap-[3px]"
            style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
          >
            {STEPS.map((n) => {
              const on = whole === n;
              return (
                <button
                  key={n}
                  type="button"
                  aria-label={`Set the reading to ${n}`}
                  aria-pressed={on}
                  onClick={() => pickBar(n)}
                  className="group flex cursor-pointer flex-col items-center gap-1.5 pt-2 outline-offset-2"
                >
                  <span
                    className={`block w-full transition-[height,background-color] duration-500 ease-out ${
                      on ? "bg-oxblood" : "bg-line-strong group-hover:bg-powder"
                    }`}
                    style={{ height: on ? 44.8 : 28 }}
                  />
                  <span
                    className={`font-sans font-medium text-[11px] transition-colors duration-300 ${
                      on ? "text-oxblood" : "text-mute"
                    }`}
                  >
                    {n}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex justify-between font-sans font-medium text-[10px] tracking-[0.08em] text-oxblood uppercase sm:text-[11px]">
            <span>0 · All profit, no pull</span>
            <span className="hidden sm:inline">7 · profithaus</span>
            <span>14 · All haus, no sales</span>
          </div>
        </Reveal>

        {/* The six elements */}
        <ul className="mt-16 grid grid-cols-3 gap-4 lg:grid-cols-6">
          {ELEMENTS.map((el, i) => {
            const isActive = active.n === el.n;
            const profit = el.side === "profit";
            return (
              <li key={el.n}>
                <Reveal delay={i * 70}>
                  <button
                    type="button"
                    onClick={() => pickElement(el)}
                    aria-pressed={isActive}
                    className={`group relative flex aspect-square w-full cursor-pointer flex-col p-3.5 text-left transition-[transform,background-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 sm:p-4 ${
                      profit
                        ? "bg-oxblood text-white hover:bg-burgundy"
                        : "bg-white text-oxblood shadow-[inset_0_0_0_1px_var(--line)] hover:bg-porcelain"
                    } ${isActive ? "outline-2 outline-offset-4 outline-oxblood" : ""}`}
                  >
                    <span
                      className={`flex justify-between font-sans font-medium text-[9px] tracking-[0.08em] sm:text-[10px] ${
                        profit ? "text-powder" : "text-burgundy"
                      }`}
                    >
                      <span>{el.n}</span>
                      <span className="uppercase">{el.side}</span>
                    </span>
                    <span className="flex flex-1 items-center font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-none tracking-[-0.02em] transition-transform duration-500 ease-out group-hover:translate-x-1">
                      {el.symbol}
                    </span>
                    <span className="font-serif text-[15px] leading-[1.05] sm:text-base">
                      {el.title}
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* What the selected element does */}
        <div
          aria-live="polite"
          className={`mt-10 grid gap-6 p-7 transition-colors duration-700 ease-out sm:p-10 md:grid-cols-[auto_1fr] md:gap-14 ${
            profitSide ? "bg-oxblood text-white" : "bg-porcelain text-oxblood"
          }`}
        >
          <div
            key={`s-${active.n}`}
            className="ph-swap font-serif text-[clamp(5rem,12vw,10rem)] leading-[0.8] tracking-[-0.04em]"
            aria-hidden
          >
            {active.symbol}
          </div>
          <div key={`d-${active.n}`} className="ph-swap max-w-2xl">
            <p
              className={`font-sans font-medium text-xs tracking-[0.12em] uppercase ${
                profitSide ? "text-powder" : "text-burgundy"
              }`}
            >
              Element {active.n} · {active.side} side
            </p>
            <p className="mt-3 font-serif text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.02em]">
              {active.title}
            </p>
            <p
              className={`mt-5 text-base leading-relaxed sm:text-lg ${
                profitSide ? "text-white/90" : "text-ink"
              }`}
            >
              {active.description}
            </p>
            <p
              className={`mt-5 font-sans font-medium text-[11px] tracking-[0.1em] uppercase ${
                profitSide ? "text-powder" : "text-burgundy"
              }`}
            >
              Pulls a brand towards {active.side}
            </p>
          </div>
        </div>

        {/* Consultancy first; execution when it fits */}
        <Reveal className="mt-28 sm:mt-40">
          <div className="grid gap-px bg-line-strong md:grid-cols-[1.1fr_1fr_1fr]">
            <div className="bg-white py-8 pr-6 md:py-10">
              <p className="font-sans font-medium text-xs tracking-[0.12em] text-burgundy uppercase">
                How we work
              </p>
              <p className="mt-4 font-serif text-[clamp(2.1rem,3.8vw,3.2rem)] leading-[1.05] tracking-[-0.02em]">
                Advice first. <em>Build</em> if it helps.
              </p>
            </div>
            <div className="bg-porcelain p-7 sm:p-8">
              <p className="font-sans font-medium text-[11px] tracking-[0.12em] text-burgundy uppercase">
                01 · The main job
              </p>
              <p className="mt-3 font-serif text-2xl leading-tight">
                Consulting
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink">
                Ongoing strategy for the brand and the business, with us in the
                meetings and on it. All the director energy, none of the
                payroll.
              </p>
            </div>
            <div className="bg-porcelain p-7 sm:p-8">
              <p className="font-sans font-medium text-[11px] tracking-[0.12em] text-burgundy uppercase">
                02 · When it fits
              </p>
              <p className="mt-3 font-serif text-2xl leading-tight">
                Execution
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink">
                Our team can build what we recommend, so nothing gets lost in a
                handover.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
