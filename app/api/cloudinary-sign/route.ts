import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!apiSecret || !apiKey || !cloudName) {
    return NextResponse.json({ ok: false, message: "Missing Cloudinary credentials" }, { status: 400 });
  }

  // Use a short-lived timestamp for signing
  const timestamp = Math.floor(Date.now() / 1000);

  // Build the string to sign. For a minimal signature we sign only the timestamp.
  const toSign = `timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  return NextResponse.json({ ok: true, apiKey, cloudName, timestamp, signature });
}
