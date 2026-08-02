'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Bed, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, CITIES } from '@/types/property';

export function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms) params.set('bedrooms', bedrooms);

    const queryString = params.toString();
    router.push(queryString ? `/properties?${queryString}` : '/properties');
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full rounded-3xl border border-white/20 bg-background/75 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl shadow-primary/10 ring-1 ring-black/5 dark:ring-white/10 transition-all hover:shadow-3xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
        {/* Location Select */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1 pl-1">
            <MapPin className="h-3.5 w-3.5 text-primary" /> Location
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold text-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer appearance-none"
            >
              <option value="">Any Location</option>
              {CITIES.filter((c) => c !== 'All').map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Property Type Select */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1 pl-1">
            <Home className="h-3.5 w-3.5 text-primary" /> Property Type
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold text-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer appearance-none"
            >
              <option value="">All Types</option>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Price Range (Min - Max) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1 pl-1">
            <DollarSign className="h-3.5 w-3.5 text-primary" /> Price Range
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <input
              type="number"
              placeholder="Min $"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full h-12 px-3 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold text-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
            <input
              type="number"
              placeholder="Max $"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-12 px-3 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold text-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
        </div>

        {/* Bedrooms Select */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1 pl-1">
            <Bed className="h-3.5 w-3.5 text-primary" /> Bedrooms
          </label>
          <div className="relative">
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold text-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer appearance-none"
            >
              <option value="">Any Beds</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Submit Search Button */}
        <div className="pt-1 sm:pt-0">
          <Button
            type="submit"
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs gap-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span>Search Properties</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
