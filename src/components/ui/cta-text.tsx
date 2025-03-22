import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CTATextProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function CTAText({ children, variant = "primary", className }: CTATextProps) {
  return (
    <span
      className={cn(
        "inline-block transition-colors duration-300 leading-tight",
        variant === "primary" ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-300",
        className
      )}
    >
      {children}
    </span>
  );
} 