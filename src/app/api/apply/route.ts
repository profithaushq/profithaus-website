import { NextResponse } from "next/server";

const KLAVIYO_METRIC_NAME = "Application Submitted";
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

  const klaviyoResponse = await fetch("https://a.klaviyo.com/api/events/", {
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
          properties: {
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
          },
          metric: {
            data: {
              type: "metric",
              attributes: { name: KLAVIYO_METRIC_NAME },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: body.email,
                first_name: firstName,
                last_name: lastName,
                organization: body.businessName,
                title: body.jobPosition || undefined,
              },
            },
          },
        },
      },
    }),
  });

  if (!klaviyoResponse.ok) {
    const errorText = await klaviyoResponse.text();
    console.error("Klaviyo event failed", klaviyoResponse.status, errorText);
    return NextResponse.json(
      { error: "Could not submit application. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
