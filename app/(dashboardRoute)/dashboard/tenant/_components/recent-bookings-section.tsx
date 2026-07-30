'use client';

import { Card } from '@/components/ui/card';
import { BookingCard } from './booking-card';


const mockBookings = [
  {
    id: '1',
    propertyName: 'Modern Apartment Downtown',
    location: 'New York, NY',
    checkIn: 'Dec 15, 2024',
    checkOut: 'Dec 22, 2024',
    guests: 2,
    status: 'confirmed' as const,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    propertyName: 'Cozy Studio Beach House',
    location: 'Miami, FL',
    checkIn: 'Jan 5, 2025',
    checkOut: 'Jan 12, 2025',
    guests: 1,
    status: 'confirmed' as const,
    image: 'https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    propertyName: 'Luxury Villa Mountain View',
    location: 'Aspen, CO',
    checkIn: 'Jan 20, 2025',
    checkOut: 'Jan 27, 2025',
    guests: 4,
    status: 'pending' as const,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop',
  },
];

export function RecentBookingsSection() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Recent Bookings
      </h2>
      <div className="space-y-4">
        {mockBookings.map((booking) => (
          <BookingCard key={booking.id} {...booking} />
        ))}
      </div>
    </Card>
  );
}
