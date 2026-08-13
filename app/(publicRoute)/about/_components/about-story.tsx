'use client';

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building2, Award } from 'lucide-react';

export function AboutStory() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Image */}
          <div className="relative h-[380px] sm:h-[450px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-luxury border border-border/80 order-2 lg:order-1 group">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
              alt="RentNest Architecture and Design"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Ambient Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />

            {/* Floating Glass Stats Badge */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-card border border-white/20 text-white flex items-center gap-4 shadow-lg">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Award-Winning Platform</p>
                <p className="text-xs text-slate-300">Empowering tenants & landlords since 2020</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit text-xs font-semibold">
                Founded in 2020
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.15]">
                Our Story
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-muted-foreground">
              <p className="text-base sm:text-lg leading-relaxed">
                Thikana was founded with a simple mission: to transform the rental market by making it transparent, secure, and completely hassle-free. Our founders experienced the frustration of finding verified rental properties and decided to build a modern platform tailored for renters and landlords alike.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Since our launch, we&apos;ve grown to serve thousands of happy tenants and landlords across 100+ cities, creating a marketplace built on trust, verified properties, and digital lease agreements.
              </p>
            </div>

            <Separator className="my-2 bg-border/60" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5 p-4 rounded-2xl bg-card border border-border/70">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" /> Our Mission
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  To simplify the rental experience by connecting tenants with verified properties in a secure, digital environment.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-card border border-border/70">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-500" /> Our Vision
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  To become the premier global rental platform where finding a home is intuitive, affordable, and empowering for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
