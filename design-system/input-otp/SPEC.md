# Input OTP — Design System Component

Accessible one-time password input built on the `input-otp` library (native
`<input>` element, WCAG-compliant, copy-paste aware, mobile-keyboard friendly).
Compound: `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`.
One seam: `--otp-slot-size` (40px — same as `--control-md` but named to express
the OTP-specific square constraint; aliased to the primitive, not a new value).

Figma description: "Accessible one-time password component with copy paste functionality."

## Token mapping
| Part | Property | → Semantic / Component | Light | Dark |
|---|---|---|---|---|
| `InputOTPGroup` container gap | gap | `space-2` | 8px | — |
| `InputOTPSlot` | size (w + h) | `--otp-slot-size` → `control-md` | 40px | — |
| `InputOTPSlot` (resting) | border-y + border-r | `field-border` | `gray.200` | `gray.800` |
| `InputOTPSlot` (first) | border-l + radius-l | `field-border` / `field-radius` | 6px | — |
| `InputOTPSlot` (last) | radius-r | `field-radius` | 6px | — |
| `InputOTPSlot` (active/focused) | border | `field-border-focus` | `blue.500` | — |
| `InputOTPSlot` (active) | shadow | `field-focus-ring` + ring | double ring | — |
| `InputOTPSlot` | font-size | `font-size.base` | 16px | — |
| `InputOTPSlot` | font-weight | `font-weight.medium` | 500 | — |
| `InputOTPSlot` | color | `text.primary` | `gray.900` | `gray.50` |
| Fake caret | height | `space-4` | 16px | — |
| Fake caret | color | `text.primary` | `gray.900` | `gray.50` |
| `InputOTPSeparator` icon | size | `icon-sm` | 16px | — |
| `InputOTPSeparator` icon | color | `text.tertiary` | `gray.400` | `gray.500` |
| Disabled | opacity | 0.5 via `has-[input:disabled]` | — | — |

## API
```ts
// InputOTP = OTPInput root (from input-otp)
interface InputOTPProps extends ComponentPropsWithoutRef<typeof OTPInput> {
  maxLength: number      // required — total number of OTP characters
  pattern?: string       // e.g. REGEXP_ONLY_DIGITS, REGEXP_ONLY_CHARS
  // + all native <input> props
}
// InputOTPGroup = div wrapper for a run of slots (groups of 3, 4, etc.)
// InputOTPSlot  = single character box; requires index prop matching slot position
interface InputOTPSlotProps extends HTMLAttributes<HTMLDivElement> {
  index: number          // required — zero-based slot index within the OTPInput
}
// InputOTPSeparator = dash divider between groups; role="separator" aria-hidden
```

## States
- **Empty**: slot shows fake blinking caret when active.
- **Filled**: character rendered in `text.primary`.
- **Active**: `field-border-focus` + `field-focus-ring` double ring.
- **Disabled**: wrapper opacity 0.5; `cursor-not-allowed`.
- **Dark**: semantic tokens flip at `[data-theme="dark"]`.

## Accessibility
- `input-otp` uses a single hidden native `<input>` — screen readers announce
  characters naturally; no ARIA faking needed.
- Copy-paste fills all slots in one action.
- `maxLength` maps to the `<input>` element's maxlength for AT.
- `InputOTPSeparator` is `role="separator" aria-hidden="true"` — decorative.
- `axe_audit`: 0 violations · `verify_responsive`: no overflow @ 280/320/414px.

## Usage
```tsx
import {
  InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator,
} from "@/design-system/input-otp/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

// 6-digit OTP (2 groups of 3)
<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

// 4-digit PIN (single group)
<InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    {Array.from({ length: 4 }, (_, i) => <InputOTPSlot key={i} index={i} />)}
  </InputOTPGroup>
</InputOTP>
```
