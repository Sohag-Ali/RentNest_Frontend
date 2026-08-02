"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2Icon, SaveIcon, XIcon, ArrowLeftIcon } from "lucide-react";

interface SubmitSectionProps {
  isSubmitting: boolean;
  onCancel?: () => void;
}

export function SubmitSection({ isSubmitting, onCancel }: SubmitSectionProps) {
  const router = useRouter();

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/dashboard/landlord/properties");
    }
  };

  return (
    <div className="sticky bottom-4 z-40 w-full mt-8">
      <div className="bg-background/95 backdrop-blur-md border border-border shadow-xl rounded-2xl p-4 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCancelClick}
            disabled={isSubmitting}
            className="text-muted-foreground hover:text-foreground gap-1.5"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Back to</span> Properties
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancelClick}
            disabled={isSubmitting}
            className="gap-1.5 min-w-[100px]"
          >
            <XIcon className="h-4 w-4" />
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-2 min-w-[160px] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="h-4 w-4 animate-spin" />
                <span>Saving Property...</span>
              </>
            ) : (
              <>
                <SaveIcon className="h-4 w-4" />
                <span>Save Property</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
