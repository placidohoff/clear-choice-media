"use client";

import { useCallback, useEffect, useState } from "react";

const TILE_SPANS = [
  "xl:col-span-2 xl:row-span-2",
  "",
  "xl:row-span-2",
  "",
  "xl:col-span-2",
  "",
  "xl:row-span-2",
  "",
  "xl:col-span-2 xl:row-span-2",
  "",
];

export default function PortfolioLightbox({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((index) => (index === null ? null : (index - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setOpenIndex((index) => (index === null ? null : (index + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="mt-10 grid auto-rows-[160px] grid-cols-2 gap-6 sm:grid-cols-3 sm:auto-rows-[200px] xl:grid-cols-4 xl:auto-rows-[180px] [grid-auto-flow:dense]">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open image ${index + 1} of the portfolio in a lightbox`}
            className={`group overflow-hidden rounded-[1.8rem] bg-[#0d1a22] ring-1 ring-white/10 ${TILE_SPANS[index % TILE_SPANS.length]}`}
          >
            <img
              src={image}
              alt={`Clear Choice Media event photography ${index + 1}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close lightbox"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:left-6"
          >
            ‹
          </button>

          <img
            src={images[openIndex]}
            alt={`Clear Choice Media event photography ${openIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full rounded-[1rem] object-contain"
          />

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:right-6"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
