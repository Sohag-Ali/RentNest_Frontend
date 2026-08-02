'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '5,000+', label: 'Verified Properties' },
  { value: '2,000+', label: 'Happy Tenants' },
  { value: '700+', label: 'Trusted Landlords' },
  { value: '50+', label: 'Top Cities' },
];

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 w-full"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-white/10 dark:border-white/10 bg-card/60 backdrop-blur-xl p-3.5 text-center shadow-md shadow-black/5 hover:border-primary/40 hover:bg-card/80 transition-all cursor-default"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
            className="text-xl sm:text-2xl font-extrabold font-mono bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent"
          >
            {stat.value}
          </motion.div>
          <div className="text-[11px] font-semibold text-muted-foreground mt-0.5">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
