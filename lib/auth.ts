import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";

export const AUTH_COOKIE = "ccm_admin_session";
const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-in-production";

export type AdminRole = "OWNER" | "ADMIN";

export type AdminSession = {
  email: string;
  role: AdminRole;
};

export function signAdminToken(email: string, role: AdminRole): string {
  return jwt.sign({ email, role }, JWT_SECRET, {
    expiresIn: "8h",
  });
}

export function verifyAdminToken(token: string): AdminSession {
  return jwt.verify(token, JWT_SECRET) as AdminSession;
}

export async function validateAdminCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return false;
  }

  const isValid = await bcrypt.compare(password, user.password);

  return isValid ? { email: user.email, role: user.role } : false;
}
