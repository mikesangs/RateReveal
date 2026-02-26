import { EmptyState } from "@/components/ui/empty-state"
import { PrimaryButton } from "@/components/ui/primary-button"
import { FileX, RotateCcw } from "lucide-react"

interface NotContractStateProps {
  reason?: string
  onRetry: () => void
}

export function NotContractState({ reason, onRetry }: NotContractStateProps) {
  return (
    <EmptyState
      icon={<FileX className="h-10 w-10" />}
      title="This doesn't look like a factoring agreement"
      description={
        reason ??
        "The uploaded document does not appear to be a factoring or accounts receivable agreement."
      }
      action={
        <PrimaryButton onClick={onRetry}>
          <RotateCcw className="h-4 w-4" />
          Try Another File
        </PrimaryButton>
      }
    />
  )
}
