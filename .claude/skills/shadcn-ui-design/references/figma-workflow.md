# Figma → Code workflow (strict fidelity)

Use this **only** when the user gives a Figma file/frame (URL or selected node) via the
**Figma Dev Mode MCP server**. Follow the six steps in order — don't skip, don't reorder.

## The Fidelity Contract

- **No adding.** No hover/focus/placeholder/loading/icon the design doesn't show.
- **No removing.** A 1px divider, 13px text, asymmetric padding, a non-English label — all go in as shown.
- **No inferring.** Can't tell if a value is A or B? **Stop and ask** (§ "When to stop and ask"). Don't use "sensible defaults".
- **No polishing.** Honor the designer's exact choices; if it looks wrong, raise it — don't silently fix it.

## Step 1 — Fetch design context

```
get_design_context(<node-id>)
```

Structured React + Tailwind + Code Connect mappings. If too large/truncated: run
`get_metadata(<root-node-id>)` for the node map, then re-fetch only the leaf node(s).

## Step 2 — Fetch the screenshot

```
get_screenshot(<node-id>)
```

The screenshot is the source of truth for **visual fidelity**; the design context is the
source for **structure and tokens**. You need both.

## Step 3 — Fetch the variables

```
get_variable_defs(<node-id>)
```

Returns tokens by Figma variable name. Needs a concrete **leaf/frame** node — a page/canvas
node is rejected with "nothing selected". If you get raw hex/numbers, prompt: "Get the
variable names and values used in this frame."

## Step 4 — Build the inventory (mandatory)

**Before writing any JSX**, write a literal list of everything visible plus structure:

```
INVENTORY of figma node "card/product"
- Container: rounded-lg, padding 24, gap 16, bg=card, border=border
- Image: 240×160, rounded-md, object-cover
- Title: text-lg, font-medium, color=card-foreground
- Description: text-sm, color=muted-foreground, 2 lines max
- Footer row: gap-2, justify-between → Price (text-base font-medium) + Button (variant=outline, size=sm, "View")
- States visible: default only (no hover/focus/disabled shown)
- Variables used: --card, --card-foreground, --muted-foreground, --border, --radius
```

If a property isn't in Figma → it's not in the inventory → it doesn't get coded.

## Step 5 — Implement against the inventory

Translate each inventory line to JSX, mapping tokens 1:1:

| Figma reports | Use in code |
| --- | --- |
| `--background` variable | `bg-background` |
| `--primary` variable | `bg-primary` |
| Spacing `space/4` (16px) | `p-4`, `gap-4` |
| Spacing with a comma (`gap-2,5`, `px-3,5`) | `gap-2.5`, `px-3.5` — comma → dot, same step |
| Radius `rounded-lg` (8px) | `rounded-lg` |
| Type style `Text-{size}/{Weight}` (e.g. `Text-sm/Semi Bold`) | `text-sm font-semibold leading-5` — map per `DESIGN.md` §4.6 |
| A colored box with no variable attached | **STOP** — confirm which token applies |

Reuse existing components (a button-shaped thing → `<Button>`, not a styled `<div>`). Install
missing ones via the CLI first. The token's **value** is whatever `globals.css` holds
(kit-synced sRGB); never substitute a different color, lighten/darken, or "improve" it — that
is drift. If the MCP returns a localhost source for an image/SVG, use it directly — no
placeholders, no new icon packages.

## Step 6 — Validate against the screenshot

Walk the inventory item by item against the rendered output. Wrong token → fix className.
Missing item → add it. Extra item not in inventory → remove it. Looks "off" but matches the
inventory → that's correct; stop second-guessing. Only mark complete after this pass.

---

## Variable alignment (Figma ↔ Code)

The names in Figma Variables match the CSS variable names in `globals.css`:

| Figma Variable | CSS Variable |
| --- | --- |
| `background` | `--background` |
| `primary` | `--primary` |
| `primary-foreground` | `--primary-foreground` |
| `muted-foreground` | `--muted-foreground` |
| `rounded-lg` | `--radius-lg` (8px, static scale) |

When `get_variable_defs` returns `primary`, you write `bg-primary` — no translation, no
guesswork. Use the kit's `shadcn/ui` collection modes (`Light mode` / `Dark mode`) so each
variable has both values, matching `:root` and `.dark`. Kit-specific tokens
(`background-color`, `semantic-background/-foreground/-border`) exist too — use them as-is,
don't drop or invent. The `font` collection also exposes composite type styles
`Text-{size}/{Weight}` — map them to Tailwind per `DESIGN.md` §4.6.

---

## When to stop and ask

Always ask before continuing, instead of guessing:

- A request needs a color/radius/spacing value the tokens don't cover (add a token vs raw value?)
- A Figma variable resolves to a value that isn't in the project's tokens
- A Figma node references a component that isn't installed and isn't in any known registry
- The screenshot and design context disagree (different padding, color, layout)
- A behavioral state (hover, focus, disabled, loading, error) is referenced but not shown in any frame
- Sample data is obviously placeholder ("Lorem ipsum", "John Doe") and no real content was given
- A copy string is in a language the project doesn't ship — translate, keep, or use a key?
- A Figma pattern conflicts with shadcn's Critical Rules

Asking takes thirty seconds. Guessing wrong takes an hour to fix.
