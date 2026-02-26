import { generateText } from "ai"
import { findCompanyByName } from "@/lib/companies"
import { saveAnalysis } from "@/lib/analysis-store"
import type { AnalysisResult, Assumptions } from "@/lib/analysis-types"

const ACCEPTED_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])

const MAX_SIZE = 50 * 1024 * 1024

const SYSTEM_PROMPT = `You are a contract analysis engine for trucking freight factoring agreements.
Your job: extract all pricing terms and fees, then compute an estimated effective monthly cost rate.

First, decide if the uploaded document is a factoring agreement / factoring services agreement / accounts receivable purchase and security agreement / purchase & sale of accounts agreement.
If it is not, return {"isContract":false,"reason":"<short reason>"} and no other fields.

If it is, extract:

- factoring company name
- recourse type (recourse / non-recourse / mixed / unclear)
- base discount / factoring fee structure (percent, tiered, time-based, prime+spread, etc.)
- per-invoice fees (invoice processing, wire, ACH, postage, rush fees, platform fees, fuel card fees)
- minimum fees per invoice
- reserves / holdbacks / escrow
- monthly minimums or supplemental fees
- termination fees / liquidated damages / early termination penalties
- misdirected payment penalties
- any "prime rate" adjustments
- contract term + auto-renew window if present

Then compute a simple estimated "true rate":
Use the assumptions object provided. Convert flat fees into % of invoice (flat_fee / invoice_amount).
If a fee depends on time outstanding, prorate by avg_days_to_pay where possible.
Output computed estimate as a percent of invoice value.

Always provide evidence for each extracted fee: quote snippet and page/section reference when possible.
Do not give legal advice.

OUTPUT JSON SCHEMA:
{
  "isContract": true,
  "detectedCompany": {"name": "string", "confidence": 0-1},
  "recourseType": "recourse|non-recourse|mixed|unclear",
  "pricingModel": "percentage|tiered|time_based|prime_linked|other",
  "baseRate": {"text":"string","percent":number|null},
  "feeItems":[
    {
      "name":"string",
      "type":"percent|flat|conditional|unknown",
      "amount":{"percent":number|null,"flat_usd":number|null},
      "trigger":"string",
      "evidence":{"snippet":"string","location":"string"}
    }
  ],
  "termAndExit":[
    {"name":"string","value":"string","evidence":{"snippet":"string","location":"string"}}
  ],
  "assumptionsUsed":{"invoice_amount":number,"avg_days_to_pay":number,"payout_method":"ACH|wire|fuelcard","invoices_per_month":number},
  "estimatedTrueRatePercent": number,
  "estimatedTrueRateBreakdown":[
    {"component":"string","percent_of_invoice":number,"explanation":"string"}
  ],
  "warnings":[ "string" ],
  "summary":"string"
}

Return ONLY the JSON. No markdown, no explanation.`

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const assumptionsStr = formData.get("assumptions") as string | null

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 })
    }

    if (!ACCEPTED_TYPES.has(file.type)) {
      return Response.json(
        { error: "Invalid file type. Accepted: PDF, DOC, DOCX, PNG, JPG." },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return Response.json(
        { error: "File exceeds 50MB limit." },
        { status: 400 }
      )
    }

    let assumptions: Assumptions = {
      invoice_amount: 5000,
      avg_days_to_pay: 30,
      invoices_per_month: 20,
      payout_method: "ACH",
    }

    if (assumptionsStr) {
      try {
        assumptions = JSON.parse(assumptionsStr)
      } catch {
        // use defaults
      }
    }

    // Convert file to base64 for the AI model
    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")
    const mimeType = file.type

    // Determine if it's an image or document
    const isImage = mimeType.startsWith("image/")

    // Build the user message content
    const userContent: Array<
      | { type: "text"; text: string }
      | { type: "file"; data: string; mimeType: string }
    > = []

    if (isImage) {
      userContent.push({
        type: "file",
        data: base64,
        mimeType,
      })
      userContent.push({
        type: "text",
        text: `This is an image of a factoring agreement document. Please analyze it using OCR to read the text, then extract all pricing and fee information.\n\nAssumptions: ${JSON.stringify(assumptions)}`,
      })
    } else {
      userContent.push({
        type: "file",
        data: base64,
        mimeType,
      })
      userContent.push({
        type: "text",
        text: `Please analyze this factoring agreement document and extract all pricing and fee information.\n\nAssumptions: ${JSON.stringify(assumptions)}`,
      })
    }

    const { text } = await generateText({
      model: "openai/gpt-4o",
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
      maxOutputTokens: 4096,
      temperature: 0.1,
    })

    // Parse JSON from the response
    let parsed: AnalysisResult
    try {
      // Try to extract JSON from the response (handle possible markdown code blocks)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error("No JSON found in response")
      parsed = JSON.parse(jsonMatch[0])
    } catch {
      return Response.json(
        { error: "Failed to parse analysis response. Please try again." },
        { status: 500 }
      )
    }

    // If it's a contract, look up the company in our dataset
    if (parsed.isContract && parsed.detectedCompany?.name) {
      const match = findCompanyByName(parsed.detectedCompany.name)
      if (match) {
        parsed.advertisedRateText = match.advertised_rate_text
      }
    }

    // Generate an ID and save to store
    const analysisId = crypto.randomUUID()
    parsed.analysisId = analysisId
    saveAnalysis(analysisId, parsed)

    return Response.json(parsed)
  } catch (err) {
    console.error("Analysis error:", err)
    return Response.json(
      {
        error:
          err instanceof Error ? err.message : "Analysis failed unexpectedly.",
      },
      { status: 500 }
    )
  }
}
