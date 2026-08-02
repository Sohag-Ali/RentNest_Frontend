"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Property } from "@/types/property";
import { User } from "@/lib/types/user.type";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Building2Icon,
  PlusIcon,
  SearchIcon,
  MapPinIcon,
  BedIcon,
  BathIcon,
  Maximize2Icon,
  EyeIcon,
  SparklesIcon,
  DollarSignIcon,
  CheckCircle2Icon,
  ClockIcon,
  SlidersHorizontalIcon,
  PencilIcon,
} from "lucide-react";

interface LandlordPropertyListProps {
  properties: Property[];
  user: User;
}

export function LandlordPropertyList({
  properties,
  user,
}: LandlordPropertyListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Filter landlord properties by search keyword and status filter
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "AVAILABLE") {
      return property.isAvailable;
    }
    if (statusFilter === "UNAVAILABLE") {
      return !property.isAvailable;
    }
    if (statusFilter === "FEATURED") {
      return property.isFeatured;
    }

    return true;
  });

  // Calculate portfolio stats
  const totalProperties = properties.length;
  const availableCount = properties.filter((p) => p.isAvailable).length;
  const featuredCount = properties.filter((p) => p.isFeatured).length;
  const totalMonthlyValue = properties.reduce(
    (sum, p) => sum + (Number(p.price) || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Portfolio Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/60 bg-gradient-to-br from-card to-muted/20 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                My Total Listings
              </p>
              <p className="text-2xl font-extrabold text-foreground">
                {totalProperties}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Building2Icon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-card to-muted/20 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Available Units
              </p>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {availableCount}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2Icon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-card to-muted/20 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Featured Listings
              </p>
              <p className="text-2xl font-extrabold text-amber-500">
                {featuredCount}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <SparklesIcon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-card to-muted/20 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Portfolio Value
              </p>
              <p className="text-2xl font-extrabold text-foreground">
                ${totalMonthlyValue.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <DollarSignIcon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-card border border-border/60 p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your properties by title, city, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <SlidersHorizontalIcon className="h-4 w-4 text-muted-foreground ml-1 shrink-0" />
          <Button
            type="button"
            variant={statusFilter === "ALL" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("ALL")}
            className="text-xs h-9 rounded-xl"
          >
            All ({properties.length})
          </Button>
          <Button
            type="button"
            variant={statusFilter === "AVAILABLE" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("AVAILABLE")}
            className="text-xs h-9 rounded-xl"
          >
            Available ({availableCount})
          </Button>
          <Button
            type="button"
            variant={statusFilter === "FEATURED" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("FEATURED")}
            className="text-xs h-9 rounded-xl"
          >
            Featured ({featuredCount})
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
              <Building2Icon className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">
                {properties.length === 0
                  ? "No Properties Created Yet"
                  : "No Properties Found"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {properties.length === 0
                  ? "You haven't listed any properties yet. Post your first residence to start receiving tenant applications."
                  : "No property listings match your search criteria or active filter state."}
              </p>
            </div>
            <div className="pt-2">
              <Link href="/dashboard/landlord/properties/new">
                <Button className="rounded-2xl gap-2 font-semibold text-xs bg-primary text-primary-foreground shadow-md">
                  <PlusIcon className="h-4 w-4" />
                  <span>Add New Property</span>
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Properties Grid */}
      {filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => {
            const categoryObj = property.category as any;
            const categoryName =
              typeof categoryObj === "object" && categoryObj?.name
                ? categoryObj.name
                : property.categoryId ||
                  (typeof property.category === "string" ? property.category : "Villa");

            return (
              <Card
                key={property.id}
                className="group border-border/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-card"
              >
                {/* Image Header with Badges */}
                <div className="relative w-full h-52 bg-muted overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      property.mainImage ||
                      property.images?.[0] ||
                      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <Badge
                      variant={property.isAvailable ? "default" : "secondary"}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] shadow-sm backdrop-blur-md"
                    >
                      {property.isAvailable ? "Available" : "Occupied"}
                    </Badge>
                    {property.isFeatured && (
                      <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-[11px] flex items-center gap-1 shadow-sm">
                        <SparklesIcon className="h-3 w-3" /> Featured
                      </Badge>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-black/60 backdrop-blur-md text-white border-white/20 text-xs">
                      {categoryName}
                    </Badge>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <span className="text-xl font-black">
                        ${Number(property.price).toLocaleString()}
                      </span>
                      <span className="text-xs text-white/80 font-normal"> / month</span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1">
                      <MapPinIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{property.location || `${property.city}, ${property.state}`}</span>
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 pt-1">
                      {property.description}
                    </p>
                  </div>

                  {/* Specs Pill List */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-muted/30 border border-border/40 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 justify-center">
                      <BedIcon className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                      <span className="font-semibold text-foreground">{property.bedrooms}</span> Beds
                    </div>
                    <div className="flex items-center gap-1.5 justify-center border-x border-border/40">
                      <BathIcon className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                      <span className="font-semibold text-foreground">{property.bathrooms}</span> Baths
                    </div>
                    <div className="flex items-center gap-1.5 justify-center">
                      <Maximize2Icon className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span className="font-semibold text-foreground">{property.areaSqFt}</span> SqFt
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex items-center gap-2 border-t border-border/40">
                    <Link
                      href={`/properties/${property.id}`}
                      target="_blank"
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                        <EyeIcon className="h-3.5 w-3.5" /> View Public Page
                      </Button>
                    </Link>

                    <Link href={`/dashboard/landlord/properties/${property.id}`}>
                      <Button size="sm" className="text-xs gap-1.5 bg-primary text-primary-foreground font-semibold">
                        <PencilIcon className="h-3.5 w-3.5" /> Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
