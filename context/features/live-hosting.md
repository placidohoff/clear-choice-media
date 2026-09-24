
# Live Hosting
## Goals
We own the domain name clearchoicemedia.co. How can we switch the .onrender site to this.

## Implementation

- This is mostly an account-level task Claude cannot perform directly (no Render dashboard or domain registrar access) — walked the user through it live in chat, verifying DNS/HTTP status from this environment at each step rather than guessing.
- Confirmed with user: apex domain (`clearchoicemedia.co`) is canonical, not `www`.
- Code-side: added `metadataBase: new URL("https://clearchoicemedia.co")` to `app/layout.tsx`'s metadata export, so relative Open Graph/canonical URLs resolve against the real domain. Checked the whole codebase for hardcoded `onrender.com` references — there were none, so no other code changes were needed.

### Actual steps taken (2026-09-24)

- Domain `clearchoicemedia.co` was registered through **GoDaddy**, and connected to a Squarespace-built site (Squarespace ≠ the DNS host here — GoDaddy's own nameservers, `ns53`/`ns54.domaincontrol.com`, are authoritative). This was discovered mid-walkthrough — initial guidance assumed Squarespace's own DNS settings panel would apply, but Squarespace's "Domains & Email" page there only manages Squarespace's connection to the domain, not the actual DNS zone.
- In Render (`clear-choice-media` web service → Settings → Custom Domains), added `clearchoicemedia.co` and `www.clearchoicemedia.co`. Render provided:
	- `www` → CNAME → `clear-choice-media.onrender.com`
	- `@` (apex) → CNAME → `clear-choice-media.onrender.com`, with an A-record fallback (`216.24.57.1`) noted for DNS providers that don't support CNAME at the root — GoDaddy is one of those, so the A record was the one actually used.
- In GoDaddy's DNS management for the zone:
	- Deleted 4 existing `A` records at `@` pointing to Squarespace's hosting IPs (`198.185.159.144`, `.145`, `198.49.23.144`, `.145`).
	- Added a new `A` record: `@` → `216.24.57.1`.
	- Edited the existing `CNAME` `www` record, changing its Data from `ext-cust.squarespace.com.` to `clear-choice-media.onrender.com`.
	- Left untouched: both `NS` records, the `SOA` record, `CNAME _domainconnect` (GoDaddy's own provisioning integration, harmless), the `TXT _dmarc` record (email policy, unrelated), and the `CNAME 9k5thrp432k7rzas73nk → verify.squarespace.com.` (Squarespace's ownership-verification record — optional cleanup, left in place since it doesn't affect resolution).
- Verified from this environment: DNS propagated within minutes (`nslookup` confirmed both hostnames resolving to Render's IPs). Render's dashboard then showed both domains "Verified"; the apex got "Certificate Issued" and `https://clearchoicemedia.co` was confirmed live with a clean `200 OK` (Cloudflare/Render edge headers). `www.clearchoicemedia.co` showed "Certificate Error" (SSL handshake failing) despite being verified — Render's dashboard already shows it configured to redirect to the apex once its cert issues, so this doesn't block the live apex domain; expected to self-resolve as Render retries issuance. User will check back on that later.
- Resolved: `www`'s certificate issued shortly after (Render auto-retried as expected) and now `301`-redirects to the apex correctly. User updated `NEXT_PUBLIC_APP_URL` in Render's environment variables to `https://clearchoicemedia.co` (local `.env` intentionally left as `localhost` for dev). Feature complete.
- Branch: `feature/live-hosting`.