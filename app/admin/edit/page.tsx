import { redirect } from "next/navigation";

import { requireAdminSession, updateSiteContent } from "@/app/actions/admin";
import { readSiteContent } from "@/lib/site-content";

export default async function AdminEditPage() {
  const session = await requireAdminSession();
  const content = await readSiteContent();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#071019] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[#0d1a22] p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Editor</p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em]">Manage Content</h1>
          </div>
          <a href="/admin" className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200">
            Back to dashboard
          </a>
        </div>

        <form action={updateSiteContent} className="space-y-8">
          <textarea
            name="content"
            defaultValue={JSON.stringify(content, null, 2)}
            className="min-h-[500px] w-full rounded-[1.5rem] border border-white/10 bg-[#071019] p-5 font-mono text-sm text-slate-200 outline-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#7cd3ff] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923]"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
