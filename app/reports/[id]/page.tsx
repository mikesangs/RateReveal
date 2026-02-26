import type { Metadata } from "next"
import { ReportView } from "@/components/reports/report-view"

export const metadata: Metadata = {
  title: "Analysis Report - RateReveal",
  description: "View your factoring agreement analysis report.",
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <ReportView reportId={id} />
    </div>
  )
}
