'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  Moon,
  Sun,
  Home,
  Building2,
  Info,
  Mail,
  LogOut,
  Settings,
  User as UserIcon,
  LayoutDashboard,
  Globe,
  BookOpen,
} from 'lucide-react';

import { ThikanaLogo } from './ThikanaLogo';
import { ThemeToggle } from './ThemeToggle';
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
import { NotificationDropdown } from '@/components/shared/NotificationDropdown';
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
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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
  const userRole = (
    typeof rawRole === 'string' ? rawRole.toLowerCase() : 'tenant'
  ) as 'tenant' | 'landlord' | 'admin';
  const userName =
    propUserName ??
    activeUser?.name ??
    (activeUser?.email ? activeUser.email.split('@')[0] : 'User');
  const userImage =
    propUserImage ??
    activeUser?.image ??
    activeUser?.avatar ??
    'https://github.com/shadcn.png';

  const handleLogout = async () => {
    setFetchedUser(null);
    toast.success('Logged Out Successfully 👋', {
      description: 'You have been logged out of your account.',
    });
    await logoutAction();
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/properties', label: 'Properties', icon: Building2 },
    ...(isAuthenticated
      ? [{ href: '/blogs', label: 'Blogs', icon: BookOpen }]
      : []),
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
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none"
    >
      <nav
        aria-label="Main Navigation"
        className={`relative pointer-events-auto rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-subtle-saas py-2.5 px-4 sm:px-6'
            : 'bg-white/85 dark:bg-[#070b14]/85 backdrop-blur-lg border border-slate-200/70 dark:border-slate-800/70 shadow-xs py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <ThikanaLogo size="md" />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/20 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/60 dark:border-slate-700/50">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.22)] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div
                    className={`flex items-center gap-2 transition-colors duration-200 ${
                      active
                        ? 'text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-[#0EA5E9] dark:hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{link.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Notification Dropdown */}
            {isAuthenticated && <NotificationDropdown />}

            {/* Desktop Authenticated / Guest Controls */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] group">
                      <div className="p-0.5 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] group-hover:shadow-glow-blue transition-all duration-300">
                        <Avatar className="h-8 w-8 border border-white">
                          <AvatarImage src={userImage} alt={userName} />
                          <AvatarFallback className="bg-slate-100 text-slate-800 font-bold text-xs">
                            {userName
                              .split(' ')
                              .map((n: string) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 rounded-2xl bg-white dark:bg-[#0d1422] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-2 shadow-subtle-saas"
                    >
                      <div className="px-3 py-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {userName}
                        </p>
                        <p className="text-xs capitalize text-[#0EA5E9] dark:text-sky-400 font-medium">
                          {userRole} Account
                        </p>
                      </div>
                      <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />
                      <DropdownMenuItem className="cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800/80 rounded-xl">
                        {pathname.startsWith('/dashboard') ? (
                          <Link
                            href="/"
                            className="flex items-center gap-2 w-full text-slate-700 dark:text-slate-200"
                          >
                            <Globe size={16} className="text-[#0EA5E9] dark:text-sky-400" />
                            <span>Website</span>
                          </Link>
                        ) : (
                          <Link
                            href={getDashboardRoute()}
                            className="flex items-center gap-2 w-full text-slate-700 dark:text-slate-200"
                          >
                            <LayoutDashboard
                              size={16}
                              className="text-[#0EA5E9] dark:text-sky-400"
                            />
                            <span>Dashboard</span>
                          </Link>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800/80 rounded-xl">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 w-full text-slate-700 dark:text-slate-200"
                        >
                          <UserIcon size={16} className="text-[#2563EB] dark:text-blue-400" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800/80 rounded-xl">
                        <Link
                          href="/settings"
                          className="flex items-center gap-2 w-full text-slate-700 dark:text-slate-200"
                        >
                          <Settings size={16} className="text-sky-500 dark:text-sky-400" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer focus:bg-rose-50 dark:focus:bg-rose-950/40 focus:text-rose-600 dark:focus:text-rose-400 text-rose-600 dark:text-rose-400 gap-2 rounded-xl"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-sm font-medium px-4 h-9 cursor-pointer"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] hover:from-sky-600 hover:to-blue-700 text-white font-semibold text-sm px-5 h-9 cursor-pointer shadow-md shadow-sky-500/20"
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Navigation Sheet Drawer */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden inline-flex shrink-0 items-center justify-center rounded-full text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 size-9 cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-[#0EA5E9]">
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 p-0 bg-white border-l border-slate-200 text-slate-900 shadow-2xl"
              >
                <div className="flex h-full flex-col">
                  {/* Mobile Header */}
                  <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <ThikanaLogo size="sm" onClick={() => setIsOpen(false)} />
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block"
                        >
                          <Button
                            variant="ghost"
                            className={`w-full justify-start gap-3 rounded-2xl h-11 text-base ${
                              active
                                ? 'bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white font-bold shadow-md'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            <Icon size={18} />
                            <span>{link.label}</span>
                          </Button>
                        </Link>
                      );
                    })}

                    {isAuthenticated && (
                      <>
                        <div className="my-4 border-t border-slate-100" />
                        <div className="space-y-2">
                          <Link
                            href={getDashboardRoute()}
                            onClick={() => setIsOpen(false)}
                            className="block"
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-3 rounded-2xl h-11 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            >
                              <LayoutDashboard
                                size={18}
                                className="text-[#0EA5E9]"
                              />
                              <span>Dashboard</span>
                            </Button>
                          </Link>
                          <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="block"
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-3 rounded-2xl h-11 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            >
                              <UserIcon
                                size={18}
                                className="text-[#2563EB]"
                              />
                              <span>Profile</span>
                            </Button>
                          </Link>
                          <Link
                            href="/settings"
                            onClick={() => setIsOpen(false)}
                            className="block"
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-3 rounded-2xl h-11 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            >
                              <Settings
                                size={18}
                                className="text-sky-500"
                              />
                              <span>Settings</span>
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Footer Section */}
                  <div className="border-t border-slate-100 px-6 py-6 bg-slate-50">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-slate-200">
                            <AvatarImage src={userImage} alt={userName} />
                            <AvatarFallback className="bg-slate-100 text-slate-800 font-bold">
                              {userName
                                .split(' ')
                                .map((n: string) => n[0])
                                .join('')
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {userName}
                            </p>
                            <p className="text-xs capitalize text-[#0EA5E9] font-medium">
                              {userRole}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          className="w-full gap-2 rounded-2xl h-11 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
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
                      <div className="flex gap-3">
                        <Link
                          href="/auth/login"
                          className="flex-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <Button
                            variant="outline"
                            className="w-full rounded-2xl h-11 border-slate-200 text-slate-700 hover:bg-slate-100"
                          >
                            Login
                          </Button>
                        </Link>
                        <Link
                          href="/auth/register"
                          className="flex-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <Button className="w-full rounded-2xl h-11 bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white font-bold">
                            Register
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
