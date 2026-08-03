"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
      onChange?.(e)
    }

    const isChecked = checked ?? false

    return (
      <label className={cn("inline-flex items-center cursor-pointer select-none shrink-0", className)}>
        <input
          type="checkbox"
          className="sr-only peer"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            "relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out border shadow-inner",
            isChecked
              ? "bg-gradient-to-r from-blue-600 to-sky-500 border-blue-500 shadow-blue-500/25"
              : "bg-slate-300 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
          )}
        >
          <div
            className={cn(
              "absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out",
              isChecked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </div>
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
