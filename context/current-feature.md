# Current Feature

## Feature Name

Admin Login + Editable Site Content

## Status

In Progress

## Goals

- Add a secure owner login flow using JWT-based session cookies.
- Create an admin dashboard and content editor for homepage text, services, and media references.
- Keep the public homepage data-driven so content can be updated without changing the code.
- Prepare a clean path for Cloudinary image storage and future Prisma-backed database models.
- Maintain the premium landing-page foundation while adding the backend/admin layer requested in @LoginAndEdit.md.

## Notes

- The project is a Next.js App Router application using React 19.
- The homepage remains in app/page.tsx and uses editable site content from data/site-content.json.
- Authentication is handled through JWT tokens stored in an HTTP-only cookie and validated by middleware.
- Admin routes live under app/admin with a login screen, protected dashboard, and basic JSON editor for content.
- The app is being migrated from JSON-local storage toward a PostgreSQL-backed Prisma model for owner/admin users and content records.
- Prisma 7 requires a dedicated config file (`prisma7.config.ts`) and a Postgres driver adapter; the old `datasource url` pattern in the schema is no longer used in the same way.
- The feature branch is feature/login-and-edit.
- The feature branch is feature/login-and-edit.

## Images Database Feature

- Goal: Introduce an images database backed by Cloudinary for production assets, including an upload flow, metadata model (url, alt, category), and a UI in the admin dashboard to manage images.
- Rationale: Keeps media storage out of repo, enables image transformations, and centralizes image metadata for future search and categorization.
- Implementation notes:
	- Use Cloudinary as the media source; store public URLs and metadata in the future Prisma model.
	- Add an admin uploader and image manager under `app/admin` that updates the site-content source (initially `data/site-content.json`, later a DB).
	- Add validations and secure upload handling; prefer signed upload endpoints for production.

## Branch

- New feature branch: `feature/images-database` — created to track work and experiments for the images database and upload UI.

## Hero Carousel Feature

- Goal: Turn the homepage hero's single featured-event image into an auto-advancing carousel (per @context/features/carousel.md). Both the dimmed background panel and the foreground featured-event card must show the same image at the same time, crossfading together as the carousel advances.
- Decisions:
	- Each slide carries its own image, event name, and event meta caption (not just the image) — the caption changes in sync with the image.
	- Slides live in a new `hero.slides` array in `data/site-content.json` (admin-editable later), replacing the old single `featuredEventImage`/`featuredEventName`/`featuredEventMeta` fields.
	- Autoplay only (~6s interval), no manual dot/arrow controls.
	- Images should be real Clear Choice Media photos hosted on Cloudinary once available.
