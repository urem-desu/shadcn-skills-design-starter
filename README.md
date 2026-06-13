<div align="center">

# UX/UI Agent Skills

### A production-grade design-system engine for Claude Code

Turn a request into accessible, token-driven, framework-ready UI — verified by real gates, not by claims.

[![WCAG](https://img.shields.io/badge/WCAG-2.2_AA-2ea44f)](accessibility/wcag-checklist.md)
[![Tokens](https://img.shields.io/badge/tokens-DTCG_3--tier-2563EB)](tokens/)
[![Skills](https://img.shields.io/badge/skills-18-7c3aed)](.claude/skills/)
[![Frameworks](https://img.shields.io/badge/frameworks-19_targets-0891b2)](frameworks/)
[![Design systems](https://img.shields.io/badge/design_systems-138-db2777)](design-systems/library/)
[![Zero emoji](https://img.shields.io/badge/emoji-zero_(enforced)-334155)](scripts/check_no_emoji.py)

</div>

---

## What this is

This repository is a **design architect in a box** — a layered system of instructions, design
tokens, component specs, framework adapters, and verification scripts that lets Claude Code
produce UI to a senior-designer quality bar.

It is opinionated on purpose. Every output is grounded in three things:

- **Design tokens** — a 3-tier DTCG system (primitive to semantic to component). Nothing is hardcoded.
- **Accessibility** — WCAG 2.2 AA is the floor, not the goal. POUR is checked, not assumed.
- **Verifiable correctness** — claims like "contrast passes" come from a gate that actually ran, never from memory.

The guiding doctrine lives in [`CLAUDE.md`](CLAUDE.md) — it is loaded into the agent every
session and overrides default behavior.

```
            REQUEST                                    VERIFIED UI
               |                                            ^
               v                                            |
       ┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
       │  Router       │ -> │  Skill    │ -> │  Compose  │ -> │  Gates    │
       │ (CLAUDE.md)   │    │ (/name)   │    │ tokens +  │    │ run, fix, │
       │ match intent  │    │ workflow  │    │ a11y +    │    │ re-run    │
       │ -> load files │    │ steps     │    │ taste     │    │ until 100%│
       └──────────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## Core principles

1. **Decision framework** — when designs conflict, priority is fixed:
   `User needs > Accessibility > Consistency > Aesthetics > Developer experience`.
   Taste serves aesthetics only; it never overrides accessibility or consistency.
2. **Anti-slop doctrine** — every output must beat the statistical defaults that make UI look
   machine-generated (see [`taste/design-taste.md`](taste/design-taste.md)).
3. **Run gates, never claim** — build *with* the gates from the start; report the real `N/N`
   output. If a gate has not run, the honest answer is "not verified yet."
4. **Zero emoji, anywhere** — emoji are the number-one tell of generated slop. Icons are lucide
   SVG or plain words. Enforced by [`scripts/check_no_emoji.py`](scripts/check_no_emoji.py).
5. **Single-theme consistency** — every page renders from one shared token layer, so a 50-screen
   product stays visually identical and is themeable from one place.

---

## Quick start

```bash
# Install as a dependency (skills + tokens + scripts ship in the package)
npm i ux-ui-agent-skills

# The scripts are Node + Python. Verify the toolchain:
node --version      # gate scripts use headless Chromium via puppeteer
python3 --version   # token / contrast / spec validators
```

Then, in Claude Code, just describe what you want — the router in `CLAUDE.md` picks the right
skill — or invoke a skill explicitly with a slash command:

```
/brandkit          fintech brand, trustworthy blue, light + dark
/design-component  combobox with async search, loading + empty states
/design-code       that combobox in React + Tailwind
/redesign          make this landing page feel premium, keep the markup working
/a11y-audit        check this screen against WCAG 2.2 AA
```

---

## The skills

Eighteen runnable skills, invocable as `/name`. They compose — almost every build pulls
tokens + components + accessibility, and often taste.

### Foundations

| Skill | What it does |
|-------|--------------|
| [`design-tokens`](.claude/skills/design-tokens/) | Generate / extend / audit DTCG tokens (color, type, spacing, shadow, motion, theming) |
| [`brandkit`](.claude/skills/brandkit/) | A complete, accessible brand foundation from a brief — primitives to component tokens, light + dark |
| [`token-build`](.claude/skills/token-build/) | Compile `tokens/*.json` to CSS vars / Tailwind / iOS / Android / Compose |

### Design and build

| Skill | What it does |
|-------|--------------|
| [`design-component`](.claude/skills/design-component/) | Spec a component to the house bar — anatomy, variants, sizes, 8 states, a11y |
| [`design-code`](.claude/skills/design-code/) | Production code for **any** framework, token-driven and accessible |
| [`shadcn-ui-design`](.claude/skills/shadcn-ui-design/) | Build shadcn/ui + Tailwind v4 UI from Figma-synced tokens, strict fidelity |
| [`apply-aesthetic`](.claude/skills/apply-aesthetic/) | Apply an archetype or one of 138 named systems by resolving it into tokens |
| [`image-to-code`](.claude/skills/image-to-code/) | Reference image to token-driven, accessible code |
| [`prototype`](.claude/skills/prototype/) | Move up the fidelity ladder: content to wireframe to hi-fi to code |

### Review and quality

| Skill | What it does |
|-------|--------------|
| [`design-review`](.claude/skills/design-review/) | Score a UI across 6 weighted dimensions + Nielsen heuristics + findings table |
| [`a11y-audit`](.claude/skills/a11y-audit/) | WCAG 2.2 AA/AAA audit with criterion references and concrete fixes |
| [`design-qa`](.claude/skills/design-qa/) | Stand up the automated + manual gates that stop quality regressing |
| [`redesign`](.claude/skills/redesign/) | Upgrade an existing UI to premium quality without breaking it |
| [`performance`](.claude/skills/performance/) | Optimize for Core Web Vitals (LCP, INP, CLS) |
| [`ux-writing`](.claude/skills/ux-writing/) | Write / review UI copy with the voice + tone system |

### System operations

| Skill | What it does |
|-------|--------------|
| [`figma-integration`](.claude/skills/figma-integration/) | Sync tokens and components between code and Figma Variables |
| [`migrate-design-system`](.claude/skills/migrate-design-system/) | Map to / from Material, HIG, Fluent, Carbon, shadcn, Radix, and more |
| [`governance`](.claude/skills/governance/) | SemVer, contribution flow, deprecation policy, change comms |

---

## Workflows in detail

Below are the most common end-to-end flows. Each one composes several layers and ends at a
green gate — that is the definition of done.

### 1. Build a single component, end to end

```
/design-component  ->  /design-code  ->  gates
```

1. **Spec** (`design-component`) — read [`components/`](components/) for the closest existing
   pattern and [`accessibility/aria-patterns.md`](accessibility/aria-patterns.md) for the ARIA
   model. Produce anatomy, the variants table, sizes, and the **8 states**
   (default, hover, focus, active, disabled, loading, error, selected).
2. **Map to tokens** — every color, size, space, and motion value traces to a token in
   [`tokens/`](tokens/). No raw hex / px / ms.
3. **Generate code** (`design-code`) — read
   [`frameworks/adapter-protocol.md`](frameworks/adapter-protocol.md), load the concrete
   adapter, and emit a complete, typed, accessible component.
4. **Verify** — run the one-command gate (below) and fix until it reports `N/N`. Then render the
   harness, screenshot every state, and click each control to confirm the state actually changed.

### 2. Create a brand from scratch

```
/brandkit  ->  /token-build  ->  /design-qa
```

1. **`brandkit`** turns a brief (industry, personality, primary hue) into the full 3-tier token
   set — light + dark — using OKLCH for perceptually even shade scales, then verifies WCAG on
   every required text / action pair.
2. **`token-build`** compiles the tokens into platform artifacts (CSS variables, Tailwind
   `@theme`, iOS Asset Catalog, Android, Compose) so design and every platform read one source.
3. **`design-qa`** wires the CI gates so drift, a contrast regression, or an off-theme color
   cannot merge.

### 3. Match a reference image or screenshot

```
/image-to-code  ->  measure_render  ->  taste_audit
```

1. **`image-to-code`** infers the implied design system from the reference — palette, type
   scale, spacing rhythm, radius, layout archetype — and maps it onto the 3-tier tokens.
2. It rebuilds the UI from those tokens (not pixel-tracing), then measures the real rendered
   result against the reference and re-checks contrast.

### 4. Redesign an existing UI

```
/redesign  ->  /design-review  ->  surgical edits  ->  gates
```

1. **`redesign`** audits the current UI first, naming the generic / AI tells and the heuristic
   violations.
2. It applies taste and system rules **surgically** — preserving working markup and behavior —
   then re-runs accessibility and the render gates so nothing regresses.

### The double diamond, applied

All of the above sit inside the same design-thinking loop. Diverge before you converge; validate
at every fidelity level.

```
   DISCOVER        DEFINE         DEVELOP         DELIVER
   research   ->   the problem -> explore many -> ship + verify
   the need        + constraints  solutions       at the gate
      \             /     \            /
       \  diverge  /       \ converge /
        \---------/         \--------/
```

---

## Verification gates

The kit proves **objective correctness** — token consistency, accessibility, no drift. It does
not auto-prove subjective taste; pair that with `taste_audit.mjs` and human review.

### The one command

```bash
node scripts/accuracy_report.mjs        # all-or-nothing: prints the real N/N line
```

It runs, in light **and** dark: token validation, contrast, spec checks, no-hardcode lint,
theme-reference resolution, no-emoji, a real headless-render WCAG pass, and state-aware contrast
(default / hover / focus).

### The individual gates

| Gate | What it checks |
|------|----------------|
| `validate_tokens.py` | DTCG structure; every alias resolves |
| `validate_contrast.py` | Batch WCAG over required token pairs, light + dark |
| `contrast.py` | A single foreground / background ratio |
| `lint_hardcodes.py` | No raw hex / px / ms / off-palette colors in component code |
| `validate_theme_refs.py` | Every `var(--...)` resolves to the theme |
| `check_no_emoji.py` | No emoji in UI, taste docs, or the instruction surface |
| `measure_render.mjs` | True computed-style contrast in a headless browser |
| `verify_states.mjs` | Contrast for every element in default / hover / focus |
| `axe_audit.mjs` | axe-core WCAG 2.2 A/AA: ARIA, labels, landmarks, roles |
| `verify_focustrap.mjs` | Modal traps focus, Escape closes, focus returns |
| `verify_rtl.mjs` | No logical-property breakage when mirrored |
| `verify_responsive.mjs` | No horizontal overflow at 280 / 320 / 414px |
| `taste_audit.mjs` | Render-based taste signal: type scale, repetition, measure, palette |
| `validate_component_spec.py` | Spec completeness (states, a11y, token mapping) |

> Rule of thumb: if you are about to type a quality number, a gate must have just produced it.
> If you are about to say a component "looks right", you must have screenshotted and clicked it.

---

## Framework support

`design-code` targets **any** framework through a universal translation contract
([`frameworks/adapter-protocol.md`](frameworks/adapter-protocol.md)). Three full reference
adapters plus sixteen concise ones ship in the box; if a target has no file, an adapter is
generated on demand from the protocol.

| Tier | Targets |
|------|---------|
| Full reference | React + Tailwind, Next.js 15, SwiftUI 6 |
| Web | Vue, Svelte, Angular, Solid, Qwik, Astro, Web Components (Lit), vanilla CSS, CSS-in-JS |
| Component libraries | MUI, Mantine, Chakra, Bootstrap |
| Native / cross-platform | React Native, Flutter, Jetpack Compose |

Every adapter resolves the same five things: token resolution, the component contract
(variants / sizes / 8 states / a11y), styling strategy, theming + dark mode, and motion.

---

## Token system

Three tiers. Components never touch raw values; dark mode swaps at the **semantic** layer.

```
┌─────────────────────────────────────────────────────┐
│ COMPONENT   button-bg-primary -> {semantic.action…}  │  used in code
├─────────────────────────────────────────────────────┤
│ SEMANTIC    action.primary    -> {primitive.blue.600}│  used in design
├─────────────────────────────────────────────────────┤
│ PRIMITIVE   blue.600          -> #2563EB             │  never referenced directly
└─────────────────────────────────────────────────────┘
```

Fourteen token files cover color, typography, spacing, shadows, borders, breakpoints, motion,
gradients, opacity, blur, sizing, states, theming, and data-viz. See [`tokens/`](tokens/).

---

## Project structure

```
.
├── CLAUDE.md              # The doctrine — loaded into the agent every session
├── tokens/               # 14 DTCG token files (source of truth)
├── taste/                # Anti-slop doctrine, 138 aesthetic systems, motion grammar
├── design-systems/       # Interop crosswalk + 138 brand-grade system specs
├── components/           # 11 spec files: atoms -> molecules -> organisms -> templates
├── accessibility/        # WCAG checklist, ARIA patterns, cognitive, i18n-RTL, vision, AAA
├── workflows/            # 9 process docs: review, QA, governance, token-build, perf...
├── frameworks/           # adapter-protocol + 3 full adapters + 16 concise adapters
├── content/              # Voice + tone, UX writing
├── scripts/              # 19 validators + render gates (Node + Python)
├── .claude/skills/       # 18 runnable skills (invoke via /name)
└── shadcn-figma-starter-batch2/   # Companion starter: Figma -> shadcn/ui + Tailwind v4
```

---

## Design systems library

138 brand-grade specs under [`design-systems/library/`](design-systems/library/) — including
`apple`, `linear-app`, `stripe`, `vercel`, `notion`, `material`, `shadcn`, `spotify`, and
`tesla`. Apply any of them with `/apply-aesthetic`, which resolves the named look into the token
system and re-checks contrast afterward.

---

## Companion starter

[`shadcn-figma-starter-batch2/`](shadcn-figma-starter-batch2/) is a self-contained Next.js 15 +
React 19 + Tailwind v4 + shadcn/ui project that turns Figma designs into production React with
1:1 token fidelity. Its build skill (`shadcn-ui-design`) lives in this kit's `.claude/skills/`
and auto-loads for shadcn / Tailwind / Figma work.

```bash
cd shadcn-figma-starter-batch2
npm run dev      # http://localhost:3000
```

---

## Contributing

The system evolves under [`workflows/governance.md`](workflows/governance.md): SemVer for tokens
and components, a candidate-to-core promotion path, and a deprecation policy with migration maps.
Any new file is wired into the `CLAUDE.md` File Reference Map and the router, and must pass the
gates before it lands. Wire the same checks into CI by running
[`scripts/accuracy_report.mjs`](scripts/accuracy_report.mjs) (or the individual validators) on
every push and PR.

---

<div align="center">

Built to beat the defaults. Verified, not asserted.

</div>
