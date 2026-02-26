import { notFound } from "next/navigation"
import { companies, getCompanyBySlug } from "@/lib/companies"
import { CompanyDetail } from "@/components/companies/company-detail"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(slug)
  if (!company) return {}
  return {
    title: `${company.name} - RateReveal`,
    description: `Factoring details for ${company.name}. ${company.notes}`,
  }
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)
  if (!company) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <CompanyDetail company={company} />
    </div>
  )
}
