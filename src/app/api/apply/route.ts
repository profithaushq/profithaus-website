import { NextResponse } from "next/server";

const KLAVIYO_METRIC_NAME = "Application Submitted";
const KLAVIYO_ALERT_METRIC_NAME = "New Application Alert";
const KLAVIYO_TEAM_EMAIL = "team@profithaus.co.uk";
const KLAVIYO_API_REVISION = "2024-10-15";

type ApplyPayload = {
  email: string;
  fullName: string;
  jobPosition: string;
  businessName: string;
  websiteUrl: string;
  brandAge: string;
  monthlyRevenue: string;
  teamSize: string;
  wayOfWorking: string;
  supportAreas: string[];
  brandBlockers: string[];
  admiredBrands: string;
  anythingElse: string;
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

export async function POST(request: Request) {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!apiKey) {
    console.error("KLAVIYO_PRIVATE_API_KEY is not set");
    return NextResponse.json(
      { error: "Server is not configured to accept applications." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as Partial<ApplyPayload>;

  if (!body.email || !body.fullName || !body.businessName) {
    return NextResponse.json(
      { error: "Email, full name and business name are required." },
      { status: 400 },
    );
  }

  const [firstName, ...rest] = body.fullName.trim().split(" ");
  const lastName = rest.join(" ") || undefined;

  const sharedProperties = {
    applicant_name: body.fullName,
    applicant_email: body.email,
    business_name: body.businessName,
    job_position: body.jobPosition || undefined,
    website_url: body.websiteUrl || undefined,
    brand_age: body.brandAge || undefined,
    monthly_revenue: body.monthlyRevenue || undefined,
    team_size: body.teamSize || undefined,
    way_of_working: body.wayOfWorking || undefined,
    support_areas: body.supportAreas || [],
    brand_blockers: body.brandBlockers || [],
    admired_brands: body.admiredBrands || undefined,
    anything_else: body.anythingElse || undefined,
  };

  // Event on the applicant's own profile, for CRM/segmentation history.
  const applicantEvent = klaviyoEvent(
    apiKey,
    KLAVIYO_METRIC_NAME,
    body.email,
    {
      first_name: firstName,
      last_name: lastName,
      organization: body.businessName,
      title: body.jobPosition || undefined,
    },
    sharedProperties,
  );

  // Separate event tied to the internal team's own profile, so the
  // internal-alert flow (a standard Email action) sends to
  // team@profithaus.co.uk directly rather than to the applicant.
  const teamAlertEvent = klaviyoEvent(
    apiKey,
    KLAVIYO_ALERT_METRIC_NAME,
    KLAVIYO_TEAM_EMAIL,
    {},
    sharedProperties,
  );

  const [applicantResponse, teamResponse] = await Promise.all([
    applicantEvent,
    teamAlertEvent,
  ]);

  if (!applicantResponse.ok || !teamResponse.ok) {
    const errorText = !applicantResponse.ok
      ? await applicantResponse.text()
      : await teamResponse.text();
    console.error("Klaviyo event failed", errorText);
    return NextResponse.json(
      { error: "Could not submit application. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
