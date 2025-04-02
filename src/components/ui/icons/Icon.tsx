import { cn } from "@/lib/utils";

interface IconProps {
  name: 'arrow-right' | 'arrow-left' | 'chevron-down';
  className?: string;
  rotate?: 90 | 180 | 270;
}

export const Icon = ({ 
  name, 
  className, 
  rotate 
}: IconProps) => {
  return (
    <i 
      className={cn(
        `icon-${name}`,
        rotate && `icon-rotate-${rotate}`,
        className
      )}
      aria-hidden="true"
    />
  );
}; 