import Link from "next/link"
import type { Company } from "@/lib/companies"
import { Badge } from "@/components/ui/badge"
import { PrimaryButton } from "@/components/ui/primary-button"
import {
  ExternalLink,
  ArrowLeft,
  FileSearch,
  AlertTriangle,
  FileText,
  Clock,
  DollarSign,
  ShieldAlert,
  Percent,
} from "lucide-react"

const recourseBadgeVariant: Record<string, "recourse" | "non-recourse" | "mixed" | "default"> = {
  recourse: "recourse",
  "non-recourse": "non-recourse",
  mixed: "mixed",
  varies: "default",
}

const watchItems = [
  {
    icon: <DollarSign className="h-4 w-4 text-warning" />,
    title: "Wire & ACH Fees",
    description: "Some companies charge $10-$30+ per wire or fuel card transfer.",
  },
  {
    icon: <Percent className="h-4 w-4 text-danger" />,
    title: "Reserve Holdbacks",
    description: "5-10% of invoice value held in reserve until debtor pays.",
  },
  {
    icon: <Clock className="h-4 w-4 text-primary" />,
    title: "Time-Based Rate Tiers",
    description: "Rates may increase if the debtor takes longer than 30 days to pay.",
  },
  {
    icon: <FileText className="h-4 w-4 text-secondary" />,
    title: "Monthly Minimums",
    description: "Some contracts require a minimum volume or charge a supplemental fee.",
  },
  {
    icon: <ShieldAlert className="h-4 w-4 text-danger" />,
    title: "Early Termination Penalties",
    description: "Auto-renew clauses and liquidated damages can lock you in.",
  },
  {
    icon: <AlertTriangle className="h-4 w-4 text-warning" />,
    title: "Misdirected Payment Penalties",
    description: "Fees if debtors pay you directly instead of the factor.",
  },
]

export function CompanyDetail({ company }: { company: Company }) {
  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/compare"
        className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to rankings
      </Link>

      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {company.name}
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <Badge
                variant={
                  recourseBadgeVariant[company.recourse_type] ?? "default"
                }
              >
                {company.recourse_type}
              </Badge>
              <span className="text-sm text-secondary">
                Last verified:{" "}
                {new Date(company.last_verified_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <PrimaryButton asChild>
            <Link href={`/analyze?company=${company.slug}`}>
              <FileSearch className="h-4 w-4" />
              Compare to my contract
            </Link>
          </PrimaryButton>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <p className="text-xs font-medium text-muted">Advertised Rate</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {company.advertised_rate_text}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <p className="text-xs font-medium text-muted">Rate Type</p>
            <p className="mt-1 text-lg font-semibold text-foreground capitalize">
              {company.rate_type.replace(/_/g, " ")}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-surface-2 p-4">
          <p className="text-xs font-medium text-muted">Notes</p>
          <p className="mt-1 text-sm leading-relaxed text-secondary">
            {company.notes}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium text-muted">Source Links</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {company.source_urls.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/10"
              >
                {new URL(url).hostname.replace("www.", "")}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-foreground">
          What to watch for
        </h2>
        <p className="mt-1 text-sm text-secondary">
          Common hidden costs in factoring agreements that can increase your
          effective rate.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {watchItems.map((item) => (
            <div
              key={item.title}
              className="flex gap-3 rounded-lg border border-border bg-surface-2 p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-secondary">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
