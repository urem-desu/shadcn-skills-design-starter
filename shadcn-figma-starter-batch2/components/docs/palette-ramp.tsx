import { Swatch } from "@/components/docs/swatch"
import { CopyButton } from "@/components/docs/copy-button"
import type { PaletteColor } from "@/lib/design-tokens"

/** One Tier-1 ramp (e.g. "blue") as a labelled row of primitive swatches. */
export function PaletteRamp({ ramp, colors }: { ramp: string; colors: PaletteColor[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="font-mono text-sm font-semibold capitalize text-foreground">{ramp}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {colors.map((c) => (
          <div key={c.name} className="flex flex-col gap-1.5">
            <Swatch color={c.hex} title={`${c.name} · ${c.hex}`} className="aspect-square w-full" />
            <div className="flex items-center justify-between gap-1">
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-mono text-xs text-foreground">
                  {c.step ?? c.name}
                </span>
                <span className="truncate font-mono text-[0.6875rem] text-muted-foreground">
                  {c.hex}
                </span>
              </div>
              <CopyButton value={c.hex} label={`Copy ${c.name}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
