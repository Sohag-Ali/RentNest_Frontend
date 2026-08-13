'use client';

import { ReactNode } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { SidebarNav } from '../_components/sidebar-nav';
import { TopNavbar } from '../_components/top-navbar';
import { ThikanaLogo } from '@/components/shared/ThikanaLogo';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden bg-background w-full">
        {/* Sidebar */}
        <Sidebar className="hidden md:flex border-r border-border">
          <SidebarHeader className="p-4 border-b border-border/50">
            <ThikanaLogo size="md" />
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarNav />
          </SidebarContent>
        </Sidebar>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
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
