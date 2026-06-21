# Alert — Design System Component (molecule)

Token-driven inline feedback banner. A tinted surface + a left accent rule + a
leading icon — so meaning is conveyed by **icon + text**, never color alone
(WCAG 1.4.1). Four intents: info, success, warning, error. Colors resolve to
`--alert-{variant}-*` tokens in `design-system/theme.css`, each with a dark value.

Files: `alert.tsx` (React, `forwardRef`, `cva`), `alert-states.html` (gate harness).

## Anatomy

```
┌▏────────────────────────────────────────────┐
│▏[icon]  AlertTitle                           │  ▏ = left accent --alert-*-accent
│▏        AlertDescription …                    │   (--alert-accent-width = 4px)
└▏────────────────────────────────────────────┘
  grid cols [--icon-md  1fr] · gap-x --space-3 · radius --radius-lg · pad --alert-padding
```

## Token mapping (Component → Semantic → Primitive)

| Variant | bg (L → D) | text (L → D) | accent / icon (L → D) |
|---|---|---|---|
| info | `blue.100` → `blue.800` | `blue.700` → `blue.100` | `blue.600` → `blue.300` |
| success | `green.100` → `green.800` | `green.800` → `green.100` | `green.600` → `green.300` |
| warning | `amber.100` → `amber.800` | `amber.800` → `amber.100` | `amber.600` → `amber.300` |
| error | `red.100` → `red.800` | `red.700` → `red.100` | `red.600` → `red.300` |

All tints reuse the shared `--feedback-*` semantic tokens (same steps the Badge uses,
already gate-verified). Text uses the `-700`/`-800` step on the `-100` tint so 14px
body clears AA. Accent is a non-text UI rule (3:1).

Geometry: `--radius-lg` = `radius.lg`; `--alert-padding` = `space.4`;
`--alert-accent-width` = 4px; title weight 600 / `line.tight`; body `font-size.sm` / `line.normal`.

## API

```ts
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error"  // default "info"
  icon?: React.ReactNode  // override per-variant default icon (omit with null — not recommended)
  role?: string           // defaults: error/warning → "alert", info/success → "status"
}
// Slots: Alert, AlertTitle, AlertDescription
```

A per-variant lucide icon is rendered automatically (Info / CircleCheck /
TriangleAlert / CircleAlert) and tinted with the accent color.

## States
Static banner — no interactive states. Any embedded link/button carries its own
hover/focus and inherits the alert text color (AA-verified). Live-region semantics:
assertive (`role="alert"`) for error/warning, polite (`role="status"`) for info/success.

## Accessibility (gate-verified, light & dark)
- **Not color-only:** every variant pairs the tint with a distinct icon and the message text.
- **Live regions:** error/warning announce assertively; info/success politely.
- Icons are `aria-hidden` (decorative — the title carries the meaning).

### Verification (real gate output)
| Gate | Light | Dark |
|---|---|---|
| `measure_render.mjs` (text AA) | 12/12 pass | 12/12 pass |
| `verify_states.mjs` (link default/hover/focus) | 3/3 pass | 3/3 pass |
| `axe_audit.mjs` (WCAG 2.2 A/AA) | 0 violations | 0 violations |
| `verify_responsive.mjs` | no overflow @280/320/414px | — |

## Usage

```tsx
<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>A new version of the editor is available.</AlertDescription>
</Alert>

<Alert variant="error">
  <AlertTitle>Payment failed</AlertTitle>
  <AlertDescription>Your card was declined. Update billing and try again.</AlertDescription>
</Alert>

<Alert variant="success" icon={<PartyPopper />}>
  <AlertTitle>Changes saved</AlertTitle>
</Alert>
```
