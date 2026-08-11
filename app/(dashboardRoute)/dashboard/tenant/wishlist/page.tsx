'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  Search,
  Building2,
  Trash2,
  ExternalLink,
  MapPin,
  Star,
  Bed,
  Bath,
  Maximize2,
  Loader2,
  Sparkles,
  ArrowLeft,
  Filter,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  getWishlistAction,
  removeFromWishlistAction,
  WishlistItem,
} from '../_actions/wishlist.actions';

export default function TenantWishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getWishlistAction();
      if (res.success && Array.isArray(res.data)) {
        setItems(res.data);
      } else {
        toast.error(res.message || 'Failed to fetch wishlist');
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      toast.error('Could not load wishlist items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (propertyId: string, itemId: string) => {
    setRemovingId(itemId);
    try {
      const res = await removeFromWishlistAction(propertyId);
      if (res.success) {
        setItems((prev) => prev.filter((item) => item.id !== itemId && item.propertyId !== propertyId));
        toast.success(res.message || 'Property removed from wishlist.');
      } else {
        toast.error(res.message || 'Failed to remove property.');
      }
    } catch (err) {
      toast.error('Failed to remove property from wishlist.');
    } finally {
      setRemovingId(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const prop = item.property || (item as any);
    const title = (prop.title || '').toLowerCase();
    const location = (prop.location || prop.city || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || location.includes(query);
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-primary/10 border border-rose-500/20 shadow-xs relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/tenant">
              <Button variant="outline" size="sm" className="h-7 px-2.5 rounded-full text-xs font-semibold gap-1 bg-background/80 cursor-pointer">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
              </Button>
            </Link>
            <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              <Heart className="h-3 w-3 mr-1 fill-rose-500" /> {items.length} Saved Properties
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
            My Saved <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">Wishlist</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your saved properties, check availability, and easily apply for rental requests.
          </p>
        </div>

        {/* Search Bar inside Header */}
        <div className="relative w-full sm:w-72 shrink-0 z-10">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search saved properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs rounded-2xl bg-background/90 border-border/80 shadow-xs focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Main Wishlist Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
          <p className="text-sm font-medium text-muted-foreground">Fetching your saved wishlist properties...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2 border-border/80 rounded-3xl bg-card">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 fill-rose-500/20" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-foreground">
                {searchQuery ? 'No matching properties found' : 'Your Wishlist is Empty'}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {searchQuery
                  ? `No saved properties match "${searchQuery}". Try clearing your search.`
                  : 'Start browsing rental listings and click the heart icon on any property to save it to your wishlist!'}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              {searchQuery ? (
                <Button variant="outline" onClick={() => setSearchQuery('')} className="rounded-2xl text-xs font-bold cursor-pointer">
                  Clear Search
                </Button>
              ) : (
                <Link href="/properties">
                  <Button className="rounded-2xl text-xs font-bold bg-primary text-primary-foreground shadow-md cursor-pointer">
                    Explore Available Properties
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const prop = item.property || (item as any);
            const propId = prop.id || prop._id || item.propertyId || item.id;
            const title = prop.title || 'Untitled Property';
            const location = prop.location || (prop.city ? `${prop.city}, ${prop.state || ''}` : 'Location N/A');
            const price = prop.price || 0;
            const image = prop.mainImage || (prop.images && prop.images[0]) || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&fit=crop';
            const rating = prop.averageRating || prop.rating || 4.8;
            const reviews = prop.reviewCount || prop.reviewsCount || 12;
            const bedrooms = prop.bedrooms || 2;
            const bathrooms = prop.bathrooms || 1;
            const areaSqFt = prop.areaSqFt || 850;
            const isAvailable = prop.isAvailable ?? true;

            const isRemovingThis = removingId === item.id;

            return (
              <Card
                key={item.id || propId}
                className="group relative overflow-hidden rounded-3xl border border-border/60 hover:border-rose-500/40 bg-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image Container */}
                <div className="relative h-52 w-full overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Availability Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge
                      className={
                        isAvailable
                          ? 'bg-emerald-500/90 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-md'
                          : 'bg-rose-500/90 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-md'
                      }
                    >
                      {isAvailable ? 'Available Now' : 'Rented'}
                    </Badge>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isRemovingThis}
                    onClick={() => handleRemove(propId, item.id)}
                    className="absolute top-3 right-3 h-9 w-9 rounded-full bg-slate-950/60 hover:bg-rose-600 text-white transition-all duration-200 backdrop-blur-md border border-white/20 cursor-pointer z-10"
                    title="Remove from wishlist"
                  >
                    {isRemovingThis ? (
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    ) : (
                      <Heart className="h-4 w-4 fill-rose-500 text-rose-500 group-hover:fill-white group-hover:text-white" />
                    )}
                  </Button>

                  {/* Price & Rating Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
                    <div>
                      <span className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">
                        ${price.toLocaleString()}
                      </span>
                      <span className="text-xs text-white/80 font-medium ml-1">/ month</span>
                    </div>

                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl text-amber-400 border border-white/10 text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{rating}</span>
                      <span className="text-[10px] text-white/70">({reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Link href={`/properties/${propId}`} className="block group/link">
                      <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover/link:text-rose-600 dark:group-hover/link:text-rose-400 transition-colors">
                        {title}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 line-clamp-1">
                      <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      {location}
                    </p>
                  </div>

                  {/* Property Specs Pills */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-border/50 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bed className="h-3.5 w-3.5 text-primary" />
                      <span className="font-semibold text-foreground">{bedrooms}</span> beds
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5 text-primary" />
                      <span className="font-semibold text-foreground">{bathrooms}</span> baths
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 className="h-3.5 w-3.5 text-primary" />
                      <span className="font-semibold text-foreground">{areaSqFt}</span> sqft
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <Link href={`/properties/${propId}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full rounded-2xl text-xs font-bold gap-1 border-border/80 cursor-pointer">
                        <ExternalLink className="h-3.5 w-3.5" /> Details
                      </Button>
                    </Link>
                    <Link href={`/properties/${propId}`} className="flex-1">
                      <Button size="sm" className="w-full rounded-2xl text-xs font-bold bg-primary text-primary-foreground cursor-pointer">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
