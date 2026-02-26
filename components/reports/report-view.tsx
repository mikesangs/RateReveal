"use client"

import useSWR from "swr"
import { useSearchParams } from "next/navigation"
import type { AnalysisResult } from "@/lib/analysis-types"
import { StatCard } from "@/components/ui/stat-card"
import { Badge } from "@/components/ui/badge"
import { PrimaryButton } from "@/components/ui/primary-button"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Loader2,
  AlertTriangle,
  Share2,
  TrendingUp,
  DollarSign,
  Building2,
  FileText,
  Copy,
  Check,
} from "lucide-react"
import { useCallback, useState } from "react"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface ReportViewProps {
  reportId: string
}

export function ReportView({ reportId }: ReportViewProps) {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const url = token
    ? `/api/reports/${reportId}?token=${token}`
    : `/api/reports/${reportId}`

  const { data, error, isLoading } = useSWR<AnalysisResult>(url, fetcher)
  const [copied, setCopied] = useState(false)
  const [sharing, setSharing] = useState(false)

  const handleShare = useCallback(async () => {
    setSharing(true)
    try {
      const res = await fetch(`/api/reports/${reportId}/share`, {
        method: "POST",
      })
      const result = await res.json()
      if (result.shareUrl) {
        const fullUrl = window.location.origin + result.shareUrl
        await navigator.clipboard.writeText(fullUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // ignore
    } finally {
      setSharing(false)
    }
  }, [reportId])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-surface p-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-secondary">Loading report...</p>
      </div>
    )
  }

  if (error || !data || data.error) {
    return (
      <EmptyState
        icon={<FileText className="h-8 w-8" />}
        title="Report not found"
        description="This report may have expired or the link may be invalid."
        action={
          <PrimaryButton asChild>
            <Link href="/analyze">Analyze New Agreement</Link>
          </PrimaryButton>
        }
      />
    )
  }

  const result = data
  const truePct = result.estimatedTrueRatePercent ?? 0
  const basePct = result.baseRate?.percent ?? 0
  const delta = truePct - basePct

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Analysis Report
          </h1>
          <p className="mt-1 text-sm text-muted">
            Report ID: {reportId.slice(0, 8)}...
          </p>
        </div>
        <div className="flex gap-2">
          <PrimaryButton
            variant="outline"
            size="sm"
            onClick={handleShare}
            disabled={sharing}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                Share
              </>
            )}
          </PrimaryButton>
          <PrimaryButton size="sm" asChild>
            <Link href="/analyze">New Analysis</Link>
          </PrimaryButton>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Detected Company"
          value={result.detectedCompany?.name ?? "Unknown"}
          sublabel={
            result.detectedCompany
              ? `${(result.detectedCompany.confidence * 100).toFixed(0)}% confidence`
              : undefined
          }
          icon={<Building2 className="h-5 w-5" />}
        />
        <StatCard
          label="Advertised Rate"
          value={result.advertisedRateText ?? result.baseRate?.text ?? "N/A"}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          label="Estimated True Rate"
          value={`${truePct.toFixed(2)}%`}
          variant={delta > 1 ? "danger" : delta > 0.3 ? "warning" : "success"}
          sublabel={
            delta > 0
              ? `+${delta.toFixed(2)}% above base rate`
              : undefined
          }
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* True vs Advertised card */}
      {result.advertisedRateText && basePct > 0 && (
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-sm font-semibold text-foreground">
            True vs Advertised Rate
          </h3>
          <div className="mt-4 flex items-end gap-6">
            <div>
              <p className="text-xs text-muted">Advertised</p>
              <p className="text-2xl font-bold text-foreground">
                {basePct.toFixed(2)}%
              </p>
            </div>
            <div className="pb-1 text-muted">vs</div>
            <div>
              <p className="text-xs text-muted">True Rate</p>
              <p className="text-2xl font-bold text-danger">
                {truePct.toFixed(2)}%
              </p>
            </div>
            {delta > 0 && (
              <div className="rounded-md bg-danger/10 px-3 py-1.5">
                <p className="text-sm font-semibold text-danger">
                  +{delta.toFixed(2)}% hidden costs
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fee items table */}
      {result.feeItems && result.feeItems.length > 0 && (
        <div className="rounded-xl border border-border bg-surface">
          <div className="border-b border-border px-6 py-4">
            <h3 className="text-sm font-semibold text-foreground">
              Itemized Hidden Fees
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                    Fee
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                    Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                    Trigger
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                    Evidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.feeItems.map((fee, i) => (
                  <tr
                    key={i}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-6 py-3 font-medium text-foreground">
                      {fee.name}
                    </td>
                    <td className="px-6 py-3">
                      <Badge>{fee.type}</Badge>
                    </td>
                    <td className="px-6 py-3 text-foreground">
                      {fee.amount.percent != null
                        ? `${fee.amount.percent}%`
                        : fee.amount.flat_usd != null
                          ? `$${fee.amount.flat_usd.toFixed(2)}`
                          : "Varies"}
                    </td>
                    <td className="max-w-xs px-6 py-3 text-secondary">
                      {fee.trigger}
                    </td>
                    <td className="max-w-xs px-6 py-3">
                      <p className="text-xs italic text-muted">
                        {`"${fee.evidence.snippet}"`}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {fee.evidence.location}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rate breakdown */}
      {result.estimatedTrueRateBreakdown &&
        result.estimatedTrueRateBreakdown.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-sm font-semibold text-foreground">
              Rate Breakdown
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {result.estimatedTrueRateBreakdown.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.component}
                    </p>
                    <p className="text-xs text-secondary">
                      {item.explanation}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {item.percent_of_invoice.toFixed(3)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Term & Exit */}
      {result.termAndExit && result.termAndExit.length > 0 && (
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-sm font-semibold text-foreground">
            Term &amp; Exit
          </h3>
          <div className="mt-4 flex flex-col gap-3">
            {result.termAndExit.map((term, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-surface-2 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {term.name}
                    </p>
                    <p className="mt-0.5 text-sm text-secondary">
                      {term.value}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs italic text-muted">
                  {`"${term.evidence.snippet}"`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {result.warnings && result.warnings.length > 0 && (
        <div className="rounded-xl border border-warning/20 bg-warning/5 p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="text-sm font-semibold text-warning">Warnings</h3>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {result.warnings.map((w, i) => (
              <li key={i} className="text-sm text-secondary">
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      {result.summary && (
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-sm font-semibold text-foreground">Summary</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            {result.summary}
          </p>
        </div>
      )}
    </div>
  )
}
