"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "border border-brand-black/15 px-4 py-3 text-sm font-normal focus:border-brand-red focus:outline-none";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (submitted) {
    return (
      <div className="border border-brand-black/10 bg-white p-10 text-center">
        <h3 className="font-sans text-base font-medium">
          Thanks for reaching out.
        </h3>
        <p className="mt-2 text-sm text-brand-grey">
          We&apos;ll reply within 1–2 working days.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, comment }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Please email us directly or try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="flex flex-col gap-2 text-sm font-medium text-brand-black">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-brand-black">
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
        Phone
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-brand-black">
        Comment
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </label>

      {submitError && <p className="text-sm text-brand-red">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full bg-brand-black px-6 py-3 font-sans font-medium text-sm uppercase tracking-[0.1em] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
