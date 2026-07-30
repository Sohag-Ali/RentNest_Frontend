"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon, RotateCcwIcon } from "lucide-react"

interface PropertiesErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function PropertiesError({ error, reset }: PropertiesErrorProps) {
  useEffect(() => {
    console.error("Properties page error:", error)
  }, [error])

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-dashed border-border/80 bg-card/50 backdrop-blur-md shadow-inner max-w-lg">
        <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-6">
          <AlertCircleIcon className="h-12 w-12 stroke-[1.5]" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Failed to Load Properties
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mt-2 leading-relaxed">
          Something went wrong while fetching rental listings. Please check your connection and try again.
        </p>

        <Button
          onClick={reset}
          className="mt-6 rounded-xl h-11 px-6 font-semibold gap-2"
        >
          <RotateCcwIcon className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </main>
  )
}
