'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ThikanaLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  onClick?: () => void;
}

export function ThikanaLogo({
  className = '',
  iconOnly = false,
  size = 'md',
  href = '/',
  onClick,
}: ThikanaLogoProps) {
  const sizeMap = {
    sm: { icon: 'h-7 w-7 rounded-lg', svgSize: 18, text: 'text-lg', dot: 'w-1.5 h-1.5' },
    md: { icon: 'h-9 w-9 rounded-xl', svgSize: 22, text: 'text-xl', dot: 'w-2 h-2' },
    lg: { icon: 'h-11 w-11 rounded-2xl', svgSize: 26, text: 'text-2xl', dot: 'w-2.5 h-2.5' },
    xl: { icon: 'h-14 w-14 rounded-2xl', svgSize: 32, text: 'text-3xl', dot: 'w-3 h-3' },
  };

  const currentSize = sizeMap[size];

  const logoContent = (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`} onClick={onClick}>
      {/* Animated Emblem Badge */}
      <motion.div
        whileHover={{ scale: 1.06, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center justify-center bg-gradient-to-br from-blue-600 via-sky-500 to-teal-500 text-white shadow-md shadow-blue-500/25 group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300 ${currentSize.icon}`}
      >
        {/* Roof + T Icon SVG */}
        <svg
          width={currentSize.svgSize}
          height={currentSize.svgSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white drop-shadow-sm"
        >
          {/* Roof Peak */}
          <path d="M 50 16 L 76 38 L 68 38 L 68 44 L 50 28 L 32 44 L 32 38 Z" fill="currentColor" opacity="0.95" />
          {/* T Top Bar */}
          <path d="M 22 36 C 22 32, 25 30, 30 30 L 70 30 C 75 30, 78 32, 78 36 L 78 38 C 78 42, 75 44, 70 44 L 30 44 C 25 44, 22 42, 22 38 Z" fill="currentColor" />
          {/* T Stem */}
          <path d="M 42 44 L 58 44 L 58 74 C 58 78, 55 81, 50 81 C 45 81, 42 78, 42 74 Z" fill="currentColor" />
          {/* Location Pin Dot */}
          <circle cx="50" cy="58" r="5" fill="#38bdf8" />
        </svg>
      </motion.div>

      {/* Brand Text */}
      {!iconOnly && (
        <span className={`font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 flex items-center ${currentSize.text}`}>
          Thikana
          <span className={`inline-block ml-0.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 ${currentSize.dot}`} />
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
