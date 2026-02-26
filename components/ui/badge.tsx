import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "recourse" | "non-recourse" | "mixed" | "success" | "warning" | "danger"
  className?: string
}

const variantStyles: Record<string, string> = {
  default: "bg-surface-2 text-secondary border-border",
  recourse: "bg-warning/10 text-warning border-warning/20",
  "non-recourse": "bg-success/10 text-success border-success/20",
  mixed: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-danger/10 text-danger border-danger/20",
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        variantStyles[variant] ?? variantStyles.default,
        className
      )}
    >
      {children}
    </span>
  )
}
