<div align="center">

# shadcn Skills Design Starter

**A production-grade Next.js starter for turning Figma into UI — design tokens synced 1:1 from a Figma kit, shadcn/ui components installed on demand, and pixel-fidelity enforced by an AI agent skill.**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-CLI--driven-000000)](https://ui.shadcn.com/)
[![Figma MCP](https://img.shields.io/badge/Figma-Dev_Mode_MCP-F24E1E?logo=figma&logoColor=white)](https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/)

</div>

---

## Overview

This is **not** a component dump. It's a disciplined pipeline that turns a Figma design into production React with no drift:

- **Tokens are synced 1:1 from Figma.** Every color, radius, and type value in `app/globals.css` is the *exact* sRGB output of the Figma variable export `lazyyysync-variables-v1` (collection `shadcn/ui`). Code renders byte-identical to the source.
- **Components are installed on demand.** Per shadcn/ui's philosophy, components live in your repo as source — added via the CLI when a design needs them, never pre-bundled.
- **An agent skill enforces fidelity.** [`../.claude/skills/shadcn-ui-design/`](../.claude/skills/shadcn-ui-design/) auto-loads in Claude Code (and other Agent-Skill tools) and applies a strict contract: **nothing added, nothing dropped, nothing inferred, nothing "polished."**
- **The design system is documented.** [`DESIGN.md`](./DESIGN.md) is the single source of truth — a complete token reference kept in lockstep with `globals.css` and the Figma kit.

> **Mental model:** Figma is the source of design intent *and* token values. Code mirrors it. This starter makes that mirroring automatic and tamper-evident.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [How to use](#how-to-use)
- [Project structure](#project-structure)
- [Design tokens](#design-tokens)
- [Figma → Code workflow](#figma--code-workflow)
- [Fonts](#fonts)
- [Theming](#theming)
- [Dark mode](#dark-mode)
- [AI agent configuration](#ai-agent-configuration)
- [Scripts](#scripts)
- [Git workflow](#git-workflow)
- [FAQ](#faq)
- [What this starter does NOT include](#what-this-starter-does-not-include)
- [References](#references)

## Features

- ⚡ **Next.js 15 App Router** + React 19 + TypeScript, RSC-first
- 🎨 **Tailwind CSS v4** with `@theme inline` — no `tailwind.config.ts`
- 🔗 **Figma-synced design tokens** — 35 color tokens × light/dark, plus radius and type, each traceable to a named Figma variable
- 🤖 **Agent-enforced 1:1 fidelity** — inventory-first workflow, anti-drift rules, progressive-disclosure skill
- 🧩 **shadcn/ui CLI-driven** — Radix/Base UI primitives, semantic tokens only
- 🌗 **Dark mode wired** — `next-themes` + class strategy; tokens auto-switch, no `dark:` overrides
- 🔤 **Fonts wired** — Inter + Geist Mono via `next/font`, mapped to the Figma `familly/*` token
- 📐 **OKLCH-free, sRGB-exact** — values match the Figma kit to the byte
- 🧹 **ESLint flat config** + **Figma MCP** pinned in [`.mcp.json`](./.mcp.json)
- 📚 **Fully documented** design system ([`DESIGN.md`](./DESIGN.md))

## Tech stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) · React 19 | RSC by default — add `"use client"` for interactivity |
| Language | TypeScript 5 | Strict mode |
| Styling | Tailwind CSS v4 | `@theme inline` in `globals.css`; no config file |
| Components | shadcn/ui (CLI-driven) | new-york style · base color neutral · Radix **or** Base UI (check `npx shadcn@latest info`) |
| Tokens | Figma-kit-synced (sRGB) | export `lazyyysync-variables-v1` → `shadcn/ui` collection |
| Fonts | `next/font`, data-driven from Figma `familly/*` | Inter (sans) · Geist Mono (mono) |
| Theming | `next-themes` | class strategy, wired in `app/layout.tsx` |
| Icons | lucide | Don't add other icon packs unless the design needs them |
| Linting | ESLint 9 (flat config) | `next/core-web-vitals` + `next/typescript` |
| Design ↔ Code | Figma Dev Mode MCP | `get_design_context` · `get_screenshot` · `get_variable_defs` |

## Prerequisites

- **Node.js 18.18+** (20 LTS recommended) and npm
- A **Figma Dev Mode MCP** connection for the design-to-code workflow — the local server (Figma desktop app) or the hosted Figma connector
- View/Dev access to the source Figma file you're implementing

## Quick start

```bash
# 1. Clone
git clone https://github.com/urem-desu/shadcn-skills-design-starter.git
cd shadcn-skills-design-starter

# 2. Install dependencies
npm install

# 3. Verify the shadcn project context (run before any code change)
npx shadcn@latest info --json

# 4. Start the dev server
npm run dev
```

Open <http://localhost:3000> and replace `app/page.tsx` with your first screen from Figma. Fonts (Inter / Geist Mono) and dark mode are already wired — no extra setup.

## How to use

### Is there a plugin / skill / command to install?

| Thing | What it is | Do you install it? |
| --- | --- | --- |
| **`shadcn-ui-design` skill** | The fidelity workflow in the parent kit `../.claude/skills/shadcn-ui-design/` (lean `SKILL.md` + `references/`) | **No** — it **auto-loads** for shadcn/Tailwind/Figma tasks. You don't call it. |
| **Figma MCP server** | Bridges Figma ↔ your agent (`get_design_context`, `get_screenshot`, `get_variable_defs`) | **Once** — [`.mcp.json`](./.mcp.json) pins the local Dev Mode server; enable it in the Figma desktop app (or use the hosted Figma connector). |
| **shadcn CLI** | `npx shadcn@latest …` — adds components, reports project context | No install — run via `npx` on demand |
| **Slash command** | — | **None ship in this repo.** You drive it with a normal prompt + a Figma link. |

### The core loop

1. **Open the project** in an Agent-Skill tool (Claude Code, Cursor, Copilot, …).
2. **Connect a Figma MCP server** and confirm view/Dev access to the file.
3. **Give the agent a Figma node + an instruction.** Paste the Figma URL (or select the node) and ask in plain language. The skill applies the 6-step workflow → installs missing components via the shadcn CLI → validates against the screenshot.
4. **Review** the inventory and result; answer any "stop and ask" questions.

### Example prompts

```text
Implement this Figma frame as a React component:
https://www.figma.com/design/<fileKey>/<file>?node-id=123-456

Build the login screen from the selected Figma node, 1:1, dark mode included.

Add the Button variants from this Figma page and wire them with shadcn.

Re-sync design tokens from the Figma kit and update globals.css + DESIGN.md.
```

You don't type a command or skill name — just describe the task and include the Figma reference. Under the hood the agent runs:

```bash
npx shadcn@latest info --json          # project context (always first)
# → get_design_context / get_screenshot / get_variable_defs   (Figma MCP)
# → writes an inventory, then the JSX
npx shadcn@latest add <component>      # only what the design needs
npm run dev                            # verify visually
```

### Tips

- **Let it run `npx shadcn@latest info --json` first** — wrong context = wrong imports.
- **Give the most specific node** (a component/frame, not a whole page) for accurate `get_variable_defs` — a page/canvas node is rejected.
- If Figma access fails, the agent runs `whoami` — share the file with that account.
- Want to change the look? Don't preset-swap — re-export the kit (see [Theming](#theming)).

## Project structure

```
.
├── app/
│   ├── globals.css             # ALL design tokens — Figma-synced (:root + .dark + @theme inline)
│   ├── layout.tsx              # next/font (Inter, Geist Mono) + ThemeProvider
│   └── page.tsx                # Replace with your first screen
├── components/
│   └── theme-provider.tsx      # "use client" wrapper around next-themes
├── lib/
│   └── utils.ts                # cn() class-merge helper
├── public/                     # Static assets
├── .mcp.json                   # Figma Dev Mode MCP server
├── AGENTS.md                   # Thin pointer for non-Claude agents
├── CLAUDE.md                   # Canonical agent operating manual
├── DESIGN.md                   # Design-system spec — single source of truth
├── components.json             # shadcn CLI config (aliases, base color, icon lib)
├── eslint.config.mjs           # ESLint flat config
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

> The fidelity skill lives in the **parent kit** at `../.claude/skills/shadcn-ui-design/`
> (`SKILL.md` + `references/`), not inside this starter.

> `components/ui/` and `hooks/` don't exist yet — the shadcn CLI creates them on the first `add`. Path alias: `@/*` → repo root.

## Design tokens

Three-tier model (full detail in [`DESIGN.md`](./DESIGN.md)):

```
Tier 1  Primitives   raw Tailwind-palette sRGB (neutral/900, blue/9, …)
Tier 2  Semantic     --primary, --background, …    (:root / .dark)
Tier 3  Utilities    bg-primary, text-muted-foreground   (@theme inline)
```

Components only ever touch **Tier 3**. The same three tiers exist as Figma collections, so Tier 2 names match 1:1 across design and code — `get_variable_defs` returns `primary`, you write `bg-primary`, no translation.

| Category | Source | Summary |
| --- | --- | --- |
| Color | kit `shadcn/ui` collection | 31 standard + 4 kit-specific tokens, exact sRGB, light + dark |
| Radius | kit static scale | `rounded-xs…4xl` = 2/4/6/8/12/16/24/32px; `--radius` = `0.5rem` |
| Typography | kit `font` collection + Tailwind v4 | full size/weight/tracking/leading scale + composite `Text-{size}/{Weight}` styles (§4.6); Inter / Geist Mono |
| Spacing | Tailwind v4 (`--spacing` 0.25rem) | every `p-/m-/gap-/size-*` = `n × 4px` |
| Shadow | Tailwind v4 defaults | the kit exports no shadow tokens — use the default scale |
| Border | Tailwind v4 = kit | `0 / 1 / 2 / 4 / 8` px, color from `--border` |

> **Rule:** values are kit-synced and verified 1:1 against the Figma export. Never hand-edit a value or substitute a color — re-export from Figma and regenerate. See [`DESIGN.md` §2](./DESIGN.md).

## Figma → Code workflow

Enforced by [`references/figma-workflow.md`](../.claude/skills/shadcn-ui-design/references/figma-workflow.md). The **Fidelity Contract**: no adding, no removing, no inferring, no polishing.

1. **`get_design_context`** — structured React + Tailwind + Code Connect for the node
2. **`get_screenshot`** — the visual source of truth
3. **`get_variable_defs`** — the design tokens used (by Figma variable name)
4. **Inventory** — write a literal list of everything in the node *before* any JSX
5. **Implement** against the inventory — reuse shadcn components, map tokens 1:1
6. **Validate** against the screenshot — walk the inventory item by item

**Stop and ask** (don't guess) when: a variable resolves to a value not in the tokens; a referenced component isn't installed/known; screenshot and context disagree; a behavioral state isn't shown; sample data is placeholder; copy is in an unshipped language. The full list is in the skill.

## Fonts

Fonts are **loaded via `next/font`** in `app/layout.tsx` and **data-driven from the Figma `familly/*` token** — not a fixed project default. This kit resolves to Inter (sans) / Geist Mono (mono):

| Variable | Resolves to | Figma token |
| --- | --- | --- |
| `--font-sans` | `var(--font-inter), ui-sans-serif, system-ui, sans-serif` | `familly/sans` = Inter |
| `--font-mono` | `var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace` | `familly/mono` = Geist Mono |

`layout.tsx` loads them and sets `--font-inter` / `--font-geist-mono` on `<html>`; `@theme inline` references those vars:

```tsx
// app/layout.tsx
import { Inter, Geist_Mono } from "next/font/google"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-inter" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
// <html className={`${fontSans.variable} ${fontMono.variable}`}>
```

For Thai projects, add a Thai sans (IBM Plex Sans Thai, Noto Sans Thai) as a second `next/font` family and extend the `--font-sans` stack. **If your Figma file uses different fonts, rewire `next/font` — don't hardcode.** See [`DESIGN.md` §4.1](./DESIGN.md).

## Theming

Tokens live in `app/globals.css` only (`:root` light, `.dark` dark), synced **1:1 from the Figma kit** (exact sRGB).

- **Re-theme** — re-export the Figma `shadcn/ui` collection and regenerate `globals.css`. **Do not** run `npx shadcn@latest apply --preset`; it overwrites kit-synced values and causes drift (see `DESIGN.md` §2.5).
- **One token** — edit `globals.css`, then update the matching Figma variable in the same change.
- **New custom token** — define under `:root` + `.dark`, register in `@theme inline`, add the variable to Figma (both modes). Use sRGB hex, not OKLCH (see `DESIGN.md` §10).

> Never create a new CSS file — always edit `globals.css`.

## Dark mode

Class-based via **`next-themes`** — already installed and wired. The provider lives in [`components/theme-provider.tsx`](./components/theme-provider.tsx) and is mounted in `app/layout.tsx` with `attribute="class"`. Semantic tokens auto-switch — **never** write `dark:` color overrides.

```tsx
// ✅ correct
<div className="bg-background text-foreground" />
// ❌ wrong
<div className="bg-white text-black dark:bg-gray-950 dark:text-white" />
```

To add a toggle, read/write the theme with `useTheme()` in a `"use client"` component:

```tsx
"use client"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme } = useTheme()
  return <button onClick={() => setTheme("dark")}>Dark</button>
}
```

## AI agent configuration

| File | Read by | Purpose |
| --- | --- | --- |
| `CLAUDE.md` | Claude Code | Canonical operating manual — rules, stack, structure, Figma + commands |
| `AGENTS.md` | Cursor, Copilot, other agents | Thin pointer that defers to `CLAUDE.md` + `DESIGN.md` |
| `.claude/skills/…/SKILL.md` | Any Agent-Skill tool | Lean skill entry; loads `references/` on demand |
| `DESIGN.md` | Humans + agents | Token reference + composition rules (source of truth for values) |

The skill triggers automatically when working with shadcn components, Tailwind classes, or Figma nodes — full instructions load into context only when needed.

## Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Start the dev server (<http://localhost:3000>) |
| `npm run build` | Production build (type-checks + lints) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`eslint .`) |
| `npm run lint:fix` | ESLint with `--fix` |
| `npx shadcn@latest info --json` | Inspect project context — **run before any code change** |
| `npx shadcn@latest search <q>` | Search the registry before building custom UI |
| `npx shadcn@latest add <name>` | Add a component (`--dry-run` / `--diff` to preview) |

## Git workflow

```
main   ← stable, mirrors what's shipped
  ▲ fast-forward / PR
dev    ← active work; commit here, then merge to main
```

Work on a branch, commit, push, then merge into `main`:

```bash
git checkout -b dev
# …changes…
git commit -m "…" && git push -u origin dev
git checkout main && git merge dev && git push origin main
```

## FAQ

**Will every developer/student produce the same result?**
The *visual output* converges tightly: tokens are fixed and kit-synced, and the skill forbids adding/removing/inferring/polishing — so colors, spacing, radius, and type are identical. The *code structure* (JSX shape, class order, which components are installed) varies, because LLM codegen isn't deterministic. Grade on **fidelity to Figma + rule adherence**, not byte-identical code.

**Why no example components?**
shadcn/ui components are source you own. Pre-bundling them rots; installing on demand keeps them current and matched to the design.

**Why sync from Figma instead of `apply --preset`?**
A preset overwrites token values with shadcn defaults, breaking the 1:1 match with the source design. The kit is the source of truth.

**Tokens look like raw hex, not OKLCH — is that intentional?**
Yes. Values are the kit's exact sRGB output so code is byte-identical to Figma. Convert to OKLCH only at high precision if you must.

## What this starter does NOT include

By design, to stay minimal — add when the design calls for it, not before:

- No example components or pages — install via `npx shadcn@latest add`
- No theme **toggle UI** — the `next-themes` provider is wired; add a `ModeToggle` when needed (see [Dark mode](#dark-mode))
- No authentication, routing helpers, or middleware
- No Storybook, testing setup, or CI config
- No `tailwind.config.ts` — Tailwind v4 uses `@theme inline` in `globals.css` only
- No license file — add one before distributing

## References

- [`DESIGN.md`](./DESIGN.md) — design-system spec (token source of truth)
- [`../.claude/skills/shadcn-ui-design/SKILL.md`](../.claude/skills/shadcn-ui-design/SKILL.md) — fidelity workflow
- shadcn/ui — [Theming](https://ui.shadcn.com/docs/theming) · [Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4) · [Figma](https://ui.shadcn.com/docs/figma)
- [Tailwind CSS v4 — Theme](https://tailwindcss.com/docs/theme)
- [Figma Dev Mode MCP server](https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/)
