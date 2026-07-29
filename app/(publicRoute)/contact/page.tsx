
import { Separator } from '@/components/ui/separator';
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
      <section id="contact-form" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have any questions or feedback? We&apos;d love to hear from you. Send us a message and our team will respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
