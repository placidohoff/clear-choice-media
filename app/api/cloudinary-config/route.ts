import { NextResponse } from "next/server";

export async function GET() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      { ok: false, message: "Missing CLOUDINARY_CLOUD_NAME or CLOUDINARY_UPLOAD_PRESET" },
      { status: 400 }
    );
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  return NextResponse.json({ ok: true, uploadUrl, uploadPreset, cloudName });
}
