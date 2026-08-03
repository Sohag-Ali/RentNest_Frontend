import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-blue-700 shadow-sm shadow-blue-600/20 dark:shadow-blue-900/30",
        gradient:
          "bg-gradient-to-r from-blue-600 via-blue-600 to-sky-500 text-white hover:opacity-95 shadow-md shadow-blue-500/20 active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-sky-600 shadow-sm shadow-sky-500/10",
        outline:
          "border-border bg-background hover:bg-muted/80 hover:text-foreground text-foreground shadow-xs",
        glass:
          "glass-card text-foreground hover:bg-white/80 dark:hover:bg-slate-800/80 shadow-xs",
        ghost:
          "hover:bg-muted hover:text-foreground text-foreground/80 dark:hover:bg-muted/70",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-red-600 shadow-xs shadow-red-500/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-4 py-2 text-sm",
        xs: "h-7 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-12 gap-2.5 px-6 text-base font-semibold",
        icon: "size-10 rounded-xl",
        "icon-xs": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
