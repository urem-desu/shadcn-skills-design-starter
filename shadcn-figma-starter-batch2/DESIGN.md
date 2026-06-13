# Design System

Single source of truth for tokens, naming, and composition rules.
All component code, Figma components, and AI-generated UI must follow this document.

Stack: **shadcn/ui** (Radix or Base UI primitives) · **Tailwind CSS v4** · **Tailwind color palette (sRGB), Figma-kit-synced** · **Figma Dev Mode MCP**

> Precedence: **the Figma kit wins.** Tokens here mirror the Figma variable
> export `lazyyysync-variables-v1` (collection `shadcn/ui`, modes `Light mode` /
> `Dark mode`) 1:1. Where the kit and stock shadcn defaults disagree, the kit
> wins and this document tracks the kit. Where this document and shadcn defaults
> disagree, this document wins.

---

## 1. Token Architecture

Three-tier model, matching the official shadcn/ui structure and the Figma export's collections:

```
Tier 1 — Primitive tokens
  Raw Tailwind-palette sRGB values (Figma collection "tw/colors", 244 vars;
  Radix primitives in "rdx/colors"). Never used directly in components.
  Example: #171717 (neutral/900), #0090ff (blue/9)

Tier 2 — Semantic tokens (CSS variables)
  Figma collection "shadcn/ui" (35 vars) → :root and .dark in globals.css.
  Example: --primary, --background, --muted-foreground

Tier 3 — Tailwind utilities
  Mapped via @theme inline in globals.css; scale collections (border-radius,
  font, padding, gap, …) supply the numeric steps.
  Example: bg-primary, text-muted-foreground, rounded-lg
```

Components reference Tier 3 utilities only. Changing a Tier 2 variable re-themes every component. In Figma the same three tiers exist as collections (`tw/colors` → `shadcn/ui` → component scales), so Tier 2 names match 1:1 across code and design.

---

## 2. Color System

### 2.1 Naming convention

Semantic background and foreground pairs. The base token controls the surface color; the `-foreground` token controls the text and icon color that sits on that surface. The background suffix is omitted for the surface token — `primary` pairs with `primary-foreground`.

- The **base** variable (`--primary`) is the surface color
- The **`-foreground`** variable (`--primary-foreground`) is the text / icon color on that surface

### 2.2 Source of truth

The complete scaffold lives in [`app/globals.css`](./app/globals.css). Values are the **exact sRGB output of the Figma kit** (`shadcn/ui` collection, `Light mode` → `:root`, `Dark mode` → `.dark`), so code renders byte-identical to the original Figma. Do not hand-edit values — re-export from Figma and regenerate.

