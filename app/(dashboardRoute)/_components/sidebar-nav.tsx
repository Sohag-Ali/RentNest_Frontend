'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Home,
  Heart,
  CreditCard,
  Inbox,
  CheckCircle2,
  Star,
  Building2,
  FileText,
  Users,
  LogOut,
  FolderTree,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/app/(authRoute)/_actions/authActions';
import { toast } from 'sonner';

// Standard Tenant navigation links
const tenantNavItems = [
  { href: '/dashboard/tenant', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/tenant/requests', label: 'My Rental Requests', icon: FileText },
  { href: '/dashboard/tenant/bookings', label: 'My Bookings', icon: Home },
  { href: '/dashboard/tenant/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/dashboard/tenant/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/tenant/reviews', label: 'My Reviews', icon: Star },
];

// Landlord navigation links
const landlordNavItems = [
  { href: '/dashboard/landlord', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/landlord/properties', label: 'My Properties', icon: Building2 },
  { href: '/dashboard/landlord/requests', label: 'Incoming Requests', icon: Inbox },
  { href: '/dashboard/landlord/bookings', label: 'Rented Properties', icon: CheckCircle2 },
  { href: '/dashboard/landlord/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/landlord/reviews', label: 'Reviews', icon: Star },
];

// Admin navigation links
const adminNavItems = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/admin/users', label: 'Users', icon: Users },
  { href: '/dashboard/admin/properties', label: 'Properties', icon: Building2 },
  { href: '/dashboard/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/dashboard/admin/rentals', label: 'Rental Requests', icon: FileText },
  { href: '/dashboard/admin/payments', label: 'Payments', icon: CreditCard },
];

interface SidebarNavProps {
  onNavItemClick?: () => void;
  layoutIdPrefix?: string;
}

export function SidebarNav({ onNavItemClick, layoutIdPrefix = 'desktop' }: SidebarNavProps = {}) {
  const pathname = usePathname();

  // Determine active portal route
  const isAdminRoute = pathname.startsWith('/dashboard/admin');
  const isLandlordRoute = pathname.startsWith('/dashboard/landlord');
  const activeNavItems = isAdminRoute
    ? adminNavItems
    : isLandlordRoute
    ? landlordNavItems
    : tenantNavItems;

  const handleLogout = async () => {
    onNavItemClick?.();
    toast.success('Logged Out Successfully 👋', {
      description: 'You have been logged out of your account.',
    });
    await logoutAction();
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[calc(100vh-7rem)] p-1">
      {/* Top Nav Items */}
      <div className="space-y-3">
        <nav className="space-y-1">
          {activeNavItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== '/dashboard/landlord' &&
                href !== '/dashboard/tenant' &&
                href !== '/dashboard' &&
                href !== '/dashboard/admin' &&
                pathname.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                onClick={onNavItemClick}
                className="relative block"
              >
                <div
                  className={cn(
                    'relative flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-full transition-all duration-200 select-none overflow-hidden',
                    isActive
                      ? 'text-white font-bold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId={`${layoutIdPrefix}-activeSidebarItem`}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 shadow-md shadow-blue-500/25 z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={cn('h-4 w-4 shrink-0 relative z-10', isActive ? 'text-white' : 'text-muted-foreground')} />
                  <span className="relative z-10">{label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout Action */}
      <div className="pt-4 border-t border-border mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-full text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
