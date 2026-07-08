import { NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = "force-dynamic";

const AFFILIATE_REDIRECT_URL =
  process.env.AFFILIATE_REDIRECT_URL ||
  "[REVIEW] https://your-checkout-page.example.com";

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "[REVIEW]";
const LEADS_WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL || "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please enter your first name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email looks invalid.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Push to Google Sheets (fire-and-forget)
  sendToGoogleSheet(name, email).catch((e) =>
    console.error("[leads] google sheet push failed:", e)
  );

  // WhatsApp owner notification (fire-and-forget)
  notifyWhatsApp(name, email).catch((e) =>
    console.error("[leads] whatsapp notify failed:", e)
  );

  return NextResponse.json({
    ok: true,
    name,
    redirectUrl: AFFILIATE_REDIRECT_URL,
    whatsapp:
      WHATSAPP_NUMBER !== "[REVIEW]"
        ? `https://wa.me/${WHATSAPP_NUMBER}`