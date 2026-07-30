'use client';

import { Card } from '@/components/ui/card';
import { PropertyCard } from './property-card';


const mockProperties = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop',
    title: 'Stunning Beachfront Condo',
    location: 'Malibu, CA',
    price: 350,
    rating: 4.9,
    reviews: 128,
    isFavorited: true,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
    title: 'Chic Brooklyn Loft',
    location: 'New York, NY',
    price: 280,
    rating: 4.8,
    reviews: 95,
    isFavorited: true,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop',
    title: 'Cozy Mountain Cottage',
    location: 'Aspen, CO',
    price: 220,
    rating: 4.7,
    reviews: 72,
    isFavorited: false,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    title: 'Elegant Paris Apartment',
    location: 'Paris, France',
    price: 320,
    rating: 4.9,
    reviews: 156,
    isFavorited: true,
  },
];

export function WishlistSection() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        My Wishlist
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </Card>
  );
}
