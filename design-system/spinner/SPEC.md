# Spinner — Design System Component

Circular indeterminate loading indicator rendered as an inline SVG. Zero seams:
reads `icon-sm` / `icon-md` / `icon-lg` from existing sizing tokens, and
inherits color from `currentColor` (parent text color). No external dependencies.

Figma description: "Displays a spinning indicator to communicate that a process is running."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Root SVG (sm) | size | `icon-sm` | 16px | — |
| Root SVG (md) | size | `icon-md` | 20px | — |
| Root SVG (lg) | size | `icon-lg` | 24px | — |
| Track circle | stroke-opacity | 0.25 (static, no token — opacity of the background arc) | — | — |
| Indicator arc | stroke | `currentColor` (inherits from parent) | varies | — |
| Animation | rotation | Tailwind `animate-spin` (360deg, 1s linear infinite) | — | — |

## API
```ts
interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg"   // default: "md"
}
```

`role="status"` and `aria-label="Loading"` are hardwired. Override `aria-label`
for context-specific announcements (e.g., `aria-label="Saving changes"`).

## States
- **Default**: continuous rotation.
- **Reduced motion**: `prefers-reduced-motion: reduce` — Tailwind's `animate-spin`
  respects the media query and shows a static arc.
- **Color**: inherits `currentColor`; wrap in a text-color class to tint
  (e.g., `text-[var(--action-primary)]` for blue).

## Accessibility
- `role="status"` announces the spinner as a live status region.
- `aria-label="Loading"` provides a text label for screen readers.
- The track circle is purely decorative (no separate `aria-hidden` needed — it's
  part of the SVG which already carries the accessible name).
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Spinner } from "@/design-system/spinner/spinner"

// Standalone
<Spinner />

// Inside a button (loading state)
<button disabled>
  <Spinner size="sm" aria-label="Saving" />
  <span>Saving…</span>
</button>

// With explicit color
<Spinner
  size="lg"
  className="text-[var(--action-primary)]"
  aria-label="Loading dashboard"
/>
```
