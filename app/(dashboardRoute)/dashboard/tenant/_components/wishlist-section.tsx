'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, Building2, Loader2 } from 'lucide-react';
import { PropertyCard } from './property-card';
import { getWishlistAction, WishlistItem } from '../_actions/wishlist.actions';

export function WishlistSection() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlist() {
      try {
        setLoading(true);
        const res = await getWishlistAction();
        if (res.success && Array.isArray(res.data)) {
          setWishlistItems(res.data);
        }
      } catch (err) {
        console.error('Failed to load wishlist section:', err);
      } finally {
        setLoading(false);
      }
    }
    loadWishlist();
  }, []);

  const handleRemoveItem = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id && item.propertyId !== id));
  };

  return (
    <Card className="p-6 border border-border/60 shadow-xs rounded-3xl bg-card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
            <Heart className="h-5 w-5 fill-rose-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              My Saved Wishlist
            </h2>
            <p className="text-xs text-muted-foreground">
              Properties you have saved for quick access
            </p>
          </div>
        </div>

        <Link href="/dashboard/tenant/wishlist">
          <Button variant="ghost" size="sm" className="text-xs font-bold text-primary hover:text-primary/80 gap-1 cursor-pointer">
            View All ({wishlistItems.length})
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <Loader2 className="h-7 w-7 text-primary animate-spin" />
          <p className="text-xs text-muted-foreground font-medium">Loading saved properties...</p>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-3 bg-muted/30 rounded-2xl border border-dashed border-border/70">
          <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="text-sm font-bold text-foreground">No Wishlist Items Saved</h3>
            <p className="text-xs text-muted-foreground">
              You haven&apos;t saved any rental properties to your wishlist yet. Explore available properties and click the heart icon to save them here!
            </p>
          </div>
          <Link href="/properties" className="mt-2">
            <Button size="sm" className="rounded-xl text-xs font-bold bg-primary text-primary-foreground cursor-pointer">
              Browse Properties
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlistItems.slice(0, 4).map((item) => {
            const prop = item.property || (item as any);
            const propId = prop.id || prop._id || item.propertyId || item.id;
            const title = prop.title || "Rental Property";
            const location = prop.location || (prop.city ? `${prop.city}, ${prop.state || ''}` : "Location Available");
            const price = prop.price || 0;
            const image = prop.mainImage || (prop.images && prop.images[0]) || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&fit=crop";
            const rating = prop.averageRating || prop.rating || 4.8;
            const reviews = prop.reviewCount || prop.reviewsCount || 12;

            return (
              <PropertyCard
                key={item.id || propId}
                id={item.id || propId}
                propertyId={propId}
                title={title}
                location={location}
                price={price}
                image={image}
                rating={rating}
                reviews={reviews}
                isFavorited={true}
                onRemove={handleRemoveItem}
              />
            );
          })}
        </div>
      )}
    </Card>
  );
}
