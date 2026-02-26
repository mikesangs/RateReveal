import type { AnalysisResult } from "@/lib/analysis-types"

// In-memory store for analyses (replaced with a database in production)
const store = new Map<string, AnalysisResult & { shareToken?: string }>()

export function saveAnalysis(id: string, result: AnalysisResult) {
  store.set(id, { ...result, analysisId: id })
}

export function getAnalysis(id: string): (AnalysisResult & { shareToken?: string }) | undefined {
  return store.get(id)
}

export function setShareToken(id: string, token: string): boolean {
  const analysis = store.get(id)
  if (!analysis) return false
  analysis.shareToken = token
  store.set(id, analysis)
  return true
}

export function getAnalysisByShareToken(
  id: string,
  token: string
): AnalysisResult | undefined {
  const analysis = store.get(id)
  if (!analysis) return undefined
  if (analysis.shareToken === token) return analysis
  return undefined
}
