'use client';

import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookingCardProps {
  id: string;
  propertyName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  image: string;
}

const statusColors = {
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
  cancelled:
    'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400',
};

export function BookingCard({
  id,
  propertyName,
  location,
  checkIn,
  checkOut,
  guests,
  status,
  image,
}: BookingCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex gap-4">
        {/* Image */}
        <div
          className="w-24 h-24 rounded-lg bg-muted flex-shrink-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">
                {propertyName}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {location}
              </div>
            </div>
            <Badge className={statusColors[status]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{checkIn} - {checkOut}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
            </div>
          </div>
        </div>

        {/* Action */}
        <Button variant="ghost" size="icon" className="self-center">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
