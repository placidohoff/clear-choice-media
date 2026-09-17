import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Event Photography",
  "Event Video",
  "Photo Booth Experience",
  "360 Photo Booth",
  "Corporate / Brand Activation",
] as const;

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  eventDate: z.coerce.date({ error: "Select an event date" }),
  eventTime: z.string().trim().min(1, "Select a time"),
  eventType: z.string().trim().min(1, "Select an event type"),
  eventLocation: z.string().trim().min(1, "Event location is required"),
  servicesInterested: z.array(z.enum(SERVICE_OPTIONS)).min(1, "Select at least one service"),
  estimatedGuestCount: z
    .union([z.coerce.number().int().positive(), z.literal("")])
    .optional()
    .transform((value) => (value === "" || value === undefined ? undefined : value)),
  details: z.string().trim().optional(),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
