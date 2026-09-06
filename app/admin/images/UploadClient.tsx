"use client";

import { useState } from "react";

export default function UploadClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setUploadedUrl(null);
      setError(null);
    }
  }

  async function handleUpload() {
    setError(null);
    if (!file) {
      setError("Please select an image file first.");
      return;
    }

    setUploading(true);
    try {
      // Request a server-generated signature for a signed Cloudinary upload
      const sigRes = await fetch("/api/cloudinary-sign");
      const sig = await sigRes.json();
      if (!sig.ok) {
        setError(sig.message || "Cloudinary signing not configured");
        setUploading(false);
        return;
      }

      const { cloudName, apiKey, timestamp, signature } = sig;
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", apiKey);
      fd.append("timestamp", String(timestamp));
      fd.append("signature", signature);

      const res = await fetch(uploadUrl, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || "Upload failed");
        setUploading(false);
        return;
      }

      setUploadedUrl(data.secure_url || data.url);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
          <h1 className="text-2xl font-bold mb-4">Images Manager</h1>
          <p className="mb-4">Upload images to Cloudinary using signed uploads. Ensure Cloudinary env vars are set.</p>

      <input type="file" accept="image/*" onChange={handleFile} />

      {preview && (
        <div className="mt-4">
          <img src={preview} alt="preview" className="max-h-60 rounded" />
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="rounded bg-[#7cd3ff] px-4 py-2 text-[#091923] font-bold"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {uploadedUrl && (
        <div className="mt-4">
          Uploaded: <a href={uploadedUrl} target="_blank" rel="noreferrer" className="text-blue-300">{uploadedUrl}</a>
        </div>
      )}

      {error && <div className="mt-4 text-red-400">{error}</div>}
    </div>
  );
}
