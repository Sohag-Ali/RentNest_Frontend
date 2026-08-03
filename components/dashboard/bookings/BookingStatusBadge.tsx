"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CreditCard, Clock, Star, MessageSquare } from "lucide-react";
import { BookingReview } from "@/types/booking";

interface PaymentStatusBadgeProps {
  status: string;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const normalized = (status || "").toLowerCase();

  if (normalized === "completed") {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25 px-2.5 py-1 rounded-full font-semibold text-xs flex items-center gap-1.5 w-fit shadow-xs">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
        <span>Completed</span>
      </Badge>
    );
  }

  if (normalized === "paid") {
    return (
      <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 hover:bg-blue-500/25 px-2.5 py-1 rounded-full font-semibold text-xs flex items-center gap-1.5 w-fit shadow-xs">
        <CreditCard className="h-3.5 w-3.5 shrink-0" />
        <span>Paid</span>
      </Badge>
    );
  }

  return (
    <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/25 px-2.5 py-1 rounded-full font-semibold text-xs flex items-center gap-1.5 w-fit shadow-xs">
      <Clock className="h-3.5 w-3.5 shrink-0" />
      <span className="capitalize">{status || "Pending"}</span>
    </Badge>
  );
}

interface ReviewStatusBadgeProps {
  review?: BookingReview | null;
}

export function ReviewStatusBadge({ review }: ReviewStatusBadgeProps) {
  if (!review || typeof review.rating !== "number") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full border border-border/60">
        No Review Yet
      </span>
    );
  }

  const commentText = review.comment || review.content;

  return (
    <div className="flex flex-col gap-1 max-w-[200px]">
      <div className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md border border-amber-500/20 w-fit text-xs font-bold">
        <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
        <span>{review.rating.toFixed(1)}</span>
      </div>
      {commentText && (
        <p className="text-[11px] text-muted-foreground line-clamp-1 italic flex items-center gap-1">
          <MessageSquare className="h-2.5 w-2.5 shrink-0 text-muted-foreground/70" />
          <span>"{commentText}"</span>
        </p>
      )}
    </div>
  );
}
