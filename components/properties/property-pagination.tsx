"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface PropertyPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PropertyPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PropertyPaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 pb-4 border-t border-border/40 mt-10">
      <p className="text-xs text-muted-foreground font-medium order-2 sm:order-1">
        Showing page <span className="font-bold text-foreground">{currentPage}</span> of{" "}
        <span className="font-bold text-foreground">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-xl h-9 px-3 gap-1 border-input text-xs"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => onPageChange(page)}
              className={`rounded-xl h-9 w-9 text-xs font-semibold ${
                currentPage === page ? "bg-primary text-primary-foreground shadow-xs" : ""
              }`}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-xl h-9 px-3 gap-1 border-input text-xs"
        >
          <span>Next</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
