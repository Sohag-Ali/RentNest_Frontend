'use client';

import { Separator } from '@/components/ui/separator';

export function AboutStory() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Image */}
          <div className="relative h-80 sm:h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 order-2 lg:order-1">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/30" />
                </div>
                <p className="text-muted-foreground">Company Story Image</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">Our Story</h2>

            <div className="flex flex-col gap-4 text-muted-foreground">
              <p className="text-base sm:text-lg leading-relaxed">
                RentNest was founded with a simple mission: to transform the rental market by making it more transparent, secure, and user-friendly. Our founders experienced the frustration of finding reliable rental properties and decided there had to be a better way.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Since our launch in 2020, we've grown to serve thousands of tenants and landlords across multiple cities, building a community based on trust and quality.
              </p>
            </div>

            <Separator className="my-2" />

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To simplify the rental experience by connecting tenants with verified properties and trustworthy landlords in a transparent and secure environment.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-foreground">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the most trusted rental platform globally, where finding a home is intuitive, affordable, and empowering for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
