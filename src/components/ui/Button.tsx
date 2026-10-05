import * as React from "react"
import { cn } from "../../utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const variants = {
      primary:
        'bg-[#365C63] text-[#FFFDF7] hover:bg-[#2B494F] dark:bg-[#EDE9E1] dark:text-[#252525] dark:hover:bg-[#FFFDF7] shadow-xs font-semibold border border-transparent',
      secondary:
        'bg-[#6F8065] text-[#FFFDF7] hover:bg-[#5B6B53] dark:bg-[#6F8065] dark:hover:bg-[#7D9072] shadow-xs font-semibold',
      accent:
        'bg-[#A37B52] text-[#FFFDF7] hover:bg-[#8A6641] shadow-xs font-semibold',
      outline:
        'border border-[#D2CEC2] dark:border-[#3C4743] bg-transparent hover:bg-[#EAE6DA] dark:hover:bg-[#272E2B] text-[#252525] dark:text-[#EDE9E1]',
      ghost:
        'bg-transparent hover:bg-[#EAE6DA]/70 dark:hover:bg-[#272E2B] text-[#252525] dark:text-[#EDE9E1]',
      danger:
        'bg-[#9A5C55] text-white hover:bg-[#824A44] shadow-xs font-semibold'
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
      md: 'h-9 px-4 text-xs gap-2 rounded-md',
      lg: 'h-10 px-5 text-sm gap-2 rounded-md'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365C63] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
