'use client';

import { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle2, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createReviewAction } from '@/service/review.service';
import { toast } from 'sonner';

interface SubmitReviewModalProps {
  rentalRequestId: string;
  propertyTitle?: string;
  onSuccess?: () => void;
  triggerButton?: React.ReactNode;
}

const RATING_LABELS: Record<number, string> = {
  1: '1/5 - Terrible 😞',
  2: '2/5 - Poor 😕',
  3: '3/5 - Average 😐',
  4: '4/5 - Very Good 😊',
  5: '5/5 - Excellent ⭐⭐⭐⭐⭐',
};

export function SubmitReviewModal({
  rentalRequestId,
  propertyTitle,
  onSuccess,
  triggerButton,
}: SubmitReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please write a brief comment describing your experience.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createReviewAction({
        rentalRequestId,
        rating,
        comment: comment.trim(),
      });

      if (res?.success) {
        toast.success('Review submitted successfully! 🎉', {
          description: 'Thank you for your feedback.',
        });
        setComment('');
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(res?.message || 'Failed to submit review. Please try again.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong submitting review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeRating = hoverRating !== null ? hoverRating : rating;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          triggerButton ? (
            (triggerButton as any)
          ) : (
            <Button className="rounded-2xl gap-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md">
              <Star className="h-4 w-4 fill-current" />
              <span>Leave a Review</span>
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-md rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2 font-heading">
            <Sparkles className="h-5 w-5 text-amber-500" /> Write Property Review
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {propertyTitle ? `Share your experience for "${propertyTitle}"` : 'Rate your stay and landlord experience.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-3">
          {/* Interactive Star Rating Selector */}
          <div className="space-y-2 text-center bg-muted/40 p-4 rounded-2xl border border-border/60">
            <Label className="text-xs font-semibold text-muted-foreground">Select Rating</Label>
            <div className="flex items-center justify-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= activeRating
                        ? 'text-amber-500 fill-amber-500 drop-shadow-sm'
                        : 'text-muted-foreground/40'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 min-h-[1.25rem]">
              {RATING_LABELS[activeRating] || ''}
            </p>
          </div>

          {/* Comment Textarea */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-semibold flex items-center gap-1.5">
              <MessageSquareQuote className="h-4 w-4 text-primary" /> Your Review Comment
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Excellent apartment with facilities. The landlord was super responsive and room was spotless!"
              rows={4}
              className="rounded-2xl resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl px-6 gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Submit Review
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
