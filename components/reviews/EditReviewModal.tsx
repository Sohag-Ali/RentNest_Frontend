'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star, MessageSquareQuote, CheckCircle2, Pencil } from 'lucide-react';
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
import { updateReviewAction } from '@/service/review.service';
import { updateReviewSchema, UpdateReviewFormValues } from '@/lib/validations/review.schema';
import { toast } from 'sonner';

interface EditReviewModalProps {
  reviewId: string;
  initialRating: number;
  initialComment: string;
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

export function EditReviewModal({
  reviewId,
  initialRating,
  initialComment,
  propertyTitle,
  onSuccess,
  triggerButton,
}: EditReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Initialize React Hook Form with Zod resolver & defaultValues
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateReviewFormValues>({
    resolver: zodResolver(updateReviewSchema),
    defaultValues: {
      rating: Number(initialRating) || 5,
      comment: initialComment || '',
    },
  });

  const ratingValue = watch('rating') || 5;

  useEffect(() => {
    if (open) {
      reset({
        rating: Number(initialRating) || 5,
        comment: initialComment || '',
      });
    }
  }, [open, initialRating, initialComment, reset]);

  /**
   * Handle form submission & call Server Action / PATCH API
   */
  const onSubmit = async (data: UpdateReviewFormValues) => {
    try {
      // 1. Construct & sanitize payload: Send ONLY rating (number) and comment (string)
      const payload: Record<string, any> = {};

      if (data.rating !== undefined && data.rating !== null) {
        payload.rating = Number(data.rating);
      }

      if (data.comment && typeof data.comment === 'string') {
        const trimmed = data.comment.trim();
        if (trimmed.length > 0) {
          payload.comment = trimmed;
        }
      }

      // Requirement 9: Print final sanitized payload before sending request
      console.log('Review Update Payload', payload);

      const res = await updateReviewAction(reviewId, payload);

      if (res?.success) {
        toast.success('Review updated successfully! ✏️', {
          description: 'Your changes have been saved.',
        });
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(res?.message || 'Failed to update review. Please try again.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong updating review.');
    }
  };

  const activeRating = hoverRating !== null ? hoverRating : ratingValue;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          triggerButton ? (
            (triggerButton as any)
          ) : (
            <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs font-semibold">
              <Pencil className="h-3.5 w-3.5 text-primary" />
              <span>Edit</span>
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-md rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2 font-heading">
            <Pencil className="h-5 w-5 text-primary" /> Edit Your Review
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {propertyTitle ? `Update your review for "${propertyTitle}"` : 'Modify your rating or feedback.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-3">
          {/* Interactive Star Rating Selector */}
          <div className="space-y-2 text-center bg-muted/40 p-4 rounded-2xl border border-border/60">
            <Label className="text-xs font-semibold text-muted-foreground">Select Rating</Label>
            <div className="flex items-center justify-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue('rating', star, { shouldValidate: true })}
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
            {errors.rating && (
              <p className="text-xs text-rose-500 font-semibold">{errors.rating.message}</p>
            )}
          </div>

          {/* Comment Textarea */}
          <div className="space-y-2">
            <Label htmlFor="edit-comment" className="text-sm font-semibold flex items-center gap-1.5">
              <MessageSquareQuote className="h-4 w-4 text-primary" /> Review Comment
            </Label>
            <Textarea
              id="edit-comment"
              {...register('comment')}
              placeholder="Write details about your stay..."
              rows={4}
              className="rounded-2xl resize-none"
            />
            {errors.comment && (
              <p className="text-xs text-rose-500 font-semibold">{errors.comment.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl px-6 gap-2 bg-primary text-primary-foreground font-bold"
            >
              {isSubmitting ? (
                'Saving...'
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
