import Link from "next/link";
import LitText from "@/components/LitText";

/** A red closing band: one big statement that lights up, then the call to act. */
export default function ClosingStatement({
  lead,
  statement,
  cta,
  href,
}: {
  lead: string;
  statement: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="bg-brand-red py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          {lead}
        </p>
        <LitText
          as="h2"
          dim={0.3}
          className="mt-10 max-w-[22ch] font-[family-name:var(--font-manrope)] text-[clamp(2rem,5.6vw,5.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]"
        >
          {statement}
        </LitText>
        <Link
          href={href}
          className="mt-12 inline-block font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide underline decoration-white decoration-2 underline-offset-8 transition-[text-underline-offset] duration-300 hover:underline-offset-[0.9rem]"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
