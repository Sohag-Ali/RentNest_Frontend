'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  HeartIcon,
  Share2Icon,
  SparklesIcon,
  CheckCircle2Icon,
  GridIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  XCircleIcon,
} from 'lucide-react';

interface PropertyHeroGalleryProps {
  property: Property;
}

export function PropertyHeroGallery({ property }: PropertyHeroGalleryProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openGalleryModal = (index: number) => {
    setActiveImageIndex(index);
    setIsModalOpen(true);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-4">
      {/* Header Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {property.isFeatured && (
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1 bg-amber-500/90 text-white border-amber-400/40 font-bold text-xs rounded-full shadow-xs backdrop-blur-md"
            >
              <SparklesIcon className="h-3.5 w-3.5 text-amber-200 fill-amber-200" />
              Featured Property
            </Badge>
          )}
          <Badge
            variant="outline"
            className="px-3.5 py-1 text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-sky-400 border-blue-200/80 dark:border-blue-800/80 rounded-full"
          >
            {typeof property.category === 'object'
              ? (property.category as any)?.name || 'Apartment'
              : property.category}
          </Badge>
          {property.isAvailable ? (
            <Badge
              variant="outline"
              className="gap-1 px-3 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 rounded-full"
            >
              <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-500" />
              {property.overview?.availableFrom || 'Available Now'}
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="gap-1 px-3 py-1 text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 rounded-full"
            >
              <XCircleIcon className="h-3.5 w-3.5 text-rose-500" />
              Not Available
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="rounded-2xl h-10 px-4 gap-2 border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4 text-emerald-500" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2Icon className="h-4 w-4 text-[#2563EB]" />
                  <span>Share</span>
                </>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`rounded-2xl h-10 px-4 gap-2 border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                isWishlisted
                  ? 'text-rose-500 border-rose-300 bg-rose-50/80 dark:bg-rose-950/30'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <HeartIcon
                className={`h-4 w-4 ${
                  isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-500'
                }`}
              />
              <span>{isWishlisted ? 'Saved' : 'Save'}</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Image Grid (Airbnb Style Layout) */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-white/10 grid grid-cols-1 md:grid-cols-4 gap-2.5 h-[340px] sm:h-[430px] lg:h-[500px]">
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
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
        </div>

        {/* Secondary Sub Images Grid */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2.5 h-full">
          {property.images.slice(1, 5).map((imgUrl, index) => (
            <div
              key={index}
              onClick={() => openGalleryModal(index + 1)}
              className="relative h-full cursor-pointer group overflow-hidden rounded-xl"
            >
              <Image
                src={imgUrl}
                alt={`${property.title} preview ${index + 2}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
            </div>
          ))}
        </div>

        {/* Show All Photos Floating Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-5 right-5 z-10"
        >
          <Button
            onClick={() => openGalleryModal(0)}
            className="rounded-2xl h-11 px-5 gap-2.5 bg-slate-950/80 hover:bg-slate-950 text-white backdrop-blur-xl border border-white/20 text-xs font-extrabold shadow-2xl cursor-pointer"
          >
            <GridIcon className="h-4 w-4 text-sky-400" />
            Show All {property.images.length} Photos
          </Button>
        </motion.div>
      </div>

      {/* Lightbox Modal Preview */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 rounded-3xl overflow-hidden bg-slate-950 text-white border border-white/10 shadow-2xl">
          <DialogHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between">
            <DialogTitle className="text-white text-base font-extrabold flex items-center gap-2">
              <SparklesIcon className="h-4 w-4 text-[#0EA5E9]" />
              Photo {activeImageIndex + 1} of {property.images.length}
            </DialogTitle>
          </DialogHeader>

          <div className="relative flex-1 h-[calc(85vh-120px)] flex items-center justify-center bg-slate-950/95 p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full max-h-[600px] flex items-center justify-center"
              >
                <Image
                  src={property.images[activeImageIndex]}
                  alt={`${property.title} view ${activeImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next Navigation */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-xl border border-white/20 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-xl border border-white/20 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnail Bar */}
          <div className="p-3 border-t border-white/10 bg-slate-900/90 overflow-x-auto flex gap-2 justify-center">
            {property.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#2563EB] scale-105 shadow-md shadow-blue-500/50'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
