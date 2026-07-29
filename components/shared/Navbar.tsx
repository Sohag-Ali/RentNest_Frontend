'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun, Home, Building2, Info, Mail, Bell, LogOut, Settings, User as UserIcon, LayoutDashboard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { getCurrentUser } from '@/service/getCurrentUser';
import { logoutAction } from '@/app/(authRoute)/_actions/authActions';
import { User } from '@/lib/types/user.type';
import { toast } from 'sonner';

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export interface NavbarProps {
  user?: User | null;
  isAuthenticated?: boolean;
  userRole?: 'tenant' | 'landlord' | 'admin';
  userName?: string;
  userImage?: string;
}

export function Navbar({
  user: propUser,
  isAuthenticated: propIsAuthenticated,
  userRole: propUserRole,
  userName: propUserName,
  userImage: propUserImage,
}: NavbarProps) {
  const mounted = useHydrated();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getCurrentUser().then((res) => {
      if (res?.success && res?.data) {
        setFetchedUser(res.data);
      } else {
        setFetchedUser(null);
      }
    });
  }, [pathname]);

  const activeUser = fetchedUser ?? propUser;
  const isAuthenticated = propIsAuthenticated ?? Boolean(activeUser);
  const rawRole = propUserRole ?? activeUser?.role;
  const userRole = (typeof rawRole === 'string' ? rawRole.toLowerCase() : 'tenant') as 'tenant' | 'landlord' | 'admin';
  const userName = propUserName ?? activeUser?.name ?? (activeUser?.email ? activeUser.email.split('@')[0] : 'User');
  const userImage = propUserImage ?? activeUser?.image ?? activeUser?.avatar ?? 'https://github.com/shadcn.png';

  const handleLogout = async () => {
    setFetchedUser(null);
    toast.success("Logged Out Successfully 👋", {
      description: "You have been logged out of your account.",
    });
    await logoutAction();
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/properties', label: 'Properties', icon: Building2 },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  const getDashboardRoute = () => {
    switch (userRole) {
      case 'landlord':
        return '/dashboard/landlord';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/dashboard/tenant';
    }
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-black/40 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Home size={20} />
            </div>
            <span className="hidden font-bold text-foreground sm:inline-block">RentNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive(link.href) ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Desktop: Guest or Authenticated */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                  </Button>

                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-full cursor-pointer focus:outline-none">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userImage} alt={userName} />
                        <AvatarFallback>
                          {userName
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium text-foreground">{userName}</p>
                        <p className="text-xs capitalize text-muted-foreground">{userRole} Account</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href={getDashboardRoute()} className="flex items-center gap-2 w-full">
                          <LayoutDashboard size={18} />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href="/profile" className="flex items-center gap-2 w-full">
                          <UserIcon size={18} />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href="/settings" className="flex items-center gap-2 w-full">
                          <Settings size={18} />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden cursor-pointer">
                <Button variant="ghost" size="icon">
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex h-full flex-col">
                  {/* Mobile Header */}
                  <div className="border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Home size={20} />
                      </div>
                      <span className="font-bold text-foreground">RentNest</span>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="space-y-2">
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                          >
                            <Button
                              variant={isActive(link.href) ? 'default' : 'ghost'}
                              className="w-full justify-start gap-2"
                            >
                              <Icon size={18} />
                              <span>{link.label}</span>
                            </Button>
                          </Link>
                        );
                      })}
                    </div>

                    {isAuthenticated && (
                      <>
                        <div className="my-4 border-t border-white/10" />
                        <div className="space-y-2">
                          <Link href={getDashboardRoute()} onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                              <LayoutDashboard size={18} />
                              <span>Dashboard</span>
                            </Button>
                          </Link>
                          <Link href="/profile" onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                              <UserIcon size={18} />
                              <span>Profile</span>
                            </Button>
                          </Link>
                          <Link href="/settings" onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                              <Settings size={18} />
                              <span>Settings</span>
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Footer */}
                  <div className="border-t border-white/10 px-6 py-4">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={userImage} alt={userName} />
                            <AvatarFallback>
                              {userName
                                .split(' ')
                                .map((n: string) => n[0])
                                .join('')
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{userName}</p>
                            <p className="text-xs capitalize text-muted-foreground">{userRole}</p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          className="w-full gap-2"
                          onClick={() => {
                            setIsOpen(false);
                            handleLogout();
                          }}
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Link href="/auth/login" className="flex-1" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Login
                          </Button>
                        </Link>
                        <Link href="/auth/register" className="flex-1" onClick={() => setIsOpen(false)}>
                          <Button className="w-full">Register</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
