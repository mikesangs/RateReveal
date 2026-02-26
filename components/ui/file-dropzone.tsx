"use client"

import { cn } from "@/lib/utils"
import { Upload, FileText, X } from "lucide-react"
import { useCallback, useState, useRef, type DragEvent } from "react"

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const ACCEPTED_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg", ".doc", ".docx"]

const MAX_SIZE = 50 * 1024 * 1024 // 50MB

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  onClear: () => void
  error?: string
  className?: string
}

export function FileDropzone({
  onFileSelect,
  selectedFile,
  onClear,
  error,
  className,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = useCallback((file: File): string | null => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase()
    if (!ACCEPTED_TYPES.includes(file.type) && !ACCEPTED_EXTENSIONS.includes(ext)) {
      return `Invalid file type. Accepted: ${ACCEPTED_EXTENSIONS.join(", ")}`
    }
    if (file.size > MAX_SIZE) {
      return "File exceeds 50MB limit."
    }
    return null
  }, [])

  const [validationError, setValidationError] = useState<string | null>(null)

  const handleFile = useCallback(
    (file: File) => {
      const err = validate(file)
      if (err) {
        setValidationError(err)
        return
      }
      setValidationError(null)
      onFileSelect(file)
    },
    [validate, onFileSelect]
  )

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const displayError = error || validationError

  if (selectedFile) {
    return (
      <div className={cn("rounded-xl border border-border bg-surface p-5", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={onClear}
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        role="button"
        tabIndex={0}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-surface hover:border-primary/40 hover:bg-surface-2"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Drop your agreement here, or click to browse
          </p>
          <p className="mt-1 text-xs text-muted">
            PDF, DOC, DOCX, PNG, JPG up to 50MB
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.join(",")}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>
      {displayError && (
        <p className="text-sm text-danger">{displayError}</p>
      )}
    </div>
  )
}
