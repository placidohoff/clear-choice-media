# Services Interested
## Goals
Please include a way for the admin to be able to add or remove options for "Services Interested in" on the Contact Form. This needs to be customizable.

## Implementation

- Confirmed with user: use the existing raw JSON editor at `/admin/edit` rather than building a dedicated add/remove UI control, consistent with how `services`, `boothCards`, and `eventTypes` are already admin-edited.
- Moved the hardcoded `SERVICE_OPTIONS` constant (`lib/contact.ts`) into the DB-backed site content as a new `serviceOptions: string[]` field (`lib/site-content.ts`), seeded with the original 5 options.
- `ContactForm` now receives `serviceOptions` as a prop (from `app/page.tsx`, read off site content) instead of importing the old hardcoded constant.
- `contactSubmissionSchema`'s `servicesInterested` field relaxed from a compile-time `z.enum(SERVICE_OPTIONS)` to `z.array(z.string().min(1))`, since valid options are now admin-configurable and can't be known at compile time — matches how `eventType` is already validated as a plain string, not an enum.
- Gave the new `serviceOptions` schema field a Zod `.default([...])` (not just `.min(1)`) — the live production DB row doesn't have this field yet, and `readSiteContent()` silently falls back to *all* hardcoded defaults (discarding real admin-edited content) if `safeParse` fails on a missing required field, per the bug fixed in "Persistent Admin Changes". The default avoids re-triggering that exact class of bug. Verified on the local dev server against the live DB: the new field renders with its default value while other real admin-edited content (e.g. custom-uploaded Cloudinary images) continues to render correctly, unaffected.
- Branch: `feature/add-remove-services`.