export interface Company {
  slug: string
  name: string
  recourse_type: "recourse" | "non-recourse" | "mixed" | "varies"
  advertised_rate_text: string
  rate_type: "as_low_as" | "range" | "quote_required" | "promo"
  source_urls: string[]
  notes: string
  last_verified_at: string
}

export const companies: Company[] = [
  {
    slug: "basicblock",
    name: "BasicBlock",
    recourse_type: "recourse",
    advertised_rate_text: "Quote required (public rate not published)",
    rate_type: "quote_required",
    source_urls: ["https://www.basicblock.io/"],
    notes: "Technology-focused factoring platform for trucking companies.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "bobtail",
    name: "Bobtail",
    recourse_type: "non-recourse",
    advertised_rate_text: "As low as 1%",
    rate_type: "as_low_as",
    source_urls: ["https://www.bobtail.com/freight-factoring/"],
    notes: "Non-recourse with fast funding. Rates may vary by credit and volume.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "otr-solutions",
    name: "OTR Solutions",
    recourse_type: "non-recourse",
    advertised_rate_text: "As low as 2.5%",
    rate_type: "as_low_as",
    source_urls: ["https://www.otrsolutions.com/freight-factoring/"],
    notes: "100% non-recourse factoring. Includes fuel discount program.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "capital-depot",
    name: "Capital Depot Inc",
    recourse_type: "recourse",
    advertised_rate_text: "Quote required (public rate not published)",
    rate_type: "quote_required",
    source_urls: ["https://www.capitaldepot.com/"],
    notes: "Recourse factoring for trucking and staffing industries.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "triumph-business-capital",
    name: "Triumph Business Capital",
    recourse_type: "recourse",
    advertised_rate_text: "As low as 1.5%",
    rate_type: "as_low_as",
    source_urls: [
      "https://www.triumphbusinesscapital.com/freight-factoring/",
    ],
    notes:
      "One of the largest factoring companies. Recourse with competitive rates for high-volume fleets.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "thunder-funding",
    name: "Thunder Funding",
    recourse_type: "non-recourse",
    advertised_rate_text: "2% - 5%",
    rate_type: "range",
    source_urls: ["https://www.thunderfunding.com/"],
    notes:
      "Non-recourse with quick approval. Rates depend on volume and broker creditworthiness.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "apex-capital",
    name: "Apex Capital",
    recourse_type: "non-recourse",
    advertised_rate_text: "As low as 1.5%",
    rate_type: "as_low_as",
    source_urls: ["https://www.apexcapitalcorp.com/freight-factoring/"],
    notes:
      "Non-recourse factoring with fuel card program. No hidden fees advertised.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "factor-loads",
    name: "Factor Loads",
    recourse_type: "recourse",
    advertised_rate_text: "Quote required (public rate not published)",
    rate_type: "quote_required",
    source_urls: ["https://www.factorloads.com/"],
    notes: "Recourse factoring with same-day funding claims.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "rts-financial",
    name: "RTS Financial",
    recourse_type: "non-recourse",
    advertised_rate_text: "As low as 2.5%",
    rate_type: "as_low_as",
    source_urls: ["https://www.rtsfinancial.com/freight-factoring"],
    notes: "Non-recourse with fuel card and ELD integrations.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "instapay",
    name: "Instapay (Love's)",
    recourse_type: "recourse",
    advertised_rate_text: "Quote required (public rate not published)",
    rate_type: "quote_required",
    source_urls: ["https://www.loves.com/instapay"],
    notes: "Factoring program by Love's Travel Stops. Tied to Love's ecosystem.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "england-carrier-services",
    name: "England Carrier Services (ECS)",
    recourse_type: "recourse",
    advertised_rate_text: "As low as 2%",
    rate_type: "as_low_as",
    source_urls: ["https://www.englandcarrierservices.com/"],
    notes: "Factoring arm of C.R. England. Competitive rates for owner-operators.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "express-freight-finance",
    name: "Express Freight Finance",
    recourse_type: "non-recourse",
    advertised_rate_text: "1.5% - 3.5%",
    rate_type: "range",
    source_urls: ["https://www.expressfreightfinance.com/"],
    notes: "Non-recourse factoring with transparent fee structure advertised.",
    last_verified_at: "2025-12-01",
  },
  {
    slug: "tafs",
    name: "TAFS",
    recourse_type: "recourse",
    advertised_rate_text: "As low as 2%",
    rate_type: "as_low_as",
    source_urls: ["https://www.tafs.com/freight-factoring/"],
    notes:
      "Recourse factoring with fuel card and tire discount programs.",
    last_verified_at: "2025-12-01",
  },
]

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug)
}

export function findCompanyByName(name: string): Company | undefined {
  const normalized = name.toLowerCase().trim()
  return companies.find(
    (c) =>
      c.name.toLowerCase() === normalized ||
      c.slug === normalized ||
      c.name.toLowerCase().includes(normalized) ||
      normalized.includes(c.name.toLowerCase())
  )
}
