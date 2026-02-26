import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type ButtonHTMLAttributes } from "react"

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    { className, variant = "default", size = "default", asChild, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground hover:bg-primary-hover":
              variant === "default",
            "border border-border bg-transparent text-foreground hover:bg-surface-2":
              variant === "outline",
            "bg-transparent text-secondary hover:text-foreground hover:bg-surface-2":
              variant === "ghost",
          },
          {
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-5 text-sm": size === "default",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }
