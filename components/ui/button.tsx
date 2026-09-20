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
          "bg-[#0EA5E9] text-white hover:bg-sky-600 font-semibold shadow-sm shadow-sky-500/20",
        gradient:
          "bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] hover:from-sky-600 hover:to-blue-700 text-white font-semibold shadow-md shadow-sky-500/20 active:shadow-none",
        secondary:
          "bg-[#EEF4FF] text-[#2563EB] hover:bg-blue-100 border border-blue-200/60 font-semibold shadow-xs",
        outline:
          "border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 text-slate-700 shadow-xs",
        glass:
          "bg-white/80 backdrop-blur-md border border-slate-200 text-slate-800 hover:bg-white shadow-xs",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 text-slate-600",
        destructive:
          "bg-rose-500 text-white hover:bg-rose-600 shadow-xs shadow-rose-500/20",
        link: "text-[#0EA5E9] underline-offset-4 hover:underline",
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
  nativeButton,
  render,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={nativeButton ?? (render ? false : undefined)}
      render={render}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
