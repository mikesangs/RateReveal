import { Search, TrendingUp, BarChart3 } from "lucide-react"
import type { ReactNode } from "react"

interface Feature {
  icon: ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Search className="h-5 w-5 text-primary" />,
    title: "Hidden Fee Breakdown",
    description:
      "Every fee is extracted and itemized with evidence: wire fees, minimums, reserves, penalties, and more.",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-warning" />,
    title: "True Rate vs Advertised",
    description:
      "See the effective rate you actually pay compared to the rate the company advertises.",
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-success" />,
    title: "Compare Companies",
    description:
      "Browse 13+ factoring companies with advertised rates, recourse types, and source links.",
  },
]

export function FeatureCards() {
  return (
    <div className="mt-20 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
      {features.map((f) => (
        <div
          key={f.title}
          className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-6"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2">
            {f.icon}
          </div>
          <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
          <p className="text-sm leading-relaxed text-secondary">
            {f.description}
          </p>
        </div>
      ))}
    </div>
  )
}
