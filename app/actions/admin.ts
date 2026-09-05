"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  AUTH_COOKIE,
  signAdminToken,
  validateAdminCredentials,
  verifyAdminToken,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { readSiteContent, siteContentSchema, writeSiteContent } from "@/lib/site-content";

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { success: false, error: "Please enter both email and password." };
  }

  const session = await validateAdminCredentials(email, password);

  if (!session) {
    return { success: false, error: "Invalid email or password." };
  }

  const cookieStore = await cookies();
  const token = signAdminToken(session.email, session.role);

  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE);
  redirect("/admin/login");
}

export async function updateSiteContent(formData: FormData) {
  const parsed = JSON.parse(String(formData.get("content") ?? "{}"));
  const validated = siteContentSchema.parse(parsed);

  await writeSiteContent(validated);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    return verifyAdminToken(token);
  } catch {
    redirect("/admin/login");
  }
}

export async function adminTokenStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    return { valid: false };
  }

  try {
    verifyAdminToken(token);
    return { valid: true };
  } catch {
    return { valid: false };
  }
}

export async function getAdminContentPreview() {
  return readSiteContent();
}

export async function listAdminUsers() {
  const session = await requireAdminSession();

  if (session.role !== "OWNER") {
    return [];
  }

  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createAdminUser(formData: FormData): Promise<void> {
  const session = await requireAdminSession();

  if (session.role !== "OWNER") {
    redirect("/admin/users?error=" + encodeURIComponent("Only the owner can create additional admin accounts."));
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "ADMIN") === "OWNER" ? "OWNER" : "ADMIN";

  if (!email || !password) {
    redirect("/admin/users?error=" + encodeURIComponent("Email and password are required."));
  }

  if (password.length < 8) {
    redirect("/admin/users?error=" + encodeURIComponent("Password must be at least 8 characters."));
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    redirect("/admin/users?error=" + encodeURIComponent("An account with that email already exists."));
  }

  await prisma.user.create({
    data: {
      email,
      name: name || email.split("@")[0],
      password: await bcrypt.hash(password, 10),
      role,
    },
  });

  revalidatePath("/admin");
  redirect("/admin/users?success=" + encodeURIComponent(`Created ${email} as ${role}.`));
}
