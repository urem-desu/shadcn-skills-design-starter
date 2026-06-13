---
name: shadcn-ui-design
description: Build and modify UI with shadcn/ui + Tailwind CSS v4 (Next.js / React), using the project's Figma-kit-synced design tokens and the shadcn CLI. Use this skill whenever the user mentions shadcn, components.json, a Figma file or frame, design tokens, theming, dark mode, or asks to add/install/wire up/build any UI component, page, or layout. Especially use it when translating a Figma node to React — the skill enforces a strict inventory-first workflow so the implementation matches Figma exactly with no inferred extras, no inferred missing parts.
---

# shadcn/ui + Tailwind v4 + Figma — building UI with strict fidelity

This skill's job: build correct, consistent UI with **shadcn/ui + Tailwind CSS v4**, using the
project's design tokens and the shadcn CLI — and when a Figma node is given, match it exactly.
No extras, no shortcuts, no "polish" the design didn't ask for.

The four pillars:
1. **Project context** — read the project before writing code (§1).
2. **Default build path** — search → install → compose → verify (§2).
3. **Critical Rules** — non-negotiable shadcn patterns (§3 + [`references/critical-rules.md`](references/critical-rules.md)).
4. **Strict Figma fidelity** — when a Figma node is given, inventory it and match it ([`references/figma-workflow.md`](references/figma-workflow.md)).

Read [`DESIGN.md`](../../../shadcn-figma-starter-batch2/DESIGN.md) — the starter project root —
before any change. It defines the
tokens — synced 1:1 from the Figma export `lazyyysync-variables-v1` (sRGB hex, aliased to the
Tailwind palette) — and project-specific overrides. When `DESIGN.md` and the official shadcn
defaults disagree, `DESIGN.md` wins.

## Reference files (load on demand)

| When you're… | Read |
| --- | --- |
| Translating a Figma node to code | [`references/figma-workflow.md`](references/figma-workflow.md) — fidelity contract, 6-step workflow, variable alignment, when to ask |
| Writing or reviewing any component | [`references/critical-rules.md`](references/critical-rules.md) — full styling / forms / composition / icons tables |
| Adding/changing tokens, theming, radius, fonts | [`references/tokens.md`](references/tokens.md) — theming, custom tokens, re-theme rules |

---

## 1. Read project context first

Before any command or code change:

```bash
npx shadcn@latest info --json
```

Use these fields:

| Field | Why it matters |
| --- | --- |
| `packageManager` | Use the right runner: `npx`, `pnpm dlx`, or `bunx --bun` |
| `framework` | next, vite, laravel, react-router, astro, tanstack-start |
| `style` | Visual treatment (`new-york` here) |
| `base` | `radix` or `base` — affects API (`asChild` vs `render`) |
| `isRSC` | When `true`, components with `useState`, `useEffect`, event handlers, or browser APIs need `"use client"` at the top |
| `tailwindVersion` | `v4` uses `@theme inline`; `v3` uses `tailwind.config.js` |
| `tailwindCssFile` | Path to global CSS — **edit this file, never create a new one** |
| `iconLibrary` | `lucide` here — imports must match |
| `aliases` | Where `components`, `lib`, `hooks`, `ui` live |
| `components[]` | Already installed — don't re-add |

Substitute the project's `packageManager` for every `npx shadcn@latest` example.

---

## 2. Building UI — the default path

Most work starts from a written request or a reference, not a Figma node. The loop:

1. **Search the registry** before writing custom UI (§ CLI below).
2. **Install what's missing** via the CLI — never hand-write `components/ui/*`.
3. **Compose** using built-in variants and semantic tokens ([`references/critical-rules.md`](references/critical-rules.md)).
4. **Lay out** with `gap-*` and `size-*`; conditional classes via `cn()`.
5. **Verify** in the dev server (`npm run dev`) and against the request.

Default to the project's existing components and tokens. If a request needs a color, radius, or
spacing value the tokens don't cover, prefer adding a token ([`references/tokens.md`](references/tokens.md))
over a one-off raw value. When a Figma node *is* provided, switch to
[`references/figma-workflow.md`](references/figma-workflow.md).

### shadcn CLI

```bash
npx shadcn@latest search <query>          # check official + community registries first
npx shadcn@latest add button card dialog  # install one or more
npx shadcn@latest add @magicui/shimmer-button   # from a community registry
npx shadcn@latest add button --dry-run     # preview all affected files
npx shadcn@latest add button --diff        # see the diff before overwriting
```

After install: read the added files, confirm paths match the project's aliases, and for
**third-party registries** rewrite any hardcoded `@/components/ui/...` imports that don't match
the project's `ui` alias. Always `--diff` / `--dry-run` before overwriting components you've
modified.

---

## 3. Critical Rules — the essentials

Full tables (forms, composition, icons, variants) in
[`references/critical-rules.md`](references/critical-rules.md). The non-negotiables:

| Rule | Correct | Wrong |
| --- | --- | --- |
| Semantic tokens only | `bg-primary text-primary-foreground` | `bg-blue-500 text-white` |
| `gap-*` for spacing | `flex flex-col gap-4` | `space-y-4` |
| `size-*` for equal dimensions | `size-10` | `w-10 h-10` |
| No manual dark overrides | `bg-background` | `bg-white dark:bg-gray-950` |
| `cn()` for conditional classes | `cn("flex", isActive && "bg-primary")` | ternary in a template string |
| CLI for components | `npx shadcn@latest add button` | hand-written `components/ui/*` |
| Status colors via Badge/tokens | `<Badge variant="secondary">+20%</Badge>` | `text-emerald-600` |

When unsure — a token doesn't cover a value, a Figma variable doesn't resolve, the screenshot
and context disagree — **stop and ask**. The full list of ask-first situations is in
[`references/figma-workflow.md`](references/figma-workflow.md).

---

## 4. References

- shadcn/ui official skill: <https://github.com/shadcn-ui/ui/tree/main/skills/shadcn>
- shadcn/ui theming docs: <https://ui.shadcn.com/docs/theming>
- shadcn/ui Tailwind v4 docs: <https://ui.shadcn.com/docs/tailwind-v4>
- shadcn/ui Figma kits: <https://ui.shadcn.com/docs/figma>
- Figma Dev Mode MCP server: <https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/>
