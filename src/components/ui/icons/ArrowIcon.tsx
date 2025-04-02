import { memo } from 'react';
import { cn } from "@/lib/utils";
import 'remixicon/fonts/remixicon.css';

interface ArrowIconProps {
  className?: string;
}

export const ArrowIcon = memo(function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        "w-8 h-8 rounded-full border border-current",
        "transition-all duration-300",
        className
      )}
    >
      <i 
        className="ri-arrow-right-line text-lg"
        aria-hidden="true"
      />
    </div>
  );
}); 