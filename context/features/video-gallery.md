# Video Gallery
## Goals
For the video section, I would like a video be shown. The sources of the videos follow a URL format pattern. It goes from https://res.cloudinary.com/rpwj7zbv/video/upload/v1789580083/vid-1 to https://res.cloudinary.com/rpwj7zbv/video/upload/v1789580093/vid-9. Notice the numbers that incriment. I would like only one video to show at a time but when one finishes the next one. Always random video playing. Perhaps a next/previous button as well to cycle through videos.

## Implementation

- **URL pattern confirmed:** `https://res.cloudinary.com/rpwj7zbv/video/upload/vid-N.mp4` for N = 1..9. The version segment (e.g. `v1789584598/`) is optional for delivery, same as the portfolio images. The originally-described URLs (no `.mp4` extension) 404'd — Cloudinary video delivery needs an explicit format extension to play in a `<video>` tag.
- **Random behavior:** the 9 videos are shuffled once per page load (same pattern as the portfolio gallery's `shuffle()`), not re-randomized on every transition. Auto-advance-on-end and the Prev/Next buttons step through that fixed shuffled order and loop at the ends.
- **Autoplay:** the active video autoplays muted (`autoPlay`, `muted`, `playsInline` attributes — required for browsers to allow autoplay without a user gesture), with a visible mute/unmute toggle button. Auto-advance is wired to the video element's `ended` event.
- **Component:** `app/components/VideoGallery.tsx` (new client component) owns the shuffle, current-index state, and mute state; it replaces the static Unsplash image + non-functional play-button markup that previously lived in the "Event Video" section of `app/page.tsx`.
- **Data:** new top-level `videos: string[]` field added to `siteContentSchema` (`lib/site-content.ts`, `.min(1)`) and `data/site-content.json`, alongside the existing `portfolioImages` field. Admin-editable the same way the portfolio images are.
- **Known issue:** `vid-6.mp4` returned a genuine Cloudinary 404 during testing (not a transient rate-limit 423 like a couple of the others were) — worth double-checking that one exists under that exact public ID in the Cloudinary account.
- Branch: `feature/video-gallery`.