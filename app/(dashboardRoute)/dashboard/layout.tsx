'use client';

import { ReactNode } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { SidebarNav } from '../_components/sidebar-nav';
import { TopNavbar } from '../_components/top-navbar';
import { ThikanaLogo } from '@/components/shared/ThikanaLogo';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardMobileDrawer() {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-[280px] sm:w-[320px] max-w-[85vw] p-0 h-[100dvh] bg-background border-r border-border z-50 flex flex-col"
      >
        <SheetHeader className="p-4 border-b border-border/50 flex flex-row items-center justify-between space-y-0 shrink-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <ThikanaLogo size="md" />
          <SheetClose render={
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Button>
          } />
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarNav
            onNavItemClick={() => setOpenMobile(false)}
            layoutIdPrefix="mobile"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden bg-background w-full">
        {/* Desktop Sidebar (hidden on mobile) */}
        <Sidebar className="hidden md:flex border-r border-border">
          <SidebarHeader className="p-4 border-b border-border/50">
            <ThikanaLogo size="md" />
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarNav layoutIdPrefix="desktop" />
          </SidebarContent>
        </Sidebar>

        {/* Mobile Navigation Drawer */}
        <DashboardMobileDrawer />

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden w-full min-w-0">
          <TopNavbar />
          <main className="flex-1 overflow-y-auto">
            <div className="h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
