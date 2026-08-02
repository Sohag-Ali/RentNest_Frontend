'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Heart,
  CreditCard,
  Bell,
  Inbox,
  CheckCircle2,
  Star,
  Building2,
  FileText,
  Users,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/app/(authRoute)/_actions/authActions';
import { toast } from 'sonner';

// Standard Tenant navigation links (Profile & Settings removed)
const tenantNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/tenant/requests', label: 'My Rental Requests', icon: FileText },
  { href: '/dashboard/bookings', label: 'My Bookings', icon: Home },
  { href: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/dashboard/tenant/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
];

// Landlord navigation links (Profile & Settings removed)
const landlordNavItems = [
  { href: '/dashboard/landlord', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/landlord/properties', label: 'My Properties', icon: Building2 },
  { href: '/dashboard/landlord/requests', label: 'Incoming Requests', icon: Inbox },
  { href: '/dashboard/landlord/approved', label: 'Approved Bookings', icon: CheckCircle2 },
  { href: '/dashboard/landlord/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/landlord/reviews', label: 'Reviews', icon: Star },
];

// Admin navigation links (Settings removed)
const adminNavItems = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'Users', icon: Users },
  { href: '/dashboard/admin/properties', label: 'Properties', icon: Building2 },
  { href: '/dashboard/admin/rentals', label: 'Rental Requests', icon: FileText },
  { href: '/dashboard/admin/payments', label: 'Payments', icon: CreditCard },
];

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

  const handleLogout = async () => {
    toast.success('Logged Out Successfully 👋', {
      description: 'You have been logged out of your account.',
    });
    await logoutAction();
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[calc(100vh-7rem)]">
      {/* Top Nav Items */}
      <nav className="space-y-1.5">
        {activeNavItems.map(({ href, label, icon: Icon }) => {
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

      {/* Bottom Logout Action */}
      <div className="pt-4 border-t border-border mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
