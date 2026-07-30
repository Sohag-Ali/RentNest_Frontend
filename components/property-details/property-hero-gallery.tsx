"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Property } from "@/types/property"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  HeartIcon,
  Share2Icon,
  SparklesIcon,
  CheckCircle2Icon,
  GridIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from "lucide-react"

interface PropertyHeroGalleryProps {
  property: Property
}

export function PropertyHeroGallery({ property }: PropertyHeroGalleryProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openGalleryModal = (index: number) => {
    setActiveImageIndex(index)
    setIsModalOpen(true)
  }

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Top Header Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {property.isFeatured && (
            <Badge variant="luxury" className="gap-1 px-3 py-1 text-xs">
              <SparklesIcon className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              Featured Property
            </Badge>
          )}
          <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold">
            {typeof property.category === "object" ? (property.category as any)?.name || "Apartment" : property.category}
          </Badge>
          {property.isAvailable && (
            <Badge variant="success" className="gap-1 px-3 py-1 text-xs font-semibold">
              <CheckCircle2Icon className="h-3.5 w-3.5" />
              {property.overview?.availableFrom || "Available Now"}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="rounded-xl h-9 px-3 gap-1.5 border-input text-xs font-semibold"
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4 text-emerald-500" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2Icon className="h-4 w-4 text-muted-foreground" />
                <span>Share</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`rounded-xl h-9 px-3 gap-1.5 border-input text-xs font-semibold ${
              isWishlisted ? "text-rose-500 border-rose-200 bg-rose-50 dark:bg-rose-950/20" : ""
            }`}
          >
            <HeartIcon
              className={`h-4 w-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`}
            />
            <span>{isWishlisted ? "Saved" : "Save"}</span>
          </Button>
        </div>
      </div>

      {/* Main Image Grid (Airbnb Style Layout) */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/60 grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[420px] lg:h-[480px]">
        {/* Primary Main Image */}
        <div
          onClick={() => openGalleryModal(0)}
          className="relative md:col-span-2 h-full cursor-pointer group overflow-hidden"
        >
          <Image
            src={property.images[0] || property.mainImage}
            alt={property.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Secondary Sub Images Grid */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
          {property.images.slice(1, 5).map((imgUrl, index) => (
            <div
              key={index}
              onClick={() => openGalleryModal(index + 1)}
              className="relative h-full cursor-pointer group overflow-hidden"
            >
              <Image
                src={imgUrl}
                alt={`${property.title} preview ${index + 2}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>

        {/* Show All Photos Floating Button */}
        <Button
          onClick={() => openGalleryModal(0)}
          className="absolute bottom-4 right-4 rounded-xl h-10 px-4 gap-2 bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 text-xs font-bold shadow-lg z-10"
        >
          <GridIcon className="h-4 w-4" />
          View All {property.images.length} Photos
        </Button>
      </div>

      {/* Lightbox Modal Preview */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 rounded-3xl overflow-hidden bg-black text-white border-none">
          <DialogHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between">
            <DialogTitle className="text-white text-base font-medium">
              Photo {activeImageIndex + 1} of {property.images.length}
            </DialogTitle>
          </DialogHeader>

          <div className="relative flex-1 h-[calc(85vh-120px)] flex items-center justify-center bg-black/90 p-4">
            <div className="relative w-full h-full max-h-[600px] flex items-center justify-center">
              <Image
                src={property.images[activeImageIndex]}
                alt={`${property.title} view ${activeImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Prev / Next Navigation */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnail Bar */}
          <div className="p-3 border-t border-white/10 bg-black/60 overflow-x-auto flex gap-2 justify-center">
            {property.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImageIndex === idx ? "border-amber-400 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
