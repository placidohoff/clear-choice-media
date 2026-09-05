import Link from "next/link";

import { logoutAdmin, requireAdminSession } from "@/app/actions/admin";
import { readSiteContent } from "@/lib/site-content";

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const content = await readSiteContent();

  return (
    <main className="min-h-screen bg-[#071019] px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-[#0d1a22] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Owner dashboard</p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em]">Site Controls</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200"
            >
              View site
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-full bg-[#7cd3ff] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#091923]"
              >
                Logout
              </button>
            </form>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1a22] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Hero Title</p>
            <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.05em]">{content.hero.title}</h2>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1a22] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Email</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-100">{content.contact.email}</h2>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1a22] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Service Area</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-100">{content.contact.serviceArea}</h2>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1a22] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Main Services</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-100">{content.services.length} sections</h2>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#0d1a22] p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Management</p>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.05em]">Edit public content</h2>
            </div>
            <Link
              href="/admin/edit"
              className="rounded-full bg-[#7cd3ff] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#091923]"
            >
              Open editor
            </Link>
          </div>

          <ul className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">
            <li>• Update hero messaging</li>
            <li>• Edit service descriptions</li>
            <li>• Swap event images</li>
            <li>• Change contact details</li>
            <li>• Store future Cloudinary media URLs</li>
            <li>• Keep admin sessions JWT-secured</li>
          </ul>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#0d1a22] p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Access</p>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.05em]">Admin access</h2>
            </div>
            <Link
              href="/admin/users"
              className="rounded-full border border-white/15 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200"
            >
              Manage admins
            </Link>
          </div>

          <p className="text-sm text-slate-300">
            Create additional admin or owner logins from a secure dashboard view.
          </p>
        </div>
      </div>
    </main>
  );
}
