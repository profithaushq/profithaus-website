import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import HeroBand from "@/components/HeroBand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Work & Testimonials | profithaus.",
};

const MONO_LABEL =
  "font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em]";

function AdImage({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  return (
    <Reveal delay={index * 80}>
      <div className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-ink/5 transition-transform duration-300 hover:-translate-y-1">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 640px) 25vw, 50vw"
          className="object-cover"
        />
      </div>
    </Reveal>
  );
}

export default function OurWork() {
  return (
    <>
      <HeroBand>
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <p className={`${MONO_LABEL} text-white/70`}>Our work</p>
          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-normal uppercase tracking-tight leading-tight sm:text-4xl">
            Brands we&apos;ve made harder to ignore
          </h1>
          <p className="mt-6 text-white/80">
            A select couple of our most recent projects: branding, paid
            creative and full site builds. The real work, brand by brand.
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
            <p className={`${MONO_LABEL} text-accent`}>01 · AXISBIOTIX</p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-medium">
              AXISBIOTIX
            </h2>
            <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 ${MONO_LABEL} text-ink-soft`}>
              <span>Paid social creative</span>
              <span>Gut-to-skin / DTC</span>
              <span>Meta</span>
            </div>
            <p className="mt-4 max-w-2xl text-ink-soft">
              A couple of examples from a wider bulk creative test across two
              lines, Skin Clear and Skin Calm. AI-generated imagery, built to
              feed Meta&apos;s algorithm the variety it needs to find winners.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <AdImage
              index={0}
              src="/our-work/axis-01-gut-skin.png"
              alt="AxisBiotix Skin Clear ad: your skincare routine starts in your gut"
            />
            <AdImage
              index={1}
              src="/our-work/axis-02-benefit-led.png"
              alt="AxisBiotix Skin Clear ad: clear skin is an inside job"
            />
            <AdImage
              index={2}
              src="/our-work/axis-03-definition.png"
              alt="AxisBiotix Skin Calm ad: word of the day, axisbiotix"
            />
            <AdImage
              index={3}
              src="/our-work/axis-04-lifestyle.png"
              alt="AxisBiotix Skin Calm ad: one sachet, daily, that's it"
            />
          </div>
        </div>

        <div className="mt-24">
          <Reveal>
            <p className={`${MONO_LABEL} text-accent`}>
              02 · The Studio Online
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-medium">
              The Studio Online
            </h2>
            <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 ${MONO_LABEL} text-ink-soft`}>
              <span>Branding</span>
              <span>Paid social creative</span>
              <span>Website build</span>
              <span>Digital subscription</span>
            </div>
            <p className="mt-4 max-w-2xl text-ink-soft">
              A full-service partnership for a digital Pilates subscription
              platform. We handled the brand, the paid social creative and
              the site build.
            </p>
          </Reveal>

          <p className={`mt-8 ${MONO_LABEL} text-ink-soft`}>Paid social</p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <AdImage
              index={0}
              src="/our-work/tso-ad-01.png"
              alt="The Studio Online Meta ad creative: move with intention"
            />
            <AdImage
              index={1}
              src="/our-work/tso-ad-02.png"
              alt="The Studio Online Meta ad creative"
            />
            <AdImage
              index={2}
              src="/our-work/tso-ad-03.png"
              alt="The Studio Online Meta ad creative"
            />
            <AdImage
              index={3}
              src="/our-work/tso-ad-04.png"
              alt="The Studio Online Meta ad creative"
            />
          </div>

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
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-medium sm:text-2xl">
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
