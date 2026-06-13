// @ts-check
/**
 * Figma REST API → export JSON.
 *
 * Pulls local variables straight from the Figma file over the REST API and
 * writes a `variables-export.json` in the SAME shape the Figma plugin emits, so
 * `scripts/generate-tokens.mjs` consumes it unchanged. This replaces the manual
 * "export from the plugin" step — run `npm run tokens:sync` to fetch + generate.
 *
 *   GET https://api.figma.com/v1/files/:fileKey/variables/local
 *
 * Requires (set in `.env.local`):
 *   FIGMA_PERSONAL_ACCESS_TOKEN   token with `file_variables:read` scope
 *   FIGMA_FILE_KEY                file key (default: the project file)
 * Optional:
 *   FIGMA_EXPORT                  output path (default: <root>/figma/variables-export.json)
 *   FIGMA_EXPORT_FORMAT           `format` string written into the JSON
 *                                 (default mirrors the current plugin export)
 *
 * NOTE: the Variables REST API is a Figma **Enterprise** feature. On lower
 * plans the endpoint returns 403 — use the plugin export + `npm run tokens`.
 */
import { writeFileSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

// ─── env ────────────────────────────────────────────────────────────────────
// Load .env.local then .env (later wins for unset keys only — loadEnvFile does
// not overwrite already-set vars, so real shell env still takes precedence).
for (const f of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(resolve(ROOT, f))
  } catch {
    /* file absent — fine */
  }
}

const TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN
const FILE_KEY = process.env.FIGMA_FILE_KEY ?? "UOQqHNISgc7bbc8yWt8Vj8"
const FORMAT = process.env.FIGMA_EXPORT_FORMAT ?? "lazyyysync-variables-v1"
const OUT_PATH =
  process.env.FIGMA_EXPORT ?? resolve(ROOT, "figma/variables-export.json")

if (!TOKEN) {
  console.error("✗ FIGMA_PERSONAL_ACCESS_TOKEN is not set.")
  console.error("  Copy .env.example → .env.local and paste your token (figd_…).")
  console.error("  Create one at: Figma → Settings → Security → Personal access")
  console.error("  tokens, with the `file_variables:read` scope.")
  process.exit(1)
}

// ─── fetch ──────────────────────────────────────────────────────────────────

const url = `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`
console.log(`→ GET ${url}`)

const res = await fetch(url, { headers: { "X-Figma-Token": TOKEN } })
if (!res.ok) {
  const body = await res.text().catch(() => "")
  console.error(`✗ Figma API ${res.status} ${res.statusText}`)
  if (res.status === 403)
    console.error(
      "  403 → the Variables REST API requires a Figma Enterprise plan, or the\n" +
        "  token lacks `file_variables:read`, or the file isn't shared with you."
    )
  if (res.status === 404)
    console.error(`  404 → file key "${FILE_KEY}" not found or no access.`)
  if (body) console.error(`  ${body.slice(0, 500)}`)
  process.exit(1)
}

/** @type {any} */
const json = await res.json()
const variablesById = json?.meta?.variables ?? {}
const collectionsById = json?.meta?.variableCollections ?? {}

if (!Object.keys(variablesById).length) {
  console.error("✗ Response contained no variables. Nothing to write.")
  process.exit(1)
}

// ─── transform → plugin-export shape ──────────────────────────────────────────
// Plugin shape (per variable):
//   { name, collectionName, resolvedType,
//     valuesByMode: { [modeName]: { value, alias } } }
// where `value` is the CONCRETE value (aliases followed to a leaf) and `alias`
// is the immediate alias target's name (or null). Colors are {r,g,b,a} in 0..1.

/** Follow an alias chain to its concrete leaf value, staying mode-aware. */
function resolveConcrete(rawValue, modeName, seen = new Set()) {
  let cur = rawValue
  while (cur && cur.type === "VARIABLE_ALIAS") {
    if (seen.has(cur.id)) return null // cycle guard
    seen.add(cur.id)
    const target = variablesById[cur.id]
    if (!target) return null
    const col = collectionsById[target.variableCollectionId]
    const modeId =
      col?.modes?.find((m) => m.name === modeName)?.modeId ?? col?.defaultModeId
    cur = target.valuesByMode?.[modeId]
  }
  return cur ?? null
}

const variables = Object.values(variablesById).map((v) => {
  const col = collectionsById[v.variableCollectionId]
  const modeName = Object.fromEntries(
    (col?.modes ?? []).map((m) => [m.modeId, m.name])
  )
  /** @type {Record<string, { value: any; alias: string | null }>} */
  const valuesByMode = {}
  for (const [modeId, raw] of Object.entries(v.valuesByMode ?? {})) {
    const name = modeName[modeId] ?? modeId
    const alias =
      raw && raw.type === "VARIABLE_ALIAS"
        ? (variablesById[raw.id]?.name ?? null)
        : null
    valuesByMode[name] = { value: resolveConcrete(raw, name), alias }
  }
  return {
    name: v.name,
    collectionName: col?.name ?? "(unknown)",
    resolvedType: v.resolvedType,
    valuesByMode,
  }
})

const out = { format: FORMAT, variables }

mkdirSync(dirname(OUT_PATH), { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(out, null, 2))

const collections = new Set(variables.map((v) => v.collectionName))
console.log(`✓ Wrote ${OUT_PATH.replace(ROOT + "/", "")}`)
console.log(
  `  variables=${variables.length} collections=${collections.size} ` +
    `(${[...collections].join(", ")})`
)
console.log(`\nNext: npm run tokens   (or use npm run tokens:sync to do both)`)
