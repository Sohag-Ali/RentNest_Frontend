'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Search, Settings, Sun, Moon, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from './user-profile-dropdown';
import { NotificationDropdown } from '@/components/shared/NotificationDropdown';
import { useSidebar } from '@/components/ui/sidebar';

export function TopNavbar() {
  const { theme, setTheme } = useTheme();
  const { setOpenMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-2 sm:gap-4 px-3.5 sm:px-6">
        {/* Left Section: Mobile Hamburger Trigger + Search Input */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenMobile(true)}
            aria-label="Open navigation menu"
            className="md:hidden rounded-lg h-9 w-9 border border-border/60 text-foreground/80 hover:text-foreground hover:bg-muted shrink-0 cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="pl-9 pr-3 h-9 sm:h-10 rounded-full bg-muted/50 border-border/60 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all text-xs sm:text-sm w-full"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Notification Dropdown */}
          <NotificationDropdown />

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

          <div className="w-px h-6 bg-border/60 mx-0.5 sm:mx-1" />

          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}
