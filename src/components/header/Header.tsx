"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { MegaMenu } from "./MegaMenu";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { CTAButton } from "@/components/ui/cta-button";

// Constants
const SCROLL_THRESHOLD = 20;

// Memoized Components
const HeaderCTA = memo(({ isDark }: { isDark: boolean }) => (
  <CTAButton 
    href="/audit" 
    variant={isDark ? "mainCTA" : "shiny"}
    ariaLabel="Demander un audit gratuit"
    className="!transition-none"
  >
    Audit Gratuit
  </CTAButton>
));

HeaderCTA.displayName = 'HeaderCTA';

const MobileMenuButton = memo(({ 
  isDark, 
  isMobileMenuOpen, 
  onClick 
}: { 
  isDark: boolean; 
  isMobileMenuOpen: boolean;
  onClick: () => void;
}) => (
  <button 
    className={cn(
      "md:hidden relative z-50 p-2",
      isMobileMenuOpen && "fixed right-6 top-6",
      isDark ? "text-white hover:text-[#00E6A7]" : "text-black/80 hover:text-[#00E6A7]"
    )}
    onClick={onClick}
    aria-label="Toggle menu"
  >
    <i 
      className={cn(
        "text-2xl",
        isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"
      )}
      aria-hidden="true"
    />
  </button>
));

MobileMenuButton.displayName = 'MobileMenuButton';

const DesktopActions = memo(({ isDark }: { isDark: boolean }) => (
  <div className="hidden md:flex items-center gap-6">
    <ThemeSwitcher isMobile={false} />
    <HeaderCTA isDark={isDark} />
  </div>
));

DesktopActions.displayName = 'DesktopActions';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const scrolled = window.scrollY > SCROLL_THRESHOLD;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerRef.current?.classList.remove('header-hidden');
        } else {
          headerRef.current?.classList.add('header-hidden');
        }
      },
      { threshold: [0] }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isScrolled]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    // Prevent body scroll when menu is open - handled by MobileMenu component now
    // document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);
  
  const handleMegaMenuClose = useCallback(() => {
    setIsMegaMenuOpen(false);
  }, []);

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 py-4",
        "transform",
        "will-change-transform"
      )} 
      ref={headerRef}
    >
      <header 
        className={cn(
          "max-w-7xl mx-auto rounded-2xl",
          "border backdrop-blur-md",
          "will-change-[background-color,box-shadow]",
          isScrolled ? "py-3 px-6" : "py-4 px-8",
          isDark ? [
            "bg-black/40 border-white/10 text-white",
            isScrolled && "bg-black/60 shadow-[0_0_30px_-15px_rgba(255,255,255,0.3)]"
          ] : [
            "bg-white/40 border-black/5 text-black",
            isScrolled && "bg-white/60 shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)]"
          ],
          isMobileMenuOpen && "bg-transparent border-transparent shadow-none"
        )}
        role="banner"
        aria-label="En-tête du site"
      >
        <nav 
          className="flex items-center justify-between h-[45px]"
          role="navigation"
          aria-label="Navigation principale"
        >
          <Logo />

          <DesktopNav
            isDirectlyOverHero={!isScrolled}
            isOverHero={!isScrolled}
            isMegaMenuOpen={isMegaMenuOpen}
            setIsMegaMenuOpen={setIsMegaMenuOpen}
          />

          <DesktopActions isDark={isDark} />

          <MobileMenuButton 
            isDark={isDark}
            isMobileMenuOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </nav>
      </header>

      <MegaMenu 
        isOpen={isMegaMenuOpen}
        onMouseLeave={handleMegaMenuClose}
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

Header.displayName = 'Header';

export default memo(Header); 