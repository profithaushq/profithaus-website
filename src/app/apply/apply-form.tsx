"use client";

import { useState } from "react";
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
  "Trading",
  "CRO / Website Design",
  "Marketing",
  "Branding",
  "Content & Creative",
  "Other",
];
const BRAND_BLOCKERS = [
  "Website design/low conversion",
  "Marketing strategy unclear",
  "Trading strategy needs improvement",
  "Not enough traffic",
  "Weak retention/repeat customers",
  "Content not performing",
  "Unsure what's working",
  "Other",
];

const inputClass =
  "rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none";

function toggleInList(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export default function ApplyForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

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

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
          Thanks, we&apos;ll be in touch.
        </h2>
        <p className="mt-2 text-ink-soft">
          We read every application. If it looks like a fit, we&apos;ll reach
          out to book a Discovery Call.
        </p>
      </div>
    );
  }

  const step1Valid = email.trim() && fullName.trim() && businessName.trim();
  const step2Valid = monthlyRevenue && teamSize;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-2xl bg-white p-8 sm:p-10"
    >
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {step === 1 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-ink sm:col-span-2">
            Email *
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
            Full name *
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
            Job position
            <input
              type="text"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
            Business name *
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
            Website URL
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink sm:col-span-2">
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
            <p className="text-sm font-medium text-ink">
              Approximate monthly revenue <span className="text-accent">*</span>
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
            <p className="text-sm font-medium text-ink">
              Team size <span className="text-accent">*</span>
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
            <p className="text-sm font-medium text-ink">Way of working</p>
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
            <p className="text-sm font-medium text-ink">
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
            <p className="text-sm font-medium text-ink">
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
          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
            What brands do you admire in your space?
            <textarea
              value={admiredBrands}
              onChange={(e) => setAdmiredBrands(e.target.value)}
              rows={4}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
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

      <div className="mt-10 flex gap-4">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:border-ink/30 sm:flex-none"
          >
            Back
          </button>
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={
              (step === 1 && !step1Valid) || (step === 2 && !step2Valid)
            }
            className="flex-1 rounded-full bg-maroon px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-maroon-dark disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="flex-1 rounded-full bg-maroon px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-maroon-dark sm:flex-none"
          >
            Apply now
          </button>
        )}
      </div>

      {step === TOTAL_STEPS && (
        <p className="mt-4 text-center text-xs text-ink-soft">
          Applications are reviewed manually within 72hrs
        </p>
      )}
    </form>
  );
}
