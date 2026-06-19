"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

function PaymentField() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <FieldSet>
        <FieldLegend>Payment Method</FieldLegend>
        <FieldDescription>
          All transactions are secure and encrypted
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-card-name">Name on Card</FieldLabel>
            <Input id="field-card-name" placeholder="Evil Rabbit" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-card-number">Card Number</FieldLabel>
            <Input id="field-card-number" placeholder="1234 1234 1234 1234" />
            <FieldDescription>Enter your 16-digit number.</FieldDescription>
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="field-exp-month">Month</FieldLabel>
              <Select>
                <SelectTrigger id="field-exp-month">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SelectItem key={i} value={`${i + 1}`}>
                      {String(i + 1).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="field-exp-year">Year</FieldLabel>
              <Select>
                <SelectTrigger id="field-exp-year">
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SelectItem key={i} value={`${2025 + i}`}>
                      {2025 + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="field-cvv">CVV</FieldLabel>
              <Input id="field-cvv" placeholder="123" />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <Field>
        <FieldLabel htmlFor="field-same-shipping">Billing Address</FieldLabel>
        <FieldDescription>
          The billing address associated with your payment method
        </FieldDescription>
        <Field orientation="horizontal">
          <Checkbox id="field-same-shipping" defaultChecked />
          <FieldLabel htmlFor="field-same-shipping" className="font-normal">
            Same as shipping address
          </FieldLabel>
        </Field>
      </Field>
      <FieldSeparator />
      <Field>
        <FieldLabel htmlFor="field-comments">Comments</FieldLabel>
        <Textarea id="field-comments" placeholder="Add any additional comments" />
      </Field>
      <Field orientation="horizontal">
        <Button type="submit">Submit</Button>
        <Button variant="outline">Cancel</Button>
      </Field>
    </div>
  )
}

function InputField() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field>
        <FieldLabel htmlFor="field-username">Username</FieldLabel>
        <Input id="field-username" placeholder="Max Leiter" />
        <FieldDescription>
          Choose a unique username for your account.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-password">Password</FieldLabel>
        <Input id="field-password" type="password" defaultValue="password" />
        <FieldDescription>Must be at least 8 characters long.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}

function TextareaField() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel htmlFor="field-feedback">Feedback</FieldLabel>
      <Textarea id="field-feedback" placeholder="Your feedback helps us improve..." />
      <FieldDescription>Share your thoughts about our service.</FieldDescription>
    </Field>
  )
}

function SelectField() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel htmlFor="field-department">Department</FieldLabel>
      <Select>
        <SelectTrigger id="field-department">
          <SelectValue placeholder="Choose department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="engineering">Engineering</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
        </SelectContent>
      </Select>
      <FieldDescription>Select your department or area of work.</FieldDescription>
    </Field>
  )
}

function SliderField() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel htmlFor="field-price">Price Range</FieldLabel>
      <Slider
        id="field-price"
        defaultValue={[200, 800]}
        min={0}
        max={1000}
        step={10}
      />
      <FieldDescription>Set your budget range ($200 - 800).</FieldDescription>
    </Field>
  )
}

function FieldsetField() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Address Information</FieldLegend>
      <FieldDescription>We need your address to deliver your order.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-street">Street Address</FieldLabel>
          <Input id="field-street" placeholder="123 Main St" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="field-city">City</FieldLabel>
            <Input id="field-city" placeholder="New York" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-postal">Postal Code</FieldLabel>
            <Input id="field-postal" placeholder="90502" />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
}

function CheckboxField() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Show these items on the desktop</FieldLegend>
      <FieldDescription>
        Select the items you want to show on the desktop.
      </FieldDescription>
      <FieldGroup data-slot="checkbox-group">
        <Field orientation="horizontal">
          <Checkbox id="field-hard-disks" defaultChecked />
          <FieldLabel htmlFor="field-hard-disks" className="font-normal">
            Hard disks
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="field-external-disks" />
          <FieldLabel htmlFor="field-external-disks" className="font-normal">
            External disks
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="field-cds" />
          <FieldLabel htmlFor="field-cds" className="font-normal">
            CDs, DVDs, and iPods
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="field-servers" />
          <FieldLabel htmlFor="field-servers" className="font-normal">
            Connected servers
          </FieldLabel>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Checkbox id="field-sync" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="field-sync">
              Sync Desktop &amp; Documents folders
            </FieldLabel>
            <FieldDescription>
              Your Desktop &amp; Documents folders are being synced with iCloud
              Drive. You can access them from other devices.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}

