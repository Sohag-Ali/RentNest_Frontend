import React from "react";
import { getReviewsAction, ReviewItem } from "@/service/review.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageSquareQuote, Calendar, Building2, MapPin } from "lucide-react";

export const metadata = {
  title: "Property Reviews & Ratings | RentNest Landlord",
  description: "View ratings and feedback submitted by tenants for your properties.",
};

export default async function LandlordReviewsPage() {
  const response = await getReviewsAction();
  const reviews: ReviewItem[] = response.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
          Property Reviews & Ratings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Read ratings and feedback submitted by tenants for your rented properties.
        </p>
      </div>

      {reviews.length === 0 ? (
        <Card className="rounded-3xl border-border/80 bg-card p-12 text-center shadow-md">
          <div className="max-w-md mx-auto space-y-3">
            <div className="h-16 w-16 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
              <Star className="h-8 w-8 fill-current" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No Reviews Submitted Yet</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When tenants complete their stay and submit property ratings, their comments and star scores will appear here.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((review) => {
            const tenant = review.tenant;
            const property = review.property;
            const initials = tenant?.name
              ? tenant.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : "T";

            const formattedDate = review.createdAt
              ? new Date(review.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent";

            return (
              <Card
                key={review.id}
                className="rounded-3xl border-border/70 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar: Stars & Date */}
                  <div className="flex items-center justify-between gap-2">
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
                      <span className="text-xs font-bold text-foreground ml-1.5">{review.rating}.0</span>
                    </div>

                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                      <Calendar className="h-3.5 w-3.5" /> {formattedDate}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <div className="relative pl-3 border-l-2 border-primary/40 py-1">
                    <p className="text-sm text-foreground/90 italic leading-relaxed">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Property & Tenant Meta */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar className="h-8 w-8 border border-border shrink-0">
                      <AvatarImage src={tenant?.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground truncate">{tenant?.name || "Tenant"}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{tenant?.email || "N/A"}</p>
                    </div>
                  </div>

                  {property && (
                    <Badge variant="outline" className="shrink-0 bg-muted/60 text-muted-foreground gap-1 px-2.5 py-1 max-w-[180px] truncate">
                      <Building2 className="h-3 w-3 text-primary shrink-0" />
                      <span className="truncate">{property.title}</span>
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
