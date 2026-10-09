"use client";

import { useState } from "react";

import { removeUploadedImage } from "@/app/actions/images";
import type { UploadedImage } from "@/lib/cloudinary";

export default function UploadedImagesList({ images }: { images: UploadedImage[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleCopy(image: UploadedImage) {
    try {
      await navigator.clipboard.writeText(image.url);
      setCopiedId(image.publicId);
      setTimeout(() => setCopiedId((current) => (current === image.publicId ? null : current)), 2000);
    } catch {
      setCopiedId(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-xl font-bold">Uploaded Images ({images.length})</h2>
      <p className="mt-2 text-slate-300">
        Every image currently in Cloudinary. Copy a link to use it anywhere on the site.
      </p>

      {images.length === 0 ? (
        <p className="mt-6 text-slate-400">No images found.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div key={image.publicId} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0d1a22] p-4">
              <img src={image.url} alt={image.publicId} className="h-40 w-full rounded-lg object-cover" />
              <p className="truncate text-xs text-slate-400" title={image.publicId}>
                {image.publicId}
              </p>
              <button
                onClick={() => handleCopy(image)}
                className="rounded-full border border-[#7cd3ff]/40 bg-[#7cd3ff]/10 px-4 py-2 text-xs font-bold text-[#7cd3ff] transition hover:border-[#7cd3ff]/70 hover:bg-[#7cd3ff]/20"
              >
                {copiedId === image.publicId ? "Copied!" : "Copy Link"}
              </button>
              <form
                action={removeUploadedImage}
                onSubmit={(event) => {
                  if (!confirm("Delete this image permanently? This can't be undone.")) {
                    event.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="publicId" value={image.publicId} />
                <button
                  type="submit"
                  className="w-full rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-300 transition hover:border-red-400/70 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
