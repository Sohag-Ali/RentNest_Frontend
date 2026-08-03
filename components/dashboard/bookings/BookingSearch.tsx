"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BookingSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function BookingSearch({
  value,
  onChange,
  placeholder = "Search by property name or tenant name...",
}: BookingSearchProps) {
  const [searchTerm, setSearchTerm] = useState(value);

  // Sync internal state if parent value changes externally
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Debounce search update to parent
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== value) {
        onChange(searchTerm);
      }
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onChange, value]);

  const handleClear = () => {
    setSearchTerm("");
    onChange("");
  };

  return (
    <div className="relative flex-1 min-w-[240px]">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-9 h-10 rounded-2xl bg-card/80 dark:bg-card/40 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm font-medium transition-all shadow-xs"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors cursor-pointer"
          title="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
