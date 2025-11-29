import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-base text-[var(--anchor-dark)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--neutral-text)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vermilion)] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
