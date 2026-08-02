'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteReviewAction } from '@/service/review.service';
import { toast } from 'sonner';

interface DeleteReviewDialogProps {
  reviewId: string;
  propertyTitle?: string;
  onSuccess?: () => void;
  triggerButton?: React.ReactNode;
}

export function DeleteReviewDialog({
  reviewId,
  propertyTitle,
  onSuccess,
  triggerButton,
}: DeleteReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteReviewAction(reviewId);
      if (res?.success) {
        toast.success('Review deleted successfully 🗑️', {
          description: 'Your review has been removed.',
        });
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(res?.message || 'Failed to delete review.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong deleting review.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          triggerButton ? (
            (triggerButton as any)
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl gap-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-md rounded-3xl p-6">
        <DialogHeader>
          <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-2">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <DialogTitle className="text-lg font-bold font-heading">Delete Review?</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            {propertyTitle
              ? `Are you sure you want to delete your review for "${propertyTitle}"?`
              : 'Are you sure you want to delete this review?'} This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-end gap-2 pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl text-xs font-medium">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-xl px-5 text-xs font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
