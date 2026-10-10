"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const FAQS = [
  {
    question: "What is profithaus. and what do you offer?",
    answer:
      "profithaus. is a modern ecommerce partner built for ambitious brands that want more than a typical agency relationship. We combine trade strategy, website performance and commercial expertise to turn your site into a real revenue driver, without the slow replies, generic strategies or disconnected agency approach. We work closely with a small number of brands at a time, allowing us to stay hands-on, collaborative and genuinely invested in delivering meaningful growth.",
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const rows = container.querySelectorAll(".faq-row");

    if (reduceMotion) {
      gsap.set(rows, { opacity: 1, x: 0 });
      return;
    }

    gsap.set(rows, { opacity: 0, x: -16 });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(rows, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          }),
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="divide-y divide-brand-black/10 border-y border-brand-black/10"
    >
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="faq-row group">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-transform duration-300 group-hover:translate-x-1"
              aria-expanded={isOpen}
            >
              <span className="font-sans font-medium text-brand-black transition-colors group-hover:text-brand-red">
                {faq.question}
              </span>
              <span
                className={`text-xl text-brand-red transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div className={`accordion-panel ${isOpen ? "is-open" : ""}`}>
              <div>
                <p className="pb-5 text-sm text-brand-grey">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
