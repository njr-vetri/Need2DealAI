import * as React from "react"
import { cn } from "../../utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline' | 'neutral' | 'accent' | 'match';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#365C63]/10 text-[#365C63] dark:bg-[#EDE9E1]/15 dark:text-[#EDE9E1] border border-[#365C63]/20',
    accent: 'bg-[#5B7480]/15 text-[#365C63] dark:bg-[#8BAAB8]/20 dark:text-[#8BAAB8] border border-[#5B7480]/25',
    success: 'bg-[#E7EFE5] text-[#3D5A38] dark:bg-[#29382B] dark:text-[#B7D9B4] border border-[#C8DAC4] dark:border-[#374C3A]',
    warning: 'bg-[#F5EEDF] text-[#78572A] dark:bg-[#3D3525] dark:text-[#E5CFA3] border border-[#E5D7BF] dark:border-[#534732]',
    danger: 'bg-[#F7E9E7] text-[#824A44] dark:bg-[#3E2725] dark:text-[#F1B2AD] border border-[#ECCAC7] dark:border-[#583330]',
    outline: 'border border-[#D2CEC2] dark:border-[#3C4743] text-[#252525] dark:text-[#EDE9E1] bg-transparent',
    neutral: 'bg-[#EAE6DA] text-[#51534E] dark:bg-[#272E2B] dark:text-[#A6A39A] border border-[#D2CEC2] dark:border-[#3C4743]',
    match: 'bg-[#365C63] text-[#FFFDF7] dark:bg-[#EDE9E1] dark:text-[#252525] border border-transparent font-semibold shadow-xs'
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium tracking-tight transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
