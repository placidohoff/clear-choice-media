import crypto from "crypto";
import { NextResponse } from "next/server";

import { UPLOAD_FOLDER } from "@/lib/cloudinary";

export async function GET() {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!apiSecret || !apiKey || !cloudName) {
    return NextResponse.json({ ok: false, message: "Missing Cloudinary credentials" }, { status: 400 });
  }

  // Use a short-lived timestamp for signing
  const timestamp = Math.floor(Date.now() / 1000);

  // Every parameter sent in the upload request (besides file/cloud_name/resource_type/api_key)
  // must be included here, sorted alphabetically by key.
  const toSign = `folder=${UPLOAD_FOLDER}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  return NextResponse.json({ ok: true, apiKey, cloudName, timestamp, signature, folder: UPLOAD_FOLDER });
}
