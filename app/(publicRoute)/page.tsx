'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'tenant' | 'landlord' | 'admin'>('tenant');

  return (
    <div className="w-full">
      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center gap-8 text-center">
            <div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Welcome to RentNest
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                A modern rental marketplace for finding your perfect home
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button
                onClick={() => setIsAuthenticated(!isAuthenticated)}
                variant={isAuthenticated ? 'default' : 'outline'}
                size="lg"
              >
                {isAuthenticated ? 'Logout' : 'Simulate Login'}
              </Button>

              {isAuthenticated && (
                <div className="flex gap-2">
                  {(['tenant', 'landlord', 'admin'] as const).map((role) => (
                    <Button
                      key={role}
                      onClick={() => setUserRole(role)}
                      variant={userRole === role ? 'default' : 'outline'}
                      size="sm"
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <p className="mt-2 text-sm text-muted-foreground">Active Properties</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary">50k+</div>
                <p className="mt-2 text-sm text-muted-foreground">Happy Renters</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary">100+</div>
                <p className="mt-2 text-sm text-muted-foreground">Cities Covered</p>
              </div>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Current State: <strong>{isAuthenticated ? `Authenticated (${userRole})` : 'Guest'}</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
