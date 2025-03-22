"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { MegaMenu } from "./MegaMenu";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { CTAButton } from "@/components/ui/cta-button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4" ref={headerRef}>
      <header className={cn(
        "max-w-7xl mx-auto rounded-2xl transition-all duration-300",
        "border backdrop-blur-md",
        isScrolled ? "py-3 px-6" : "py-4 px-8",
        isDark ? [
          "bg-black/40 border-white/10 text-white",
          isScrolled && "bg-black/60 shadow-[0_0_30px_-15px_rgba(255,255,255,0.3)]"
        ] : [
          "bg-white/40 border-black/5 text-black",
          isScrolled && "bg-white/60 shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)]"
        ],
        isMobileMenuOpen && "bg-transparent border-transparent shadow-none"
      )}>
        <div className="flex items-center justify-between h-[45px]">
          <Logo />

          <DesktopNav
            isDirectlyOverHero={!isScrolled}
            isOverHero={!isScrolled}
            isMegaMenuOpen={isMegaMenuOpen}
            setIsMegaMenuOpen={setIsMegaMenuOpen}
          />

          {/* CTA and Theme Switcher */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeSwitcher />
            <div className="flex items-center gap-4">
              <Link 
                href="/audit" 
                className={cn(
                  "hidden sm:inline-flex items-center gap-2",
                  "font-bold rounded-full",
                  "bg-[#DAFF47] text-black hover:bg-[#DAFF47]/90",
                  "transition-all duration-200",
                  "px-5 py-2.5 text-base",
                  "group"
                )}
              >
                Audit Gratuit
                <span className="rounded-full border border-black flex items-center justify-center w-7 h-7 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg 
                    width="15" 
                    height="15" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="stroke-black transition-transform duration-200 group-hover:-rotate-45"
                  >
                    <path 
                      d="M5 12H19M19 12L12 5M19 12L12 19" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={cn(
              "md:hidden relative z-50 p-2 transition-transform duration-300",
              isMobileMenuOpen && "fixed right-6 top-6"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={cn(
              "flex flex-col gap-1.5 w-6 transition-all duration-300",
              isMobileMenuOpen && "transform rotate-180"
            )}>
              <span className={cn(
                "block h-0.5 transition-all duration-300 transform",
                isDark ? "bg-white" : "bg-black",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )} style={{ width: isMobileMenuOpen ? '24px' : '24px' }}/>
              <span className={cn(
                "block h-0.5 transition-all duration-300",
                isDark ? "bg-white" : "bg-black",
                isMobileMenuOpen && "opacity-0"
              )} style={{ width: '16px' }}/>
              <span className={cn(
                "block h-0.5 transition-all duration-300 transform",
                isDark ? "bg-white" : "bg-black",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )} style={{ width: isMobileMenuOpen ? '24px' : '20px' }}/>
            </div>
          </button>
        </div>
      </header>

      <MegaMenu 
        isOpen={isMegaMenuOpen}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        isServiceMenuOpen={isServiceMenuOpen}
        setIsServiceMenuOpen={setIsServiceMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </div>
  );
} 