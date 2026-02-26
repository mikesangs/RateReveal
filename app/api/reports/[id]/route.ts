import { getAnalysis, getAnalysisByShareToken } from "@/lib/analysis-store"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const url = new URL(req.url)
  const token = url.searchParams.get("token")

  // Try direct access first (same session)
  let analysis = getAnalysis(id)

  // If not found directly or requires token for shared access
  if (!analysis && token) {
    analysis = getAnalysisByShareToken(id, token) ?? undefined
  }

  if (!analysis) {
    return Response.json({ error: "Report not found" }, { status: 404 })
  }

  return Response.json(analysis)
}
