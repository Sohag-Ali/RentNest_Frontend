'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Phone } from 'lucide-react';

export function ProfileCard() {
  return (
    <Card className="p-6 text-center">
      <div className="flex justify-center mb-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>

      <h2 className="text-xl font-semibold text-foreground mb-1">
        John Doe
      </h2>
      <Badge variant="outline" className="mb-4">
        Premium Member
      </Badge>

      <div className="space-y-3 text-sm text-muted-foreground mb-6">
        <div className="flex items-center justify-center gap-2">
          <Mail className="h-4 w-4" />
          john@example.com
        </div>
        <div className="flex items-center justify-center gap-2">
          <Phone className="h-4 w-4" />
          +1 (555) 123-4567
        </div>
        <div className="flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4" />
          New York, USA
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 py-4 border-t border-border mb-6">
        <div>
          <p className="text-lg font-semibold text-foreground">12</p>
          <p className="text-xs text-muted-foreground">Total Stays</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">4.9</p>
          <p className="text-xs text-muted-foreground">Rating</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">8</p>
          <p className="text-xs text-muted-foreground">Reviews</p>
        </div>
      </div>

      <Button className="w-full mb-2">Edit Profile</Button>
      <Button variant="outline" className="w-full">
        View Full Profile
      </Button>
    </Card>
  );
}
