'use client';

import Image from 'next/image';
import { Heart, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  isFavorited?: boolean;
}

export function PropertyCard({
  id,
  image,
  title,
  location,
  price,
  rating,
  reviews,
  isFavorited = false,
}: PropertyCardProps) {
  const [favorited, setFavorited] = useState(isFavorited);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => setFavorited(!favorited)}
        >
          <Heart
            className={`h-5 w-5 ${
              favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <MapPin className="h-3 w-3" />
            {location}
          </div>
        </div>

        {/* Rating and Price */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">${price}</p>
            <p className="text-xs text-muted-foreground">/night</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
