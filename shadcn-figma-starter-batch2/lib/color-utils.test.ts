import { describe, expect, it } from "vitest"

import { formatColor } from "./color-utils"

describe("formatColor", () => {
  it("returns the hex unchanged for the hex format", () => {
    expect(formatColor("#3b82f6", "hex", "blue", "500")).toBe("#3b82f6")
  })

  describe("className format", () => {
    it("joins ramp and step", () => {
      expect(formatColor("#3b82f6", "className", "blue", "500")).toBe("blue-500")
    })

    it("returns the bare ramp when there is no step (black / white)", () => {
      expect(formatColor("#000000", "className", "black", null)).toBe("black")
    })
  })

  describe("rgb format", () => {
    it("converts hex to space-separated channels", () => {
      expect(formatColor("#3b82f6", "rgb", "blue", "500")).toBe("59 130 246")
    })

    it("parses uppercase hex", () => {
      expect(formatColor("#FFFFFF", "rgb", "white", null)).toBe("255 255 255")
    })
  })

  describe("hsl format", () => {
    it("converts a chromatic color", () => {
      // #3b82f6 ≈ hsl(217 91% 60%)
      expect(formatColor("#3b82f6", "hsl", "blue", "500")).toBe("217 91% 60%")
    })

    it("reports zero saturation for greys (achromatic branch)", () => {
      // #808080 → mid grey: hue and saturation collapse to 0
      expect(formatColor("#808080", "hsl", "neutral", "500")).toBe("0 0% 50%")
    })

    it("handles the green-dominant hue branch", () => {
      expect(formatColor("#00ff00", "hsl", "green", "500")).toBe("120 100% 50%")
    })

    it("handles the blue-dominant hue branch", () => {
      expect(formatColor("#0000ff", "hsl", "blue", "500")).toBe("240 100% 50%")
    })

    it("handles the red-dominant hue branch (gn >= bn, no wrap)", () => {
      expect(formatColor("#ff0000", "hsl", "red", "500")).toBe("0 100% 50%")
    })

    it("handles the red-dominant hue branch with the +6 wrap (gn < bn)", () => {
      // red is max but blue > green → the (gn < bn ? 6 : 0) wrap fires → hue near 360
      expect(formatColor("#ff0080", "hsl", "red", "500")).toBe("330 100% 50%")
    })
  })

  describe("oklch format", () => {
    it("converts white to near-1 lightness, ~0 chroma", () => {
      const out = formatColor("#ffffff", "oklch", "white", null)
      const [l, c] = out.split(" ")
      expect(Number(l)).toBeGreaterThan(0.98)
      expect(Number(c)).toBeLessThan(0.01)
    })

    it("produces three space-separated components for a chromatic color", () => {
      const out = formatColor("#3b82f6", "oklch", "blue", "500")
      expect(out.split(" ")).toHaveLength(3)
    })

    it("exercises the low-channel linearization branch (dark color)", () => {
      const out = formatColor("#020202", "oklch", "neutral", "950")
      expect(out.split(" ")).toHaveLength(3)
    })

    it("wraps a negative hue angle into 0–360 (blue → atan2 < 0, wrap branch)", () => {
      // Blue sits in the negative-b half of OKLab, so atan2 returns a negative
      // angle that the `if (H < 0) H += 360` branch must wrap. Hue lands ~264.
      const out = formatColor("#0000ff", "oklch", "blue", "500")
      const hue = Number(out.split(" ")[2])
      expect(hue).toBeGreaterThan(180)
      expect(hue).toBeLessThanOrEqual(360)
    })

    it("leaves a non-negative hue unwrapped (red → atan2 >= 0, no-wrap branch)", () => {
      // Red yields a small positive atan2 angle, so the `if (H < 0)` guard is
      // false and the hue passes through unchanged — covers the other branch.
      const out = formatColor("#ff0000", "oklch", "red", "500")
      const hue = Number(out.split(" ")[2])
      expect(hue).toBeGreaterThanOrEqual(0)
      expect(hue).toBeLessThan(180)
    })
  })

  describe("invalid input", () => {
    it("falls back to the raw hex when it cannot be parsed (rgb)", () => {
      expect(formatColor("not-a-hex", "rgb", "x", null)).toBe("not-a-hex")
    })

    it("falls back to the raw hex for an unknown format", () => {
      // @ts-expect-error — exercising the defensive default branch
      expect(formatColor("#3b82f6", "cmyk", "blue", "500")).toBe("#3b82f6")
    })
  })
})
