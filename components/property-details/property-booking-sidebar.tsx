'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Property } from '@/types/property';
import { createRentalRequest } from '@/app/(publicRoute)/properties/_actions/rental-request.actions';
import { checkWishlistAction, toggleWishlistAction } from '@/app/(dashboardRoute)/dashboard/tenant/_actions/wishlist.actions';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  CalendarIcon,
  ShieldCheckIcon,
  HeartIcon,
  CheckCircle2Icon,
  SparklesIcon,
  CreditCardIcon,
  InfoIcon,
  Loader2Icon,
  MapPinIcon,
  LockIcon,
  LogInIcon,
  XCircleIcon,
} from 'lucide-react';

interface PropertyBookingSidebarProps {
  property: Property;
  isLoggedIn?: boolean;
}

export function PropertyBookingSidebar({
  property,
  isLoggedIn = false,
}: PropertyBookingSidebarProps) {
  const router = useRouter();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [moveInDate, setMoveInDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);

  const propertyId = (property as any)._id || property.id || '';

  React.useEffect(() => {
    async function checkWishlist() {
      if (!propertyId) return;
      const res = await checkWishlistAction(propertyId);
      if (res.success && res.isWishlisted) {
        setIsWishlisted(true);
      }
    }
    checkWishlist();
  }, [propertyId]);

  const handleToggleWishlist = async () => {
    if (!propertyId || isTogglingWishlist) return;
    setIsTogglingWishlist(true);
    try {
      const res = await toggleWishlistAction(propertyId);
      if (res.success) {
        setIsWishlisted(res.isWishlisted);
        toast.success(res.message || (res.isWishlisted ? 'Saved to your wishlist!' : 'Removed from wishlist.'));
      } else {
        toast.error(res.message || 'Please sign in as a tenant to save properties.');
      }
    } catch (err) {
      toast.error('Failed to update wishlist.');
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  const handleOpenBookingDialog = () => {
    if (!property.isAvailable) {
      toast.error('This property is currently not available for booking.');
      return;
    }

    if (isBookingSubmitted) {
      toast.info('Your booking request is pending landlord approval.');
      return;
    }

    setIsBookingOpen(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!moveInDate) {
      toast.error('Please select a move-in date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createRentalRequest({
        propertyId,
        moveInDate,
      });

      if (
        result.statusCode === 401 ||
        result.message?.toLowerCase().includes('not logged in')
      ) {
        toast.error('Session expired. Please log in again.');
        setIsBookingOpen(false);
        router.push('/auth/login');
        return;
      }

      if (result.success) {
        toast.success(
          'Booking request sent successfully. Please wait for landlord approval.'
        );
        setIsBookingOpen(false);
        setIsBookingSubmitted(true);
      } else {
        toast.error(
          result.message || 'Failed to submit booking request. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error submitting rental request:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const depositFormatted =
    property.overview?.depositAmount != null
      ? `৳${property.overview.depositAmount.toLocaleString()}`
      : 'N/A';

  return (
    <>
      <Card className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 sticky top-24 overflow-hidden">
        {/* Top Header Price Display */}
        <CardHeader className="p-6 pb-4 border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                ৳{property.price ? property.price.toLocaleString() : 0}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {' '}
                / month
              </span>
            </div>
            {property.isAvailable ? (
              <Badge
                variant="outline"
                className="text-xs font-bold gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 rounded-full"
              >
                <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-500" />
                Available
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-xs font-bold gap-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 rounded-full"
              >
                <XCircleIcon className="h-3.5 w-3.5 text-rose-500" />
                Not Available
              </Badge>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1 font-medium">
            <InfoIcon className="h-3.5 w-3.5 text-[#2563EB]" />
            Security Deposit: {depositFormatted} (Refundable)
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Rent Breakdown */}
          <div className="space-y-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 p-4 border border-slate-200/60 dark:border-slate-700/60 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Monthly Base Rent</span>
              <span className="font-mono text-slate-900 dark:text-white font-extrabold">
                ৳{property.price ? property.price.toLocaleString() : 0}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Estimated Security Deposit</span>
              <span className="font-mono text-slate-900 dark:text-white font-extrabold">
                {depositFormatted}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Lease Terms</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {property.overview?.leaseTerm || '12 Months'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
            <ShieldCheckIcon className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>Thikana Verified Guarantee Included</span>
          </div>

          {/* Action Button */}
          <div className="space-y-2.5 pt-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleOpenBookingDialog}
                disabled={!property.isAvailable || isBookingSubmitted}
                className={`w-full rounded-2xl h-12 text-sm font-extrabold gap-2 shadow-lg transition-all cursor-pointer ${
                  !property.isAvailable
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 cursor-not-allowed opacity-80'
                    : isBookingSubmitted
                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] hover:from-blue-700 hover:to-teal-600 text-white shadow-blue-500/25'
                }`}
              >
                {!property.isAvailable ? (
                  <>
                    <XCircleIcon className="h-4 w-4 text-rose-500" />
                    Not Available for Booking
                  </>
                ) : isBookingSubmitted ? (
                  <>
                    <CheckCircle2Icon className="h-4 w-4 text-amber-500" />
                    Pending Approval
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4 text-amber-300 fill-amber-300" />
                    Request Booking Now
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60">
          <Button
            variant="ghost"
            size="sm"
            disabled={isTogglingWishlist}
            onClick={handleToggleWishlist}
            className={`text-xs font-bold gap-1.5 cursor-pointer ${
              isWishlisted ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <HeartIcon
              className={`h-4 w-4 ${isWishlisted ? 'fill-rose-500' : ''}`}
            />
            <span>{isWishlisted ? 'Saved to Wishlist' : 'Save Property'}</span>
          </Button>

          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            No immediate charge
          </span>
        </CardFooter>
      </Card>

      {/* Modal Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="rounded-3xl max-w-md p-6 bg-slate-950 text-white border border-white/10 shadow-2xl">
          {!isLoggedIn ? (
            <div className="py-4 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30">
                <LockIcon className="h-8 w-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-white">
                  You Are Not Logged In
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  You must be logged in to your Thikana account to submit a rental request for this property.
                </p>
              </div>

              <div className="flex gap-3 p-3 rounded-2xl bg-slate-900 border border-white/10 items-center text-left">
                <div className="relative h-14 w-16 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={property.mainImage || '/placeholder.jpg'}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {property.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 line-clamp-1">
                    <MapPinIcon className="h-3 w-3 text-[#0EA5E9] shrink-0" />
                    {property.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-2 pt-2 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBookingOpen(false)}
                  className="flex-1 rounded-2xl h-11 text-xs font-semibold border-white/20 text-white hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsBookingOpen(false);
                    router.push('/auth/login');
                  }}
                  className="flex-1 rounded-2xl h-11 text-xs font-bold gap-1.5 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white shadow-md cursor-pointer"
                >
                  <LogInIcon className="h-4 w-4" />
                  Log In Now
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
                  <CreditCardIcon className="h-5 w-5 text-[#0EA5E9]" />
                  Request Rental Booking
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400">
                  Complete your move-in request for landlord review.
                </DialogDescription>
              </DialogHeader>

              <div className="flex gap-3.5 p-3 rounded-2xl bg-slate-900 border border-white/10 items-center">
                <div className="relative h-16 w-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={property.mainImage || '/placeholder.jpg'}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {property.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 line-clamp-1">
                    <MapPinIcon className="h-3 w-3 text-[#0EA5E9] shrink-0" />
                    {property.location}
                  </p>
                  <div className="text-xs font-extrabold text-white font-mono mt-1">
                    ৳{property.price ? property.price.toLocaleString() : 0}{' '}
                    <span className="text-[10px] font-normal text-slate-400">
                      / month
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5 text-[#2563EB]" />
                    Select Move-in Date
                  </label>
                  <Input
                    required
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="rounded-2xl h-11 text-xs bg-slate-900 border-white/10 text-white"
                  />
                </div>

                <div className="rounded-2xl bg-slate-900 p-3.5 text-xs space-y-1.5 border border-white/10 font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Monthly Rent</span>
                    <span className="font-semibold text-white">
                      ৳{property.price ? property.price.toLocaleString() : 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Security Deposit</span>
                    <span className="font-semibold text-white">
                      {depositFormatted}
                    </span>
                  </div>
                </div>

                <DialogFooter className="flex flex-row gap-2 pt-2 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsBookingOpen(false)}
                    className="flex-1 rounded-2xl h-11 text-xs font-semibold border-white/20 text-white hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-2xl h-11 text-xs font-bold gap-1.5 bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#14B8A6] text-white shadow-md cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle2Icon className="h-4 w-4" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
