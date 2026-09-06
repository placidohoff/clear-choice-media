# Cloudinary Uploads (Signed Uploads)

This document explains the signed Cloudinary upload flow implemented in the project, how it differs from unsigned uploads, required environment variables, routes added, and testing steps.

## Summary
- Flow: Client requests a short-lived signature from the server (`/api/cloudinary-sign`), then POSTs the file to Cloudinary including `api_key`, `timestamp`, and `signature`.
- Files are uploaded directly to Cloudinary from the client, but only after the server issues a signature computed with `CLOUDINARY_API_SECRET`.
- This is more secure than unsigned presets and prevents arbitrary clients from uploading without server approval.

## Files / Routes
- `app/api/cloudinary-sign/route.ts` — server route that reads `CLOUDINARY_API_SECRET`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_CLOUD_NAME` and returns `{ ok, apiKey, cloudName, timestamp, signature }`.
- `app/admin/images/UploadClient.tsx` — client component that requests the signature and posts FormData to `https://api.cloudinary.com/v1_1/<cloud>/image/upload` with `file`, `api_key`, `timestamp`, and `signature`.

## Environment variables
Add these to your `.env.local` (restart dev server after changes):

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## How the signature is generated (current implementation)
- Server computes: `timestamp = Math.floor(Date.now() / 1000)`
- Signature (example): `sha1('timestamp=<timestamp><API_SECRET>')`
- Returned JSON: `{"ok":true,"apiKey":...,"cloudName":...,"timestamp":...,"signature":...}`

Note: this implementation signs only `timestamp` for simplicity. For stricter control you can sign additional upload parameters (for example `folder=site-images`) — see "Hardening" below.

## Client upload flow
1. Client GET `/api/cloudinary-sign`.
2. Client constructs FormData: `file`, `api_key`, `timestamp`, `signature` (and any other permitted params).
3. POST to `https://api.cloudinary.com/v1_1/<cloudName>/image/upload`.
4. On success Cloudinary returns `secure_url` and `public_id`.

## Testing locally
1. Ensure `.env.local` is set and restart the dev server.
2. Visit `http://localhost:3000/admin/images` (must be an authenticated admin). Upload a file and verify `secure_url` appears in the UI.
3. Check network calls: `/api/cloudinary-sign` should return `timestamp` + `signature`, and the POST to `api.cloudinary.com` should return `secure_url`.

## Hardening / Next steps
- Sign additional parameters server-side (e.g., `folder`, `public_id`) to restrict where uploads land.
- Alternatively, accept the file server-side and upload with Cloudinary SDK (file never leaves your server). This is the most secure option.
- Validate the admin session server-side before issuing signatures (already implemented via `requireAdminSession()` on the admin page).

## Where to store image references
- Store `secure_url` and `public_id` in your `data/site-content.json` or a future database model (recommended: Prisma `Image` model with `url`, `alt`, `public_id`, `category`, `createdAt`).

If you want, I can implement server-side uploads (Cloudinary SDK) or tighten the signature to include `folder` and other params.
