"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Home, DollarSign, CreditCard, BarChart3, TrendingUp } from "lucide-react";
import { BookingSummary } from "@/types/booking";
import { Card } from "@/components/ui/card";

interface BookingStatsProps {
  summary: BookingSummary;
}

// Animated Counter component using Framer Motion
function CountUpNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 60, damping: 15 });
  const display = useTransform(spring, (current) => {
    return `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
  });
  const [renderedValue, setRenderedValue] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setRenderedValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return <span>{renderedValue}</span>;
}

export function BookingStats({ summary }: BookingStatsProps) {
  const statCards = [
    {
      id: "rented-properties",
      label: "Total Rented Properties",
      value: summary.totalRentedProperties || 0,
      prefix: "",
      suffix: "",
      icon: Home,
      gradient: "from-blue-600 to-indigo-600",
      glowColor: "rgba(37, 99, 235, 0.15)",
      badgeText: "+Active Listings",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      id: "total-revenue",
      label: "Total Revenue",
      value: summary.totalRevenue || 0,
      prefix: "৳",
      suffix: "",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.15)",
      badgeText: "Lifetime",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      id: "completed-payments",
      label: "Completed Payments",
      value: summary.totalCompletedPayments || 0,
      prefix: "",
      suffix: "",
      icon: CreditCard,
      gradient: "from-sky-500 to-cyan-600",
      glowColor: "rgba(14, 165, 233, 0.15)",
      badgeText: "Verified",
      badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    },
    {
      id: "average-price",
      label: "Average Property Price",
      value: summary.averagePropertyPrice || 0,
      prefix: "৳",
      suffix: "/mo",
      icon: BarChart3,
      gradient: "from-violet-600 to-purple-600",
      glowColor: "rgba(139, 92, 246, 0.15)",
      badgeText: "Portfolio Avg",
      badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {statCards.map((card, index) => {
        const IconComponent = card.icon;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 dark:bg-card/40 backdrop-blur-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 group">
              {/* Subtle background glow effect on hover */}
              <div
                className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-opacity duration-300 opacity-20 group-hover:opacity-40"
                style={{ backgroundColor: card.glowColor }}
              />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {card.label}
                  </span>
                  <div className="text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight font-heading flex items-baseline gap-1">
                    <CountUpNumber value={card.value} prefix={card.prefix} suffix={card.suffix} />
                  </div>
                </div>

                {/* Gradient Icon Container */}
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 shrink-0`}
                >
                  <IconComponent className="h-6 w-6 stroke-[2.2]" />
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${card.badgeColor} flex items-center gap-1`}>
                  <TrendingUp className="h-3 w-3" />
                  {card.badgeText}
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">Updated live</span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