function RadioField() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Subscription Plan</FieldLegend>
      <FieldDescription>
        Yearly and lifetime plans offer significant savings.
      </FieldDescription>
      <RadioGroup defaultValue="monthly">
        <Field orientation="horizontal">
          <RadioGroupItem value="monthly" id="field-plan-monthly" />
          <FieldLabel htmlFor="field-plan-monthly" className="font-normal">
            Monthly ($9.99/month)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="yearly" id="field-plan-yearly" />
          <FieldLabel htmlFor="field-plan-yearly" className="font-normal">
            Yearly ($99.99/year)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="lifetime" id="field-plan-lifetime" />
          <FieldLabel htmlFor="field-plan-lifetime" className="font-normal">
            Lifetime ($299.99)
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  )
}

function SwitchField() {
  return (
    <Field orientation="horizontal" className="w-full max-w-md">
      <FieldContent>
        <FieldLabel htmlFor="field-mfa">Multi-factor authentication</FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication. If you do not have a two-factor
          device, you can use a one-time code sent to your email.
        </FieldDescription>
      </FieldContent>
      <Switch id="field-mfa" defaultChecked />
    </Field>
  )
}

function ChoiceCardField() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Compute Environment</FieldLegend>
      <FieldDescription>
        Select the compute environment for your cluster.
      </FieldDescription>
      <RadioGroup defaultValue="kubernetes">
        <FieldLabel htmlFor="field-env-k8s">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Kubernetes</FieldTitle>
              <FieldDescription>
                Run GPU workloads on a K8s configured cluster. This is the
                default.
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem value="kubernetes" id="field-env-k8s" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="field-env-vm">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Virtual Machine</FieldTitle>
              <FieldDescription>
                Access a VM configured cluster to run workloads. (Coming soon)
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem value="vm" id="field-env-vm" />
          </Field>
        </FieldLabel>
      </RadioGroup>
    </FieldSet>
  )
}

function FieldGroupField() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field>
        <FieldTitle>Responses</FieldTitle>
        <FieldDescription>
          Get notified when ChatGPT responds to requests that take time, like
          research or image generation.
        </FieldDescription>
        <Field orientation="horizontal">
          <Checkbox id="field-responses-push" defaultChecked disabled />
          <FieldLabel htmlFor="field-responses-push" className="font-normal">
            Push notifications
          </FieldLabel>
        </Field>
      </Field>
      <FieldSeparator />
      <Field>
        <div className="flex items-center justify-between gap-2">
          <FieldTitle>Tasks</FieldTitle>
          <a href="#" className="text-sm underline underline-offset-4">
            Manage tasks
          </a>
        </div>
        <FieldDescription>
          Get notified when tasks you&apos;ve created have updates.
        </FieldDescription>
        <Field orientation="horizontal">
          <Checkbox id="field-tasks-push" />
          <FieldLabel htmlFor="field-tasks-push" className="font-normal">
            Push notifications
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="field-tasks-email" />
          <FieldLabel htmlFor="field-tasks-email" className="font-normal">
            Email notifications
          </FieldLabel>
        </Field>
      </Field>
    </FieldGroup>
  )
}

function ResponsiveLayoutField() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>Fill in your profile information.</FieldDescription>
      <FieldGroup>
        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel htmlFor="field-name">Name</FieldLabel>
            <FieldDescription>
              Provide your full name for identification
            </FieldDescription>
          </FieldContent>
          <Input id="field-name" placeholder="Evil Rabbit" />
        </Field>
        <FieldSeparator />
        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel htmlFor="field-message">Message</FieldLabel>
            <FieldDescription>
              You can write your message here. Keep it short, preferably under
              100 characters.
            </FieldDescription>
          </FieldContent>
          <Textarea id="field-message" placeholder="Hello, world!" />
        </Field>
      </FieldGroup>
      <Field orientation="horizontal">
        <Button type="submit">Submit</Button>
        <Button variant="outline">Cancel</Button>
      </Field>
    </FieldSet>
  )
}

export function FieldDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <PaymentField />
      <Separator />
      <InputField />
      <Separator />
      <TextareaField />
      <Separator />
      <SelectField />
      <Separator />
      <SliderField />
      <Separator />
      <FieldsetField />
      <Separator />
      <CheckboxField />
      <Separator />
      <RadioField />
      <Separator />
      <SwitchField />
      <Separator />
      <ChoiceCardField />
      <Separator />
      <FieldGroupField />
      <Separator />
      <ResponsiveLayoutField />
    </div>
  )
}
