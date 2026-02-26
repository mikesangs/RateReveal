"use client"

import { cn } from "@/lib/utils"

interface CompanyFiltersProps {
  recourseFilter: string
  onRecourseFilterChange: (value: string) => void
}

const recourseOptions = [
  { value: "all", label: "All Types" },
  { value: "recourse", label: "Recourse" },
  { value: "non-recourse", label: "Non-Recourse" },
  { value: "mixed", label: "Mixed" },
]

export function CompanyFilters({
  recourseFilter,
  onRecourseFilterChange,
}: CompanyFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">Recourse Type</span>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
          {recourseOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onRecourseFilterChange(opt.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                recourseFilter === opt.value
                  ? "bg-surface-2 text-foreground"
                  : "text-muted hover:text-secondary"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
