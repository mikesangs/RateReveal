"use client"

import { PrimaryButton } from "@/components/ui/primary-button"
import { ArrowLeft, Loader2, Send } from "lucide-react"
import type { Assumptions } from "@/lib/analysis-types"

interface AssumptionsStepProps {
  assumptions: Assumptions
  onChange: (a: Assumptions) => void
  onBack: () => void
  onSubmit: () => void
  isLoading: boolean
}

export function AssumptionsStep({
  assumptions,
  onChange,
  onBack,
  onSubmit,
  isLoading,
}: AssumptionsStepProps) {
  function update<K extends keyof Assumptions>(key: K, value: Assumptions[K]) {
    onChange({ ...assumptions, [key]: value })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Analysis Assumptions
        </h2>
        <p className="mt-1 text-sm text-secondary">
          These values help us estimate your true effective rate. Adjust to
          match your typical operations.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">
              Average Invoice Amount ($)
            </span>
            <input
              type="number"
              min={1}
              value={assumptions.invoice_amount}
              onChange={(e) => update("invoice_amount", Number(e.target.value))}
              className="h-10 rounded-lg border border-border bg-surface-2 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">
              Avg Days to Pay
            </span>
            <input
              type="number"
              min={1}
              value={assumptions.avg_days_to_pay}
              onChange={(e) => update("avg_days_to_pay", Number(e.target.value))}
              className="h-10 rounded-lg border border-border bg-surface-2 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">
              Invoices per Month
            </span>
            <input
              type="number"
              min={1}
              value={assumptions.invoices_per_month}
              onChange={(e) =>
                update("invoices_per_month", Number(e.target.value))
              }
              className="h-10 rounded-lg border border-border bg-surface-2 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">
              Payout Method
            </span>
            <select
              value={assumptions.payout_method}
              onChange={(e) =>
                update(
                  "payout_method",
                  e.target.value as Assumptions["payout_method"]
                )
              }
              className="h-10 rounded-lg border border-border bg-surface-2 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
            >
              <option value="ACH">ACH</option>
              <option value="wire">Wire</option>
              <option value="fuelcard">Fuel Card</option>
            </select>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <PrimaryButton variant="ghost" onClick={onBack} disabled={isLoading}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </PrimaryButton>
        <PrimaryButton onClick={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Analyze Agreement
            </>
          )}
        </PrimaryButton>
      </div>
    </div>
  )
}
