"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-[cubic-bezier(.2,.9,.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vermilion)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--vermilion)] text-white hover:bg-[#E64100] active:scale-[0.98]",
        secondary:
          "bg-transparent border-2 border-[var(--anchor-dark)] text-[var(--anchor-dark)] hover:bg-[var(--anchor-dark)] hover:text-white",
        outline:
          "bg-transparent border-2 border-[var(--vermilion)] text-[var(--vermilion)] hover:bg-[var(--vermilion)] hover:text-white",
        ghost:
          "bg-transparent text-[var(--neutral-text)] hover:bg-[var(--off-white)] hover:text-[var(--anchor-dark)]",
        link: "bg-transparent text-[var(--anchor-dark)] hover:text-[var(--vermilion)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
