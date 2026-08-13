'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Share2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThikanaLogo } from './ThikanaLogo';

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
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blogs' },
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
        { label: 'Tenant Screening', href: '/tenant-screening' },
        { label: 'Resources', href: '/resources' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Help Center', href: '/help' },
        { label: 'Status Page', href: '/status' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Share2, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:support@thikana.com', label: 'Email' },
    { icon: Phone, href: 'tel:+1-800-THIKANA', label: 'Phone' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  if (variant === 'compact') {
    return (
      <footer className="relative overflow-hidden bg-gradient-to-b from-slate-50/60 via-slate-100/40 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 py-8 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                © {currentYear} Thikana. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-xs font-medium text-slate-500 hover:text-[#2563EB] dark:text-slate-400 dark:hover:text-sky-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded px-1"
                >
                  <span>{link.label}</span>
                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-50/60 via-slate-100/50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Background Soft Glow Effects & Top Gradient Line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[550px] h-[550px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent dark:from-blue-950/20" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

      {/* Newsletter Glass Card Section */}
      {showNewsletter && (
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-blue-500/5 p-8 sm:p-10 lg:p-12"
          >
            {/* Ambient internal card radial glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-teal-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid gap-8 lg:grid-cols-12 items-center relative z-10">
              <div className="lg:col-span-7 space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-[#2563EB] dark:text-sky-400 text-xs font-semibold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />
                  <span>Stay Informed</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Stay Updated with Thikana
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                  Subscribe to our newsletter for curated luxury properties, exclusive market insights, and tenant tips delivered directly to your inbox.
                </p>
              </div>

              <div className="lg:col-span-5">
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                  aria-label="Subscribe to Thikana newsletter"
                >
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your work or personal email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Email address"
                      className="h-12 px-4 rounded-xl bg-slate-50/90 dark:bg-slate-800/90 border-slate-200/90 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:border-transparent transition-all duration-300 text-sm shadow-inner"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] hover:from-blue-700 hover:to-teal-600 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    {subscribed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Footer Grid & Links */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-10 md:grid-cols-5 lg:gap-12"
        >
          {/* Brand & Social Section */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
            <ThikanaLogo size="lg" />

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Find your perfect rental home with Thikana, the modern luxury marketplace for verified property rentals in Bangladesh.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-sky-400 group-hover:scale-110 transition-transform duration-200">
                  <Mail className="h-4 w-4" />
                </div>
                <a
                  href="mailto:support@thikana.com"
                  className="transition-colors duration-200 hover:text-[#2563EB] dark:hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                >
                  support@thikana.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-sky-400 group-hover:scale-110 transition-transform duration-200">
                  <Phone className="h-4 w-4" />
                </div>
                <a
                  href="tel:+1-800-THIKANA"
                  className="transition-colors duration-200 hover:text-[#2563EB] dark:hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                >
                  +1-800-THIKANA
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-sky-400 group-hover:scale-110 transition-transform duration-200">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>San Francisco, CA 94105</span>
              </div>
            </div>

            {/* Glass Social Icon Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 backdrop-blur-md hover:text-[#2563EB] hover:border-[#2563EB]/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 hover:shadow-[0_0_15px_rgba(37,99,235,0.25)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Section Navigation Links */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants} className="md:col-span-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-base tracking-tight mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-sky-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded py-0.5"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-[#2563EB] opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Separator Divider */}
        <div className="my-8 sm:my-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

        {/* Bottom Legal & Signature Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500 dark:text-slate-400">
          <p className="font-medium">
            © {currentYear} Thikana. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-xs font-medium text-slate-500 hover:text-[#2563EB] dark:text-slate-400 dark:hover:text-sky-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Love Signature */}
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 fill-[#2563EB] text-[#2563EB] animate-pulse" />
            <span>for renters everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
