"use client";

import React, { useState } from "react";
import { InfoPageLayout } from "@/components/shared/InfoPageLayout";
import { HelpCircle, ChevronDown, Search, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

const FAQ_ITEMS = [
  {
    category: "General",
    question: "What is Thikana?",
    answer: "Thikana is Bangladesh's modern luxury rental marketplace connecting verified tenants with property owners. We provide 100% verified property listings, transparent Taka (৳) pricing, and digital lease booking without hidden broker commissions.",
  },
  {
    category: "General",
    question: "Is Thikana available across all cities in Bangladesh?",
    answer: "Yes! While our primary property coverage includes major hubs like Dhaka (Gulshan, Banani, Uttara, Dhanmondi, Mirpur, Mohakhali) and Chittagong, we are actively expanding across Sylhet, Rajshahi, and Khulna.",
  },
  {
    category: "Renters",
    question: "Are there any hidden broker fees for tenants?",
    answer: "No. Browsing properties, contacting landlords, and scheduling viewings on Thikana is 100% free for renters. You only pay the agreed monthly rent and deposit specified transparently on the property page.",
  },
  {
    category: "Renters",
    question: "How do I book a property or schedule a viewing?",
    answer: "Click on any property card to view details, then click 'Book Now' or 'Schedule Viewing' to submit your move-in date. The landlord will receive your request immediately and confirm the schedule.",
  },
  {
    category: "Landlords",
    question: "How do I list my property on Thikana?",
    answer: "Click 'List Property' in the menu or footer, sign in as a Landlord, fill in your property details, upload photos, and set your monthly price (৳). Our quality team will verify your listing within 24 hours.",
  },
  {
    category: "Landlords",
    question: "How do rent payouts work for landlords?",
    answer: "Rent payouts are transferred directly to your registered Bangladeshi bank account, bKash, or Nagad wallet. Automated digital receipts are generated instantly for both you and your tenant.",
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <InfoPageLayout
      badge="Frequently Asked Questions"
      badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-[#2563EB] dark:text-sky-400" />}
      title="How Can We Help You?"
      subtitle="Find quick answers to common questions about renting, property listings, payments, and account security on Thikana."
      ctaTitle="Still Have Questions?"
      ctaDescription="Our support team is available 24/7 to assist you with any questions or issues."
      ctaButtonText="Contact Support"
      ctaButtonHref="/contact"
    >
      <div className="space-y-12 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search questions by keyword (e.g., rent, deposit, listing, bKash)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 pl-12 pr-4 rounded-2xl bg-card border-border/80 text-sm placeholder:text-muted-foreground shadow-xs"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-3xl bg-card border border-border/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-foreground text-sm sm:text-base cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-bold text-foreground">No questions found matching "{searchTerm}"</p>
              <p className="text-xs text-muted-foreground">Try searching with a different keyword or contact support.</p>
            </div>
          )}
        </div>
      </div>
    </InfoPageLayout>
  );
}
