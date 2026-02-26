"use client"

import { useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Stepper } from "@/components/ui/stepper"
import { UploadStep } from "@/components/analyze/upload-step"
import { AssumptionsStep } from "@/components/analyze/assumptions-step"
import { ResultsStep } from "@/components/analyze/results-step"
import { NotContractState } from "@/components/analyze/not-contract-state"
import type { Assumptions, AnalysisResult } from "@/lib/analysis-types"
import { DEFAULT_ASSUMPTIONS } from "@/lib/analysis-types"

const STEPS = ["Upload", "Assumptions", "Results"]

export function AnalyzeFlow() {
  const searchParams = useSearchParams()
  const companySlug = searchParams.get("company")

  const [step, setStep] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [assumptions, setAssumptions] = useState<Assumptions>(DEFAULT_ASSUMPTIONS)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback((f: File) => {
    setFile(f)
    setResult(null)
    setError(null)
  }, [])

  const handleFileClear = useCallback(() => {
    setFile(null)
    setStep(0)
    setResult(null)
    setError(null)
  }, [])

  const handleNextFromUpload = useCallback(() => {
    if (file) setStep(1)
  }, [file])

  const handleSubmit = useCallback(async () => {
    if (!file) return
    setIsLoading(true)
    setError(null)
    setStep(2)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("assumptions", JSON.stringify(assumptions))
      if (companySlug) formData.append("company", companySlug)

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Analysis failed (${res.status})`)
      }

      const data: AnalysisResult = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setStep(1)
    } finally {
      setIsLoading(false)
    }
  }, [file, assumptions, companySlug])

  const handleRetry = useCallback(() => {
    setResult(null)
    setStep(0)
    setFile(null)
    setError(null)
  }, [])

  if (result && !result.isContract) {
    return (
      <div className="flex flex-col gap-6">
        <Stepper steps={STEPS} currentStep={2} />
        <NotContractState
          reason={result.reason}
          onRetry={handleRetry}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Analyze Agreement
        </h1>
        <p className="mt-2 text-secondary">
          Upload your factoring agreement to uncover hidden fees and calculate
          your true rate.
        </p>
      </div>

      <Stepper steps={STEPS} currentStep={step} />

      {step === 0 && (
        <UploadStep
          file={file}
          onFileSelect={handleFileSelect}
          onFileClear={handleFileClear}
          onNext={handleNextFromUpload}
          error={error}
        />
      )}

      {step === 1 && (
        <AssumptionsStep
          assumptions={assumptions}
          onChange={setAssumptions}
          onBack={() => setStep(0)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}

      {step === 2 && (
        <ResultsStep
          result={result}
          isLoading={isLoading}
          onRetry={handleRetry}
        />
      )}
    </div>
  )
}
