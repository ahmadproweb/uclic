import Link from 'next/link';
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { memo } from 'react';

// Constants
const VARIANTS = {
  shiny: 'shiny',
  simple: 'simple',
  mainCTA: 'mainCTA',
} as const;

const SIMPLE_VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

const SIZES = {
  s: 's',
  m: 'm',
  l: 'l',
} as const;

// Types
type Variant = keyof typeof VARIANTS;
type SimpleVariant = keyof typeof SIMPLE_VARIANTS;
type Size = keyof typeof SIZES;

// Size configurations
const SIZE_CONFIG = {
  s: {
    padding: "px-4 py-2",
    text: "text-sm",
    icon: { size: 14, containerClass: "w-6 h-3" }
  },
  m: {
    padding: "px-5 py-2.5",
    text: "text-base",
    icon: { size: 15, containerClass: "w-7 h-7" }
  },
  l: {
    padding: "px-6 py-3",
    text: "text-base",
    icon: { size: 16, containerClass: "w-8 h-8" }
  },
} as const;

// Component Props Types
interface CTATextProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

interface CTAButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  simpleVariant?: SimpleVariant;
  size?: Size;
  ariaLabel?: string;
}

// Memoized Components
const ArrowIcon = memo(({ size, variant, simpleVariant, isDark }: { 
  size: Size; 
  variant: Variant; 
  simpleVariant: SimpleVariant;
  isDark: boolean;
}) => (
  <svg 
    width={SIZE_CONFIG[size].icon.size}
    height={SIZE_CONFIG[size].icon.size}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={cn(
      "transition-transform duration-200 group-hover:-rotate-45",
      variant === 'mainCTA' && isDark 
        ? "stroke-black" 
        : variant === 'simple' && simpleVariant === 'secondary' && isDark
          ? "stroke-white"
          : "stroke-black group-hover:stroke-white"
    )}
    aria-hidden="true"
  >
    <path 
      d="M5 12H19M19 12L12 5M19 12L12 19" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
));

ArrowIcon.displayName = 'ArrowIcon';

export const CTAText = memo(({
  variant = 'primary',
  children,
  className
}: CTATextProps) => {
  return (
    <span 
      className={cn(
        "inline-flex items-center",
        "h-[47px] px-6",
        variant === 'primary' 
          ? "text-black" 
          : "text-[#F7F7F1]",
        className
      )}
    >
      {children}
    </span>
  );
});

CTAText.displayName = 'CTAText';

const ButtonContent = memo(({ 
  children, 
  size, 
  variant, 
  simpleVariant, 
  isDark 
}: { 
  children: React.ReactNode; 
  size: Size; 
  variant: Variant; 
  simpleVariant: SimpleVariant;
  isDark: boolean;
}) => (
  <>
    {children}
    <span className={cn(
      "rounded-full border flex items-center justify-center",
      "transition-all duration-200",
      "group-hover:translate-x-1 group-hover:-translate-y-1",
      variant === 'mainCTA' && isDark 
        ? "border-black" 
        : "border-black group-hover:border-white",
      SIZE_CONFIG[size].icon.containerClass
    )}>
      <ArrowIcon 
        size={size} 
        variant={variant} 
        simpleVariant={simpleVariant} 
        isDark={isDark} 
      />
    </span>
  </>
));

ButtonContent.displayName = 'ButtonContent';

export const CTAButton = memo(({ 
  href, 
  children,
  className,
  variant = 'shiny',
  simpleVariant = 'primary',
  size = 'l',
  ariaLabel,
}: CTAButtonProps) => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  const commonClasses = cn(
    // Base styles
    "group inline-flex items-center gap-2",
    "font-bold rounded-full",
    "transition-all duration-200",
    "w-fit whitespace-nowrap",
    // Variant styles
    variant === 'mainCTA' && isDark 
      ? "bg-white text-black hover:bg-[#E0FF5C]"
      : variant === 'simple' && simpleVariant === 'secondary'
        ? "text-black dark:text-white"
        : "bg-[#E0FF5C] text-black hover:bg-black hover:text-[#E0FF5C]",
    // Size styles
    SIZE_CONFIG[size].padding,
    SIZE_CONFIG[size].text,
    // Custom classes
    className
  );

  const content = (
    <ButtonContent 
      size={size} 
      variant={variant} 
      simpleVariant={simpleVariant} 
      isDark={isDark}
    >
      {children}
    </ButtonContent>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={commonClasses}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button 
      className={commonClasses}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
});

CTAButton.displayName = 'CTAButton'; 