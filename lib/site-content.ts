import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

export const siteContentSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
    slides: z
      .array(
        z.object({
          image: z.string(),
          eventName: z.string(),
          eventMeta: z.string(),
        }),
      )
      .min(1),
  }),
  nav: z.array(z.object({ label: z.string(), href: z.string() })),
  services: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
      cta: z.string(),
    }),
  ),
  boothCards: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
    }),
  ),
  eventTypes: z.array(
    z.object({
      name: z.string(),
      subtitle: z.string(),
      icon: z.string(),
    }),
  ),
  portfolioImages: z.array(z.string()),
  contact: z.object({
    city: z.string(),
    serviceArea: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: "Rhode Island • Southern New England",
    title: "We Capture the Energy.",
    subtitle: "Photography. Video. Photo Booth Experiences.",
    description:
      "Professional event photography, video production, and interactive photo booth experiences for weddings, corporate events, parties, expos, and celebrations throughout Rhode Island and Southern New England.",
    primaryCta: "Check Availability",
    secondaryCta: "View Our Work",
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
        eventName: "RI Summer Social",
        eventMeta: "Photography • Video • Booth Experience",
      },
      {
        image: "https://res.cloudinary.com/rpwj7zbv/image/upload/v1789154860/pic-6.png",
        eventName: "Photography",
        eventMeta: "Photography • Video • Booth Experience",
      },
      {
        image: "https://res.cloudinary.com/rpwj7zbv/image/upload/v1789154847/pic-37.png",
        eventName: "RI Summer Photography",
        eventMeta: "Photography • Video • Booth Experience",
      },
      {
        image: "https://res.cloudinary.com/rpwj7zbv/image/upload/v1789154845/pic-34.png",
        eventName: "Photography",
        eventMeta: "Photography • Video • Booth Experience",
      },
    ],
  },
  nav: [
    { label: "Photography", href: "#services" },
    { label: "Photo Booths", href: "#booths" },
    { label: "Video", href: "#video" },
    { label: "Corporate", href: "#corporate" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    {
      title: "Event Photography",
      description: "Candid moments, portraits, details, and energy.",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
      cta: "Explore Photography",
    },
    {
      title: "Photo Booth Experiences",
      description: "Digital booths, print experiences, 360 video, and custom activations.",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
      cta: "Explore Photo Booths",
    },
    {
      title: "Event Video",
      description: "Highlight films, social reels, event recaps, and professional video coverage.",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
      cta: "Explore Event Video",
    },
  ],
  boothCards: [
    {
      title: "Digital Booth",
      description: "Digital photos, GIFs, boomerangs, and instant sharing.",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Print Booth",
      description: "Physical prints guests can take home.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "360 Booth",
      description: "Slow-motion 360° videos designed for social media.",
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Brand Activations",
      description: "Custom experiences for companies, expos, and launches.",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
    },
  ],
  eventTypes: [
    { name: "Weddings", subtitle: "First looks to last dances", icon: "♡" },
    { name: "Corporate", subtitle: "Conferences & galas", icon: "▣" },
    { name: "Parties", subtitle: "Birthdays & milestones", icon: "✦" },
    { name: "Expos & Trade Shows", subtitle: "Booths & brand booths", icon: "◫" },
    { name: "Celebrations", subtitle: "Showers & reunions", icon: "◍" },
    { name: "Live Events", subtitle: "Concerts & performances", icon: "♫" },
  ],
  portfolioImages: [
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
  ],
  contact: {
    city: "Providence, Rhode Island",
    serviceArea: "Serving Rhode Island & Southern New England",
    email: "hello@clearchoicemedia.com",
    phone: "+1 (555) 123-4567",
  },
};

const dataFilePath = path.join(process.cwd(), "data", "site-content.json");

async function ensureDataFile() {
  await mkdir(path.dirname(dataFilePath), { recursive: true });

  try {
    await readFile(dataFilePath, "utf8");
  } catch {
    await writeFile(dataFilePath, JSON.stringify(defaultSiteContent, null, 2), "utf8");
  }
}

export async function readSiteContent(): Promise<SiteContent> {
  await ensureDataFile();

  const raw = await readFile(dataFilePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;

  const result = siteContentSchema.safeParse(parsed);

  if (!result.success) {
    return defaultSiteContent;
  }

  return result.data;
}

export async function writeSiteContent(content: SiteContent) {
  await ensureDataFile();
  await writeFile(dataFilePath, JSON.stringify(content, null, 2), "utf8");
}
