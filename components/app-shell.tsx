"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, FileSearch, Upload } from "lucide-react"

const navLinks = [
  { href: "/analyze", label: "Analyze Agreement", icon: FileSearch },
  { href: "/compare", label: "Compare Companies", icon: BarChart3 },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BarChart3 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                RateReveal
              </span>
            </Link>
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-surface-2 text-foreground"
                        : "text-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <Link
            href="/analyze"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Upload Agreement</span>
          </Link>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <BarChart3 className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">
              RateReveal
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/analyze"
              className="text-sm text-secondary transition-colors hover:text-foreground"
            >
              Analyze
            </Link>
            <Link
              href="/compare"
              className="text-sm text-secondary transition-colors hover:text-foreground"
            >
              Compare
            </Link>
          </div>
          <p className="text-sm text-muted">
            Not legal or financial advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
