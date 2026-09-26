# Portfolio Images Slider Correction
## Goals
Currently, when the portfolio images are clicked, the wrong image comes up to start the slider. It needs to be image that is clicked that starts the slider for the user.

## Implementation

- **Diagnosis:** confirmed with user that even the very first tile (page 1, no pagination involved) opens the wrong photo, and that it looks random each time — this ruled out an index/pagination-math bug (verified the `globalIndex = page * PAGE_SIZE + indexInPage` math was correct on paper) and pointed to something more fundamental.
- **Root cause:** a Next.js hydration mismatch. `PortfolioLightbox` is a `"use client"` component, but since it's rendered inside a Server Component page, Next.js still server-renders its initial HTML. `shuffle()` used `Math.random()` inside a `useState` initializer — so the server computed one random order for the SSR'd HTML (what's visually painted first), and the client computed a *different* random order during hydration for the actual interactive state (what `onClick`'s index math uses). The two disagreed, so clicking a tile opened whatever the client's independently-shuffled array had at that position — effectively random relative to what was visually shown.
- **Fix:** never randomize during the initial render. `useState(() => shuffle(images))` → `useState(images)` (deterministic, matches the server exactly) plus a `useEffect` that reshuffles once, client-side only, after mount. Verified via repeated SSR requests that the initial order is now identical every time (previously would have differed per request) — confirming the mismatch is gone.
- `VideoGallery.tsx` had the identical unsafe pattern — fixed the same way proactively (not the component reported broken, but the same root cause applied there too).
- Both fixes needed a targeted `eslint-disable-next-line react-hooks/set-state-in-effect` — the lint rule can't distinguish this legitimate "client-only randomness, deferred until after hydration" pattern from avoidable derived state; it's one of React's own recommended patterns for exactly this situation.
- Branch: `feature/image-slider-fix`.