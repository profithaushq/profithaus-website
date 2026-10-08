import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/config/site";

const KLAVIYO_METRIC_NAME = "Application Submitted";
const KLAVIYO_ALERT_METRIC_NAME = "New Application Alert";
const KLAVIYO_API_REVISION = "2024-10-15";

type ApplyPayload = {
  name: string;
  email: string;
  brand: string;
  website: string;
  role: string;
  category: string;
  revenue: string;
  challenge: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function klaviyoEvent(
  apiKey: string,
  metricName: string,
  profileEmail: string,
  profileAttributes: Record<string, unknown>,
  properties: Record<string, unknown>,
) {
  return fetch("https://a.klaviyo.com/api/events/", {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision: KLAVIYO_API_REVISION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties,
          metric: {
            data: { type: "metric", attributes: { name: metricName } },
          },
          profile: {
            data: {
              type: "profile",
              attributes: { email: profileEmail, ...profileAttributes },
            },
          },
        },
      },
    }),
  });
}

const clean = (value: unknown) =>
  typeof value === "string" ? value.trim() || undefined : undefined;

export async function POST(request: Request) {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!apiKey) {
    console.error("KLAVIYO_PRIVATE_API_KEY is not set");
    return NextResponse.json(
      { error: "Server is not configured to accept applications." },
      { status: 500 },
    );
  }

  let body: Partial<ApplyPayload>;
  try {
    body = (await request.json()) as Partial<ApplyPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const required: (keyof ApplyPayload)[] = [
    "name",
    "email",
    "brand",
    "website",
    "role",
    "category",
    "revenue",
    "challenge",
  ];
  const missing = required.filter((key) => !clean(body[key]));
  if (missing.length > 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email!)) {
    return NextResponse.json(
      { error: "Please complete the required fields." },
      { status: 400 },
    );
  }

  const fullName = body.name!.trim();
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ") || undefined;

  // Property names the existing Klaviyo alert flow already uses are kept
  // (applicant_name, applicant_email, business_name, job_position,
  // website_url, monthly_revenue); the rest are new for this form.
  const sharedProperties = {
    applicant_name: fullName,
    applicant_email: body.email!.trim(),
    business_name: clean(body.brand),
    website_url: clean(body.website),
    job_position: clean(body.role),
    category: clean(body.category),
    annual_online_revenue: clean(body.revenue),
    hardest_thing_about_growth: clean(body.challenge),
    how_they_found_us: clean(body.source),
    utm_source: clean(body.utm_source),
    utm_medium: clean(body.utm_medium),
    utm_campaign: clean(body.utm_campaign),
  };

  // Event on the applicant's own profile, for CRM/segmentation history.
  const applicantEvent = klaviyoEvent(
    apiKey,
    KLAVIYO_METRIC_NAME,
    body.email!.trim(),
    {
      first_name: firstName,
      last_name: lastName,
      organization: clean(body.brand),
      title: clean(body.role),
    },
    sharedProperties,
  );

  // Separate event on the founder's own profile, so the internal-alert flow
  // (a standard Email action) emails the founder directly, not the applicant.
  const founderAlertEvent = klaviyoEvent(
    apiKey,
    KLAVIYO_ALERT_METRIC_NAME,
    CONTACT_EMAIL,
    {},
    sharedProperties,
  );

  const [applicantResponse, founderResponse] = await Promise.all([
    applicantEvent,
    founderAlertEvent,
  ]);

  if (!applicantResponse.ok || !founderResponse.ok) {
    const errorText = !applicantResponse.ok
      ? await applicantResponse.text()
      : await founderResponse.text();
    console.error("Klaviyo event failed", errorText);
    return NextResponse.json(
      { error: "Could not submit application. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
