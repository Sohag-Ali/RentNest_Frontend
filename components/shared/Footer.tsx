'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, ChevronRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  variant?: 'default' | 'compact';
  showNewsletter?: boolean;
}

export function Footer({
  variant = 'default',
  showNewsletter = true,
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
      ],
    },
    {
      title: 'For Renters',
      links: [
        { label: 'Browse Properties', href: '/properties' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Safety Tips', href: '/safety' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
    {
      title: 'For Landlords',
      links: [
        { label: 'List Property', href: '/list-property' },
        { label: 'Landlord Guide', href: '/landlord-guide' },
        { label: 'Tenant Screening', href: '/screening' },
        { label: 'Resources', href: '/resources' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Help Center', href: '/help' },
        { label: 'Status Page', href: 'https://status.rentnest.com' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Share2, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:support@rentnest.com', label: 'Email' },
    { icon: Phone, href: 'tel:+1-800-RENTNEST', label: 'Phone' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
  ];

  if (variant === 'compact') {
    return (
      <footer className="border-t border-white/10 bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} RentNest. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-white/10 bg-background">
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="border-b border-white/10 bg-gradient-to-r from-primary/5 via-background to-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Stay Updated
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Subscribe to our newsletter for the latest properties and rental tips delivered to your inbox.
                </p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10"
                  required
                />
                <Button
                  type="submit"
                  className="whitespace-nowrap"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Footer Grid */}
          <div className="grid gap-12 md:grid-cols-5">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <Link href="/" className="inline-block">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
                    🏠
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    RentNest
                  </span>
                </div>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Find your perfect rental home with RentNest, the modern marketplace for property rentals.
              </p>

              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <div className="flex gap-3">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:support@rentnest.com"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    support@rentnest.com
                  </a>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href="tel:+1-800-RENTNEST"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    +1-800-RENTNEST
                  </a>
                </div>
                <div className="flex gap-3">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    San Francisco, CA 94105
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="md:col-span-1">
                <h4 className="font-semibold text-foreground">
                  {section.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                        <ChevronRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="my-8 bg-white/10" />

          {/* Bottom Footer */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {currentYear} RentNest. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Love Icon */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              Made with
              <Heart className="h-4 w-4 fill-primary text-primary" />
              for renters everywhere
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
