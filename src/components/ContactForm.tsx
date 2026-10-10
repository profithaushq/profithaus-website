"use client";

import { useState, type FormEvent } from "react";

const labelClass =
  "flex flex-col gap-1 font-sans text-[11px] font-medium tracking-[0.16em] text-powder uppercase";
const inputClass =
  "border-0 border-b border-white/30 bg-transparent px-0 py-3 font-sans text-base font-normal tracking-normal text-white normal-case transition-colors focus:border-pink focus:outline-none";

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
      <div>
        <h3 className="font-serif text-3xl leading-tight tracking-[-0.02em]">
          Thanks for reaching out.
        </h3>
        <p className="mt-3 text-white/80">
          We&apos;ll reply within one to two working days.
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
    <form onSubmit={handleSubmit} className="grid gap-5">
      <label className={labelClass}>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        Email *
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        Phone
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        Comment
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </label>

      {submitError && <p className="text-sm text-powder">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 inline-flex w-full items-center justify-center bg-porcelain px-7 py-4 font-sans text-xs font-medium tracking-[0.18em] text-oxblood uppercase transition-colors duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
