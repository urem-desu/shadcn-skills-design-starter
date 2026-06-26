import { DocsHeader } from "@/components/docs/docs-header"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <DocsSidebar />
      <SidebarInset>
        <DocsHeader sidebar />
        <main id="main-content" className="min-w-0 flex-1 px-4 py-8 md:px-10">
          <div className="mx-auto flex max-w-4xl flex-col gap-8">{children}</div>
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
