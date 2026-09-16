"use client";

import { useState } from "react";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function VideoGallery({ videos }: { videos: string[] }) {
  const [shuffled] = useState(() => shuffle(videos));
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  const showPrev = () => setIndex((i) => (i - 1 + shuffled.length) % shuffled.length);
  const showNext = () => setIndex((i) => (i + 1) % shuffled.length);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1a22]">
      <video
        key={shuffled[index]}
        src={shuffled[index]}
        autoPlay
        muted={muted}
        playsInline
        onEnded={showNext}
        className="h-[520px] w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071019]/70 via-[#071019]/20 to-transparent" />

      <div className="absolute inset-x-6 bottom-6 flex items-center justify-between">
        <button
          type="button"
          onClick={showPrev}
          aria-label="Previous video"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          {muted ? "🔇" : "🔊"}
        </button>

        <button
          type="button"
          onClick={showNext}
          aria-label="Next video"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          ›
        </button>
      </div>
    </div>
  );
}
