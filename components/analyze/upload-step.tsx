"use client"

import { FileDropzone } from "@/components/ui/file-dropzone"
import { PrimaryButton } from "@/components/ui/primary-button"
import { ArrowRight } from "lucide-react"

interface UploadStepProps {
  file: File | null
  onFileSelect: (file: File) => void
  onFileClear: () => void
  onNext: () => void
  error?: string | null
}

export function UploadStep({
  file,
  onFileSelect,
  onFileClear,
  onNext,
  error,
}: UploadStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <FileDropzone
        selectedFile={file}
        onFileSelect={onFileSelect}
        onClear={onFileClear}
        error={error ?? undefined}
      />
      {file && (
        <div className="flex justify-end">
          <PrimaryButton onClick={onNext}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
