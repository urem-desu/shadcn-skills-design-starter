"use client"

import * as React from "react"

/**
 * Renders children only after the component has mounted on the client.
 * Use for subtrees whose markup is locale/timezone dependent (e.g. react-day-picker's
 * `data-day` uses `toLocaleDateString()`), which otherwise causes SSR hydration mismatches.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return <>{mounted ? children : fallback}</>
}
