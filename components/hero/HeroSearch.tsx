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
  const [bedrooms, setBedrooms] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (category) params.set('category', category);
    if (bedrooms) params.set('bedrooms', bedrooms);
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
      className="w-full rounded-3xl bg-white/95 dark:bg-[#0d1422]/95 backdrop-blur-xl p-4 sm:p-5 shadow-subtle-saas border border-slate-200/80 dark:border-slate-800/80 space-y-3"
    >
      {/* Interactive Tabs Header */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('rent')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'rent'
              ? 'bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white shadow-md shadow-sky-500/20'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Rent</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('buy')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'buy'
              ? 'bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white shadow-md shadow-sky-500/20'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Buy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('short')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'short'
              ? 'bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] text-white shadow-md shadow-sky-500/20'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Short Stay</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        {/* Location Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1 pl-1">
            <MapPin className="h-3.5 w-3.5 text-[#0EA5E9]" /> Location
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 transition-all cursor-pointer appearance-none"
            >
              <option value="" className="bg-white dark:bg-[#0d1422] text-slate-900 dark:text-slate-100">Any Location</option>
              {CITIES.filter((c) => c !== 'All').map((city) => (
                <option key={city} value={city} className="bg-white dark:bg-[#0d1422] text-slate-900 dark:text-slate-100">
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* Property Type Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1 pl-1">
            <Home className="h-3.5 w-3.5 text-[#2563EB]" /> Property Type
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 transition-all cursor-pointer appearance-none"
            >
              <option value="" className="bg-white dark:bg-[#0d1422] text-slate-900 dark:text-slate-100">All Types</option>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat} className="bg-white dark:bg-[#0d1422] text-slate-900 dark:text-slate-100">
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* Bedrooms Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1 pl-1">
            <Sparkles className="h-3.5 w-3.5 text-[#0EA5E9]" /> Bedrooms
          </label>
          <div className="relative">
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 transition-all cursor-pointer appearance-none"
            >
              <option value="" className="bg-white dark:bg-[#0d1422] text-slate-900 dark:text-slate-100">Any Beds</option>
              <option value="1" className="bg-white dark:bg-[#0d1422] text-slate-900 dark:text-slate-100">1+ Bed</option>
              <option value="2" className="bg-white dark:bg-[#0d1422] text-slate-900 dark:text-slate-100">2+ Beds</option>
              <option value="3" className="bg-white dark:bg-[#0d1422] text-slate-900 dark:text-slate-100">3+ Beds</option>
              <option value="4" className="bg-white dark:bg-[#0d1422] text-slate-900 dark:text-slate-100">4+ Beds</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* Max Budget */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1 pl-1">
            <span className="text-[#0EA5E9] font-bold text-xs">৳</span> Max Budget
          </label>
          <input
            type="number"
            placeholder="Max ৳"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 transition-all"
          />
        </div>

        {/* Submit Search Button */}
        <div>
          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] hover:from-[#0EA5E9]/90 hover:to-[#2563EB]/90 text-white font-extrabold text-xs gap-2 shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
          >
            <Search className="h-4 w-4 shrink-0 text-white" />
            <span className="text-white">Search</span>
          </Button>
        </div>
      </div>
    </motion.form>
  );
}

