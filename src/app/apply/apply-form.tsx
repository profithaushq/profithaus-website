"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Pill, OptionCard, ProgressBar } from "./pill-option";

const TOTAL_STEPS = 4;

const REVENUE_BANDS = ["£0–5k", "£5–10k", "£10–20k", "£20–50k", "£50k+"];
const TEAM_SIZES = [
  "Just me",
  "Under 5 people",
  "5–15 people",
  "15–30 people",
  "30+ people",
];
const WAYS_OF_WORKING = [
  { title: "Consulting", description: "Strategic guidance" },
  { title: "Custom Partner Retainer", description: "Ongoing partnership" },
  { title: "One Time Audit", description: "Deep dive review" },
  { title: "One Time Project", description: "Specific deliverable" },
  { title: "Not sure yet", description: "We'll help you decide" },
];
const SUPPORT_AREAS = [
  "Ecommerce Trading",
  "Website Build & Management",
  "Digital Business Management",
  "Other",
];
const BRAND_BLOCKERS = [
  "Website design/low conversion",
  "Trading strategy needs improvement",
  "Not enough traffic",
  "Margins or profitability unclear",
  "Unsure what's working",
  "Other",
];

const inputClass =
  "border border-brand-black/15 px-4 py-3 text-sm font-normal focus:border-brand-red focus:outline-none";

function toggleInList(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export default function ApplyForm() {
  const stepRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brandAge, setBrandAge] = useState("");

  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [wayOfWorking, setWayOfWorking] = useState("");

  const [supportAreas, setSupportAreas] = useState<string[]>([]);
  const [brandBlockers, setBrandBlockers] = useState<string[]>([]);

  const [admiredBrands, setAdmiredBrands] = useState("");
  const [anythingElse, setAnythingElse] = useState("");

  useEffect(() => {
    const node = stepRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    gsap.fromTo(
      node,
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
    );
  }, [step]);

  if (submitted) {
    return (
      <div className="border border-brand-black/10 bg-white p-10 text-center">
        <h2 className="font-[family-name:var(--font-manrope)] text-lg font-extrabold">
          Thanks, we&apos;ll be in touch.
        </h2>
        <p className="mt-2 text-brand-grey">
          We read every application. If it looks like a fit, we&apos;ll reach
          out to book a Discovery Call.
        </p>
      </div>
    );
  }

  const step1Valid = email.trim() && fullName.trim() && businessName.trim();
  const step2Valid = monthlyRevenue && teamSize;

  async function submitApplication() {
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          jobPosition,
          businessName,
          websiteUrl,
          brandAge,
          monthlyRevenue,
          teamSize,
          wayOfWorking,
          supportAreas,
          brandBlockers,
          admiredBrands,
          anythingElse,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your application. Please email us directly or try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="border border-brand-black/10 bg-white p-8 sm:p-10"
    >
      <ProgressBar step={step} total={TOTAL_STEPS} />

      <div ref={stepRef}>
      {step === 1 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-black sm:col-span-2">
            Email *
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-black">
            Full name *
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-black">
            Job position
            <input
              type="text"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-black">
            Business name *
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-black">
            Website URL
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-black sm:col-span-2">
            Brand age
            <input
              type="text"
              value={brandAge}
              onChange={(e) => setBrandAge(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-8">
          <div>
            <p className="text-sm font-medium text-brand-black">
              Approximate monthly revenue <span className="text-brand-red">*</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {REVENUE_BANDS.map((band) => (
                <Pill
                  key={band}
                  label={band}
                  selected={monthlyRevenue === band}
                  onClick={() => setMonthlyRevenue(band)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-brand-black">
              Team size <span className="text-brand-red">*</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {TEAM_SIZES.map((size) => (
                <Pill
                  key={size}
                  label={size}
                  selected={teamSize === size}
                  onClick={() => setTeamSize(size)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-brand-black">Way of working</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {WAYS_OF_WORKING.map((option) => (
                <OptionCard
                  key={option.title}
                  title={option.title}
                  description={option.description}
                  selected={wayOfWorking === option.title}
                  onClick={() => setWayOfWorking(option.title)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 space-y-8">
          <div>
            <p className="text-sm font-medium text-brand-black">
              Where do you need support?
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {SUPPORT_AREAS.map((area) => (
                <Pill
                  key={area}
                  label={area}
                  selected={supportAreas.includes(area)}
                  onClick={() =>
                    setSupportAreas((prev) => toggleInList(prev, area))
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-brand-black">
              What&apos;s holding your brand back?
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {BRAND_BLOCKERS.map((blocker) => (
                <Pill
                  key={blocker}
                  label={blocker}
                  selected={brandBlockers.includes(blocker)}
                  onClick={() =>
                    setBrandBlockers((prev) => toggleInList(prev, blocker))
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="mt-8 space-y-6">
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-black">
            What brands do you admire in your space?
            <textarea
              value={admiredBrands}
              onChange={(e) => setAdmiredBrands(e.target.value)}
              rows={4}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-brand-black">
            Anything else you&apos;d like us to know?
            <textarea
              value={anythingElse}
              onChange={(e) => setAnythingElse(e.target.value)}
              rows={4}
              className={inputClass}
            />
          </label>
        </div>
      )}
      </div>

      <div className="mt-10 flex gap-4">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 border border-brand-black/15 px-6 py-3 font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-brand-black transition-colors hover:border-brand-black/30 sm:flex-none"
          >
            Back
          </button>
        )}

        {step < TOTAL_STEPS ? (
          <button
            key="next"
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={
              (step === 1 && !step1Valid) || (step === 2 && !step2Valid)
            }
            className="flex-1 bg-brand-black px-6 py-3 font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          >
            Next
          </button>
        ) : (
          <button
            key="submit"
            type="button"
            onClick={submitApplication}
            disabled={submitting}
            className="flex-1 bg-brand-black px-6 py-3 font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          >
            {submitting ? "Submitting..." : "Apply now"}
          </button>
        )}
      </div>

      {submitError && (
        <p className="mt-4 text-center text-xs text-brand-red">{submitError}</p>
      )}

      {step === TOTAL_STEPS && !submitError && (
        <p className="mt-4 text-center text-xs text-brand-grey">
          Applications are reviewed manually within 72hrs
        </p>
      )}
    </form>
  );
}
