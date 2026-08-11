'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Building2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LandlordOverviewHeaderProps {
  landlordName: string;
  landlordAvatar?: string;
  landlordEmail?: string;
}

export function LandlordOverviewHeader({
  landlordName,
  landlordAvatar,
  landlordEmail,
}: LandlordOverviewHeaderProps) {
  const avatarUrl =
    landlordAvatar ||
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-600/10 via-sky-500/5 to-teal-500/10 border border-blue-500/20 shadow-xs relative overflow-hidden">
      <div className="space-y-1.5 z-10">
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            <Sparkles className="h-3 w-3 mr-1" /> Verified Landlord Account
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground font-heading">
          Welcome back,{' '}
          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent">
            {landlordName}
          </span>
          ! 👋
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Manage your properties, rental requests, tenants and earnings from one place.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 z-10">
        {/* Landlord Profile Avatar Pill */}
        <div className="flex items-center gap-3 p-2 pr-4 rounded-2xl bg-card border border-border/60 shadow-sm shrink-0">
          <div className="relative h-11 w-11 rounded-xl overflow-hidden border border-primary/20 shrink-0 bg-muted">
            <Image
              src={avatarUrl}
              alt={landlordName}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="space-y-0.5 text-left">
            <p className="text-xs font-bold text-foreground line-clamp-1">{landlordName}</p>
            <p className="text-[10px] text-primary font-semibold flex items-center gap-1">
              <Building2 className="h-3 w-3" /> Property Owner
            </p>
          </div>
        </div>

        {/* Add Property CTA */}
        <Link href="/dashboard/landlord/properties/new">
          <Button className="rounded-2xl gap-2 font-bold text-xs bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all hidden md:flex">
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
