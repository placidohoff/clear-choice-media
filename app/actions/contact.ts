"use server";

import { prisma } from "@/lib/prisma";
import { contactSubmissionSchema } from "@/lib/contact";

export type SubmitContactFormResult =
  | { success: true }
  | { success: false; error: string };

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

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong saving your request. Please try again.",
    };
  }
}
