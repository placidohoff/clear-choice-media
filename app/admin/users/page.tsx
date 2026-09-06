import { createAdminUser, listAdminUsers, requireAdminSession } from "@/app/actions/admin";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; success?: string }>;
}) {
  const session = await requireAdminSession();
  const params = searchParams ? await searchParams : {};
  const error = params.error ?? "";
  const success = params.success ?? "";

  if (session.role !== "OWNER") {
    return (
      <main className="min-h-screen bg-[#071019] px-4 py-10 text-white">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-red-400/30 bg-[#0d1a22] p-8">
          <h1 className="text-3xl font-black uppercase tracking-[-0.06em]">Access denied</h1>
          <p className="mt-4 text-slate-300">Only the owner can manage admin access.</p>
        </div>
      </main>
    );
  }

  const users = await listAdminUsers();

  return (
    <main className="min-h-screen bg-[#071019] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Owner tools</p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em]">Admin access</h1>
          </div>
          <a href="/admin" className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200">
            Back to dashboard
          </a>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-400/35 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mb-6 rounded-2xl border border-[#7cd3ff]/30 bg-[#7cd3ff]/10 p-4 text-[#7cd3ff]">
            {success}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-white/10 bg-[#0d1a22] p-6">
            <h2 className="text-xl font-black uppercase tracking-[-0.05em]">Current admins</h2>

            <div className="mt-6 space-y-3">
              {users.length === 0 ? (
                <p className="text-slate-400">No admin users created yet.</p>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#071019] p-4">
                    <div>
                      <p className="font-semibold text-slate-100">{user.name || user.email}</p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                    <span className="rounded-full border border-[#7cd3ff]/30 bg-[#7cd3ff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7cd3ff]">
                      {user.role}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#0d1a22] p-6">
            <h2 className="text-xl font-black uppercase tracking-[-0.05em]">Create admin</h2>

            <form action={createAdminUser} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Name
                </span>
                <input
                  name="name"
                  className="w-full rounded-xl border border-white/10 bg-[#071019] px-4 py-3 text-white outline-none"
                  placeholder="Jane Admin"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#071019] px-4 py-3 text-white outline-none"
                  placeholder="admin@example.com"
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
                  minLength={8}
                  className="w-full rounded-xl border border-white/10 bg-[#071019] px-4 py-3 text-white outline-none"
                  placeholder="Minimum 8 characters"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Role
                </span>
                <select
                  name="role"
                  defaultValue="ADMIN"
                  className="w-full rounded-xl border border-white/10 bg-[#071019] px-4 py-3 text-white outline-none"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="OWNER">Owner</option>
                </select>
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-[#7cd3ff] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923]"
              >
                Create admin
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