**Deviations from stock shadcn (the kit's choices, intentionally kept):**

| Area | Stock shadcn neutral | This kit |
| --- | --- | --- |
| Color format | OKLCH | sRGB hex (Tailwind palette aliases) |
| `--radius` | `0.625rem` (10px) + `calc()` scale | `0.5rem` (8px) + static scale |
| `--primary` (dark) | `oklch(0.922 0 0)` neutral-grey | `#cbd5e1` (**slate/300**) |
| `--ring` (dark) | `oklch(0.556 0 0)` | `#cbd5e1` (**slate/300**) |
| `--input` (dark) | translucent white | `#1c1917` (**stone/900**) |
| `--chart-1…5` | multi-hue | single **blue ramp** (`#5eb1ef → #113264`) |
| `--destructive` (dark) | desaturated red | `#f87171` (red/400) |
| Fonts | unset | `--font-sans` Inter · `--font-mono` Geist Mono |
| Extras | — | `--background-color`, `--semantic-background/-foreground/-border` |

### 2.3 Token reference

This table is **1:1 with [`app/globals.css`](./app/globals.css)** and with the Figma `shadcn/ui` collection — every variable with its exact light/dark value and the Tailwind-palette swatch it aliases. If you add or remove a token in `globals.css`, update this table in the same change.

**Core surface & text**

| Variable | Utility | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `--background` / `--foreground` | `bg-background` / `text-foreground` | `#ffffff` (white) / `#0a0a0a` (neutral/950) | `#0a0a0a` / `#fafafa` | Page surface and default text (also on `body`) |
| `--card` / `--card-foreground` | `bg-card` / `text-card-foreground` | `#ffffff` / `#0a0a0a` | `#171717` (neutral/900) / `#fafafa` | Card surfaces |
| `--popover` / `--popover-foreground` | `bg-popover` / `text-popover-foreground` | `#ffffff` / `#0a0a0a` | `#262626` (neutral/800) / `#fafafa` | Floating panels (popover, dropdown, command) |

**Brand & intent**

| Variable | Utility | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `--primary` / `--primary-foreground` | `bg-primary` / `text-primary-foreground` | `#171717` (neutral/900) / `#fafafa` | `#cbd5e1` (**slate/300**) / `#171717` | Primary actions |
| `--secondary` / `--secondary-foreground` | `bg-secondary` / `text-secondary-foreground` | `#f5f5f5` (neutral/100) / `#0a0a0a` | `#262626` / `#fafafa` | Secondary actions |
| `--muted` / `--muted-foreground` | `bg-muted` / `text-muted-foreground` | `#f5f5f5` / `#737373` (neutral/500) | `#262626` / `#a3a3a3` (neutral/400) | Muted surfaces and helper text |
| `--accent` / `--accent-foreground` | `bg-accent` / `text-accent-foreground` | `#f5f5f5` / `#171717` | `#404040` (neutral/700) / `#fafafa` | Hover and accent states |
| `--destructive` | `bg-destructive` / `text-destructive` / `border-destructive` | `#dc2626` (red/600) | `#f87171` (red/400) | Errors and destructive actions — **single token, no `-foreground` pair** (see note) |

**Forms & focus**

| Variable | Utility | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `--border` | `border-border` | `#e5e5e5` (neutral/200) | `#404040` (neutral/700) | Default border (applied to `*` in `@layer base`) |
| `--input` | `border-input` · `bg-input/30` (dark) | `#e5e5e5` (neutral/200) | `#1c1917` (**stone/900**) | Form control borders / fills |
| `--ring` | `ring-ring` · `outline-ring/50` | `#737373` (neutral/500) | `#cbd5e1` (**slate/300**) | Focus ring and base outline |

**Charts** (kit uses a single blue ramp, identical in both modes)

| Variable | Utility | Light / Dark | Swatch | Purpose |
| --- | --- | --- | --- | --- |
| `--chart-1` | `bg-chart-1` / `stroke-chart-1` | `#5eb1ef` | blue/8 | Data series 1 |
| `--chart-2` | `bg-chart-2` / `stroke-chart-2` | `#0090ff` | blue/9 | Data series 2 |
| `--chart-3` | `bg-chart-3` / `stroke-chart-3` | `#0588f0` | blue/10 | Data series 3 |
| `--chart-4` | `bg-chart-4` / `stroke-chart-4` | `#0d74ce` | blue/11 | Data series 4 |
| `--chart-5` | `bg-chart-5` / `stroke-chart-5` | `#113264` | blue/12 | Data series 5 |

**Sidebar palette**

| Variable | Utility | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `--sidebar` / `--sidebar-foreground` | `bg-sidebar` / `text-sidebar-foreground` | `#fafafa` / `#0a0a0a` | `#171717` / `#fafafa` | Sidebar surface and text |
| `--sidebar-primary` / `--sidebar-primary-foreground` | `bg-sidebar-primary` / `text-sidebar-primary-foreground` | `#171717` / `#fafafa` | `#0588f0` (blue/10) / `#262626` (**neutral/800**) | Active / primary nav item |
| `--sidebar-accent` / `--sidebar-accent-foreground` | `bg-sidebar-accent` / `text-sidebar-accent-foreground` | `#f5f5f5` / `#171717` | `#262626` / `#fafafa` | Sidebar hover / accent |
| `--sidebar-border` | `border-sidebar-border` | `#d4d4d4` (neutral/300) | `rgb(255 255 255 / 0.8)` (white/10) | Sidebar borders / separators |
| `--sidebar-ring` | `ring-sidebar-ring` | `#737373` | `#737373` | Focus ring inside the sidebar |

**Kit-specific extras** (not standard shadcn — kept for 1:1 fidelity)

| Variable | Utility | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `--background-color` | `bg-background-color` | `rgb(0 0 0 / 0.3)` | `rgb(0 0 0 / 0.3)` | Overlay / scrim behind modals (alias `black/5`) |
| `--semantic-background` | `bg-semantic-background` | `#6b7280` (gray/500) | `#6b7280` (gray/500) | Kit "semantic" surface |
| `--semantic-foreground` | `text-semantic-foreground` | `#ffffff` | `#ffffff` | Text on semantic surface |
| `--semantic-border` | `border-semantic-border` | `#4b5563` (gray/600) | `#4b5563` (gray/600) | Kit "semantic" border |

> **Note on `--destructive`:** the kit (matching shadcn defaults) ships `--destructive` as a **single token with no `--destructive-foreground`**. This is the one documented exception to the `name` / `name-foreground` pairing rule in §2.1. If a design needs a dedicated on-destructive text color, add `--destructive-foreground` to both `:root` and `.dark` and register it in `@theme inline` per [§10](#10-adding-custom-tokens) — don't assume it exists.

> Every variable above is defined in **both** `:root` (light) and `.dark` (dark). Never hardcode the dark values — they switch automatically via the `.dark` selector (see [§11](#11-dark-mode)).

### 2.4 Color format

Values are the kit's **exact sRGB output**, written as hex (`#rrggbb`) or `rgb(r g b / a)` when the kit token carries alpha. They are aliases of the kit's `tw/colors` collection (the Tailwind color palette), so each value traces back to a named Tailwind swatch (e.g. `--primary` light = `neutral/900` = `#171717`). sRGB is used — not OKLCH — so code is byte-identical to the original Figma. If you need OKLCH later, convert at high precision; do not eyeball it, or the kit match breaks.

### 2.5 Base color

The kit **overrides** the stock `tailwind.baseColor` preset. `components.json` records `neutral`, but the live values come from the Figma export, not `npx shadcn@latest init`. Note the kit mixes ramps — the neutral greyscale plus **slate** (`--primary`/`--ring` dark), **stone** (`--input` dark), **blue** (charts/sidebar-primary), and **gray** (semantic extras). Do not run a preset/theme swap (`apply --preset`) — it would overwrite the kit-synced values. Re-sync from Figma instead.

---

## 3. Border Radius

The kit uses a **static radius scale** (fixed rem per step, from the Figma `border-radius` collection) — *not* shadcn's `calc(var(--radius) * n)` system. `--radius` is retained at `0.5rem` (8px = `rounded-lg`, the kit default) for any shadcn component that reads it directly.

| Utility | Token (`@theme inline`) | Value | px | Figma `border-radius` | Use for |
| --- | --- | --- | --- | --- | --- |
| `rounded-none` | — | `0` | 0 | `rounded-none` | Square edges |
| `rounded-xs` | `--radius-xs` | `0.125rem` | 2 | `rounded-xs` | Hairline rounding |
| `rounded-sm` | `--radius-sm` | `0.25rem` | 4 | `rounded-sm` | Small chips, badges |
| `rounded-md` | `--radius-md` | `0.375rem` | 6 | `rounded-md` | Buttons, inputs, selects |
| `rounded-lg` | `--radius-lg` | `0.5rem` | 8 | `rounded-lg` | Cards, popovers, dialogs (**kit default**) |
| `rounded-xl` | `--radius-xl` | `0.75rem` | 12 | `rounded-xl` | Large containers |
| `rounded-2xl` | `--radius-2xl` | `1rem` | 16 | `rounded-2xl` | Hero surfaces |
| `rounded-3xl` | `--radius-3xl` | `1.5rem` | 24 | `rounded-3xl` | Extra-large surfaces |
| `rounded-4xl` | `--radius-4xl` | `2rem` | 32 | `rounded-4xl` | Oversized / marketing |
| `rounded-full` | — | `9999px` | — | `rounded-full` | Pills, avatars, icon buttons |

The `border-radius` collection also defines directional variants (`rounded-s/e/t/b/tl/…`) on the same steps. To re-shape the UI, re-export the collection and regenerate `@theme inline` — keep code and Figma in lockstep.

---

## 4. Typography

### 4.1 Font families (kit `font` collection)

| Variable | Stack | Figma token |
| --- | --- | --- |
| `--font-sans` | `var(--font-inter), ui-sans-serif, system-ui, sans-serif` | `familly/sans` = Inter |
| `--font-mono` | `var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace` | `familly/mono` = Geist Mono |

Set in `@theme inline`. **The font is data-driven from the Figma `familly/*` token, not a project default** — for this kit it resolves to Inter / Geist Mono; if the Figma file specifies different fonts, re-export and rewire (don't hardcode or assume Inter). The fonts are **loaded via `next/font`** in [`app/layout.tsx`](./app/layout.tsx), which sets `--font-inter` / `--font-geist-mono` on `<html>`; the `@theme` stacks above reference those vars and fall back gracefully if absent. See [§9](#9-nextjs-integration) for the full wiring.

```tsx
// app/layout.tsx
import { Inter, Geist_Mono } from "next/font/google"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-inter" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
// <html className={`${fontSans.variable} ${fontMono.variable}`}>
```

For Thai projects, pair Inter with a Thai sans (e.g. IBM Plex Sans Thai, Noto Sans Thai) — add it as a second `next/font` family and extend the `--font-sans` stack so Thai glyphs resolve automatically.

### 4.2 Font size (kit `font` `size/*` = Tailwind v4 default)

| Utility | Size | px | Line-height |
| --- | --- | --- | --- |
| `text-xs` | `0.75rem` | 12 | ≈ 16px |
| `text-sm` | `0.875rem` | 14 | ≈ 20px |
| `text-base` | `1rem` | 16 | 24px |
| `text-lg` | `1.125rem` | 18 | ≈ 28px |
| `text-xl` | `1.25rem` | 20 | ≈ 28px |
| `text-2xl` | `1.5rem` | 24 | ≈ 32px |
| `text-3xl` | `1.875rem` | 30 | ≈ 36px |
| `text-4xl` | `2.25rem` | 36 | 40px |
| `text-5xl` | `3rem` | 48 | `1` |
| `text-6xl` | `3.75rem` | 60 | `1` |
| `text-7xl` | `4.5rem` | 72 | `1` |
| `text-8xl` | `6rem` | 96 | `1` |
| `text-9xl` | `8rem` | 128 | `1` |

### 4.3 Font weight (kit `weight/*` = Tailwind v4)

`font-thin` 100 · `font-extralight` 200 · `font-light` 300 · `font-normal` 400 · `font-medium` 500 · `font-semibold` 600 · `font-bold` 700 · `font-extrabold` 800 · `font-black` 900. The kit also defines `style/italic` (`italic`) and `style/not-italic` (`normal`).

### 4.4 Letter-spacing (kit `tracking/*`, px @16 → Tailwind v4 em)

`tracking-tighter` `-0.05em` (−0.8px) · `tracking-tight` `-0.025em` (−0.4px) · `tracking-normal` `0` · `tracking-wide` `0.025em` (0.4px) · `tracking-wider` `0.05em` (0.8px) · `tracking-widest` `0.1em` (1.6px)

### 4.5 Line-height (kit `leading/*`)

Numeric, spacing-derived (`leading-<n>` = `n × 0.25rem`): `leading-3` 12px · `-4` 16 · `-5` 20 · `-6` 24 · `-7` 28 · `-8` 32 · `-9` 36 · `-10` 40 · `-12` 48 · `-15` 60 · `-18` 72 · `-24` 96 · `-32` 128. Named utilities (`leading-none/tight/snug/normal/relaxed/loose`) remain available from Tailwind v4 defaults.

### 4.6 Composite type styles (Figma text styles)

In Figma, the **applied unit is not an atom** — it is a composite text style named `Text-{size}/{Weight}` that bundles the §4.1–4.5 atoms into one token. `get_variable_defs` returns them as `Font(...)`:

```
Text-sm/Semi Bold = Font(family: "familly/sans", style: Semi Bold,
                         size: size/sm, weight: weight/semibold,
                         lineHeight: leading/5, letterSpacing: tracking/normal)
```

Translate each to the equivalent Tailwind utilities (family resolves from `--font-sans`; `tracking/normal` = `tracking-normal`, omittable):

| Figma text style | size / leading | Tailwind |
| --- | --- | --- |
| `Text-xs/Regular` | `size/xs` 12 · `leading/4` 16 | `text-xs font-normal leading-4` |
| `Text-xs/Medium` | `size/xs` 12 · `leading/4` 16 | `text-xs font-medium leading-4` |
| `Text-xs/Semi Bold` | `size/xs` 12 · `leading/4` 16 | `text-xs font-semibold leading-4` |
| `Text-xs/Bold` | `size/xs` 12 · `leading/4` 16 | `text-xs font-bold leading-4` |
| `Text-sm/Medium` | `size/sm` 14 · `leading/5` 20 | `text-sm font-medium leading-5` |
| `Text-sm/Semi Bold` | `size/sm` 14 · `leading/5` 20 | `text-sm font-semibold leading-5` |
| `Text-sm/Extra Bold` | `size/sm` 14 · `leading/5` 20 | `text-sm font-extrabold leading-5` |
| `Text-base/Bold` | `size/base` 16 · `leading/6` 24 | `text-base font-bold leading-6` |
| `Text-lg/Regular` | `size/lg` 18 · `leading/7` 28 | `text-lg font-normal leading-7` |
| `Text-2xl/Bold` | `size/2xl` 24 · `leading/8` 32 | `text-2xl font-bold leading-8` |
| `Text-4xl/Bold` | `size/4xl` 36 · `leading/10` 40 | `text-4xl font-bold leading-10` |
| `Text-7xl/Bold` | `size/7xl` 72 · `leading/18` 72 | `text-7xl font-bold leading-18` |

The naming pattern is `Text-{font-size step}/{weight name}` — weight names map per §4.3 (`Regular`→`font-normal`, `Medium`→`font-medium`, `Semi Bold`→`font-semibold`, `Bold`→`font-bold`, `Extra Bold`→`font-extrabold`). **This table lists the styles observed in the benchmarked frame, not the full set** — re-export the type styles to confirm the complete list before relying on it. Don't invent a `Text-{size}/{weight}` combination that the kit doesn't define; if a design needs one, add it to Figma first, then here.

---

## 5. Spacing & Sizing

Tailwind v4 derives every spacing/sizing utility from one base: `--spacing: 0.25rem` (4px). Any `p-*`, `m-*`, `gap-*`, `space-*`, `w-*`, `h-*`, `size-*`, `inset-*`, `translate-*` value `n` = `n × 0.25rem`. This matches the kit's `padding`, `margin`, `space`, `gap`, `height`, `max-height`, and `max-width` collections exactly.

> **Figma naming:** the kit's spacing collections name variables with the **directional utility** (`px-4`, `py-5`, `p-7`, `gap-4`) and use a **comma as the decimal separator** for half-steps (`gap-0,5` = 2px, `gap-2,5` = 10px, `px-3,5`/`py-3,5` = 14px). When `get_variable_defs` returns `px-3,5`, write `px-3.5` in code — same step, comma → dot.

| Token | rem | px | Token | rem | px |
| --- | --- | --- | --- | --- | --- |
| `0` | 0 | 0 | `6` | 1.5rem | 24 |
| `0.5` | 0.125rem | 2 | `8` | 2rem | 32 |
| `1` | 0.25rem | 4 | `10` | 2.5rem | 40 |
| `1.5` | 0.375rem | 6 | `12` | 3rem | 48 |
| `2` | 0.5rem | 8 | `14` | 3.5rem | 56 |
| `2.5` | 0.625rem | 10 | `16` | 4rem | 64 |
| `3` | 0.75rem | 12 | `20` | 5rem | 80 |
| `3.5` | 0.875rem | 14 | `24` | 6rem | 96 |
| `4` | 1rem | 16 | `32` | 8rem | 128 |
| `5` | 1.25rem | 20 | `…` | `n × 0.25rem` | |

Two non-negotiable rules:

1. **`gap-*` on flex/grid parents — never `space-x-*` or `space-y-*`.**
   - `flex flex-col gap-4` for vertical stacks
   - `flex gap-2` for horizontal rows
2. **`size-*` when width and height are equal.**
   - `size-10` instead of `w-10 h-10`
   - Applies to icons, avatars, skeletons

---

## 6. Shadows & Effects

The kit does not export shadow tokens — use the **Tailwind v4 default shadow scale**.

| Utility | Use for |
| --- | --- |
| `shadow-xs` / `shadow-sm` | Buttons, inputs, small cards |
| `shadow-md` / `shadow-lg` | Popovers, dropdowns, dialogs |
| `shadow-xl` / `shadow-2xl` | Modals, large floating surfaces |
| `shadow-none` | Reset |

**Opacity:** use Tailwind opacity modifiers (`bg-primary/30`, `opacity-80`). The kit's `opacity` collection mirrors the Tailwind scale (`0 → 100` in steps of 5). The kit's `--background-color` (`rgb(0 0 0 / 0.3)`) is the standard modal/scrim overlay — apply via `bg-background-color`.

---

## 7. Borders

| Utility | Width | Note |
| --- | --- | --- |
| `border` | 1px | Default; color from `--border` (`border-border` applied to `*` in `@layer base`) |
| `border-0` | 0 | |
| `border-2` | 2px | |
| `border-4` | 4px | |
| `border-8` | 8px | |

Directional variants (`border-t/r/b/l/x/y` and `-s/-e` logical) follow the same `0 / 1 / 2 / 4 / 8` scale — matching the kit's `border-width` collection. Border **color** is always the `--border` token (or `--input` for controls); never a raw color. Focus outlines use `--ring` (`outline-ring/50`, `ring-ring`). Icon stroke widths (lucide) follow the kit's `stroke-width` scale (`0.5`–`3` in steps of 0.25); default lucide stroke is `2`.

---

## 8. Component Composition Rules

These come straight from the official `shadcn-ui/ui/skills/shadcn` skill. They apply universally to every component, AI-generated or hand-written.

### 8.1 Forms

```tsx
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" />
    <FieldDescription>Helper text.</FieldDescription>
  </Field>
</FieldGroup>
```

- Validation: `data-invalid` on **Field**, `aria-invalid` on the **control**
- Disabled: `data-disabled` on Field, `disabled` on the control
- `InputGroup` uses `InputGroupInput` / `InputGroupTextarea` — never raw `Input` / `Textarea` inside it
- Option sets (2–7 choices) use `ToggleGroup`
- `FieldSet` + `FieldLegend` for grouping checkboxes/radios

### 8.2 Composition

- **Items inside their Group.** `SelectItem` → `SelectGroup`, `DropdownMenuItem` → `DropdownMenuGroup`, `CommandItem` → `CommandGroup`.
- **Custom triggers:** `asChild` (Radix) or `render` (Base UI). Check the `base` field via `npx shadcn@latest info`.
- **Overlay accessibility:** Dialog, Sheet, Drawer always need a Title.

### 8.3 Icons

- Use the project's configured `iconLibrary` (this project: `lucide`).
- Inside Buttons: `data-icon`, no sizing classes.
- Outside Buttons: `size-4`, `size-5`, etc.

### 8.4 Status colors

Use Badge variants or semantic tokens — never raw Tailwind colors.

```tsx
// ✅ Correct
<Badge variant="secondary">+20.1%</Badge>
<span className="text-destructive">-3.2%</span>

// ❌ Wrong
<span className="text-emerald-600">+20.1%</span>
```

---

## 9. Next.js integration

This starter is **Next.js 15 (App Router) · React 19 · TypeScript** (RSC on). Where the design system meets the framework:

| Concern | Where it lives | Rule |
| --- | --- | --- |
| Tokens | [`app/globals.css`](./app/globals.css) | Edit this file only; never create a new CSS file |
| Fonts | [`app/layout.tsx`](./app/layout.tsx) via `next/font` | Loads Inter / Geist Mono, sets `--font-inter` / `--font-geist-mono` on `<html>` (see [§4.1](#41-font-families-kit-font-collection)) |
| Theme switching | [`components/theme-provider.tsx`](./components/theme-provider.tsx) + `next-themes` | Wraps the app in `layout.tsx`; toggles `.dark` (see [§11](#11-dark-mode)) |
| Client interactivity | any component using state/effects/handlers | Add `"use client"` at the top — required under RSC |

**Theme provider.** `next-themes` is a client library, so it's wrapped in a `"use client"` component and used from the server `layout.tsx`:

```tsx
// components/theme-provider.tsx
"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

```tsx
// app/layout.tsx — inside <body>
<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  {children}
</ThemeProvider>
```

`attribute="class"` is what makes the semantic tokens flip via the `.dark` selector. Keep `suppressHydrationWarning` on `<html>` (next-themes sets the class before hydration).

**RSC note.** Components from the shadcn CLI that use `useState`, `useEffect`, event handlers, or browser APIs need `"use client"`. Server components stay the default — don't add the directive unless a component actually needs it.

---

## 10. Adding Custom Tokens

Edit `app/globals.css` directly. Never create a new CSS file. Use the kit's sRGB format (not OKLCH) so new tokens match the existing convention.

```css
/* 1. Define under :root and .dark */
:root {
  --warning: #f59e0b;
  --warning-foreground: #451a03;
}
.dark {
  --warning: #b45309;
  --warning-foreground: #fffbeb;
}

/* 2. Register with Tailwind v4 */
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

Now usable as `bg-warning` and `text-warning-foreground`. Add the matching variable to the Figma `shadcn/ui` collection (both modes) and to §2.3 in the same change so design, code, and docs stay 1:1.

---

## 11. Dark Mode

Class-based toggle via `.dark` on the root element, driven by `next-themes`. The provider is already wired in [`app/layout.tsx`](./app/layout.tsx) through [`components/theme-provider.tsx`](./components/theme-provider.tsx) with `attribute="class"` — see [§9](#9-nextjs-integration) for the setup. To add a toggle, read/write the theme with `useTheme()` from `next-themes` in a `"use client"` component.

**Never use manual `dark:` color overrides.** Semantic tokens auto-switch via the `.dark` selector, mirroring the kit's `Dark mode`.

```tsx
// ✅ Correct
<div className="bg-background text-foreground" />

// ❌ Wrong
<div className="bg-white text-black dark:bg-gray-950 dark:text-white" />
```

---

## 12. Figma ↔ Code Alignment

Figma is the source of design intent **and** of token values; code mirrors it. Both must reference the **same token names**.

### 12.1 Figma Variables structure

The export `lazyyysync-variables-v1` mirrors the three-tier model as 16 collections:

```
tw/colors      → raw Tailwind palette (244 vars: neutral/900, blue/9, …)   [Tier 1]
rdx/colors     → Radix color primitives (396 vars)                          [Tier 1]
shadcn/ui      → background, foreground, primary, …  (35 aliases)           [Tier 2]
border-radius · border-width · font · stroke-width · opacity ·
padding · margin · space · gap · height · max-height · max-width · tokens   [Tier 3 scales]
```

Semantic variables in `shadcn/ui` use the **same names** as CSS variables (without `--`): `background`, `primary`, `primary-foreground`. This is what makes Figma MCP and Code Connect resolve correctly.

Two layout details to expect when reading variables back:

- The `font` collection also exposes **composite type styles** named `Text-{size}/{Weight}` (returned as `Font(...)` by `get_variable_defs`). These are the unit designers apply — map them to Tailwind per [§4.6](#46-composite-type-styles-figma-text-styles).
- Scale collections name half-steps with a **comma** (`gap-2,5`, `px-3,5`); convert comma → dot for code (see [§5](#5-spacing--sizing)).

### 12.2 Modes for light/dark

The `shadcn/ui` collection has modes `Light mode` / `Dark mode`. `Light mode` → `:root`, `Dark mode` → `.dark` in `globals.css`. Re-export and regenerate `globals.css` whenever the kit changes — never hand-edit values.

### 12.3 Figma MCP server tools

| Tool | Returns |
| --- | --- |
| `get_design_context` | Structured React + Tailwind for the node, plus Code Connect snippets |
| `get_metadata` | High-level node map (use when design context is too large) |
| `get_screenshot` | Visual reference of the node variant |
| `get_variable_defs` | Variables and styles used (color, spacing, typography) |

Workflow detail and strict 1:1 fidelity rules are in [`../.claude/skills/shadcn-ui-design/references/figma-workflow.md`](../.claude/skills/shadcn-ui-design/references/figma-workflow.md). `get_variable_defs` needs a layer/frame node (not a page); if access fails, run `whoami` and confirm the file is shared with the authenticated account.

### 12.4 Code Connect

For Figma Organization/Enterprise plans, **Code Connect** links Figma components to their `components/ui/<name>.tsx` source files. Dev Mode then shows real code snippets, and MCP responses include the exact component path and prop types.

---

## 13. References

All values and rules verified from these sources:

- Figma kit (source of truth): export `lazyyysync-variables-v1`, `shadcn/ui` collection (`Light mode` / `Dark mode`)
- shadcn/ui — Theming: <https://ui.shadcn.com/docs/theming>
- shadcn/ui — Tailwind v4: <https://ui.shadcn.com/docs/tailwind-v4>
- shadcn/ui — Installation: <https://ui.shadcn.com/docs/installation>
- shadcn/ui — components.json: <https://ui.shadcn.com/docs/components-json>
- shadcn/ui — Figma: <https://ui.shadcn.com/docs/figma>
- Tailwind CSS v4 — Theme: <https://tailwindcss.com/docs/theme>
- Official shadcn AI skill: <https://github.com/shadcn-ui/ui/tree/main/skills/shadcn>
- Figma Dev Mode MCP: <https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/>
