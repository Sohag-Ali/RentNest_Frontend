import * as React from "react"
import { cn } from "@/lib/utils"

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
}

function AspectRatio({ ratio = 16 / 9, className, children, style, ...props }: AspectRatioProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        paddingBottom: `${(1 / ratio) * 100}%`,
        ...style,
      }}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full">{children}</div>
    </div>
  )
}

export { AspectRatio }
