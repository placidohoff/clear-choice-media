"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/app/actions/admin";
import { deleteUploadedImage } from "@/lib/cloudinary";

export async function removeUploadedImage(formData: FormData): Promise<void> {
  await requireAdminSession();

  const publicId = String(formData.get("publicId") ?? "");

  if (!publicId) {
    redirect("/admin/images");
  }

  await deleteUploadedImage(publicId);

  revalidatePath("/admin/images");
  redirect("/admin/images");
}
