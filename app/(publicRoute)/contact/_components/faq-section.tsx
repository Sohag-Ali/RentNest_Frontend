'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I list my property on RentNest?',
    answer:
      'Listing your property on RentNest is simple! Create an account, provide your property details, add high-resolution photos, set your rental terms, and verify your landlord profile. Our team will review and approve your listing within a few hours.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and Stripe digital payments. All transactions are protected with bank-grade encryption.',
  },
  {
    question: 'How quickly can I receive rental payouts?',
    answer:
      'Payouts are processed automatically upon lease confirmation. Depending on your bank, funds typically arrive within 1 to 2 business days. You can track payment status in real-time from your landlord dashboard.',
  },
  {
    question: 'What is the lease agreement process?',
    answer:
      'Once a tenant submits a booking request and the landlord accepts, a digital lease agreement is generated automatically. Both parties sign securely online with full legal compliance.',
  },
  {
    question: 'How do I contact customer support?',
    answer:
      'You can reach our support team via email at support@rentnest.com, phone at +1-800-RENTNEST, or through the contact form above. Our average response time is under 2 hours.',
  },
];

export function FAQSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <Badge variant="glass" className="gap-1.5 px-3.5 py-1 text-xs">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>Got Questions?</span>
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
            Find instant answers to common questions about RentNest rentals, payments, and digital leases.
          </p>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl px-6 data-[state=open]:bg-card/90 data-[state=open]:border-primary/40 shadow-xs transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors py-5 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
