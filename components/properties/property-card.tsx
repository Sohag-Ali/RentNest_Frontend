"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Property } from "@/types/property"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  HeartIcon,
  MapPinIcon,
  BedIcon,
  BathIcon,
  SquareIcon,
  StarIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
} from "lucide-react"

// Define props passed from parent PropertyGrid component
interface PropertyCardProps {
  property: Property
  viewMode?: "grid" | "list"
}

/**
 * PropertyCard Component
 * 
 * Why this file exists:
 * Displays an individual property item in either Grid or List layout using data passed via props.
 * 
 * Why props:
 * Receives the `property` object fetched from the backend server action.
 * Does not make any API requests inside the component itself.
 */
export function PropertyCard({ property, viewMode = "grid" }: PropertyCardProps) {
  // Local state for wishlist heart toggle button
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Safely extract property ID (supports MongoDB _id or standard id)
  const propertyId = (property as any)._id || property.id || ""

  // Extract category name safely if category is string or object from backend
  const categoryName =
    typeof property.category === "object"
      ? (property.category as any)?.name || "Apartment"
      : property.category || "Apartment"

  // -------------------------------------------------------------
  // LIST VIEW LAYOUT
  // -------------------------------------------------------------
  if (viewMode === "list") {
    return (
      <div className="group relative flex flex-col md:flex-row rounded-3xl border border-border/70 bg-card p-3 sm:p-4 gap-4 md:gap-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Main Property Image */}
        <div className="relative w-full md:w-72 lg:w-80 h-56 md:h-auto rounded-2xl overflow-hidden shrink-0">
          <Image
            src={property.mainImage || "/placeholder.jpg"}
            alt={property.title || "Property Image"}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Badges on Top Left of Image */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.isFeatured && (
              <Badge variant="luxury" className="gap-1 px-2.5 py-0.5 text-[11px] shadow-sm backdrop-blur-md">
                <SparklesIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                Featured
              </Badge>
            )}
            <Badge variant="glass" className="text-[11px]">
              {categoryName}
            </Badge>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-all z-10 group/heart"
            aria-label="Save to Wishlist"
          >
            <HeartIcon
              className={`h-4 w-4 transition-transform group-hover/heart:scale-110 ${
                isWishlisted ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </button>

          {/* Price Tag on Mobile */}
          <div className="absolute bottom-3 left-3 md:hidden z-10">
            <span className="text-xl font-extrabold text-white font-mono drop-shadow-md">
              ${property.price ? property.price.toLocaleString() : 0}
            </span>
            <span className="text-xs text-white/80 font-normal"> / mo</span>
          </div>
        </div>

        {/* Property Content Details */}
        <div className="flex flex-col justify-between flex-1 py-1 space-y-4">
          <div>
            {/* Rating and Availability */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg text-amber-600 dark:text-amber-400 text-xs font-bold">
                  <StarIcon className="h-3.5 w-3.5 fill-current" />
                  <span>{property.rating ?? 0}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  ({property.reviewCount ?? 0} reviews)
                </span>
              </div>
              {property.isAvailable && (
                <Badge variant="success" className="gap-1 text-[11px]">
                  <CheckCircle2Icon className="h-3 w-3" />
                  Available Now
                </Badge>
              )}
            </div>

            {/* Title & Location */}
            <Link href={`/properties/${propertyId}`} className="group/title block">
              <h3 className="text-xl font-bold tracking-tight text-foreground group-hover/title:text-primary transition-colors line-clamp-1">
                {property.title}
              </h3>
            </Link>
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 line-clamp-1">
              <MapPinIcon className="h-3.5 w-3.5 text-primary shrink-0" />
              {property.location}
            </p>

            {/* Description */}
            <p className="text-xs text-muted-foreground/90 mt-2.5 line-clamp-2 leading-relaxed hidden sm:block">
              {property.description}
            </p>
          </div>

          {/* Key Specifications (Beds, Baths, SqFt) */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-muted/40 border border-border/40 text-xs font-semibold text-foreground">
            <div className="flex items-center gap-1.5">
              <BedIcon className="h-4 w-4 text-primary shrink-0" />
              <span>{property.bedrooms ?? 0} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BathIcon className="h-4 w-4 text-primary shrink-0" />
              <span>{property.bathrooms ?? 0} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <SquareIcon className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>{property.areaSqFt ? property.areaSqFt.toLocaleString() : 0} sqft</span>
            </div>
          </div>

          {/* Landlord Info, Price, and Details Button */}
          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 border border-border">
                <AvatarImage src={property.landlord?.avatar || ""} alt={property.landlord?.name || "Landlord"} />
                <AvatarFallback>{property.landlord?.name ? property.landlord.name[0] : "L"}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-foreground line-clamp-1">
                  {property.landlord?.name || "Host"}
                </p>
                {property.landlord?.isSuperhost && (
                  <p className="text-[10px] text-amber-500 font-medium">Superhost</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <span className="text-2xl font-extrabold text-foreground font-mono">
                  ${property.price ? property.price.toLocaleString() : 0}
                </span>
                <span className="text-xs text-muted-foreground"> / mo</span>
              </div>

              <Button
                render={<Link href={`/properties/${propertyId}`} />}
                size="sm"
                className="rounded-xl px-4 gap-1.5 bg-primary text-primary-foreground hover:shadow-md transition-all flex items-center justify-center"
              >
                <span>View Details</span>
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // GRID VIEW LAYOUT (Default)
  // -------------------------------------------------------------
  return (
    <div className="group relative flex flex-col rounded-3xl border border-border/70 bg-card overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5">
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={property.mainImage || "/placeholder.jpg"}
          alt={property.title || "Property Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {property.isFeatured && (
            <Badge variant="luxury" className="gap-1 px-2.5 py-0.5 text-[11px] shadow-sm backdrop-blur-md">
              <SparklesIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
              Featured
            </Badge>
          )}
          <Badge variant="glass" className="text-[11px]">
            {categoryName}
          </Badge>
        </div>

        {/* Wishlist Heart Top Right */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsWishlisted(!isWishlisted)
          }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-all z-10 group/heart"
          aria-label="Save to Wishlist"
        >
          <HeartIcon
            className={`h-4 w-4 transition-transform group-hover/heart:scale-110 ${
              isWishlisted ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>

        {/* Availability Badge Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10">
          {property.isAvailable ? (
            <Badge variant="success" className="gap-1 text-[11px] backdrop-blur-md bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
              <CheckCircle2Icon className="h-3 w-3" />
              Available Now
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-[11px]">
              Pending
            </Badge>
          )}
        </div>

        {/* Rating Badge Bottom Right */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl text-white text-xs font-bold border border-white/10">
          <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{property.rating ?? 0}</span>
          <span className="text-[10px] text-white/70 font-normal">({property.reviewCount ?? 0})</span>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div>
          <Link href={`/properties/${propertyId}`} className="group/title block">
            <h3 className="text-lg font-bold tracking-tight text-foreground group-hover/title:text-primary transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>
          <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 line-clamp-1">
            <MapPinIcon className="h-3.5 w-3.5 text-primary shrink-0" />
            {property.location}
          </p>
        </div>

        {/* Key Specs Row */}
        <div className="grid grid-cols-3 gap-1.5 py-2 px-3 rounded-2xl bg-muted/40 border border-border/40 text-xs font-semibold text-foreground text-center">
          <div className="flex items-center justify-center gap-1">
            <BedIcon className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{property.bedrooms ?? 0} Beds</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <BathIcon className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{property.bathrooms ?? 0} Baths</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <SquareIcon className="h-3 w-3 text-primary shrink-0" />
            <span>{property.areaSqFt ?? 0} sqft</span>
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-1">
          {Array.isArray(property.amenities) &&
            property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-[10px] px-2 py-0.5 rounded-lg bg-secondary text-secondary-foreground font-medium"
              >
                {amenity}
              </span>
            ))}
          {Array.isArray(property.amenities) && property.amenities.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-lg text-muted-foreground font-medium">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Landlord Info and Price Footer */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={property.landlord?.avatar || ""} alt={property.landlord?.name || "Landlord"} />
              <AvatarFallback>{property.landlord?.name ? property.landlord.name[0] : "L"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight line-clamp-1">
                {property.landlord?.name || "Host"}
              </p>
              {property.landlord?.isSuperhost && (
                <p className="text-[10px] text-amber-500 font-medium">Superhost</p>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-baseline gap-0.5 justify-end">
              <span className="text-lg font-extrabold text-foreground font-mono">
                ${property.price ? property.price.toLocaleString() : 0}
              </span>
              <span className="text-xs text-muted-foreground">/mo</span>
            </div>
          </div>
        </div>

        {/* Link / Button to Single Property Details Page */}
        <Button
          render={<Link href={`/properties/${propertyId}`} />}
          className="w-full rounded-xl h-10 gap-1.5 bg-primary text-primary-foreground font-semibold shadow-xs hover:shadow-md transition-all mt-1 flex items-center justify-center"
        >
          <span>View Details</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
