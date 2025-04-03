import { memo } from 'react';
import { cn } from "@/lib/utils";

interface ArrowIconProps {
  className?: string;
}

export const ArrowIcon = memo(function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center relative",
        "w-8 h-8 rounded-full border border-current",
        "transition-colors duration-300",
        className
      )}
    >
      <i 
        className="ri-arrow-right-line text-lg transition-transform duration-300 group-hover:-rotate-45"
        aria-hidden="true"
      />
    </div>
  );
}); 