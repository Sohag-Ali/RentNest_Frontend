import { ReactNode } from 'react';

interface TenantLayoutProps {
  children: ReactNode;
}

/**
 * TenantLayout Component
 * 
 * Why this file exists:
 * Wraps tenant portal sub-pages (/dashboard/tenant/...).
 * 
 * Note:
 * The parent `dashboard/layout.tsx` already renders the main Sidebar and TopNavbar.
 * Returning `{children}` directly prevents duplicate navbars and nested scrollbars.
 */
export default function TenantLayout({ children }: TenantLayoutProps) {
  return <>{children}</>;
}
