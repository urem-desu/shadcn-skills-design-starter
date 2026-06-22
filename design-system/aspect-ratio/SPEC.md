# Aspect Ratio — Design System Component

Token-driven structural wrapper that constrains a child to a fixed width/height
ratio. Self-contained (no Radix dep): uses the native CSS `aspect-ratio` property
with `position: relative` so absolute-positioned children (image, video, iframe,
chart) fill the box without layout shift. Tokens: none (hybrid — zero component
seams; the wrapper paints nothing).

## Token mapping
| Component token | → Semantic | → Primitive | Note |
|---|---|---|---|
| _none_ | — | — | The component is geometry-only; it does not touch color, type, spacing, or radius. Demo medium in the harness uses `surface-sunken` + `border-default` (kept off the component itself so consumers compose any surface). |

## API
```ts
interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number   // default 1 (square). Common: 16/9, 4/3, 3/2, 1, 9/16.
}
```
- Children fill the box. Use `object-cover` on `<img>` / `<video>` to crop and
  `object-contain` to fit. Pair with `overflow-hidden rounded-[...]` on the
  consumer side when the medium needs a corner.
- Returns a `<div data-slot="aspect-ratio">` so the consumer can target it for
  styling (rounding, ring, etc.) without inheriting any opinion from us.

## States
None — Aspect Ratio is structural. No hover/focus/active/disabled. The child
governs all interactive state.

## Accessibility (gate-verified, light & dark)
- The wrapper itself is non-interactive and contributes no role/label; it is
  invisible to assistive tech (display container only).
- The child element owns a11y: `<img alt>`, `<video aria-label>`, `<iframe title>`,
  or `role="img" aria-label` on a CSS-painted decorative element.
- No layout shift: the box reserves its height from `ratio` before the medium
  loads, so CLS stays at 0.
- `measure_render`: no text rendered (n/a) · `axe_audit`: 0 violations
  (when child carries required alt/title) · `verify_responsive`: no overflow at
  280 / 320 / 414px (the box scales with its parent's inline-size).

## Usage
```tsx
{/* 16:9 video frame */}
<div className="w-full max-w-md overflow-hidden rounded-[var(--radius-lg)]">
  <AspectRatio ratio={16 / 9}>
    <img
      src="/cover.jpg"
      alt="Sunset over the ridge"
      className="size-full object-cover"
    />
  </AspectRatio>
</div>

{/* Square avatar tile (no Radix needed for this either) */}
<AspectRatio ratio={1} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)]" />

{/* Embedded map */}
<AspectRatio ratio={4 / 3}>
  <iframe
    title="Office location"
    src="https://www.openstreetmap.org/export/embed.html?bbox=..."
    className="size-full border-0"
  />
</AspectRatio>
```
