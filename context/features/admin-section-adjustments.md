# Admin section adjustments
## Goals
Currently, when I click login the credentials are already populated. It needs to be initially blank always. The admin section of "Edit Public Content" has information that is cutoff. The buttons should grid themselves to tstay responsive instaed of getting cut off. In the inquiries section, please have a way to remove/resolve the inquiries.

## Implementation

- **Login pre-fill removed** (`app/admin/login/page.tsx`): the email and password inputs had real credentials hardcoded via `defaultValue` — a genuine security issue, since `defaultValue` renders straight into the HTML `value` attribute, visible to anyone viewing page source on the live site, not just a UX annoyance. Removed both.
- **Admin dashboard responsive fix** (`app/admin/page.tsx`): the "Edit public content" card's header was a fixed `flex items-center justify-between` row (title + 3 action buttons) with no mobile fallback, unlike the page's own top header which already stacks correctly on small screens. Changed to `flex-col md:flex-row` for the row, and the 3 buttons to `grid grid-cols-1 gap-2 sm:grid-cols-3` (stacked on mobile, 3 even columns from `sm` up). Applied the same header-stacking fix to the "Admin access" card below it for consistency, even though it only has one button (same underlying pattern, same latent risk).
- **Inquiries resolve/unresolve** (`app/admin/inquiries/page.tsx`): confirmed with user — mark resolved and keep the record, not permanent delete.
	- Added a `resolved Boolean @default(false)` field to `ContactSubmission` (migration `20260927120000_add_resolved_flag`, generated connection-free via the `--from-schema`/`--to-schema` diff approach). Network access to Neon's direct port happened to be open this session, so this one was applied via a normal `prisma migrate deploy` rather than needing the HTTP-client workaround from the contact-form feature.
	- New `setContactSubmissionResolved` server action in `app/actions/admin.ts` (admin-only actions live there) — requires an admin session, toggles the flag, revalidates and redirects back to `/admin/inquiries`.
	- Page now splits submissions into an "open" list (shown directly) and a collapsed `<details>` "Resolved (N)" section, each card having a "Mark Resolved"/"Mark Unresolved" toggle button.
	- Verified the `resolved` field defaults to `false` and updates correctly via a direct DB smoke test (create → update → delete) against the live database.
- Branch: `feature/admin-section-adjustments`.