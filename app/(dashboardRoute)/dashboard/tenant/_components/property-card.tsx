'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Star, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import { toggleWishlistAction, removeFromWishlistAction } from '../_actions/wishlist.actions';

interface PropertyCardProps {
  id: string; // Wishlist item ID or Property ID
  propertyId?: string;
  image: string;
  title: string;
  location: string;
  price: number;
  rating?: number;
  reviews?: number;
  isFavorited?: boolean;
  onRemove?: (id: string) => void;
}

export function PropertyCard({
  id,
  propertyId,
  image,
  title,
  location,
  price,
  rating = 4.8,
  reviews = 12,
  isFavorited = true,
  onRemove,
}: PropertyCardProps) {
  const [favorited, setFavorited] = useState(isFavorited);
  const [isDeleting, setIsDeleting] = useState(false);

  const targetPropertyId = propertyId || id;

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      const res = await toggleWishlistAction(targetPropertyId);
      if (res.success) {
        const nextState = res.isWishlisted;
        setFavorited(nextState);
        toast.success(res.message || (nextState ? 'Saved to wishlist!' : 'Removed from wishlist.'));
        if (!nextState && onRemove) {
          onRemove(id);
        }
      } else {
        toast.error(res.message || 'Failed to update wishlist.');
      }
    } catch (err: any) {
      toast.error('An error occurred while updating wishlist.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-border/60 hover:border-primary/40 bg-card">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-muted">
        <Image
          src={image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&fit=crop'}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Toggle Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          disabled={isDeleting}
          className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-white/20 text-white transition-transform active:scale-95 cursor-pointer z-10"
          onClick={handleToggle}
          title={favorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              favorited ? 'fill-rose-500 text-rose-500' : 'text-white'
            }`}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/properties/${targetPropertyId}`} className="block group/link">
            <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover/link:text-primary transition-colors flex items-center gap-1">
              <span>{title}</span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0" />
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 line-clamp-1">
            <MapPin className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        {/* Rating, Price and View button */}
        <div className="pt-2 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-foreground">{rating}</span>
            <span className="text-[10px] text-muted-foreground">({reviews})</span>
          </div>
          <div className="text-right">
            <span className="text-base font-extrabold text-foreground">${price?.toLocaleString() || 0}</span>
            <span className="text-[10px] text-muted-foreground font-medium"> / mo</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
