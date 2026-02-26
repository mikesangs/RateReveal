import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface StatCardProps {
  label: string
  value: string | ReactNode
  sublabel?: string
  icon?: ReactNode
  className?: string
  variant?: "default" | "success" | "warning" | "danger"
}

export function StatCard({
  label,
  value,
  sublabel,
  icon,
  className,
  variant = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-secondary">{label}</p>
        {icon && <div className="text-muted">{icon}</div>}
      </div>
      <p
        className={cn("mt-2 text-2xl font-semibold", {
          "text-foreground": variant === "default",
          "text-success": variant === "success",
          "text-warning": variant === "warning",
          "text-danger": variant === "danger",
        })}
      >
        {value}
      </p>
      {sublabel && <p className="mt-1 text-sm text-muted">{sublabel}</p>}
    </div>
  )
}
