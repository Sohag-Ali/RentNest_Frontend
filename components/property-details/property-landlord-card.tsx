'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Landlord } from '@/types/property';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2Icon,
  StarIcon,
  MessageSquareIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SendIcon,
} from 'lucide-react';

interface PropertyLandlordCardProps {
  landlord: Landlord;
}

export function PropertyLandlordCard({ landlord }: PropertyLandlordCardProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMessageSent(true);
    setTimeout(() => {
      setIsMessageSent(false);
      setIsContactOpen(false);
      setMessageText('');
    }, 2000);
  };

  return (
    <>
      <Card className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-6 shadow-xl shadow-blue-500/5 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-[#2563EB]/40 shadow-md">
                <AvatarImage src={landlord.avatar} alt={landlord.name || 'Landlord'} />
                <AvatarFallback className="bg-slate-800 text-white font-extrabold text-base">
                  {landlord.name ? landlord.name[0] : 'L'}
                </AvatarFallback>
              </Avatar>
              {landlord.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white p-1 rounded-full shadow-xs">
                  <CheckCircle2Icon className="h-4 w-4" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-heading">
                  {landlord.name}
                </h3>
                {landlord.isVerified && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 rounded-full"
                  >
                    Verified Host
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                Member since {landlord.joinedDate}
              </p>

              {landlord.isSuperhost && (
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                  <ShieldCheckIcon className="h-3.5 w-3.5" />
                  <span>Superhost Credentials</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="flex-1 sm:flex-initial">
              <Button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto rounded-2xl h-11 px-5 gap-2 bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] hover:from-blue-700 hover:to-teal-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer"
              >
                <MessageSquareIcon className="h-4 w-4" />
                Send Message
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                variant="outline"
                onClick={() => setIsContactOpen(true)}
                className="rounded-2xl h-11 px-4 gap-2 border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <PhoneIcon className="h-4 w-4 text-[#2563EB]" />
                Contact
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 text-center">
          <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-center gap-1 text-sm font-extrabold text-slate-900 dark:text-white font-mono">
              <StarIcon className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>{landlord.rating}</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Rating</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
              {landlord.responseRate}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Response Rate</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono truncate">
              {landlord.responseTime}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Response Time</span>
          </div>
        </div>
      </Card>

      {/* Contact Dialog Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="rounded-3xl bg-slate-950 text-white border border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">
              Contact {landlord.name}
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Direct inquiry to property landlord. Expect a response within 1 hour.
            </DialogDescription>
          </DialogHeader>

          {isMessageSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2Icon className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
              <p className="text-xs text-slate-400">
                {landlord.name} will review your inquiry and get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Direct Email</label>
                <Input value={landlord.email} readOnly className="rounded-2xl bg-slate-900 border-white/10 text-slate-200 text-xs font-mono" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Phone Number</label>
                <Input value={landlord.phone} readOnly className="rounded-2xl bg-slate-900 border-white/10 text-slate-200 text-xs font-mono" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Hi ${landlord.name}, I am interested in scheduling a viewing...`}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 p-3.5 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#2563EB] outline-none"
                />
              </div>

              <Button type="submit" className="w-full rounded-2xl h-12 font-semibold gap-2 bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] text-white shadow-md cursor-pointer">
                <SendIcon className="h-4 w-4" />
                Submit Inquiry
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
