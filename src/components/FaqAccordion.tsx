"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What is profithaus. and what do you offer?",
    answer:
      "profithaus. is a modern ecommerce partner built for ambitious brands that want more than a typical agency relationship. We combine trade strategy, marketing, creative and e-commerce expertise to help turn websites and marketing channels into real revenue drivers, without the slow replies, generic strategies or disconnected agency approach. We work closely with a small number of brands at a time, allowing us to stay hands-on, collaborative and genuinely invested in delivering meaningful growth.",
  },
  {
    question: "How does the waitlist work?",
    answer:
      "Simply register your interest through our waitlist form and yes, it's completely free with no pressure attached! If we think we're potentially a great fit, we'll invite you to a Discovery Call to learn more about your brand, goals and where you want to take things.",
  },
  {
    question: "What type of brands do you work with?",
    answer:
      "Mid luxury and high-end luxury brands. We specialise in fashion & beauty, but if your brand has the ambition and standards to match, we're interested.",
  },
  {
    question: "Do you offer one-off projects or ongoing support?",
    answer:
      "Both. Some brands come to us for a single project, while others want a long-term integrated partner.",
  },
  {
    question: "Are you a traditional agency?",
    answer:
      "Not really and we want to keep it that way. We're much more collaborative and integrated than a typical agency setup. We care about building brands people obsess over, not just ticking off deliverables.",
  },
  {
    question: "How involved will profithaus. be with my brand?",
    answer:
      "As involved as needed. For some brands we act as strategic support in the background, for others we become fully integrated into the day-to-day team.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-ink transition-colors group-hover:text-accent">
                {faq.question}
              </span>
              <span
                className={`text-xl text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div className={`accordion-panel ${isOpen ? "is-open" : ""}`}>
              <div>
                <p className="pb-5 text-sm text-ink-soft">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
