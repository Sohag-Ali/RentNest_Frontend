'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMyReviewsAction, MyReviewItem } from '@/service/review.service';
import { EditReviewModal } from '@/components/reviews/EditReviewModal';
import { DeleteReviewDialog } from '@/components/reviews/DeleteReviewDialog';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from 'lucide-react';

export function TenantReviewsSection() {
  const [reviews, setReviews] = useState<MyReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    setLoading(true);
    getMyReviewsAction().then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setReviews(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-40 bg-muted animate-pulse rounded-lg" />
          <div className="h-5 w-20 bg-muted animate-pulse rounded-full" />
        </div>
        <div className="space-y-3">
          <div className="h-20 bg-muted/60 animate-pulse rounded-2xl" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-md space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <CardTitle className="text-lg font-bold font-heading">My Submitted Reviews</CardTitle>
        </div>
        <Link
          href="/dashboard/tenant/reviews"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          <span>View All ({reviews.length})</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-6 space-y-2">
          <p className="text-xs text-muted-foreground">You haven&apos;t submitted any property reviews yet.</p>
          <Button
            render={<Link href="/dashboard/tenant/requests" />}
            size="sm"
            variant="outline"
            className="rounded-xl text-xs font-semibold"
          >
            Leave a Review for Completed Rentals
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.slice(0, 3).map((review) => {
            const property = review.property;
            const categoryName =
              typeof property?.category === 'object'
                ? (property.category as any)?.name || 'Apartment'
                : property?.category || 'Apartment';

            const formattedDate = review.createdAt
              ? new Date(review.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Recent';

            return (
              <div
                key={review.id}
                className="p-3.5 rounded-2xl bg-muted/30 border border-border/40 hover:border-primary/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-12 w-14 rounded-xl overflow-hidden shrink-0 bg-muted">
                    <Image
                      src={property?.mainImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200'}
                      alt={property?.title || 'Property'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-foreground truncate">{property?.title || 'Rental Property'}</h4>
                      <Badge variant="glass" className="text-[9px] px-1.5 py-0 shrink-0">
                        {categoryName}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground italic truncate">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg text-amber-600 dark:text-amber-400 font-bold mr-1">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{review.rating}.0</span>
                  </div>

                  <EditReviewModal
                    reviewId={review.id}
                    initialRating={review.rating}
                    initialComment={review.comment}
                    propertyTitle={property?.title}
                    onSuccess={fetchReviews}
                  />

                  <DeleteReviewDialog
                    reviewId={review.id}
                    propertyTitle={property?.title}
                    onSuccess={fetchReviews}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
