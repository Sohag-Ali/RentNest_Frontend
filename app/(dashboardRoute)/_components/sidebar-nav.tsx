'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Heart,
  CreditCard,
  Bell,
  Settings,
  Inbox,
  CheckCircle2,
  Star,
  User,
  Building2,
  FileText,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Standard Tenant navigation links
const tenantNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/tenant/requests', label: 'My Rental Requests', icon: FileText },
  { href: '/dashboard/bookings', label: 'My Bookings', icon: Home },
  { href: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/dashboard/tenant/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

// Landlord navigation links
const landlordNavItems = [
  { href: '/dashboard/landlord', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/landlord/properties', label: 'My Properties', icon: Building2 },
  { href: '/dashboard/landlord/requests', label: 'Incoming Requests', icon: Inbox },
  { href: '/dashboard/landlord/approved', label: 'Approved Bookings', icon: CheckCircle2 },
  { href: '/dashboard/landlord/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/landlord/reviews', label: 'Reviews', icon: Star },
  { href: '/dashboard/landlord/profile', label: 'Profile', icon: User },
  { href: '/dashboard/landlord/settings', label: 'Settings', icon: Settings },
];

// Complete Admin navigation links requested by user
const adminNavItems = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'Users', icon: Users },
  { href: '/dashboard/admin/properties', label: 'Properties', icon: Building2 },
  { href: '/dashboard/admin/rentals', label: 'Rental Requests', icon: FileText },
  { href: '/dashboard/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
];

/**
 * SidebarNav Component
 * 
 * Why this file exists:
 * Provides sidebar navigation links for tenant, landlord, and admin dashboards.
 * Dynamically switches navigation items based on current active route path.
 */
export function SidebarNav() {
  const pathname = usePathname();

  // Determine active portal route
  const isAdminRoute = pathname.startsWith('/dashboard/admin');
  const isLandlordRoute = pathname.startsWith('/dashboard/landlord');
  const activeNavItems = isAdminRoute
    ? adminNavItems
    : isLandlordRoute
    ? landlordNavItems
    : tenantNavItems;

  return (
    <nav className="space-y-1.5">
      {activeNavItems.map(({ href, label, icon: Icon }) => {
        // Check active link matching
        const isActive =
          pathname === href || (href !== '/dashboard/landlord' && href !== '/dashboard' && pathname.startsWith(href));

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200',
              isActive
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
