import type { ReactNode } from "react";
import LivingBackground from "@/components/LivingBackground";

/**
 * Inner-page opening, in the same language as the homepage hero: oxblood
 * ground, the pink divide, a mono reading in the corner. The title and the
 * divide settle in once on load.
 */
export default function PageHeader({
  eyebrow,
  title,
  subcopy,
  children,
}: {
  eyebrow: string;
  title: string;
  subcopy?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-oxblood text-white">
      <LivingBackground className="absolute inset-0 opacity-30" />
      <span
        aria-hidden
        className="ph-draw absolute inset-y-0 right-[8%] hidden w-[3px] bg-pink sm:block"
      />

      <div className="relative mx-auto flex min-h-[26rem] max-w-[1400px] flex-col justify-between px-6 pt-8 pb-14 sm:min-h-[32rem] sm:px-10 sm:pb-20">
        <div className="flex items-baseline justify-between font-mono text-xs tracking-[0.12em] text-powder uppercase">
          <span>{eyebrow}</span>
          <span className="hidden sm:inline">
            <span className="normal-case">pH</span> 7.0 · Neutral
          </span>
        </div>

        <div className="mt-16">
          <h1
            className="ph-swap max-w-[16ch] font-serif text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.03em]"
            style={{ animationDelay: "0.25s" }}
          >
            {title}
          </h1>
          {subcopy && (
            <p
              className="ph-swap mt-8 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
              style={{ animationDelay: "0.5s" }}
            >
              {subcopy}
            </p>
          )}
          {children && (
            <div className="ph-swap mt-8" style={{ animationDelay: "0.65s" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
