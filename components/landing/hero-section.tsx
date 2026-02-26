import Link from "next/link"
import { PrimaryButton } from "@/components/ui/primary-button"
import { Upload } from "lucide-react"

export function HeroSection() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        <span className="text-xs font-medium text-secondary">
          Free contract analysis
        </span>
      </div>
      <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Your agreement might be costing you{" "}
        <span className="text-primary">thousands</span>
      </h1>
      <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-secondary">
        Upload your factoring agreement. We&apos;ll itemize hidden fees and
        estimate the true rate you&apos;re paying vs advertised rates.
      </p>
      <PrimaryButton size="lg" className="mt-8" asChild>
        <Link href="/analyze">
          <Upload className="h-4 w-4" />
          Upload Your Agreement
        </Link>
      </PrimaryButton>
    </div>
  )
}
