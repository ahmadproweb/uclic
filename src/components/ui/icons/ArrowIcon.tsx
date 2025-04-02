import { memo } from 'react';

interface ArrowIconProps {
  className?: string;
}

export const ArrowIcon = memo(function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <img 
      src="/icon-right.png"
      alt=""
      width={36}
      height={36}
      className={className}
    />
  );
}); 