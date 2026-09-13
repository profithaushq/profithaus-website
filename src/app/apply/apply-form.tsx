"use client";

import { useState } from "react";

export default function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium">
          Thanks — we&apos;ll be in touch.
        </h2>
        <p className="mt-2 text-ink-soft">
          We read every application. If it looks like a fit, we&apos;ll reach
          out to book a Discovery Call.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-2xl bg-white p-8 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-ink sm:col-span-2">
          Email *
          <input
            type="email"
            name="email"
            required
            className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Full name *
          <input
            type="text"
            name="fullName"
            required
            className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Job position
          <input
            type="text"
            name="jobPosition"
            className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Business name *
          <input
            type="text"
            name="businessName"
            required
            className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Website URL
          <input
            type="url"
            name="websiteUrl"
            className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-ink sm:col-span-2">
          Brand age
          <input
            type="text"
            name="brandAge"
            className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-maroon px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-maroon-dark sm:w-auto"
      >
        Next
      </button>
    </form>
  );
}
