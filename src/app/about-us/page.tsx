import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import AmbientLines from "@/components/AmbientLines";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us | profithaus.",
};

const MONO_LABEL =
  "font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em]";

const STORY = [
  {
    number: "01",
    title: "Why we exist.",
    paragraphs: [
      "We're the agency our founders wished existed when they were the ones hiring agencies.",
      "8+ years in-house at fast-paced DTC brands, including start-ups like Known Nutrition and global giant THG, across names like LookFantastic and Coggles, turning websites and marketing channels into actual revenue. Which means we've also sat on your side of the table. Briefing agencies. Chasing agencies. Quietly losing faith in agencies.",
      "The slow replies. The strategy decks that looked great and changed nothing. The hours billed that never quite showed up in the numbers.",
      "Most agencies sell you the work. We care about what it actually does. So we built just that.",
    ],
  },
  {
    number: "02",
    title: "How we work.",
    paragraphs: [
      "No account manager relaying your question to someone who relays it to someone else. The people you meet are the people doing the work.",
      "We're selective on purpose, because we only take on brands we genuinely think we can move, and we'd rather say no than pad a roster. Senior-led, hands-on, and as embedded as you need us to be.",
    ],
  },
  {
    number: "03",
    title: "What we bring.",
    paragraphs: [
      "Real in-house experience. Commercial thinking. A team that's actually been on your side of the table, managing trading targets, overseeing margins and P&Ls, optimising conversion rates, and turning websites into revenue drivers.",
    ],
  },
];

const CAPABILITIES = [
  {
    category: "Ecommerce Trading",
    items: [
      "Product Focus & Merchandising",
      "Pricing & Promotional Strategy",
      "Customer Journey Analysis",
      "Trading Strategy & Forecasting",
      "Performance Review & Insight Generation",
      "Scaling Roadmaps",
    ],
  },
  {
    category: "Website Build & Management",
    items: [
      "Full-Service Website Builds",
      "Ongoing Site Management",
      "Conversion Rate Optimisation",
      "Website Design",
      "Performance, Uptime & Reliability",
    ],
  },
  {
    category: "Digital Business Management",
    items: [
      "Margins & P&L Oversight",
      "Cost of Goods & Contribution by SKU",
      "Trade Revenue & GP Targets & Forecasts",
      "Commercial Decision-Making",
      "Profitability-Led Growth Planning",
    ],
  },
];

export default function AboutUs() {
  return (
    <>
      <PageHeader
        eyebrow="About profithaus"
        title="The agency we wished existed."
        subcopy="Built by the people who spent years briefing agencies, chasing agencies, and quietly losing faith in them."
      />

      <section className="mx-auto max-w-3xl px-6 py-20">
        {STORY.map((section, i) => (
          <Reveal
            key={section.number}
            delay={i * 100}
            className={`flex gap-6 ${i > 0 ? "mt-16" : ""}`}
          >
            <span className={`${MONO_LABEL} text-2xl text-brand-red/40`}>
              {section.number}
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-manrope)] text-lg font-extrabold">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-brand-grey">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <AmbientLines />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid gap-10 sm:grid-cols-3">
            {CAPABILITIES.map((group, i) => (
              <Reveal key={group.category} delay={i * 100}>
                <h3 className={`${MONO_LABEL} text-brand-red`}>
                  {group.category}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-brand-grey">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Reveal>
          <p className="text-brand-grey">
            Our trading background means we think commercially at every step,
            setting revenue targets, forecasting GP, and making decisions
            backed by data, not gut feel. All joined up under one approach, so
            nothing operates in a silo.
          </p>
          <p className="mt-4 font-[family-name:var(--font-manrope)] text-lg font-extrabold text-brand-black">
            We&apos;re not here to be your agency. We&apos;re here to be the
            part of your team that actually gets it.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/apply">Apply to work with us</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
