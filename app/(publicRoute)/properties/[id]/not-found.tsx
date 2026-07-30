"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon, SearchXIcon } from "lucide-react"

export default function PropertyNotFound() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-dashed border-border/80 bg-card/50 backdrop-blur-md shadow-inner max-w-lg">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          <SearchXIcon className="h-12 w-12 stroke-[1.5]" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Property Not Found
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mt-2 leading-relaxed">
          The property you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>

        <Button
          render={<Link href="/properties" />}
          className="mt-6 rounded-xl h-11 px-6 font-semibold gap-2"
        >
          <HomeIcon className="h-4 w-4" />
          Browse All Properties
        </Button>
      </div>
    </main>
  )
}
