"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Heart } from "lucide-react";
import { Property } from "@/types/property";
import { PropertyBadge } from "./PropertyBadge";
import { PropertyStats } from "./PropertyStats";
import { PropertyLocation } from "./PropertyLocation";
import { PropertyFooter } from "./PropertyFooter";

import { toggleWishlistAction } from "@/app/(dashboardRoute)/dashboard/tenant/_actions/wishlist.actions";
import { toast } from "sonner";

interface FeaturedPropertyCardProps {
  property: Property;
}

export function FeaturedPropertyCard({ property }: FeaturedPropertyCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistCountState, setWishlistCountState] = useState(
    property.wishlistCount ?? 0
  );
  const [isToggling, setIsToggling] = useState(false);

  const categoryName =
    typeof property.category === "object"
      ? property.category?.name
      : property.category || "Luxury Property";

  const isAvailable = property.isAvailable ?? true;
  const isFeatured = property.isFeatured ?? true;
  const propertyId = (property as unknown as { _id?: string })._id || property.id || "";

  // Interactive mouse tracking for card spotlight glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(
    380px circle at ${mouseX}px ${mouseY}px,
    rgba(37, 99, 235, 0.12),
    transparent 80%
  )`;

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!propertyId || isToggling) return;

    setIsToggling(true);
    try {
      const res = await toggleWishlistAction(propertyId);
      if (res.success) {
        const newState = res.isWishlisted;
        setIsWishlisted(newState);
        setWishlistCountState((prev) => (newState ? prev + 1 : Math.max(0, prev - 1)));
        toast.success(res.message || (newState ? "Saved to wishlist!" : "Removed from wishlist."));
      } else {
        toast.error(res.message || "Please sign in to save properties.");
      }
    } catch (error) {
      toast.error("Failed to update wishlist.");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={isAvailable ? { y: -10 } : {}}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group relative overflow-hidden rounded-3xl p-4 sm:p-5 backdrop-blur-xl transition-all duration-500 h-full flex flex-col justify-between ${
        isAvailable
          ? "bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-500/40 dark:hover:border-blue-500/40"
          : "bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 opacity-80"
      }`}
    >
      {/* Dynamic Gradient Border Hover Effect */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/0 via-teal-500/0 to-sky-500/0 group-hover:from-blue-500/30 group-hover:via-sky-500/30 group-hover:to-teal-500/30 transition-all duration-500 pointer-events-none" />

      {/* Spotlight Glow Follower */}
      {isAvailable && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlightBg }}
        />
      )}

      {/* Top Image Box */}
      <div className="relative w-full h-[230px] sm:h-[250px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        {/* Next.js Optimized Image with Zoom on Hover */}
        <Image
          src={property.mainImage || property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80"}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out ${
            isAvailable ? "group-hover:scale-110" : "grayscale-[40%]"
          }`}
          priority={false}
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/30" />

        {/* Top Header Badges Row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            {isFeatured && <PropertyBadge variant="featured" />}
            {!isAvailable && <PropertyBadge variant="unavailable" />}
          </div>

          {/* Interactive Wishlist Heart Button */}
          <button
            onClick={toggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="p-2.5 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-all duration-300 ${
                isWishlisted
                  ? "fill-rose-500 text-rose-500 scale-110"
                  : "text-white group-hover/heart:text-rose-400"
              }`}
            />
          </button>
        </div>

        {/* Bottom Overlay Info inside Image (Price & Category) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div>
            <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">
              ৳{property.price ? property.price.toLocaleString() : "0"}
            </span>
            <span className="text-xs font-semibold text-slate-200 ml-1">/month</span>
          </div>

          <PropertyBadge variant="category" label={categoryName} />
        </div>
      </div>

      {/* Card Content Details */}
      <div className="flex flex-col justify-between flex-grow pt-4 space-y-3 z-10">
        <div>
          {/* Property Title */}
          <Link
            href={isAvailable ? `/properties/${propertyId}` : "#"}
            className={!isAvailable ? "pointer-events-none" : "block group/title"}
          >
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-1 group-hover/title:text-[#2563EB] dark:group-hover/title:text-sky-400 transition-colors duration-200">
              {property.title}
            </h3>
          </Link>

          {/* Property Location */}
          <div className="mt-1">
            <PropertyLocation city={property.city} state={property.state} />
          </div>
        </div>

        {/* Property Specifications Stats */}
        <PropertyStats
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          areaSqFt={property.areaSqFt}
          rating={property.rating}
          averageRating={property.averageRating}
          reviewCount={property.reviewCount}
          reviewsCount={property.reviewsCount}
          wishlistCount={wishlistCountState}
        />

        {/* Card Footer: Landlord info & View Details */}
        <PropertyFooter
          landlord={property.landlord}
          propertyId={propertyId}
          isAvailable={isAvailable}
        />
      </div>
    </motion.div>
  );
}
