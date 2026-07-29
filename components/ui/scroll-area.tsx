import * as React from "react"
import { cn } from "@/lib/utils"

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div
      className={cn("relative overflow-auto scrollbar-thin scrollbar-thumb-muted", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { ScrollArea }
