'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Settings, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentUser } from '@/service/getCurrentUser';
import { logoutAction } from '@/app/(authRoute)/_actions/authActions';
import { User } from '@/lib/types/user.type';
import { toast } from 'sonner';

interface UserProfileDropdownProps {
  initialUser?: User | null;
}

export function UserProfileDropdown({ initialUser }: UserProfileDropdownProps) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    getCurrentUser().then((res) => {
      if (isMounted) {
        if (res?.success && res?.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    setUser(null);
    toast.success('Logged Out Successfully 👋', {
      description: 'You have been logged out of your account.',
    });
    await logoutAction();
  };

  const role = (user?.role ? String(user.role).toLowerCase() : 'tenant') as 'tenant' | 'landlord' | 'admin';

  const getDashboardRoute = () => {
    switch (role) {
      case 'landlord':
        return '/dashboard/landlord';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/dashboard/tenant';
    }
  };

  const getProfileRoute = () => {
    switch (role) {
      case 'landlord':
        return '/dashboard/landlord/profile';
      case 'admin':
        return '/profile';
      default:
        return '/dashboard/tenant/profile';
    }
  };

  const getSettingsRoute = () => {
    switch (role) {
      case 'landlord':
        return '/dashboard/landlord/settings';
      case 'admin':
        return '/dashboard/admin/settings';
      default:
        return '/dashboard/settings';
    }
  };

  const userName = user?.name || (user?.email ? user.email.split('@')[0] : 'User');
  const userRoleFormatted = role === 'landlord' ? 'Landlord Account' : role === 'admin' ? 'Admin Account' : 'Tenant Account';
  const avatarSrc = user?.avatar || user?.image || undefined;

  const initials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full hover:bg-muted p-1 transition-colors outline-none cursor-pointer">
        <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
          <AvatarImage src={avatarSrc} alt={userName} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border-border/80 bg-card">
        <DropdownMenuLabel className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-semibold text-foreground leading-none">{userName}</p>
          <p className="text-xs text-muted-foreground leading-none font-normal mt-0.5">{userRoleFormatted}</p>
          {user?.email && (
            <p className="text-[11px] text-muted-foreground/80 truncate mt-1">{user.email}</p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem className="cursor-pointer rounded-xl p-0">
          <Link href={getDashboardRoute()} className="flex items-center gap-2.5 px-3 py-2 w-full text-sm font-medium">
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-xl p-0">
          <Link href={getProfileRoute()} className="flex items-center gap-2.5 px-3 py-2 w-full text-sm font-medium">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-xl p-0">
          <Link href={getSettingsRoute()} className="flex items-center gap-2.5 px-3 py-2 w-full text-sm font-medium">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2.5 px-3 py-2 w-full text-sm font-medium"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
