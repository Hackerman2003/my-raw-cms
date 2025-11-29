import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-[var(--anchor-dark)] transition-colors placeholder:text-[var(--neutral-text)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vermilion)] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
