"use server";

import { Resend } from "resend";

import { prisma } from "@/lib/prisma";
import { contactSubmissionSchema, type ContactSubmissionInput } from "@/lib/contact";

export type SubmitContactFormResult =
  | { success: true }
  | { success: false; error: string };

const NOTIFICATION_RECIPIENTS = ["Clifton@clearchoicemedia.co"];

async function sendNotificationEmail(submission: ContactSubmissionInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return;
  }

  const resend = new Resend(apiKey);

  const details = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Phone", submission.phone],
    ["Event Type", submission.eventType],
    ["Event Date", submission.eventDate.toLocaleDateString()],
    ["Event Time", submission.eventTime],
    ["Event Location", submission.eventLocation],
    ["Estimated Guest Count", submission.estimatedGuestCount?.toString() ?? "—"],
    ["Services Interested In", submission.servicesInterested.join(", ")],
    ["Additional Details", submission.details || "—"],
  ];

  const html = `
    <h2>New Event Inquiry</h2>
    <table>
      ${details.map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`).join("")}
    </table>
  `;

  await resend.emails.send({
    from: "Clear Choice Media <noreply@clearchoicemedia.co>",
    to: NOTIFICATION_RECIPIENTS,
    subject: `New Event Inquiry from ${submission.name}`,
    html,
  });
}

export async function submitContactForm(formData: FormData): Promise<SubmitContactFormResult> {
  const parsed = contactSubmissionSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    eventDate: formData.get("eventDate"),
    eventTime: formData.get("eventTime"),
    eventType: formData.get("eventType"),
    eventLocation: formData.get("eventLocation"),
    servicesInterested: formData.getAll("servicesInterested"),
    estimatedGuestCount: formData.get("estimatedGuestCount") ?? "",
    details: formData.get("details") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  try {
    await prisma.contactSubmission.create({
      data: parsed.data,
    });
  } catch {
    return {
      success: false,
      error: "Something went wrong saving your request. Please try again.",
    };
  }

  try {
    await sendNotificationEmail(parsed.data);
  } catch (error) {
    console.error("Failed to send contact form notification email:", error);
  }

  return { success: true };
}
