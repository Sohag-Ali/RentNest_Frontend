import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getMyReviewsAction, MyReviewItem } from "@/service/review.service";
import { EditReviewModal } from "@/components/reviews/EditReviewModal";
import { DeleteReviewDialog } from "@/components/reviews/DeleteReviewDialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "My Submitted Reviews | Thikana Tenant",
  description: "View, edit, or delete property ratings and feedback you have submitted as a tenant.",
};

const DEFAULT_PROPERTY_IMAGE =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";

export default async function TenantMyReviewsPage() {
  const response = await getMyReviewsAction();
  const reviews: MyReviewItem[] = response.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
            My Submitted Reviews
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            View, edit, or delete ratings and feedback you have posted.
          </p>
        </div>

        <Badge variant="glass" className="w-fit gap-1.5 px-3 py-1.5 text-xs font-semibold">
          <Sparkles className="h-4 w-4 text-amber-500 fill-amber-500" />
          <span>{reviews.length} Reviews Submitted</span>
        </Badge>
      </div>

      {reviews.length === 0 ? (
        <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-16 w-16 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center border border-amber-500/20">
              <Star className="h-8 w-8 fill-current" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-foreground font-heading">No Reviews Yet</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Once your rental request is completed, you can submit a review and rating for your landlord and property.
              </p>
            </div>
            <Button
              render={<Link href="/dashboard/tenant/requests" />}
              className="rounded-2xl px-6 h-11 text-xs font-bold bg-primary text-primary-foreground shadow-md"
            >
              View My Rentals
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => {
            const property = review.property;
            const categoryName =
              typeof property?.category === "object"
                ? (property.category as any)?.name || "Apartment"
                : property?.category || "Apartment";

            const propertyImage = property?.mainImage || DEFAULT_PROPERTY_IMAGE;

            const formattedDate = review.createdAt
              ? new Date(review.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A";

            return (
              <Card
                key={review.id}
                className="rounded-3xl border-border/70 bg-card p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Property Image & Title Header */}
                  <div className="flex gap-3.5 items-center">
                    <div className="relative h-16 w-20 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/50">
                      <Image
                        src={propertyImage}
                        alt={property?.title || "Property Photo"}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <Badge variant="glass" className="text-[10px] px-2 py-0.5">
                        {categoryName}
                      </Badge>
                      <h3 className="text-sm font-bold text-foreground line-clamp-1">
                        {property?.title || "Rental Property"}
                      </h3>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 line-clamp-1">
                        <MapPin className="h-3 w-3 text-primary shrink-0" />
                        {property?.location || property?.city || "Location N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-muted/30 border border-border/40">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "text-amber-500 fill-amber-500"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-foreground ml-1">{review.rating}.0</span>
                    </div>

                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                      <Calendar className="h-3 w-3" /> {formattedDate}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <div className="relative pl-3 border-l-2 border-amber-500/60 py-1">
                    <p className="text-xs text-foreground/90 italic leading-relaxed">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                </div>

                {/* Card Actions: Edit, Delete, View Property */}
                <div className="pt-3 border-t border-border/50 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <EditReviewModal
                        reviewId={review.id}
                        initialRating={review.rating}
                        initialComment={review.comment}
                        propertyTitle={property?.title}
                      />
                      <DeleteReviewDialog
                        reviewId={review.id}
                        propertyTitle={property?.title}
                      />
                    </div>

                    {property?.id && (
                      <Link
                        href={`/properties/${property.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        <span>View</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
