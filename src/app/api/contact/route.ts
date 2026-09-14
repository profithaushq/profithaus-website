import { NextResponse } from "next/server";

const KLAVIYO_METRIC_NAME = "Contact Message Submitted";
const KLAVIYO_ALERT_METRIC_NAME = "Contact Message Alert";
const KLAVIYO_TEAM_EMAIL = "team@profithaus.co.uk";
const KLAVIYO_API_REVISION = "2024-10-15";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  comment: string;
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
      { error: "Server is not configured to accept messages." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as Partial<ContactPayload>;

  if (!body.email) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 },
    );
  }

  const [firstName, ...rest] = (body.name || "").trim().split(" ");
  const lastName = rest.join(" ") || undefined;

  const sharedProperties = {
    sender_name: body.name || undefined,
    sender_email: body.email,
    sender_phone: body.phone || undefined,
    comment: body.comment || undefined,
  };

  const senderEvent = klaviyoEvent(
    apiKey,
    KLAVIYO_METRIC_NAME,
    body.email,
    {
      first_name: firstName || undefined,
      last_name: lastName,
      phone_number: body.phone || undefined,
    },
    sharedProperties,
  );

  const teamAlertEvent = klaviyoEvent(
    apiKey,
    KLAVIYO_ALERT_METRIC_NAME,
    KLAVIYO_TEAM_EMAIL,
    {},
    sharedProperties,
  );

  const [senderResponse, teamResponse] = await Promise.all([
    senderEvent,
    teamAlertEvent,
  ]);

  if (!senderResponse.ok || !teamResponse.ok) {
    const errorText = !senderResponse.ok
      ? await senderResponse.text()
      : await teamResponse.text();
    console.error("Klaviyo event failed", errorText);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
