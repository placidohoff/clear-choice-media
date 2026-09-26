import Link from "next/link";

import { requireAdminSession, setContactSubmissionResolved } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";
import type { ContactSubmission } from "@prisma/client";

function InquiryCard({ submission }: { submission: ContactSubmission }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1a22] p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold uppercase tracking-[-0.03em] text-white">{submission.name}</h2>
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Submitted {submission.createdAt.toLocaleString()}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
        <p>
          <span className="text-slate-500">Email:</span> {submission.email}
        </p>
        <p>
          <span className="text-slate-500">Phone:</span> {submission.phone}
        </p>
        <p>
          <span className="text-slate-500">Event Type:</span> {submission.eventType}
        </p>
        <p>
          <span className="text-slate-500">Event Date:</span> {submission.eventDate.toLocaleDateString()} at{" "}
          {submission.eventTime}
        </p>
        <p>
          <span className="text-slate-500">Location:</span> {submission.eventLocation}
        </p>
        <p>
          <span className="text-slate-500">Guests:</span> {submission.estimatedGuestCount ?? "—"}
        </p>
      </div>

      <p className="mt-3 text-sm text-slate-300">
        <span className="text-slate-500">Services:</span> {submission.servicesInterested.join(", ")}
      </p>

      {submission.details && (
        <p className="mt-3 text-sm leading-6 text-slate-300">
          <span className="text-slate-500">Details:</span> {submission.details}
        </p>
      )}

      <form action={setContactSubmissionResolved} className="mt-4 flex justify-end">
        <input type="hidden" name="id" value={submission.id} />
        <input type="hidden" name="resolved" value={submission.resolved ? "false" : "true"} />
        <button
          type="submit"
          className={
            submission.resolved
              ? "rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200 transition hover:bg-white/10"
              : "rounded-full bg-[#7cd3ff] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#091923] transition hover:bg-[#8ad8ff]"
          }
        >
          {submission.resolved ? "Mark Unresolved" : "Mark Resolved"}
        </button>
      </form>
    </div>
  );
}

export default async function InquiriesPage() {
  await requireAdminSession();

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const open = submissions.filter((submission) => !submission.resolved);
  const resolved = submissions.filter((submission) => submission.resolved);

  return (
    <main className="min-h-screen bg-[#071019] px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-[#0d1a22] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Owner dashboard</p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em]">Contact Inquiries</h1>
          </div>
          <Link
            href="/admin"
            className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200"
          >
            Back to dashboard
          </Link>
        </header>

        {submissions.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-[#0d1a22] p-8 text-center text-slate-300">
            No inquiries yet.
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {open.length === 0 ? (
                <p className="text-sm text-slate-400">No open inquiries.</p>
              ) : (
                open.map((submission) => <InquiryCard key={submission.id} submission={submission} />)
              )}
            </div>

            {resolved.length > 0 && (
              <details className="mt-8">
                <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  Resolved ({resolved.length})
                </summary>
                <div className="mt-4 space-y-4">
                  {resolved.map((submission) => (
                    <InquiryCard key={submission.id} submission={submission} />
                  ))}
                </div>
              </details>
            )}
          </>
        )}
      </div>
    </main>
  );
}
