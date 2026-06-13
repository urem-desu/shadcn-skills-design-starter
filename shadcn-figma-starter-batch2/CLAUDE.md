# CLAUDE.md

Loaded into Claude Code's system prompt every session. These instructions **override default
behavior** — follow them exactly. Keep this file lean: it points to the canonical specs rather
than duplicating them.

## What this is

A **design-system starter** that turns Figma designs into production React. Tokens are synced
**1:1 from a Figma kit** (sRGB, aliased to the Tailwind palette); components come from the
**shadcn/ui** CLI; the **Figma Dev Mode MCP** server bridges design → code. The job is to build
UI that matches Figma exactly — nothing added, nothing dropped, nothing inferred.

## Read first

| File | What it is |
| --- | --- |
| [`DESIGN.md`](./DESIGN.md) | Design-system spec — token tables, naming, composition rules, Next.js integration. **Source of truth for values.** |
| [`shadcn-ui-design/SKILL.md`](../.claude/skills/shadcn-ui-design/SKILL.md) | Build workflow (lives in the parent kit's `.claude/skills/shadcn-ui-design/`). Pulls its `references/` (figma-workflow, critical-rules, tokens) into context on demand. |
| [`AGENTS.md`](./AGENTS.md) | Thin entry point for non-Claude agents — defers here. |

When `DESIGN.md` and stock shadcn defaults disagree, **`DESIGN.md` wins** (it mirrors the kit).

## Stack

Next.js 15 (App Router, **RSC**) · React 19 · TypeScript · Tailwind CSS v4 (`@theme inline`,
**sRGB** tokens — not OKLCH) · shadcn/ui (new-york, base color neutral, lucide icons) ·
next-themes · Figma Dev Mode MCP.

## Project structure

```
app/
  layout.tsx          # next/font (Inter, Geist Mono) + ThemeProvider; RootLayout
  page.tsx            # replace with your first Figma screen
  globals.css         # ALL design tokens (:root / .dark / @theme inline) — edit here, never a new CSS file
components/
  theme-provider.tsx  # "use client" wrapper around next-themes
  ui/                 # shadcn components land here (CLI-managed) — created on first `add`
lib/
  utils.ts            # cn() — clsx + tailwind-merge
DESIGN.md · CLAUDE.md · AGENTS.md
../.claude/skills/shadcn-ui-design/        # the build skill + references/ (in the parent kit)
.mcp.json             # Figma Dev Mode MCP server
```

Path alias: **`@/*` → repo root** (e.g. `@/lib/utils`, `@/components/ui/button`). Aliases are
defined in `components.json` (`components`, `ui`, `lib`, `hooks`, `utils`).

## Commands

```bash
# DORMANT — the Variables REST API is Enterprise-only; this account lacks the
# file_variables:read scope, so these 403. Use the plugin export + `npm run tokens`.
# Kept wired up for when the account moves to Enterprise.
npm run tokens:fetch  # fetch variables from Figma REST API → figma/variables-export.json (needs .env.local)
npm run tokens:sync   # fetch from API + regenerate tokens in one step
npm run tokens        # regenerate from an existing export JSON (no API) — current path

npm run dev      # dev server (http://localhost:3000)
npm run build    # production build — also type-checks and lints
npm run lint     # eslint . (flat config: next/core-web-vitals + next/typescript)
npm run lint:fix # eslint . --fix

# Always run before touching components — reports framework, style, base, RSC, aliases, installed:
npx shadcn@latest info --json
npx shadcn@latest search <query>                 # check official + community registries first
npx shadcn@latest add <component>                # install (never hand-write components/ui/*)
npx shadcn@latest add <component> --dry-run --diff
```

## Figma integration

**Project Figma file:** _not set yet._ When the file is chosen, record it here so any agent can
read it without asking:

```
URL:     https://www.figma.com/design/<fileKey>/<name>
fileKey: <fileKey>
```

**MCP server.** [`.mcp.json`](./.mcp.json) pins the **local Figma Dev Mode MCP server**
(`http://127.0.0.1:3845/mcp`). To use it: open the Figma **desktop app** → Preferences →
**Enable Dev Mode MCP server**, then approve the server in Claude Code. (Alternatively, the
hosted **claude.ai Figma connector** exposes the same `get_*` tools without `.mcp.json` — if
both are active, prefer one to avoid duplicate tools.)

**Tools** (read design → code):

| Tool | Use |
| --- | --- |
| `get_design_context` | Structured React + Tailwind + Code Connect for a node (start here) |
| `get_screenshot` | Visual source of truth for fidelity |
| `get_variable_defs` | Tokens used by a node, by Figma variable name |
| `get_metadata` | Node map when design context is too large — then drill into leaf nodes |

**Working with a node:** extract `fileKey` + `node-id` from the URL (`?node-id=1-2` → `1:2`).
`get_variable_defs` needs a concrete **frame/leaf** node — a page/canvas node is rejected with
"nothing selected". If access fails, run `whoami` and confirm the file is shared with the
authenticated account. **Full inventory-first workflow:**
[`references/figma-workflow.md`](../.claude/skills/shadcn-ui-design/references/figma-workflow.md).

**Code Connect** (Figma Org/Enterprise): once the file is set, map `components/ui/<name>.tsx` to
their Figma components so Dev Mode and MCP responses return real code snippets and prop types.
See `DESIGN.md` §12.4.

## Design tokens

Values live **only** in [`app/globals.css`](./app/globals.css), synced 1:1 from the Figma
`shadcn/ui` collection (`Light mode` → `:root`, `Dark mode` → `.dark`). The rules:

- **Never hand-edit a token value or substitute/lighten/darken a color** — re-export from Figma
  and regenerate. This is byte-for-byte fidelity (see `DESIGN.md` §2, §12).
- **Never run `npx shadcn@latest apply --preset`** — it overwrites kit-synced values.
- New token: define under `:root` + `.dark`, register in `@theme inline`, add it to Figma (both
  modes), and update `DESIGN.md` §2.3 — same change. Use **sRGB hex**, not OKLCH (`DESIGN.md` §10).

## Hard rules

- **No invented Figma details.** Design doesn't show it → don't add it. Design shows it → don't drop it. No "polish."
- **Semantic tokens only** — `bg-primary`, `text-muted-foreground`. Never raw colors (`bg-blue-500`, `text-emerald-600`); use Badge variants or tokens for status.
- **`gap-*`, not `space-x/y-*`.** **`size-10`, not `w-10 h-10`.**
- **`cn()`** from `@/lib/utils` for conditional classes — never ternaries in `className` strings.
- **No manual `dark:` overrides** — semantic tokens auto-switch via `.dark`.
- **CLI for components** — `npx shadcn@latest add`; never hand-write `components/ui/*`.
- **`"use client"`** on any component using state, effects, handlers, or browser APIs (RSC default is server).
- **Edit `app/globals.css`** for tokens — never create a new CSS file.

## Dark mode & fonts (wired)

Dark mode: `next-themes` via [`components/theme-provider.tsx`](./components/theme-provider.tsx),
mounted in `layout.tsx` with `attribute="class"`. Fonts: Inter / Geist Mono via `next/font`,
exposed as `--font-inter` / `--font-geist-mono` and referenced by `@theme`. Details:
`DESIGN.md` §9 (integration) and §11 (dark mode). Add a theme toggle with `useTheme()` in a
client component.

## When to stop and ask

Don't guess — ask when a token doesn't cover a needed value, a Figma variable doesn't resolve
to a known token, the screenshot and design context disagree, a referenced component isn't
installed or in any registry, or a behavioral state is named but not shown. Full list:
[`references/figma-workflow.md`](../.claude/skills/shadcn-ui-design/references/figma-workflow.md).
Asking takes thirty seconds; guessing wrong takes an hour to fix.
