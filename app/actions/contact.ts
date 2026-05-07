"use server";

import { Resend } from "resend";
import { EMAIL } from "@/app/data";
import { SITE_NAME } from "@/lib/constants";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM =
  process.env.RESEND_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honey = String(formData.get("company-website") ?? "");
  if (honey.length > 0) {
    return { status: "success", message: "Thanks — I'll be in touch soon." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const fromEmail = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !fromEmail || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email, and a message.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
    return {
      status: "error",
      message: "That email address doesn't look right.",
    };
  }

  if (!RESEND_API_KEY) {
    console.warn(
      "[contact] RESEND_API_KEY is not set; falling back to mailto-only response.",
    );
    return {
      status: "error",
      message: `Email isn't wired up yet — please email ${SITE_NAME} directly at ${EMAIL}.`,
    };
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const subject = `Portfolio inquiry from ${name}`;
    const text = `From: ${name} <${fromEmail}>\n\n${message}`;
    const html = `
      <div style="font-family: ui-monospace, Menlo, monospace; line-height: 1.5;">
        <h2 style="margin: 0 0 12px 0;">New portfolio inquiry</h2>
        <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${escapeHtml(fromEmail)}</p>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 16px 0;" />
        <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
      </div>
    `;

    const result = await resend.emails.send({
      from: RESEND_FROM,
      to: EMAIL,
      replyTo: fromEmail,
      subject,
      text,
      html,
    });

    if (result.error) {
      console.error("[contact] resend error", result.error);
      return {
        status: "error",
        message: `Couldn't send right now — please email ${EMAIL} directly.`,
      };
    }

    return {
      status: "success",
      message: "Thanks — I'll be in touch within a day or two.",
    };
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return {
      status: "error",
      message: `Couldn't send right now — please email ${EMAIL} directly.`,
    };
  }
}
