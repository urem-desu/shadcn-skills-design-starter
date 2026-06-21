# Switch — Design System Component

Token-driven toggle. Native `<input type=checkbox role="switch">` on top (keeps
native keyboard, announced as a switch); drawn track + thumb overlay
(`pointer-events:none`). The off-track uses `border.strong` so the track boundary
meets the 3:1 non-text contrast minimum (WCAG 1.4.11) in both themes.

## Token mapping
| Component token | → Semantic | → Primitive (light) | Dark |
|---|---|---|---|
| `--switch-track-off` | `border.strong` | `gray.500` | `gray.500` |
| `--switch-track-on` | `action.primary` | `blue.600` | `blue.600` |
| `--switch-thumb` | — | `white` | `white` |
| `--switch-track-w` | `spacing.scale.9` | 36px | — |
| `--switch-track-h` | `spacing.scale.5` | 20px | — |
| `--switch-thumb-size` | `spacing.scale.4` | 16px | — |
| thumb offset | `spacing.scale.0.5` | 2px | — |
| focus | `--focus-ring` | double ring | — |

## API
```ts
type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role">
```
Provide a name via a paired `<Label>` or `aria-label`.

## States
off · on (track → primary, thumb slides) · focus (`:focus-visible` ring) · disabled (opacity .5). The thumb animates `left` over `--duration-fast`.

## Accessibility (gate-verified, light & dark)
- `role="switch"` on a native checkbox → announced as a switch with on/off state; `Space`/`Enter` toggle.
- Off-track contrast uses `border.strong` (≈3.5:1 on page) — not the faint `border.default` that fails 3:1.
- Track/thumb overlays are `aria-hidden` + `pointer-events:none`; the real input handles all interaction.
- `measure_render`: 8/8 text AA · `axe_audit`: 0 violations · `verify_states`: pass (skips the toggle itself per spec) · `verify_responsive`: no overflow.

## Usage
```tsx
<Label><Switch defaultChecked /> Airplane mode</Label>
<Switch aria-label="Marketing emails" defaultChecked />
<Switch disabled />
```
