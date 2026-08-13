'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Sparkles, Building2, Key, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, CITIES } from '@/types/property';

export function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'rent' | 'buy' | 'short'>('rent');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);

    const queryString = params.toString();
    router.push(queryString ? `/properties?${queryString}` : '/properties');
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full rounded-3xl glass-card p-4 sm:p-5 shadow-luxury border border-border/80 transition-all space-y-3"
    >
      {/* Interactive Tabs Header (Rent / Buy / Short Stay) */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('rent')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'rent'
              ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Rent Long-Term</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('buy')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'buy'
              ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Buy Property</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('short')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'short'
              ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Short Stays</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
        {/* Location Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-wider flex items-center gap-1 pl-1">
            <MapPin className="h-3.5 w-3.5 text-primary" /> Location
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-card dark:bg-slate-900/80 border border-border text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none shadow-xs"
            >
              <option value="" className="bg-card text-foreground">Any Location</option>
              {CITIES.filter((c) => c !== 'All').map((city) => (
                <option key={city} value={city} className="bg-card text-foreground">
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* Property Type Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-wider flex items-center gap-1 pl-1">
            <Home className="h-3.5 w-3.5 text-sky-500" /> Property Type
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-card dark:bg-slate-900/80 border border-border text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none shadow-xs"
            >
              <option value="" className="bg-card text-foreground">All Types</option>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat} className="bg-card text-foreground">
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* Price Range (Min - Max) */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-wider flex items-center gap-1 pl-1">
            <span className="text-teal-500 font-bold text-xs">৳</span> Max Budget
          </label>
          <input
            type="number"
            placeholder="Max ৳"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-card dark:bg-slate-900/80 border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
          />
        </div>

        {/* Submit Search Button */}
        <div>
          <Button
            type="submit"
            variant="gradient"
            className="w-full h-11 rounded-xl text-white font-extrabold text-xs gap-2 shadow-md shadow-blue-500/25 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
          >
            <Search className="h-4 w-4 shrink-0 text-white" />
            <span className="text-white">Search Homes</span>
          </Button>
        </div>
      </div>
    </motion.form>
  );
}

