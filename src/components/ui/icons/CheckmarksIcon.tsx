import { memo, FC } from 'react';
import { cn } from "@/lib/utils";

interface CheckmarksIconProps {
    className?: string;
}

export const CheckmarksIcon = memo(function CheckmarksIcon({ className = "" }: CheckmarksIconProps) {
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
                className="ri-checkbox-multiple-line text-lg"
                aria-hidden="true"
            />
        </div>
    );
});
