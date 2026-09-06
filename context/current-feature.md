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

## History

- 2026-09-02: Created feature branch feature/login-and-edit and added the initial owner-auth + content-edit flow.
- 2026-09-02: Added auth helpers, protected admin routes, and editable site-content storage.
- 2026-09-01: Created feature branch feature/update-layout and built the landing-page foundation.
- 2026-09-01: Documented the homepage strategy and React/Next app structure for the team.
- 2026-09-04: Created feature branch `feature/images-database` and added images-database notes.