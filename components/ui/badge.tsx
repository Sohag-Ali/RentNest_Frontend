import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default:
          "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20 dark:border-blue-500/30",
        primary:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary:
          "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400 dark:bg-sky-500/20",
        accent:
          "border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400 dark:bg-teal-500/20",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20",
        warning:
          "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20",
        luxury:
          "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 dark:bg-amber-500/20",
        destructive:
          "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 dark:bg-red-500/20",
        outline:
          "border-border bg-background/50 text-foreground hover:bg-muted/50",
        glass:
          "glass-card text-foreground shadow-xs",
        gradient:
          "border-transparent bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
