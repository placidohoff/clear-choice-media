"use client";

import { useActionState } from "react";

import { loginAdmin } from "@/app/actions/admin";

type LoginState = {
  success?: boolean;
  error?: string;
};

const initialState: LoginState = { success: true };

async function submitLoginAction(_prevState: LoginState, formData: FormData) {
  const result = await loginAdmin(formData);

  if (result?.success === false) {
    return {
      success: false,
      error: result.error ?? "Unable to log in.",
    };
  }

  return { success: true };
}

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(submitLoginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071019] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0d1a22] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Owner access</p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.06em]">Admin Login</h1>
        </div>

        <form action={formAction} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              defaultValue="placido.hoff@gmail.com"
              className="w-full rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none ring-0 placeholder:text-slate-500"
              placeholder="owner@clearchoicemedia.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              defaultValue="ThisIsASecurePassword123!"
              className="w-full rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none ring-0 placeholder:text-slate-500"
              placeholder="Enter password"
            />
          </label>

          {state?.error ? (
            <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {state.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-[#7cd3ff] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition hover:bg-[#8ad8ff] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Use the owner credentials in your environment variables to sign in.
        </p>
      </div>
    </main>
  );
}
