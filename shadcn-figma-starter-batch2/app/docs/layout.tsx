import { DocsHeader } from "@/components/docs/docs-header"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        <DocsHeader sidebar />
        <main className="min-w-0 flex-1 px-4 py-8 md:px-10">
          <div className="mx-auto flex max-w-4xl flex-col gap-8">{children}</div>
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
