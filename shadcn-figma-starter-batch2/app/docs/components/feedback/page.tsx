import type { Metadata } from "next"
import { FolderOpen, Terminal, TriangleAlert } from "lucide-react"
import { PageHeader } from "@/components/docs/page-header"
import { Showcase } from "@/components/docs/showcase"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ToastDemo } from "@/components/docs/demos/toast-demo"

export const metadata: Metadata = { title: "Feedback & Status" }

export default function FeedbackPage() {
  return (
    <>
      <PageHeader eyebrow="Components" title="Feedback & Status" description="Communicating state — alerts, progress, loading placeholders, toasts and empty states." />

      <Showcase name="Alert" source="components/ui/alert.tsx" tokens={["card", "card-foreground", "destructive"]}>
        <div className="flex w-full max-w-xl flex-col gap-4">
          <Alert>
            <Terminal />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </Alert>
        </div>
      </Showcase>

      <Showcase name="Progress" source="components/ui/progress.tsx" tokens={["primary", "muted"]}>
        <Progress value={60} className="w-full max-w-sm" />
      </Showcase>

      <Showcase name="Skeleton" source="components/ui/skeleton.tsx" tokens={["muted", "accent"]}>
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[160px]" />
          </div>
        </div>
      </Showcase>

      <Showcase name="Spinner" source="components/ui/spinner.tsx" tokens={["muted-foreground", "primary"]}>
        <Spinner className="size-6" />
        <Button disabled><Spinner />Loading…</Button>
      </Showcase>

      <Showcase name="Sonner" source="components/ui/sonner.tsx" tokens={["popover", "popover-foreground", "border"]}>
        <ToastDemo />
      </Showcase>

      <Showcase name="Empty" source="components/ui/empty.tsx" tokens={["muted", "muted-foreground", "border"]}>
        <Empty className="w-full max-w-sm rounded-lg border">
          <EmptyHeader>
            <EmptyMedia variant="icon"><FolderOpen /></EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>Create your first project to get started.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button size="sm">Create project</Button></EmptyContent>
        </Empty>
      </Showcase>
    </>
  )
}
