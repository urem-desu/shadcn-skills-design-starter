/** Convert hex to { r, g, b } (0–255). */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}

export type ColorFormat = "className" | "hex" | "rgb" | "hsl" | "oklch"

export function formatColor(
  hex: string,
  format: ColorFormat,
  ramp: string,
  step: string | null,
): string {
  if (format === "hex") return hex

  if (format === "className") {
    if (!step) return ramp // black / white
    return `${ramp}-${step}`
  }

  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  if (format === "rgb") {
    return `${rgb.r} ${rgb.g} ${rgb.b}`
  }

  if (format === "hsl") {
    return rgbToHslString(rgb.r, rgb.g, rgb.b)
  }

  if (format === "oklch") {
    return rgbToOklchString(rgb.r, rgb.g, rgb.b)
  }

  return hex
}

// ─── HSL ──────────────────────────────────────────────────────────────────────

function rgbToHslString(r: number, g: number, b: number): string {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  let h = 0, s = 0
  const l = (max + min) / 2

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1))
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
    else if (max === gn) h = ((bn - rn) / d + 2) / 6
    else h = ((rn - gn) / d + 4) / 6
  }

  const hDeg = Math.round(h * 360)
  const sPct = Math.round(s * 100)
  const lPct = Math.round(l * 100)
  return `${hDeg} ${sPct}% ${lPct}%`
}

// ─── OKLCH ────────────────────────────────────────────────────────────────────

function linearize(c: number): number {
  const n = c / 255
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4)
}

function rgbToOklchString(r: number, g: number, b: number): string {
  const lr = linearize(r), lg = linearize(g), lb = linearize(b)

  // Linear sRGB → XYZ-D65
  const X = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb
  const Y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb
  const Z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb

  // XYZ → LMS (Oklab M1)
  const l = 0.8189330101 * X + 0.3618667424 * Y - 0.1288597137 * Z
  const m = 0.0329845436 * X + 0.9293118715 * Y + 0.0361456387 * Z
  const s = 0.0482003018 * X + 0.2643662691 * Y + 0.6338517070 * Z

  // Cube root
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s)

  // LMS → OKLab (M2)
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const bk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

  // OKLab → OKLCH
  const C = Math.sqrt(a * a + bk * bk)
  let H = Math.atan2(bk, a) * (180 / Math.PI)
  if (H < 0) H += 360

  return `${L.toFixed(2)} ${C.toFixed(2)} ${Math.round(H)}`
}
