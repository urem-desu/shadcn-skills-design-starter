# Theming and tokens

Tokens live in the file at `tailwindCssFile` (`app/globals.css`). **Never create a new CSS
file.** Values are synced **1:1 from the Figma export** `lazyyysync-variables-v1` (`shadcn/ui`
collection) — exact sRGB hex, aliased to the Tailwind palette. Full reference: `DESIGN.md` §2.

## Add a custom token

Use the kit's sRGB hex format (not OKLCH) so new tokens match the existing convention, add the
matching variable to the Figma `shadcn/ui` collection (both modes), and update `DESIGN.md`
§2.3 — all in the same change.

```css
/* 1. Define */
:root {
  --warning: #f59e0b;
  --warning-foreground: #451a03;
}
.dark {
  --warning: #b45309;
  --warning-foreground: #fffbeb;
}

/* 2. Tailwind v4 */
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

For Tailwind v3, register in `tailwind.config.js` with `var(--warning)`.

## Re-theme (do NOT preset-swap)

Token values are synced **1:1 from the Figma kit** (exact sRGB). **Never run
`npx shadcn@latest apply --preset`** — it overwrites the kit-synced values and makes generated
code drift from Figma. To re-theme: re-export the Figma `shadcn/ui` collection and regenerate
`globals.css`. See `DESIGN.md` §2.5.

## Radius

The kit uses a **static radius scale** — *not* shadcn's `calc(var(--radius) * n)`.
`rounded-xs` = 2px, `rounded-sm` = 4px, `rounded-md` = 6px, `rounded-lg` = 8px (kit default,
`var(--radius)` = `0.5rem`), `rounded-xl` = 12px, `rounded-2xl` = 16px, `rounded-3xl` = 24px,
`rounded-4xl` = 32px. When `get_variable_defs` reports a radius, map it to the exact step —
don't recompute. See `DESIGN.md` §3.

## Fonts

`--font-sans` (Inter) and `--font-mono` (Geist Mono) are loaded via `next/font` in
`app/layout.tsx` and referenced by `@theme inline` through `--font-inter` / `--font-geist-mono`.
The font identity is data-driven from the Figma `familly/*` tokens — if Figma specifies
different families, re-export and rewire `next/font`; don't hardcode. See `DESIGN.md` §4.1.
