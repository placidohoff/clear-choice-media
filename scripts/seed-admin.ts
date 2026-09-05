import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma";

type AdminSeed = {
  email: string;
  password: string;
  name: string;
  role: "OWNER" | "ADMIN";
};

function parseAdminList(): AdminSeed[] {
  const raw = process.env.ADMIN_ACCOUNTS ?? "";

  if (!raw.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      throw new Error("ADMIN_ACCOUNTS must be a JSON array.");
    }

    return parsed.map((entry) => {
      if (!entry || typeof entry !== "object") {
        throw new Error("Each admin entry must be an object.");
      }

      const admin = entry as Record<string, unknown>;

      return {
        email: String(admin.email ?? "").trim(),
        password: String(admin.password ?? "").trim(),
        name: String(admin.name ?? "Admin").trim(),
        role: admin.role === "OWNER" ? "OWNER" : "ADMIN",
      };
    });
  } catch (error) {
    throw new Error(`Invalid ADMIN_ACCOUNTS format: ${String(error)}`);
  }
}

const defaultAdmins: AdminSeed[] = [
  {
    email: process.env.ADMIN_EMAIL ?? "placido.hoff@gmail.com",
    password: process.env.ADMIN_PASSWORD ?? "ThisIsASecurePassword123!",
    name: "Owner",
    role: "OWNER",
  },
  ...parseAdminList(),
];

async function main() {
  for (const admin of defaultAdmins) {
    const existing = await prisma.user.findUnique({ where: { email: admin.email } });

    if (existing) {
      console.log(`Admin user already exists: ${admin.email}`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(admin.password, 10);

    await prisma.user.create({
      data: {
        email: admin.email,
        name: admin.name,
        password: hashedPassword,
        role: admin.role,
      },
    });

    console.log(`Created admin user: ${admin.email} (${admin.role})`);
  }
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
