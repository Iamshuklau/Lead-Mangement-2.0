"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, defaultChecked, ...props }, ref) => {
    const [checked, setChecked] = React.useState(defaultChecked || false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked
      setChecked(newChecked)
      onCheckedChange?.(newChecked)
    }

    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          ref={ref}
          className="sr-only"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div className={cn(
          "w-11 h-6 bg-gray-600 rounded-full peer transition-colors",
          checked ? "bg-blue-600" : "bg-gray-600",
          className
        )}>
          <div className={cn(
            "absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )} />
        </div>
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch } 