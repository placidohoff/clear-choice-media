# Center Images
## Goals
The images for the sections should be centered. The tiles for "Events we cover" should be centered as well. This is being asked for because the website owner removed some images/tiles and now what is shown is no longer centered. Please have it centered despite how many items are shown.

## Implementation

- Confirmed the bug via the live database before touching anything: `boothCards` is now 3 items (was 4) in what was a 4-column grid, and `eventTypes` is now 4 items (was 6, one renamed to "Brand Events") in a 3-column grid — both left an incomplete, left-aligned last row.
- Root cause: CSS Grid doesn't center an incomplete last row by default — items fill from the start, leaving empty space at the end of the row.
- Fix: converted `services`, `boothCards`, and `eventTypes` grids (`app/page.tsx`) from `grid` with fixed column counts to `flex flex-wrap justify-center`, with each card given a gap-compensated responsive width (e.g. `md:w-[calc(50%-0.75rem)] xl:w-[calc(25%-1.125rem)]`) matching the original column breakpoints. This centers correctly for any item count — not just the current one — since flex-wrap naturally centers a short/incomplete row when its container has `justify-content: center`.
- `services` was fixed proactively even though it's currently exactly 3-of-3 (no visible bug yet) — it would break the same way if an item is ever removed, matching "despite how many items are shown."
- The portfolio section's bento-style grid (varying tile sizes, dense packing) was left alone — it's intentionally non-uniform and wasn't part of what was asked.
- Verified: tile counts in the rendered HTML match the live DB (3 booth cards, 4 event tiles), confirming the new layout renders the correct items with the new centering classes applied.
- Follow-up: centering alone wasn't enough for "Events We Cover" — a fixed 3-column desktop grid with 4 items produced 3 tiles then a single lone tile on its own row, which didn't match the balanced 2x2 look already seen at tablet width (fixed 2 columns). Added `pickColumns(count, max)` in `app/page.tsx`, which picks the largest column count up to `max` that divides the item count evenly (falling back toward fewer columns, down to 1, if none do), and `getEventTileWidthClasses(count)`, which maps the chosen tablet/desktop column counts to literal Tailwind width classes (kept as literal strings per branch so the CSS build can still statically detect them). This keeps every row the same length for any future item count, not just centering a leftover row.
- Branch: `feature/center-images`.