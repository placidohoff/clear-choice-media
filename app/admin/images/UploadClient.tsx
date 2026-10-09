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
      setError("Please choose a photo first.");
      return;
    }

    setUploading(true);
    try {
      // Request a server-generated signature for a signed Cloudinary upload
      const sigRes = await fetch("/api/cloudinary-sign");
      const sig = await sigRes.json();
      if (!sig.ok) {
        setError(sig.message || "Photo uploads aren't set up yet. Please contact your developer.");
        setUploading(false);
        return;
      }

      const { cloudName, apiKey, timestamp, signature, folder } = sig;
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", apiKey);
      fd.append("timestamp", String(timestamp));
      fd.append("signature", signature);
      fd.append("folder", folder);

      const res = await fetch(uploadUrl, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || "Something went wrong uploading the photo. Please try again.");
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
      <h1 className="text-2xl font-bold">Image Manager</h1>
      <p className="mt-2 text-slate-300">Upload a photo to use on the website.</p>

      <div className="mt-18 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-[#7cd3ff]/40 bg-[#7cd3ff]/10 px-5 py-3 text-sm font-bold text-[#7cd3ff] transition hover:border-[#7cd3ff]/70 hover:bg-[#7cd3ff]/20">
            Choose Photo
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
          {file && <span className="text-sm text-slate-300">{file.name}</span>}
        </div>

        {preview && (
          <div>
            <img src={preview} alt="preview" className="max-h-60 rounded" />
          </div>
        )}

        <div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="rounded-full bg-[#7cd3ff] px-5 py-3 text-sm font-bold text-[#091923] transition hover:bg-[#8ad8ff] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {uploadedUrl && (
          <div>
            Photo uploaded! <a href={uploadedUrl} target="_blank" rel="noreferrer" className="text-blue-300">View it here</a>
          </div>
        )}

        {error && <div className="text-red-400">{error}</div>}
      </div>
    </div>
  );
}
