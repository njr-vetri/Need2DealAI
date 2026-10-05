import * as React from "react"
import { cn } from "../../utils/cn"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'subtle' | 'dark' | 'outline';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'surface', ...props }, ref) => {
    const variants = {
      surface: 'bg-[#FFFDF7] dark:bg-[#272E2B] border border-[#D2CEC2] dark:border-[#3C4743] text-[#252525] dark:text-[#EDE9E1]',
      subtle: 'bg-[#EAE6DA]/70 dark:bg-[#232826] border border-[#D2CEC2]/80 dark:border-[#333C39] text-[#252525] dark:text-[#EDE9E1]',
      dark: 'bg-[#252525] text-[#FFFDF7] border border-[#1C201F] dark:border-[#3C4743]',
      outline: 'bg-transparent border border-[#D2CEC2] dark:border-[#3C4743] text-[#252525] dark:text-[#EDE9E1]'
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg transition-colors duration-150",
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-5 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-base font-bold tracking-tight text-[#252525] dark:text-[#FFFDF7]", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xs text-[#66645E] dark:text-[#A6A39A] leading-relaxed", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-5 pt-0 border-t border-[#D2CEC2]/50 dark:border-[#3C4743]/50 mt-3", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
