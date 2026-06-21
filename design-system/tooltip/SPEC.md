# Tooltip — Design System Component

Token-driven tip on an **inverse** surface (`--tooltip-*`) that inverts correctly
in dark mode. `tooltip.tsx` builds on Radix for positioning, hover/focus delay,
dismissal, and a11y; the states harness uses a CSS-only equivalent (same tokens)
so the bubble can render always-open for contrast gating.

## Token mapping
| Component token | → Semantic | → Primitive (light) | Dark |
|---|---|---|---|
| `--tooltip-bg` | `surface.inverse` | `gray.900` | `gray.50` |
| `--tooltip-text` | `text.on-inverse` | `gray.50` | `gray.900` |
| `--tooltip-radius` | `radius.md` | 6px | — |
| `--tooltip-size` | `typography.fontSize.xs` | 12px | — |
| padding | `space.1.5 × space.2.5` | 6 × 10px | — |

Contrast (`tooltip-text` on `tooltip-bg`) ≈ 16:1 in both themes.

## API
```tsx
<Tooltip>            // self-provides a Provider (delayDuration 200ms)
  <TooltipTrigger asChild><Button variant="ghost">Hover</Button></TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>
// wrap an app in <TooltipProvider> to share one delay/skip timer
```

## States
- hidden (rest) → revealed on hover **and** keyboard focus of the trigger.
- Trigger: default/hover/focus (ghost-button styling, focus ring).
- Bubble fades in (`--duration-fast`); honors `prefers-reduced-motion`.

## Accessibility (gate-verified, light & dark)
- Trigger is a real `<button>`; Radix wires `aria-describedby` → content `role="tooltip"`, so SR users get the tip; appears on focus (not hover-only).
- Not for essential/interactive content (use Popover for that).
- `measure_render`: 6/6 text AA (bubble measured open) · `axe_audit`: 0 · `verify_states`: pass · `verify_responsive`: no overflow.

## Usage
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button size="icon" aria-label="Settings"><Settings /></Button></TooltipTrigger>
    <TooltipContent>Open settings</TooltipContent>
  </Tooltip>
</TooltipProvider>
```
