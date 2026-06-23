# Skeleton — Design System Component

Loading placeholder with CSS `animate-pulse` shimmer. Zero seams: reads
`surface-sunken` (base gray) from existing semantic tokens. Shape (height,
width, border-radius) is entirely caller-supplied via `className` — the
component owns only the background and animation.

Figma description: "Use to show a placeholder while content is loading."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| Root | background | `surface.sunken` | `gray.100` | `gray.800` |
| Root | border-radius | default `radius-md`; override via `className` | 6px | — |
| Root | animation | Tailwind `animate-pulse` (CSS opacity keyframe) | — | — |

## API
```ts
// Skeleton extends <div> — all shape/size applied via className
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}
```

`aria-hidden="true"` is hardwired — skeletons are decorative and should be
invisible to screen readers. If the loading region needs announcement, add
`aria-busy="true"` on the container.

## States
- **Default**: pulsing opacity from 100% to 50%.
- **Reduced motion**: `prefers-reduced-motion: reduce` — Tailwind's `animate-pulse`
  respects the media query and stops the animation (becomes static tinted block).
- **Dark**: `surface-sunken` flips to `gray.800`.

## Accessibility
- `aria-hidden="true"` prevents screen readers from announcing placeholder shapes.
- Parent container should carry `aria-busy="true"` while loading to announce the
  loading state to assistive technology.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import { Skeleton } from "@/design-system/skeleton/skeleton"

// Avatar + text line composition
<div className="flex items-center gap-[var(--space-4)]">
  <Skeleton className="size-12 rounded-full" />
  <div className="flex flex-col gap-[var(--space-2)]">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-4 w-32" />
  </div>
</div>

// Card skeleton
<div className="flex flex-col gap-[var(--space-3)] p-[var(--space-4)]
                rounded-[var(--radius-lg)] border border-[var(--border-default)]">
  <Skeleton className="h-40 w-full rounded-[var(--radius-md)]" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>
```
