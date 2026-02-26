import type { Metadata } from "next"
import { AnalyzeFlow } from "@/components/analyze/analyze-flow"

export const metadata: Metadata = {
  title: "Analyze Agreement - RateReveal",
  description:
    "Upload your factoring agreement to uncover hidden fees and calculate your true rate.",
}

export default function AnalyzePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <AnalyzeFlow />
    </div>
  )
}
