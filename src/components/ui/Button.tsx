"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  loading?: boolean; // Add loading as alias for isLoading
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isLoading = false,
      loading, // Extract loading prop to prevent it from being passed to DOM
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Use loading prop as alias for isLoading if provided
    const loadingState = loading ?? isLoading;
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-slate-800 text-white hover:bg-slate-700 focus-visible:ring-slate-400",
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-400",
      secondary:
        "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-400",
      outline:
        "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-700 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800",
      ghost:
        "hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm rounded-md",
      md: "h-10 px-4 py-2 rounded-md",
      lg: "h-12 px-6 text-lg rounded-lg",
      icon: "h-10 w-10 rounded-md",
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loadingState}
        {...props}
      >
        {loadingState ? (
          <>
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
