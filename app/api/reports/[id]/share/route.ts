import { getAnalysis, setShareToken } from "@/lib/analysis-store"

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const analysis = getAnalysis(id)

  if (!analysis) {
    return Response.json({ error: "Analysis not found" }, { status: 404 })
  }

  // If already has a share token, return it
  if (analysis.shareToken) {
    return Response.json({
      shareUrl: `/reports/${id}?token=${analysis.shareToken}`,
    })
  }

  // Generate new token
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 16)
  setShareToken(id, token)

  return Response.json({
    shareUrl: `/reports/${id}?token=${token}`,
  })
}
