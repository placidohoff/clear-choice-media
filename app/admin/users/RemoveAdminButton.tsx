"use client";

import { useState } from "react";

import { removeAdminUser } from "@/app/actions/admin";

export default function RemoveAdminButton({ userId, email }: { userId: string; email: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-red-300 transition hover:bg-red-500/20"
      >
        Remove
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-[1.5rem] border border-white/10 bg-[#0d1a22] p-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-red-300">Remove Admin</p>
            <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.05em] text-white">{email}</h3>
            <p className="mt-3 text-sm text-slate-300">
              Enter your own password to confirm removing this admin. This can&apos;t be undone.
            </p>

            <form action={removeAdminUser} className="mt-5 space-y-4">
              <input type="hidden" name="userId" value={userId} />
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Your Password
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-white/10 bg-[#071019] px-4 py-3 text-white outline-none"
                />
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200 transition hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-red-500 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-400"
                >
                  Remove
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
