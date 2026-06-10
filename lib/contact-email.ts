/**
 * Gmail OAuth2 mailer for the audemation-2 contact form.
 *
 * Sends via the Gmail API using a stored refresh token (XOAUTH2),
 * so the actual SMTP/app-password flow never enters the app.
 *
 * Env vars required (see .env.local, gitignored):
 *   GOOGLE_CLIENT_ID
 *   GOOGLE_CLIENT_SECRET
 *   GOOGLE_REFRESH_TOKEN
 *   FROM_EMAIL            -- the authorised Gmail (e.g. bernard@audemation.com)
 *   CONTACT_EMAIL         -- the inbox that should receive submissions
 *
 * The sending Gmail must match the account that authorised GOOGLE_REFRESH_TOKEN,
 * otherwise Google returns 403 invalid_grant.
 */
import { google } from "googleapis";

type ContactPayload = {
  businessName: string;
  websiteUrl?: string;
  email: string;
  description: string;
};

function required(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}

function buildRawEmail(opts: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  body: string;
}): string {
  // RFC 5322 — minimal but valid. Gmail's API requires base64url-encoded raw.
  const enc = (s: string) =>
    Buffer.from(s, "utf8").toString("base64") // base64, not base64url, but gmail accepts both
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const headers = [
    `From: ${opts.from}`,
    `To: ${opts.to}`,
    `Reply-To: ${opts.replyTo}`,
    `Subject: ${opts.subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
  ].join("\r\n");

  return enc(`${headers}\r\n\r\n${opts.body}`);
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const clientId = required("GOOGLE_CLIENT_ID");
  const clientSecret = required("GOOGLE_CLIENT_SECRET");
  const refreshToken = required("GOOGLE_REFRESH_TOKEN");
  const fromEmail = required("FROM_EMAIL");
  const toEmail = required("CONTACT_EMAIL");

  // OAuth2 client — same dance google's own libs do server-side.
  const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
  oauth2.setCredentials({ refresh_token: refreshToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2 });

  const websiteLine = payload.websiteUrl?.trim()
    ? `Website: ${payload.websiteUrl.trim()}\n`
    : "";

  const body = [
    `New contact-form submission from audemation.com`,
    ``,
    `Business: ${payload.businessName}`,
    websiteLine,
    `Email:    ${payload.email}`,
    ``,
    `--- Message ---`,
    payload.description,
    ``,
    `---`,
    `Sent: ${new Date().toISOString()}`,
    `Reply directly to this email — Reply-To is set to ${payload.email}.`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const subject = `New enquiry — ${payload.businessName}`;

  const raw = buildRawEmail({
    from: fromEmail,
    to: toEmail,
    replyTo: payload.email,
    subject,
    body,
  });

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });

  if (!res.data.id) {
    throw new Error("Gmail API returned no message id");
  }
}
