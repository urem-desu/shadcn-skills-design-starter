import { describe, expect, it } from "vitest"

import {
  COLOR_GROUPS,
  colorTokens,
  colorTokensByGroup,
  paletteByRamp,
  tokenUtility,
} from "./design-tokens"

describe("tokenUtility", () => {
  it("maps the bare foreground token to a text utility", () => {
    expect(tokenUtility("foreground")).toBe("text-foreground")
  })

  it("maps any -foreground suffix to a text utility", () => {
    expect(tokenUtility("card-foreground")).toBe("text-card-foreground")
  })

  it("maps the bare border token to a border utility", () => {
    expect(tokenUtility("border")).toBe("border-border")
  })

  it("maps any -border suffix to a border utility", () => {
    expect(tokenUtility("sidebar-border")).toBe("border-sidebar-border")
  })

  it("maps the bare ring token to a ring utility", () => {
    expect(tokenUtility("ring")).toBe("ring-ring")
  })

  it("maps any -ring suffix to a ring utility", () => {
    expect(tokenUtility("sidebar-ring")).toBe("ring-sidebar-ring")
  })

  it("maps input to a border utility (form control fill)", () => {
    expect(tokenUtility("input")).toBe("border-input")
  })

  it("defaults to a bg utility for surface tokens", () => {
    expect(tokenUtility("primary")).toBe("bg-primary")
  })
})

describe("colorTokens", () => {
  it("enriches every token with group, purpose, and utility", () => {
    expect(colorTokens.length).toBeGreaterThan(0)
    for (const t of colorTokens) {
      expect(COLOR_GROUPS).toContain(t.group)
      expect(typeof t.purpose).toBe("string")
      expect(t.utility).toMatch(/^(bg|text|border|ring)-/)
    }
  })

  it("classifies a known token into its documented group", () => {
    const primary = colorTokens.find((t) => t.name === "primary")
    expect(primary?.group).toBe("Brand & intent")
  })
})

describe("colorTokensByGroup", () => {
  it("only includes groups that have at least one token", () => {
    expect(colorTokensByGroup.length).toBeGreaterThan(0)
    for (const g of colorTokensByGroup) {
      expect(g.tokens.length).toBeGreaterThan(0)
      expect(COLOR_GROUPS).toContain(g.group)
    }
  })

  it("partitions tokens without dropping any", () => {
    const grouped = colorTokensByGroup.reduce((n, g) => n + g.tokens.length, 0)
    const accounted = colorTokens.filter((t) => COLOR_GROUPS.includes(t.group)).length
    expect(grouped).toBe(accounted)
  })
})

describe("paletteByRamp", () => {
  it("groups palette colors by ramp in first-seen order with no empties", () => {
    expect(paletteByRamp.length).toBeGreaterThan(0)
    const seen = new Set<string>()
    for (const r of paletteByRamp) {
      expect(r.colors.length).toBeGreaterThan(0)
      expect(seen.has(r.ramp)).toBe(false)
      seen.add(r.ramp)
      for (const c of r.colors) expect(c.ramp).toBe(r.ramp)
    }
  })
})
