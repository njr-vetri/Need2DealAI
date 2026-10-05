import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../utils/cn"

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, description, children, className }: ModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252525]/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-lg border border-[#D2CEC2] dark:border-[#3C4743] bg-[#FFFDF7] dark:bg-[#272E2B] p-6 shadow-lg transition-all",
          className
        )}
      >
        <div className="flex items-start justify-between pb-3.5 border-b border-[#D2CEC2]/60 dark:border-[#3C4743]/60">
          <div>
            {title && (
              <h3 className="text-base font-bold text-[#252525] dark:text-[#FFFDF7]">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-[#66645E] dark:text-[#A6A39A] mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[#66645E] hover:bg-[#EAE6DA] dark:hover:bg-[#232826] text-[#252525] dark:text-[#EDE9E1] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  )
}
