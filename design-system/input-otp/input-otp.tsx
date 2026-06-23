"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Input OTP — accessible one-time password input built on the `input-otp`
 * library (native `<input>` under the hood, WCAG-compliant, copy-paste aware).
 * Each slot is a styled character box sharing the field token layer. Separator
 * uses a dash icon. One seam: --otp-slot-size (bare px, no scale token at 40
 * that also applies specifically to square OTP boxes).
 */
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-[var(--space-2)] has-[input:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex size-[var(--otp-slot-size)] items-center justify-center",
        "border-y border-r border-[var(--field-border)]",
        "text-[length:var(--font-size-base)] font-[var(--font-weight-medium)]",
        "text-[var(--text-primary)] transition-all",
        "first:rounded-l-[var(--field-radius)] first:border-l",
        "last:rounded-r-[var(--field-radius)]",
        isActive && "z-10 border-[var(--field-border-focus)] shadow-[var(--field-focus-ring)] ring-1 ring-[var(--border-focus)]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[var(--space-4)] w-px animate-caret-blink bg-[var(--text-primary)] duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" aria-hidden="true" {...props}>
    <Minus className="size-[var(--icon-sm)] text-[var(--text-tertiary)]" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
