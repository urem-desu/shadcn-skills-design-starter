# Avatar — Design System Component

Token-driven user image with initials fallback. Self-contained (no Radix dep):
the initials show until the image loads, then the image fades in over them.
Tokens: `--avatar-*`.

## Token mapping
| Component token | → Semantic | → Primitive (light) | Dark |
|---|---|---|---|
| `--avatar-bg` | — | `gray.200` | `gray.700` |
| `--avatar-text` | — | `gray.700` | `gray.100` |
| `--avatar-border` (ring) | `surface.card` | `white` | `gray.900` |
| `--avatar-radius` | `radius.full` | 9999px | — |
| size sm/md/lg | `sizing.control` | 32 / 40 / 48px | — |
| fallback text | `typography.fontSize.sm` + weight 500 | 14px | — |

## API
```ts
interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string
  name: string           // required — used as <img alt> and to derive initials
  fallback?: string      // override initials
  size?: "sm" | "md" | "lg"   // default "md"
}
```

## States
- Default: initials on `--avatar-bg`.
- Image loaded: image fades in (`--duration-base`) over the fallback.
- Image error: stays on initials fallback (graceful degradation).
- Stacked group: ring via `--avatar-border` + negative inline-start margin.

## Accessibility (gate-verified, light & dark)
- `name` is mandatory and becomes the image `alt`; initials are `aria-hidden` once the image is shown so SR users hear one name, not "CN".
- Initials contrast (`avatar.text` on `avatar.bg`) meets AA in both themes.
- `measure_render`: 12/12 text AA · `axe_audit`: 0 violations · `verify_responsive`: no overflow.

## Usage
```tsx
<Avatar name="shadcn" src="https://github.com/shadcn.png" />
<Avatar name="Vercel" size="lg" />            {/* initials only */}
<Avatar name="Ada Lovelace" fallback="AL" />
```
