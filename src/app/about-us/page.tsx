import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import StoryBand from "@/components/StoryBand";
import ClosingStatement from "@/components/ClosingStatement";

export const metadata: Metadata = {
  title: "About | profithaus",
};

const GROUNDS = ["white", "porcelain", "oxblood"] as const;

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

export default function AboutUs() {
  return (
    <>
      <PageHeader
        eyebrow="About profithaus"
        title="The agency we wished existed."
        subcopy="Built by the people who spent years briefing agencies, chasing agencies, and quietly losing faith in them."
      />

      {STORY.map((section, i) => (
        <StoryBand
          key={section.number}
          number={section.number}
          title={section.title}
          paragraphs={section.paragraphs}
          ground={GROUNDS[i % GROUNDS.length]}
        />
      ))}

      <ClosingStatement
        lead="Our trading background means we think commercially at every step, setting revenue targets, forecasting GP, and making decisions backed by data, not gut feel. All joined up under one approach, so nothing operates in a silo."
        statement="We're not here to be your agency. We're here to be the part of your team that actually gets it."
      />
    </>
  );
}
