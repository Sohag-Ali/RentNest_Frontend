'use client';

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
      'Listing your property on RentNest is simple! Create an account, provide your property details, add photos, set your rental terms, and verify your property information. Our team will review and approve your listing within 24-48 hours.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, bank transfers, and PayPal. All transactions are secured with industry-standard encryption to protect your financial information.',
  },
  {
    question: 'How quickly can I receive my payment?',
    answer:
      'Payments are processed every 7 days. Depending on your bank, funds typically arrive within 1-3 business days after processing. You can track payment status in your dashboard anytime.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Our flexible cancellation policy allows free cancellation up to 14 days before your booking date. Cancellations within 14 days are subject to a 50% charge. We also offer travel protection for unexpected emergencies.',
  },
  {
    question: 'How do I contact customer support?',
    answer:
      'You can reach our support team via email at support@rentnest.com, phone at +1 (555) 123-4567, or through our live chat feature available 24/7 on our website. Average response time is under 2 hours.',
  },
];

export function FAQSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about RentNest and our services.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border/50 bg-card/30 rounded-lg px-6 data-[state=open]:bg-card/50 transition-all duration-300"
            >
              <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-300 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
