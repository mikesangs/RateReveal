"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { companies, type Company } from "@/lib/companies"
import { Badge } from "@/components/ui/badge"
import { DataTable, type Column } from "@/components/ui/data-table"
import { CompanyFilters } from "@/components/compare/company-filters"
import { ExternalLink, ChevronRight } from "lucide-react"

const recourseBadgeVariant: Record<string, "recourse" | "non-recourse" | "mixed" | "default"> = {
  recourse: "recourse",
  "non-recourse": "non-recourse",
  mixed: "mixed",
  varies: "default",
}

export function CompanyRankings() {
  const [recourseFilter, setRecourseFilter] = useState<string>("all")

  const filtered = useMemo(() => {
    if (recourseFilter === "all") return companies
    return companies.filter((c) => c.recourse_type === recourseFilter)
  }, [recourseFilter])

  const columns: Column<Company>[] = [
    {
      key: "name",
      header: "Company",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-foreground">{row.name}</span>
      ),
    },
    {
      key: "recourse_type",
      header: "Recourse Type",
      sortable: true,
      render: (row) => (
        <Badge variant={recourseBadgeVariant[row.recourse_type] ?? "default"}>
          {row.recourse_type}
        </Badge>
      ),
    },
    {
      key: "advertised_rate_text",
      header: "Advertised Rate",
      sortable: true,
      render: (row) => (
        <span className="text-secondary">{row.advertised_rate_text}</span>
      ),
    },
    {
      key: "notes",
      header: "Notes",
      className: "max-w-xs",
      render: (row) => (
        <span className="text-sm text-secondary">{row.notes}</span>
      ),
    },
    {
      key: "source_urls",
      header: "Sources",
      render: (row) => (
        <div className="flex flex-wrap gap-1.5">
          {row.source_urls.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Link <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      ),
    },
    {
      key: "details",
      header: "",
      render: (row) => (
        <Link
          href={`/companies/${row.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Details <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <CompanyFilters
        recourseFilter={recourseFilter}
        onRecourseFilterChange={setRecourseFilter}
      />
      <DataTable
        columns={columns}
        data={filtered as unknown as Record<string, unknown>[]}
        keyExtractor={(row) => row.slug as string}
      />
    </div>
  )
}
