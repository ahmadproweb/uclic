import Link from 'next/link';
import { cn } from "@/lib/utils";

// Composant pour le texte
interface CTATextProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export function CTAText({
  variant = 'primary',
  children,
  className
}: CTATextProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center",
        "h-[47px] px-6",
        variant === 'primary' 
          ? "text-black" // Texte noir pour primary
          : "text-[#F7F7F1]", // Texte blanc pour secondary
        className
      )}
    >
      {children}
    </span>
  );
}

// Composant pour le bouton
interface CTAButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'shiny' | 'simple' | 'mainCTA';
  simpleVariant?: 'primary' | 'secondary';
  size?: 's' | 'm' | 'l';
}

export function CTAButton({ 
  href, 
  children,
  className,
  variant = 'shiny',
  simpleVariant = 'primary',
  size = 'l',
}: CTAButtonProps) {
  const sizeClasses = {
    s: "px-4 py-2 text-sm",
    m: "px-5 py-2.5 text-base",
    l: "px-6 py-3 text-base"
  };

  const iconSizeClasses = {
    s: "w-6 h-3",
    m: "w-7 h-7",
    l: "w-8 h-8"
  };

  const buttonContent = (
    <>
      {children}
      <span className={cn(
        "rounded-full border flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1",
        variant === 'mainCTA' ? "border-black" : "border-current",
        iconSizeClasses[size]
      )}>
        <svg 
          width={size === 's' ? 14 : size === 'm' ? 15 : 16} 
          height={size === 's' ? 14 : size === 'm' ? 15 : 16} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={cn(
            "transition-transform duration-200 group-hover:-rotate-45",
            variant === 'mainCTA' ? "stroke-black" : "stroke-current"
          )}
        >
          <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </>
  );

  const commonClasses = cn(
    "group inline-flex items-center gap-2",
    "font-bold rounded-full",
    variant === 'mainCTA' && "bg-[#D9FF4B] text-black hover:bg-[#D9FF4B]/80",
    variant === 'simple' && simpleVariant === 'secondary' && "text-black dark:text-white",
    "transition-all duration-200",
    "w-fit whitespace-nowrap",
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={commonClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button className={commonClasses}>
      {buttonContent}
    </button>
  );
} 