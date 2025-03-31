'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import ExpertiseContactForm from "./ExpertiseContactForm";
import Link from "next/link";

interface ExpertiseHeroProps {
  title: string;
  description: string;
  category: string;
  categoryDescription?: string;
}

export default function ExpertiseHero({ 
  title, 
  description, 
  category,
  categoryDescription 
}: ExpertiseHeroProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <div className="relative w-full min-h-[80vh] flex items-center">
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 z-0",
        isDark ? "bg-gradient-to-br from-black via-black/95 to-black/90" : "bg-gradient-to-br from-white via-white/95 to-white/90"
      )} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
                isDark ? "text-white" : "text-black"
              )}>
                {title}
              </h1>
              <p className={cn(
                "text-lg md:text-xl",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center gap-4">
              <Link 
                href="/audit"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black hover:bg-[#E0FF5C] transition-colors duration-200 text-base font-medium"
              >
                <span>Audit Gratuit</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link 
                href="/contact"
                className="group flex items-center gap-2 px-8 py-4 rounded-full border border-white text-white hover:bg-white/10 transition-colors duration-200 text-base font-medium"
              >
                <span>Nous Contacter</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full h-full">
            <ExpertiseContactForm />
          </div>
        </div>
      </div>
    </div>
  );
} 