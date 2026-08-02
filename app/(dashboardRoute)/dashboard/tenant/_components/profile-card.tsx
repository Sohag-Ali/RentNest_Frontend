'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getCurrentUser } from '@/service/getCurrentUser';
import { User } from '@/lib/types/user.type';

export function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then((res) => {
      if (res?.success && res?.data) {
        setUser(res.data);
      }
    });
  }, []);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'TN';

  return (
    <Card className="p-6 text-center">
      <div className="flex justify-center mb-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.avatar || user?.image || undefined} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>

      <h2 className="text-xl font-semibold text-foreground mb-1">
        {user?.name || 'Tenant User'}
      </h2>
      <Badge variant="outline" className="mb-4 capitalize">
        {user?.role ? String(user.role).toLowerCase() : 'Tenant'} Member
      </Badge>

      <div className="space-y-3 text-sm text-muted-foreground mb-6">
        <div className="flex items-center justify-center gap-2">
          <Mail className="h-4 w-4" />
          {user?.email || 'N/A'}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Phone className="h-4 w-4" />
          {user?.phone || 'Not provided'}
        </div>
        <div className="flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4" />
          {[user?.city, user?.country].filter(Boolean).join(', ') || 'Location not specified'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-t border-border mb-6">
        <div>
          <p className="text-lg font-semibold text-foreground">{user?.rating ? `${user.rating}.0` : 'New'}</p>
          <p className="text-xs text-muted-foreground">Rating</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">{user?.status || 'Active'}</p>
          <p className="text-xs text-muted-foreground">Status</p>
        </div>
      </div>

      <Link href="/dashboard/tenant/profile">
        <Button className="w-full mb-2">Edit Profile</Button>
      </Link>
      <Link href="/dashboard/tenant/profile">
        <Button variant="outline" className="w-full">
          View Full Profile
        </Button>
      </Link>
    </Card>
  );
}
