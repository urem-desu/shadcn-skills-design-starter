"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import type { TooltipValueType } from "recharts"

import { cn } from "@/lib/utils"

/**
 * Chart - token-driven data-viz container. Thin layer over Recharts.
 * The kit owns the responsive viewport and the floating tooltip/legend chrome;
 * Recharts owns axes, scales, and rendering. The categorical palette lives in
 * theme.css as --chart-1 … --chart-5 (genuine component seams: Recharts paints
 * SVG and needs stable CSS vars to consume via fill/stroke).
 */

const THEMES = { light: "", dark: "[data-theme='dark']" } as const

const INITIAL_DIMENSION = { width: 320, height: 200 } as const
type TooltipNameType = number | string

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

type ChartContextProps = { config: ChartConfig }
const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const ctx = React.useContext(ChartContext)
  if (!ctx) throw new Error("useChart must be used within a <ChartContainer />")
  return ctx
}

function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
  initialDimension?: { width: number; height: number }
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        role="img"
        className={cn(
          // viewport + base typography
          "flex aspect-video justify-center text-[length:var(--font-size-xs)]",
          // Recharts paint hooks - map default Recharts strokes/fills to our tokens
          "[&_.recharts-cartesian-axis-tick_text]:fill-[var(--text-secondary)]",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[var(--border-default)]/50", // ds-allow-hardcode (Recharts default value we match to override)
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-[var(--border-default)]",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent", // ds-allow-hardcode (Recharts default value we match to override)
          "[&_.recharts-layer]:outline-hidden",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-[var(--border-default)]", // ds-allow-hardcode (Recharts default value we match to override)
          "[&_.recharts-radial-bar-background-sector]:fill-[var(--surface-sunken)]",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--surface-sunken)]",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-[var(--border-default)]", // ds-allow-hardcode (Recharts default value we match to override)
          "[&_.recharts-sector]:outline-hidden",
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent", // ds-allow-hardcode (Recharts default value we match to override)
          "[&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer initialDimension={initialDimension}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, c]) => c.theme ?? c.color
  )
  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<TooltipValueType, TooltipNameType>,
    "accessibilityLayer"
  >) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null
    const [item] = payload
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-[var(--font-weight-medium)]", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }
    if (!value) return null
    return (
      <div className={cn("font-[var(--font-weight-medium)]", labelClassName)}>
        {value}
      </div>
    )
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

  if (!active || !payload?.length) return null

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "grid min-w-[8rem] items-start gap-[var(--space-1-5)]",
        "rounded-[var(--radius-lg)] border border-[var(--border-default)]/50",
        "bg-[var(--surface-card)] text-[var(--text-primary)]",
        "px-[var(--space-2-5)] py-[var(--space-1-5)] text-[length:var(--font-size-xs)]",
        "shadow-[var(--shadow-lg)]",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-[var(--space-1-5)]">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color ?? item.payload?.fill ?? item.color

            return (
              <div
                key={index}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-[var(--space-2)]",
                  "[&>svg]:size-[var(--icon-xs)] [&>svg]:text-[var(--text-secondary)]",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[var(--radius-sm)] border-(--color-border) bg-(--color-bg)",
                            {
                              "size-[var(--space-2-5)]": indicator === "dot",
                              "w-[var(--space-1)]": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent": // ds-allow-hardcode: 1.5px is the shadcn dashed-indicator stroke; no border-width token for this value
                                indicator === "dashed",
                              "my-[var(--space-0-5)]":
                                nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-[var(--space-1-5)]">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-[var(--text-secondary)]">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="font-mono font-[var(--font-weight-medium)] text-[var(--text-primary)] tabular-nums">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean
  nameKey?: string
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart()
  if (!payload?.length) return null

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-[var(--space-4)]",
        verticalAlign === "top" ? "pb-[var(--space-3)]" : "pt-[var(--space-3)]",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-[var(--space-1-5)]",
                "[&>svg]:size-[var(--icon-xs)] [&>svg]:text-[var(--text-secondary)]"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="size-[var(--space-2)] shrink-0 rounded-[var(--radius-sm)]"
                  style={{ backgroundColor: item.color }}
                />
              )}
              <span className="text-[var(--text-primary)]">
                {itemConfig?.label}
              </span>
            </div>
          )
        })}
    </div>
  )
}

// Extract item config from a Recharts payload (item or item.payload may carry the key).
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) return undefined
  const payloadPayload =
    "payload" in payload &&
    typeof (payload as { payload?: unknown }).payload === "object" &&
    (payload as { payload?: unknown }).payload !== null
      ? (payload as { payload: Record<string, unknown> }).payload
      : undefined

  let configLabelKey: string = key
  if (
    key in (payload as Record<string, unknown>) &&
    typeof (payload as Record<string, unknown>)[key] === "string"
  ) {
    configLabelKey = (payload as Record<string, string>)[key]
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
