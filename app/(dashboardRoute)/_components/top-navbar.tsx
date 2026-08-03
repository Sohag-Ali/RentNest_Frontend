'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Search, Settings, Sun, Moon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from './user-profile-dropdown';

export function TopNavbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties, requests, bookings..."
              className="pl-10 h-10 rounded-full bg-muted/50 border-border/60 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="rounded-full text-foreground/80 hover:text-foreground hover:bg-muted border border-border/60 h-9 w-9 cursor-pointer transition-all duration-200"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </Button>

          <Link href="/dashboard/settings">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border border-border/60">
              <Settings className="h-4 w-4 text-muted-foreground" />
            </Button>
          </Link>

          <div className="w-px h-6 bg-border/60 mx-1" />

          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}
