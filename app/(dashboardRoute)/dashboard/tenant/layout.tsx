'use client';

import { ReactNode } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { SidebarNav } from '../../_components/sidebar-nav';
import { TopNavbar } from '../../_components/top-navbar';


interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden bg-background w-full">
        {/* Sidebar */}
        <Sidebar className="hidden md:flex border-r border-border">
          <SidebarHeader className="p-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-sidebar-primary to-sidebar-primary/70 bg-clip-text text-transparent">
              RentNest
            </h1>
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
