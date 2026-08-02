'use client';

import Link from 'next/link';
import { Search, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from './user-profile-dropdown';
import { NotificationDropdown } from '@/components/shared/NotificationDropdown';

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="pl-10 bg-muted border-border"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <NotificationDropdown />

          <Link href="/dashboard/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          <div className="w-px h-6 bg-border" />

          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}
