import * as React from "react"
import { cn } from "../../utils/cn"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, leftIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-semibold text-[#252525] dark:text-[#EDE9E1] tracking-wide">
            {label}
            {props.required && <span className="text-[#9A5C55] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[#66645E] dark:text-[#A6A39A] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#232826] px-3 py-2 text-xs text-[#252525] dark:text-[#EDE9E1] transition-colors placeholder:text-[#66645E]/60 dark:placeholder:text-[#A6A39A]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#365C63] focus-visible:border-[#365C63] disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-9",
              error && "border-[#9A5C55] focus-visible:ring-[#9A5C55]",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {helperText && !error && (
          <span className="text-[11px] text-[#66645E] dark:text-[#A6A39A]">{helperText}</span>
        )}
        {error && (
          <span className="text-[11px] font-medium text-[#9A5C55]">{error}</span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"
