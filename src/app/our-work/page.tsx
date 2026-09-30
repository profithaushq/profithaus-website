import type { Metadata } from "next";
import Button from "@/components/Button";
import HeroBand from "@/components/HeroBand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Work & Testimonials | profithaus.",
};

const MONO_LABEL =
  "font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em]";

export default function OurWork() {
  return (
    <>
      <HeroBand>
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <p className={`${MONO_LABEL} text-white/70`}>Our work</p>
          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-3xl font-light tracking-tight leading-[1.1] sm:text-6xl">
            Brands we&apos;ve made harder to ignore
          </h1>
          <p className="mt-6 text-white/80">
            A select couple of our most recent projects: branding and full
            site builds. The real work, brand by brand.
          </p>
        </div>
      </HeroBand>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center text-sm text-ink-soft">
          We&apos;re better at building brands than writing about them. Want
          to see something that isn&apos;t here? Ask, and we&apos;ll send it
          over.
        </p>

        <div className="mt-16">
          <Reveal>
            <p className={`${MONO_LABEL} text-accent`}>
              01 · The Studio Online
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-light">
              The Studio Online
            </h2>
            <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 ${MONO_LABEL} text-ink-soft`}>
              <span>Branding</span>
              <span>Website build</span>
              <span>Digital subscription</span>
            </div>
            <p className="mt-4 max-w-2xl text-ink-soft">
              A full-service partnership for a digital Pilates subscription
              platform. We handled the brand and the site build.
            </p>
          </Reveal>

          <Reveal>
            <blockquote className="mt-12 rounded-2xl bg-white p-8 transition-shadow duration-300 hover:shadow-xl">
              <p className="text-ink-soft italic">
                &ldquo;We had the pleasure of working with profithaus. on the
                redesign of our Oceans Alive website, and we couldn&apos;t be
                happier with the result. From start to finish, they were
                professional, responsive, and incredibly easy to work with.
                They took the time to understand our vision and transformed
                it into a modern, user-friendly website that truly reflects
                our brand and mission. Their attention to detail, creativity,
                and technical expertise were evident throughout the entire
                project. The finished website looks fantastic, functions
                seamlessly, and has received great feedback from our team
                and customers alike. Heidi kept us informed at every stage,
                delivered on time, and went above and beyond to ensure
                everything was exactly as we wanted. We&apos;d highly
                recommend them to anyone looking for a talented and reliable
                web designer.&rdquo;
              </p>
              <footer className="mt-4 text-sm font-medium text-ink">
                Miriam
                <span className="font-normal text-ink-soft">, Director</span>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <HeroBand>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-light sm:text-3xl">
            Want your brand in here?
          </h2>
          <p className="text-white/80">
            If you&apos;d rather have an operator in your corner than an
            agency on retainer, start here.
          </p>
          <Button href="/apply" variant="solid-white">
            Start a project
          </Button>
        </div>
      </HeroBand>
    </>
  );
}
