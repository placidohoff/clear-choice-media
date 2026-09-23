"use client";

import { useState } from "react";

export default function ComingSoonButton({
  label,
  className,
  message,
  contactCta,
}: {
  label: string;
  className?: string;
  message?: string;
  contactCta?: boolean;
}) {
  const [open, setOpen] = useState(false);

  function handleContactClick() {
    setOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-[1.5rem] border border-white/10 bg-[#0d1a22] p-8 text-center"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Coming Soon</p>
            <h3 className="mt-4 text-2xl font-black uppercase tracking-[-0.05em] text-white">In the works</h3>
            <p className="mt-4 text-base text-slate-300">
              {message ?? "This page is coming soon. Check back shortly."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {contactCta && (
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="rounded-full bg-[#7cd3ff] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition hover:bg-[#8ad8ff]"
                >
                  Contact Us
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={
                  contactCta
                    ? "rounded-full border border-white/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                    : "rounded-full bg-[#7cd3ff] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition hover:bg-[#8ad8ff]"
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
