export interface Assumptions {
  invoice_amount: number
  avg_days_to_pay: number
  invoices_per_month: number
  payout_method: "ACH" | "wire" | "fuelcard"
}

export interface FeeItem {
  name: string
  type: "percent" | "flat" | "conditional" | "unknown"
  amount: { percent: number | null; flat_usd: number | null }
  trigger: string
  evidence: { snippet: string; location: string }
}

export interface TermAndExit {
  name: string
  value: string
  evidence: { snippet: string; location: string }
}

export interface RateBreakdownItem {
  component: string
  percent_of_invoice: number
  explanation: string
}

export interface AnalysisResult {
  isContract: boolean
  reason?: string
  detectedCompany?: { name: string; confidence: number }
  recourseType?: "recourse" | "non-recourse" | "mixed" | "unclear"
  pricingModel?: "percentage" | "tiered" | "time_based" | "prime_linked" | "other"
  baseRate?: { text: string; percent: number | null }
  feeItems?: FeeItem[]
  termAndExit?: TermAndExit[]
  assumptionsUsed?: Assumptions
  estimatedTrueRatePercent?: number
  estimatedTrueRateBreakdown?: RateBreakdownItem[]
  warnings?: string[]
  summary?: string
  advertisedRateText?: string
  analysisId?: string
}

export const DEFAULT_ASSUMPTIONS: Assumptions = {
  invoice_amount: 5000,
  avg_days_to_pay: 30,
  invoices_per_month: 20,
  payout_method: "ACH",
}
