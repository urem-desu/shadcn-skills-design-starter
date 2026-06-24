/**
 * Helper for per-story axe exceptions.
 *
 * The addon-a11y `config.rules` array is *replaced*, not merged, when a story
 * overrides it — so any story that disables a rule locally would otherwise lose
 * the global `color-contrast` exception set in `preview.tsx` (kit color tokens
 * are synced byte-for-byte from Figma and are immutable here; contrast is gated
 * at the token source, not in component code). This helper always re-includes
 * `color-contrast` so the global policy is preserved alongside the local rule.
 *
 * Usage in a story meta:
 *   parameters: { a11y: axeIgnore("aria-required-children") }
 */
export function axeIgnore(...ruleIds: string[]) {
  const ids = ["color-contrast", ...ruleIds]
  return {
    config: { rules: ids.map((id) => ({ id, enabled: false })) },
  }
}
