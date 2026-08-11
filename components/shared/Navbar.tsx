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
            ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border border-border/80 shadow-luxury py-2.5 px-4 sm:px-6'
            : 'bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg border border-border/50 shadow-sm py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full px-1"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-sky-500 to-teal-500 text-white shadow-md shadow-blue-500/25 group-hover:shadow-glow transition-all duration-300"
            >
              <Home size={18} className="text-white" />
            </motion.div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              RentNest
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-muted/60 dark:bg-slate-900/60 p-1 rounded-full border border-border/60">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 shadow-sm shadow-blue-500/25 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div
                    className={`flex items-center gap-2 ${
                      active
                        ? 'text-white font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
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
            {/* Notification Dropdown */}
            {isAuthenticated && <NotificationDropdown />}


            {/* Theme Toggle Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="rounded-full text-foreground/80 hover:text-foreground hover:bg-muted border border-border/60 h-9 w-9 cursor-pointer transition-all duration-200"
              >
                {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
              </Button>
            </motion.div>

            {/* Desktop Authenticated / Guest Controls */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary group">
                      <div className="p-0.5 rounded-full bg-gradient-to-r from-blue-500/40 to-teal-500/40 group-hover:from-blue-600 group-hover:to-teal-500 transition-all duration-300">
                        <Avatar className="h-8 w-8 border border-background">
                          <AvatarImage src={userImage} alt={userName} />
                          <AvatarFallback className="bg-muted text-foreground font-bold text-xs">
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
                      className="w-56 rounded-2xl bg-card border border-border text-card-foreground p-2 shadow-luxury"
                    >
                      <div className="px-3 py-2">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {userName}
                        </p>
                        <p className="text-xs capitalize text-primary font-medium">
                          {userRole} Account
                        </p>
                      </div>
                      <DropdownMenuSeparator className="bg-border my-1" />
                      <DropdownMenuItem className="cursor-pointer focus:bg-muted rounded-xl">
                        {pathname.startsWith('/dashboard') ? (
                          <Link
                            href="/"
                            className="flex items-center gap-2 w-full text-foreground"
                          >
                            <Globe size={16} className="text-sky-500" />
                            <span>Website</span>
                          </Link>
                        ) : (
                          <Link
                            href={getDashboardRoute()}
                            className="flex items-center gap-2 w-full text-foreground"
                          >
                            <LayoutDashboard
                              size={16}
                              className="text-sky-500"
                            />
                            <span>Dashboard</span>
                          </Link>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer focus:bg-muted rounded-xl">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 w-full text-foreground"
                        >
                          <UserIcon size={16} className="text-teal-500" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer focus:bg-muted rounded-xl">
                        <Link
                          href="/settings"
                          className="flex items-center gap-2 w-full text-foreground"
                        >
                          <Settings size={16} className="text-blue-600" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border my-1" />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer focus:bg-destructive/10 focus:text-destructive text-destructive gap-2 rounded-xl"
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
                      className="rounded-full text-foreground hover:bg-muted text-sm font-medium px-4 h-9 cursor-pointer"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button
                      size="sm"
                      variant="gradient"
                      className="rounded-full text-white text-sm font-semibold px-5 h-9 cursor-pointer"
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Navigation Sheet Drawer */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden inline-flex shrink-0 items-center justify-center rounded-full text-foreground bg-muted/60 border border-border hover:bg-muted size-9 cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-primary">
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 p-0 bg-card border-l border-border text-card-foreground shadow-luxury"
              >
                <div className="flex h-full flex-col">
                  {/* Mobile Header */}
                  <div className="border-b border-border px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-sky-500 to-teal-500 text-white font-bold">
                        <Home size={18} />
                      </div>
                      <span className="font-extrabold text-lg text-foreground">
                        RentNest
                      </span>
                    </div>
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
                                ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold shadow-sm'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
                        <div className="my-4 border-t border-border" />
                        <div className="space-y-2">
                          <Link
                            href={getDashboardRoute()}
                            onClick={() => setIsOpen(false)}
                            className="block"
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-3 rounded-2xl h-11 text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                              <LayoutDashboard
                                size={18}
                                className="text-sky-500"
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
                              className="w-full justify-start gap-3 rounded-2xl h-11 text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                              <UserIcon
                                size={18}
                                className="text-teal-500"
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
                              className="w-full justify-start gap-3 rounded-2xl h-11 text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                              <Settings
                                size={18}
                                className="text-blue-600"
                              />
                              <span>Settings</span>
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Footer Section */}
                  <div className="border-t border-border px-6 py-6 bg-muted/40">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={userImage} alt={userName} />
                            <AvatarFallback className="bg-muted text-foreground font-bold">
                              {userName
                                .split(' ')
                                .map((n: string) => n[0])
                                .join('')
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {userName}
                            </p>
                            <p className="text-xs capitalize text-primary font-medium">
                              {userRole}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          className="w-full gap-2 rounded-2xl h-11"
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
                            className="w-full rounded-2xl h-11"
                          >
                            Login
                          </Button>
                        </Link>
                        <Link
                          href="/auth/register"
                          className="flex-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <Button variant="gradient" className="w-full rounded-2xl h-11">
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
