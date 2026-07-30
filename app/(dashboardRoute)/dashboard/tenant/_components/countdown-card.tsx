'use client';

import { Calendar, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CountdownCardProps {
  propertyName: string;
  location: string;
  moveInDate: string;
  daysRemaining: number;
  image: string;
}

export function CountdownCard({
  propertyName,
  location,
  moveInDate,
  daysRemaining,
  image,
}: CountdownCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 relative">
      <div
        className="h-48 bg-gradient-to-br from-sidebar-primary/20 to-sidebar-accent/20"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
          <h3 className="font-semibold text-lg mb-1">{propertyName}</h3>
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {moveInDate}
          </div>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20"
          >
            {daysRemaining} days away
          </Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-sidebar-primary to-sidebar-accent h-2 rounded-full transition-all duration-500"
            style={{
              width: `${Math.max(0, Math.min(100, (daysRemaining / 90) * 100))}%`,
            }}
          />
        </div>
      </div>
    </Card>
  );
}
