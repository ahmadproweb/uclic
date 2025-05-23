import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";
import { ArrowIcon as ArrowIconComponent } from "./icons/ArrowIcon";

// Constants
const VARIANTS = {
  shiny: "shiny",
  simple: "simple",
  mainCTA: "mainCTA",
} as const;

const SIMPLE_VARIANTS = {
  primary: "primary",
  secondary: "secondary",
} as const;

const SIZES = {
  s: "s",
  m: "m",
  l: "l",
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
    icon: { size: 24 },
  },
  m: {
    padding: "px-5 py-2.5",
    text: "text-base",
    icon: { size: 28 },
  },
  l: {
    padding: "px-6 py-3",
    text: "text-base",
    icon: { size: 32 },
  },
} as const;

// Component Props Types
interface CTATextProps {
  variant?: "primary" | "secondary";
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
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

// Memoized Components
const ArrowIcon = memo(({ size }: { size: Size }) => (
  <ArrowIconComponent className="!transition-none" />
));

ArrowIcon.displayName = "ArrowIcon";

export const CTAText = memo(
  ({ variant = "primary", children, className }: CTATextProps) => {
    return (
      <span
        className={cn(
          "inline-flex items-center",
          "h-[47px] px-6",
          variant === "primary" ? "text-black" : "text-[#F7F7F1]",
          className
        )}
      >
        {children}
      </span>
    );
  }
);

CTAText.displayName = "CTAText";

const ButtonContent = memo(
  ({ children, size }: { children: React.ReactNode; size: Size }) => (
    <>
      {children}
      <ArrowIcon size={size} />
    </>
  )
);

ButtonContent.displayName = "ButtonContent";

export const CTAButton = memo(
  ({
    href,
    children,
    className,
    variant = "shiny",
    simpleVariant = "primary",
    size = "l",
    ariaLabel,
    type = "button",
    onClick,
  }: CTAButtonProps) => {
    const { theme: currentTheme } = useTheme();
    const isDark = currentTheme === "dark";

    const commonClasses = cn(
      // Base styles
      "group inline-flex items-center gap-2",
      "font-bold rounded-full",
      "!transition-none",
      "w-fit whitespace-nowrap",
      // Variant styles
      variant === "mainCTA" && isDark
        ? "bg-white text-black hover:bg-[#E0FF5C]"
        : variant === "simple" && simpleVariant === "secondary"
        ? "text-black dark:text-white"
        : "bg-[#E0FF5C] text-black hover:bg-black hover:text-[#E0FF5C]",
      // Size styles
      SIZE_CONFIG[size].padding,
      SIZE_CONFIG[size].text,
      // Custom classes
      className
    );

    const content = <ButtonContent size={size}>{children}</ButtonContent>;

    if (href) {
      return (
        <Link href={href} className={commonClasses} aria-label={ariaLabel}>
          {content}
        </Link>
      );
    }

    return (
      <button
        className={commonClasses}
        aria-label={ariaLabel}
        type={type}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";
