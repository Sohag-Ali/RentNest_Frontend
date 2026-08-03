import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { ContactCards } from './_components/contact-cards';
import { HeroSection } from './_components/hero-section';
import { ContactForm } from './_components/contact-form';
import { ContactInfo } from './_components/contact-info';
import { MapSection } from './_components/map-section';
import { FAQSection } from './_components/faq-section';
import { CTASection } from './_components/cta-section';

export default function ContactPage() {
  return (
    <main className="w-full bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Cards */}
      <ContactCards />

      {/* Main Contact Section */}
      <section id="contact-form" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Badge variant="glass" className="gap-1.5 px-3.5 py-1 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>We Are Here to Help</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Get in Touch with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent">
                RentNest
              </span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
              Have questions, feedback, or need help with a property listing? Send us a message and our support team will respond within a few hours.
            </p>
          </div>

          {/* Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <Separator className="opacity-40" />

      {/* Map Section */}
      <MapSection />

      <Separator className="opacity-40" />

      {/* FAQ Section */}
      <FAQSection />

      <Separator className="opacity-40" />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
