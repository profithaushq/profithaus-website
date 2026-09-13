"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl bg-cream p-10 text-center">
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium">
          Thanks for reaching out.
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          We&apos;ll reply within 1–2 working days.
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
      className="grid gap-4"
    >
      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Name
        <input
          type="text"
          name="name"
          className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Email *
        <input
          type="email"
          name="email"
          required
          className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Phone
        <input
          type="tel"
          name="phone"
          className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Comment
        <textarea
          name="comment"
          rows={4}
          className="rounded-lg border border-ink/15 px-4 py-3 text-sm font-normal focus:border-maroon focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-maroon px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-maroon-dark sm:w-auto"
      >
        Send
      </button>
    </form>
  );
}
