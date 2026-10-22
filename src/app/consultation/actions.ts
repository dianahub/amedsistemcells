"use server";

import { z } from "zod";
import { db } from "@/db";
import { consultationRequests } from "@/db/schema";
import { hashIp } from "@/lib/ip-hash";
import { checkRateLimit, recordRateLimitHit } from "@/lib/rate-limit";
import { sendAdminNotification } from "@/lib/email";
import { headers } from "next/headers";

const CONSENT_TEXT =
  "My name, email, and topic of interest will be shared with Amedsi Peptides so they can contact me about a consultation.";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Enter a valid email address"),
  message: z.string().max(1000, "Message must be 1000 characters or fewer").optional(),
  topic: z.string().max(500).optional(),
  consent: z.literal("on", {
    error: () => ({ message: "You must agree before submitting" }),
  }),
  website: z.string().max(0, "Bot detected"), // honeypot
});

type FormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
} | null;

function getClientIp(headersList: Headers): string {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown"
  );
}

export async function submitConsultation(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message") || undefined,
    topic: formData.get("topic") || undefined,
    consent: formData.get("consent"),
    website: formData.get("website") ?? "",
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (key === "website") return { error: "Submission blocked." };
      fieldErrors[key] = issue.message;
    }
    if (fieldErrors.consent) {
      return { error: "You must agree to the consent statement to continue.", fieldErrors };
    }
    return { fieldErrors };
  }

  const headersList = await headers();
  const ip = getClientIp(headersList);
  const ipHash = hashIp(ip);

  const allowed = await checkRateLimit(ipHash);
  if (!allowed) {
    return {
      error: "Too many requests. Please try again later.",
    };
  }

  const now = new Date();

  await db.insert(consultationRequests).values({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message ?? null,
    topic: parsed.data.topic ?? null,
    consentGiven: true,
    consentText: CONSENT_TEXT,
    consentedAt: now,
    ipHash,
    status: "new",
  });

  await recordRateLimitHit(ipHash);

  await sendAdminNotification({
    name: parsed.data.name,
    email: parsed.data.email,
    topic: parsed.data.topic ?? null,
  });

  // Push lead to Zoho CRM
  try {
    const nameParts = parsed.data.name.trim().split(" ");
    const firstName = nameParts.slice(0, -1).join(" ");
    const lastName = nameParts[nameParts.length - 1];
    const description = [
      parsed.data.topic ? `Topic: ${parsed.data.topic}` : null,
      parsed.data.message ? `Message: ${parsed.data.message}` : null,
    ].filter(Boolean).join("\n");

    const zohoData = new URLSearchParams({
      xnQsjsdp: "e79f18dbbc2277a826c7d463a12b5f43e83ca6ed3428ae90c4c0141b434ba601",
      xmIwtLD: "65841d7e962d82ca31569dd11c37abd837cfbd5cabd3007b793bc272b9b9fe5f8a82acbe60d1627b6b09189a4f889f03",
      actionType: "TGVhZHM=",
      returnURL: "https://amedsipeptides.com",
      zc_gad: "",
      "First Name": firstName,
      "Last Name": lastName || parsed.data.name,
      Email: parsed.data.email,
      Description: description,
    });

    await fetch("https://crm.zoho.com/crm/WebToLeadForm", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: zohoData.toString(),
    });
  } catch {
    // Silently skip — Zoho CRM push is best-effort
  }

  return { success: true };
}
