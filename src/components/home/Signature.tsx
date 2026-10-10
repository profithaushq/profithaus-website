import { Nothing_You_Could_Do } from "next/font/google";

const hand = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/**
 * The founders' sign-off, in pen on the page: handwriting with a slightly
 * unsteady line, written on left to right when it comes into view.
 * Must sit inside a Reveal, which adds .is-visible.
 */
export default function Signature() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="font-sans text-[11px] font-medium tracking-[0.18em] text-burgundy uppercase">
        Signed
      </span>

      <svg width="0" height="0" aria-hidden className="absolute">
        <filter id="ph-ink" x="-5%" y="-25%" width="110%" height="150%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.035"
            numOctaves="1"
            seed="5"
            result="warp"
          />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.6" />
        </filter>
      </svg>

      <p
        className="ph-write inline-block -rotate-2 text-[clamp(2.4rem,3.8vw,3.2rem)] leading-[1.3] text-[#1b2238]"
        style={{
          fontFamily: hand.style.fontFamily,
          filter: "url(#ph-ink)",
          WebkitTextStroke: "0.5px currentColor",
        }}
      >
        Heidi, Saxon and Tim
      </p>
    </div>
  );
}