- Branch: `feature/hero-carousel` (merged and deleted — see History).
- Status: Done. Slides now include 3 real Cloudinary event photos plus the original placeholder; the "Featured Event" caption overlay is currently removed (placeholder captions didn't match the real photos — revisit if per-slide captions are wanted later).

## Navigation Fix

- Goal: The header (`NavHeader`) renders on every page, not just the homepage, but its nav links were plain `<a href="#services">` anchors. On any non-homepage route (e.g. `/admin/login`) those just appended a hash to the current URL with no matching element, so clicking a nav link did nothing. Per @context/features/navigation-fix.md, links must return to the homepage and then scroll to the right section.
- Fix: Swapped the raw anchor tags for `next/link`'s `Link` with hrefs prefixed with `/` (e.g. `/#services`). Next.js's `Link` natively scrolls to the hash target after navigating to a different route, and still does an in-page scroll when already on `/`, so one code path covers both cases.
- Branch: `fix/navigation-scroll`.

## Portfolio Gallery Update

- Goal: Replace the 4 Unsplash stock photos in the homepage portfolio section with real Clear Choice Media photos from Cloudinary, per @context/features/miscellaneous-photo-updates.md. CTA link wiring (buttons with no href) is explicitly out of scope — the user will handle that separately.
- Decisions: Expand from 4 to 10 images (pic-2, 5, 9, 13, 17, 21, 24, 28, 33, 39 from the `rpwj7zbv` Cloudinary account's pic-1..pic-40 range), laid out in a varied bento-style CSS grid (some tiles spanning extra columns/rows) rather than true Pinterest-style masonry, for visual variety without extra libraries. Tiles zoom slightly on hover (`group-hover:scale-105`), matching the existing service/booth card pattern.
- Added a click-to-open lightbox: a new `PortfolioLightbox` client component wraps the grid; clicking any tile opens a full-screen overlay with prev/next arrows, a close button, click-outside-to-close, and Escape/arrow-key support. No autoplay — manual navigation only.
- Branch: `feature/portfolio-gallery`.

## Gallery Pagination

- Goal: Per @context/features/gallery-pagination.md, expand the portfolio gallery to include all 40 Cloudinary photos (pic-1..pic-40) instead of the curated 10, shown in random order, 10 at a time with pagination.
- Decisions:
	- `data/site-content.json`'s `portfolioImages` now lists all 40 URLs (pic-1..pic-40) in natural order; `PortfolioLightbox` shuffles a copy once per mount (stable across pagination within a page load, re-shuffled on the next full page load) rather than storing a random order in the data file.
	- Pagination: Prev/Next buttons with a "Page X of 4" label (no direct-jump page numbers).
	- The lightbox ignores pagination boundaries — prev/next inside the lightbox cycles through all 40 shuffled images continuously; pagination only affects what's visible in the grid itself.
- Branch: `feature/gallery-pagination`.

## Video Gallery

- Goal: Per @context/features/video-gallery.md, show a real Cloudinary-hosted video in the homepage "Event Video" section (currently a static Unsplash image with a non-functional play button). One video plays at a time; when it ends, the next plays automatically; playback order is randomized; Prev/Next buttons let visitors cycle manually.
- URL pattern: `https://res.cloudinary.com/rpwj7zbv/video/upload/vid-N.mp4` for N = 1..9 (version segment optional, same as the portfolio images). Confirmed working for vid-1..vid-5, vid-7..vid-9 during testing; `vid-6` returned a genuine 404 (not a rate-limit 423 like the others) — worth the user double-checking that one in Cloudinary.
- Decisions: Shuffle the 9 videos once per page load (same pattern as the portfolio gallery), autoplay muted with a visible mute/unmute toggle (required by browser autoplay policy), auto-advance via the video's `ended` event, Prev/Next buttons step through the same shuffled order and loop.
- New `videos: string[]` field added to `siteContentSchema` and `data/site-content.json` (top-level, alongside `portfolioImages`). New `app/components/VideoGallery.tsx` client component replaces the static image+play-button markup in the Event Video section.
- Branch: `feature/video-gallery`.

## Contact Form

- Goal: Per @context/features/contact-form.md, the homepage contact form should validate input, save submissions to the database (not send email), and be viewable via an admin page. Success shows a modal and clears the form. Event type becomes a dropdown; date/time selection uses a visual calendar + time input.
- Decisions:
	- Email notification explicitly out of scope for now (no email provider configured) — DB-only.
	- Form fields expanded to match project-overview.md's recommended set: Name, Email, Phone, Event Date, Event Type (dropdown), Event Location, Services Interested In (multi-select), Estimated Guest Count, Additional Details.
	- Time selection: simple native time input alongside a `react-day-picker` visual calendar (no full custom time-slot grid).
	- Migration history didn't exist yet (prior schema changes used `db push`, not `migrate dev`/`deploy`) — set up properly: a baseline migration representing the existing User/SiteContent/MediaAsset tables (marked `resolve --applied` once, manually, from a network where Neon's port isn't blocked), then a real migration adding `ContactSubmission`. `prisma migrate deploy` added to the `start` script so Render applies future migrations automatically.
- Also updated the business's real contact email (`Clifton@clearchoicemedia.co`) and phone (`+1 (401) 442-2321`) in `data/site-content.json`, `lib/site-content.ts`, and the footer in `app/page.tsx`, replacing the `hello@clearchoicemedia.com` / `(555) 123-4567` placeholders — bundled into this branch per user request.
- Branch: `feature/contact-form` (merged and deleted — see History).
- Status: Done. See @context/features/contact-form.md for full implementation notes.

## History

- 2026-09-02: Created feature branch feature/login-and-edit and added the initial owner-auth + content-edit flow.
- 2026-09-02: Added auth helpers, protected admin routes, and editable site-content storage.
- 2026-09-01: Created feature branch feature/update-layout and built the landing-page foundation.
- 2026-09-01: Documented the homepage strategy and React/Next app structure for the team.
- 2026-09-04: Created feature branch `feature/images-database` and added images-database notes.
- 2026-09-11: Created and merged branch `fix/neon-http-adapter` — admin login was throwing `PrismaClientKnownRequestError` because the network blocks outbound Postgres TCP (5432) to Neon. Switched `lib/prisma.ts` from `@prisma/adapter-pg` to `@prisma/adapter-neon`'s `PrismaNeonHttp`, which queries over HTTPS (443) instead, and reconciled it with the existing lazy-init Proxy pattern from master. Branch deleted after merge.
- 2026-09-11: Created branch `feature/hero-carousel` and implemented the hero image carousel. Replaced `hero.featuredEventImage`/`featuredEventName`/`featuredEventMeta` with a `hero.slides` array in `data/site-content.json` and the `siteContentSchema`. New `app/components/HeroCarousel.tsx` client component autoplays through the slides (~6s interval) with a synchronized crossfade between the dimmed background panel and the foreground featured-event card. Seeded with 3 real Cloudinary event photos plus the original placeholder; the "Featured Event" caption overlay was removed for now since the placeholder captions didn't match the real photos.
- 2026-09-11: Created and merged branch `fix/navigation-scroll` — nav links only worked while already on the homepage. Switched to `next/link` with `/#section` hrefs.
- 2026-09-13: Created and merged branch `feature/portfolio-gallery` — replaced the 4 Unsplash portfolio placeholders with 10 real Cloudinary photos in a varied bento grid with hover zoom, plus a click-to-open `PortfolioLightbox` component (prev/next, close, keyboard support).
- 2026-09-13: Created and merged branch `feature/gallery-pagination` — expanded the portfolio gallery to all 40 Cloudinary photos, shuffled once per page load and paginated 10 at a time (Prev/Next); the lightbox cycles through the full shuffled set regardless of page.
- 2026-09-16: Created and merged branch `feature/video-gallery` — added `VideoGallery` client component to the Event Video section: 9 Cloudinary videos shuffled once per load, autoplay muted with unmute toggle, auto-advance on end, Prev/Next controls.
- 2026-09-17: Created and merged branch `feature/contact-form` — DB-backed contact form (new `ContactSubmission` Prisma model, first real migration history for this project), expanded fields, visual calendar + time picker, event-type dropdown, services checkboxes, success modal, and a new protected `/admin/inquiries` viewer. Also updated the site's real contact email/phone. See @context/features/contact-form.md for full details.