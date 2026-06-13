# AI Agent Instructions

Entry point for any AI agent working in this repo (Claude Code, Cursor, Codex, GitHub Copilot,
Windsurf). The rules live in two files — read them, don't duplicate them here.

## Read in this order

1. **[`CLAUDE.md`](./CLAUDE.md)** — the canonical rules, stack, and commands (single source of truth)
2. **[`DESIGN.md`](./DESIGN.md)** — design system spec (tokens, naming, composition, Next.js integration)
3. **[`../.claude/skills/shadcn-ui-design/SKILL.md`](../.claude/skills/shadcn-ui-design/SKILL.md)** — the build workflow; loads its `references/` (Figma workflow, critical rules, tokens) on demand

## Stack (one-liner)

Next.js 15 (App Router, RSC) · TypeScript · React 19 · Tailwind CSS v4 (**sRGB** tokens, `@theme inline`) · shadcn/ui (CLI-driven) · Figma Dev Mode MCP.

## Before any code change

```bash
npx shadcn@latest info --json
```

Everything else — the hard rules, the Figma fidelity contract, commands — is in `CLAUDE.md` and
the skill. If guidance here ever conflicts with `CLAUDE.md`, `CLAUDE.md` wins.
