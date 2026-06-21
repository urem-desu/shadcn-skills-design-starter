# Textarea — Design System Component

Token-driven multi-line field. Shares the `--field-*` tokens with Input; error
driven by `aria-invalid`. Vertical resize only.

## Token mapping
Same `--field-*` chain as Input (bg, borders, text, placeholder, radius, focus
ring, error ring). Padding `space.2 × space.3`; line-height `lineHeight.normal`
(1.5); default `rows={3}` (no fixed px height — grows with content/resize).

## API
```ts
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  rows?: number   // default 3
}
```

## States
default · hover (`--field-border-hover`) · focus (`--field-border-focus` + ring) · disabled (opacity .5) · error (`aria-invalid` → error border + error focus ring + message). Active N/A (text entry).

## Accessibility (gate-verified, light & dark)
- Pair with `<Label htmlFor>`; helper/error via `aria-describedby`.
- Height set via `rows` (responsive, no fixed px) — `verify_responsive` clean at 280/320/414.
- `measure_render`: 10/10 text AA · `axe_audit`: 0 · `verify_states`: pass.

## Usage
```tsx
<Label htmlFor="bio">Bio</Label>
<Textarea id="bio" placeholder="Tell us a bit about yourself" aria-describedby="bio-h" />
<p id="bio-h">You can @mention other users and organizations.</p>

<Textarea error aria-describedby="msg-e" defaultValue="x" />
```
