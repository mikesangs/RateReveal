import type { Metadata } from "next"
import { CompanyRankings } from "@/components/compare/company-rankings"

export const metadata: Metadata = {
  title: "Compare Companies - RateReveal",
  description:
    "Compare factoring companies by advertised rates, recourse type, and more.",
}

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Company Rankings
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-secondary">
          Advertised rate is from public marketing/quote pages. True rate
          depends on fees &amp; contract terms.
        </p>
      </div>
      <CompanyRankings />
    </div>
  )
}
