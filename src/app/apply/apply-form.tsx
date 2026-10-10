"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/config/site";

const ROLES = [
  "Founder or co-founder",
  "Head of marketing or ecommerce",
  "Other",
];
const CATEGORIES = [
  "Fashion",
  "Beauty",
  "Accessories or jewellery",
  "Something else",
];
const REVENUES = [
  "Pre-launch",
  "Under £500k",
  "£500k to £2m",
  "£2m to £10m",
  "£10m+",
];
const SOURCES = [
  "LinkedIn",
  "Instagram or TikTok",
  "Referral",
  "Search",
  "Other",
];

type Values = {
  name: string;
  email: string;
  brand: string;
  website: string;
  role: string;
  category: string;
  revenue: string;
  challenge: string;
  source: string;
};

const EMPTY: Values = {
  name: "",
  email: "",
  brand: "",
  website: "",
  role: "",
  category: "",
  revenue: "",
  challenge: "",
  source: "",
};

type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Add your name so we know who to reply to";
  if (!v.email.trim()) e.email = "Add your email so we can reply";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "That email doesn't look quite right, can you check it?";
  if (!v.brand.trim()) e.brand = "Add the name of the brand";
  if (!v.website.trim())
    e.website = "Add the brand's website, for example yourbrand.com";
  if (!v.role) e.role = "Choose the option closest to your role";
  if (!v.category) e.category = "Choose the category that fits best";
  if (!v.revenue) e.revenue = "Choose a rough revenue range, roughly is fine";
  if (!v.challenge.trim())
    e.challenge = "Tell us what's hardest right now, a sentence is fine";
  return e;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

const FIELD_ORDER: (keyof Values)[] = [
  "name",
  "email",
  "brand",
  "website",
  "role",
  "category",
  "revenue",
  "challenge",
];

const baseField =
  "w-full border-0 border-b border-stone bg-transparent px-0 py-3 text-base text-brand-black outline-none transition-colors duration-300 placeholder:text-stone focus:border-brand-red focus:shadow-[0_1px_0_0_var(--color-brand-red)] aria-[invalid=true]:border-brand-red";

const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%23141414' stroke-width='1.6'><path d='M1 1.5l5 5 5-5'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.25rem center",
} as const;

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="caps block text-brand-black">
        {label}
        {optional && <span className="text-ink-soft"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-brand-black">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ApplyForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<
    Partial<Record<keyof Values, boolean>>
  >({});
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Keep any campaign tags from the landing URL in hidden fields, so we can
  // see which posts drive applications.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((key) => {
      const input = formRef.current?.elements.namedItem(key);
      if (input instanceof HTMLInputElement) {
        input.value = params.get(key) ?? "";
      }
    });
  }, []);

  const errors = validate(values);
  const show = (k: keyof Values) =>
    attempted || touched[k] ? errors[k] : undefined;

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function props(key: keyof Values) {
    const err = show(key);
    return {
      id: key,
      name: key,
      value: values[key],
      onBlur: () => setTouched((t) => ({ ...t, [key]: true })),
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `${key}-error` : undefined,
    } as const;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setAttempted(true);
    setSubmitError("");

    const first = FIELD_ORDER.find((k) => errors[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ...Object.fromEntries(
            UTM_KEYS.map((key) => [
              key,
              new URLSearchParams(window.location.search).get(key) ?? "",
            ]),
          ),
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        `That didn't send. Please try again, or email ${CONTACT_EMAIL}.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="py-10">
        <h2 className="display text-[clamp(2.8rem,5vw,4.5rem)]">
          Application received.
        </h2>
        <p className="mt-6 max-w-md text-ink-soft">
          Thanks for taking the time. I&apos;ll read it properly and be in touch
          within a few working days.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-9"
    >
      <Field id="name" label="Your name" error={show("name")}>
        <input
          {...props("name")}
          type="text"
          autoComplete="name"
          onChange={(e) => set("name", e.target.value)}
          className={baseField}
        />
      </Field>

      <Field id="email" label="Email" error={show("email")}>
        <input
          {...props("email")}
          type="email"
          autoComplete="email"
          onChange={(e) => set("email", e.target.value)}
          className={baseField}
        />
      </Field>

      <Field id="brand" label="Brand name" error={show("brand")}>
        <input
          {...props("brand")}
          type="text"
          autoComplete="organization"
          onChange={(e) => set("brand", e.target.value)}
          className={baseField}
        />
      </Field>

      <Field id="website" label="Website" error={show("website")}>
        <input
          {...props("website")}
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="yourbrand.com"
          onChange={(e) => set("website", e.target.value)}
          className={baseField}
        />
      </Field>

      <Field id="role" label="Your role" error={show("role")}>
        <select
          {...props("role")}
          onChange={(e) => set("role", e.target.value)}
          className={`${baseField} appearance-none pr-8`}
          style={chevron}
        >
          <option value="" disabled>
            Choose one
          </option>
          {ROLES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field id="category" label="Category" error={show("category")}>
        <select
          {...props("category")}
          onChange={(e) => set("category", e.target.value)}
          className={`${baseField} appearance-none pr-8`}
          style={chevron}
        >
          <option value="" disabled>
            Choose one
          </option>
          {CATEGORIES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field
        id="revenue"
        label="Annual online revenue (roughly is fine)"
        error={show("revenue")}
      >
        <select
          {...props("revenue")}
          onChange={(e) => set("revenue", e.target.value)}
          className={`${baseField} appearance-none pr-8`}
          style={chevron}
        >
          <option value="" disabled>
            Choose one
          </option>
          {REVENUES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field
        id="challenge"
        label="What's the hardest thing about growing the brand right now?"
        error={show("challenge")}
      >
        <textarea
          {...props("challenge")}
          rows={4}
          onChange={(e) => set("challenge", e.target.value)}
          className={`${baseField} resize-y`}
        />
      </Field>

      <Field id="source" label="How did you find us?" optional>
        <select
          {...props("source")}
          onChange={(e) => set("source", e.target.value)}
          className={`${baseField} appearance-none pr-8`}
          style={chevron}
        >
          <option value="">Choose one</option>
          {SOURCES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      {UTM_KEYS.map((key) => (
        // No value prop on purpose: the effect above fills these from the URL and
        // React must not reset them on re-render.
        <input key={key} type="hidden" name={key} />
      ))}

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="caps border border-brand-black bg-transparent px-9 py-4 text-brand-black transition-colors duration-500 ease-out hover:bg-brand-black hover:text-white disabled:cursor-wait disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send application"}
        </button>
        <p className="mt-5 text-sm text-ink-soft">
          We&apos;ll only use this to reply to you.
        </p>
        {submitError && (
          <p role="alert" className="mt-4 text-sm text-brand-black">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
