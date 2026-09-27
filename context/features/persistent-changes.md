# Persistent Admin Changes
## Goals
The content edits made through the admin portal are not persistent. How can we make the changes take affect in production.

## Implementation

- **Root cause:** `readSiteContent`/`writeSiteContent` (`lib/site-content.ts`) did plain local filesystem I/O against `data/site-content.json`. Render's filesystem is ephemeral — it resets to whatever's baked into the git repo/build image on every redeploy, so admin edits worked in the moment but were lost on the next deploy.
- **Why edits appeared to work at all:** `updateSiteContent` (`app/actions/admin.ts`) already calls `revalidatePath("/")` after saving, which triggers Next.js's on-demand revalidation — the homepage is statically generated (`○ Static` in the build output) but `revalidatePath` forces an immediate re-render with current data, independent of storage backend. That part was never broken; only the underlying data's durability was.
- **Fix:** there's an unused `SiteContent` Prisma model (`key`/`value: Json`) already in the schema — this was the original plan (per this feature's own earlier notes) but never wired up. Swapped the storage layer in `readSiteContent`/`writeSiteContent` to use it (one row, key `"homepage"`, value = the whole content blob), keeping `siteContentSchema`, `defaultSiteContent`, and every consuming component completely unchanged — only the persistence mechanism moved.
- **Seeding:** discovered `data/site-content.json` had real uncommitted edits (services images pointing to actual Cloudinary photos, not yet reflected in `defaultSiteContent`) — direct evidence of the bug already in progress, since that edit was one redeploy away from being silently wiped. Seeded the new DB row from that exact current file content (not the stale `defaultSiteContent`), so nothing was lost in the migration.
- **Verified directly against the live DB:** confirmed no `SiteContent` row existed before seeding; confirmed the seeded row's `services` images matched the real edited URLs; did a full write round-trip (changed `hero.title`, confirmed the change persisted, restored the original value, confirmed restoration) to prove the write path works correctly. Confirmed via `npm run build` that build-time static generation can reach the DB (needed since the homepage is statically prerendered).
- **Cleanup:** removed `data/site-content.json` entirely (no code references it anymore — confirmed via search) and corrected one stale line in `context/cloudinary-uploads.md` that mentioned it as a storage option.
- Branch: `feature/persistent-changes`.
