import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTaka(amount: number | string, options: { decimals?: number } = {}): string {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  const decimals = options.decimals ?? 0;
  return `৳${num.toLocaleString('en-BD', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

