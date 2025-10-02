'use client';
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface SectionWithBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionWithBackground({ children, className }: SectionWithBackgroundProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section
      className={cn(
        "w-full relative py-8 md:py-16",
        "bg-[#f4f4f0] dark:bg-black/95",
        className
      )}
    >
      {/* Section-level background pattern */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url("/backgroundeffect.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: isDark ? 0.25 : 0.04
        }}
        aria-hidden="true"
      />
      {children}
    </section>
  );
}
