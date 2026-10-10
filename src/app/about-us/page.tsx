import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Marquee from "@/components/Marquee";
import StoryBand from "@/components/StoryBand";
import CapabilityColumns from "@/components/CapabilityColumns";
import ClosingStatement from "@/components/ClosingStatement";

export const metadata: Metadata = {
  title: "About Us | profithaus.",
};

// Black, grey, white: the page changes colour as the story moves on.
const BAND_THEMES = [
  { bg: "#141414", fg: "#ffffff", muted: "rgba(255,255,255,0.18)" },
  { bg: "#6e6a66", fg: "#ffffff", muted: "rgba(255,255,255,0.28)" },
  { bg: "#ffffff", fg: "#141414", muted: "rgba(20,20,20,0.14)" },
];

const PHRASES = [
  "REAL IN-HOUSE EXPERIENCE.",
  "SENIOR-LED, HANDS-ON.",
  "COMMERCIAL THINKING.",
  "RUN IT LIKE YOU OWN IT.",
];

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

      <CapabilityColumns groups={CAPABILITIES} />

      {STORY.map((section, i) => (
        <StoryBand
          key={section.number}
          number={section.number}
          title={section.title}
          paragraphs={section.paragraphs}
          {...BAND_THEMES[i % BAND_THEMES.length]}
        />
      ))}

      <section className="overflow-hidden bg-brand-black py-10 text-white sm:py-14">
        <Marquee
          items={PHRASES}
          variant="display"
          duration={140}
          separator="·"
        />
      </section>

      <ClosingStatement
        lead="Our trading background means we think commercially at every step, setting revenue targets, forecasting GP, and making decisions backed by data, not gut feel. All joined up under one approach, so nothing operates in a silo."
        statement="We're not here to be your agency. We're here to be the part of your team that actually gets it."
        cta="Apply to work with us"
        href="/apply"
      />
    </>
  );
}
