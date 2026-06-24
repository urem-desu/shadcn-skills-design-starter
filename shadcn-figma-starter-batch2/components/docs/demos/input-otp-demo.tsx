"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function DefaultOTP() {
  return (
    <InputOTP maxLength={6} aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

function PatternOTP() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

function SeparatorOTP() {
  return (
    <InputOTP maxLength={6} aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

function ControlledOTP() {
  const [value, setValue] = React.useState("")
  return (
    <div className="flex flex-col items-center gap-2">
      <InputOTP maxLength={6} value={value} onChange={setValue} aria-label="One-time password">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-muted-foreground text-sm">
        {value === "" ? "Enter your one-time password." : `You entered: ${value}`}
      </div>
    </div>
  )
}

function FormOTP() {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="otp-form">One-Time Password</Label>
        <InputOTP maxLength={6} id="otp-form">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-muted-foreground text-sm">
          Please enter the one-time password sent to your phone.
        </p>
      </div>
      <Button type="submit" className="w-fit">
        Submit
      </Button>
    </form>
  )
}

export function InputOTPDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <DefaultOTP />
      <Separator />
      <PatternOTP />
      <Separator />
      <SeparatorOTP />
      <Separator />
      <ControlledOTP />
      <Separator />
      <FormOTP />
    </div>
  )
}
