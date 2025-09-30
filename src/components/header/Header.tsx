"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import ThemeSwitcher from "./ThemeSwitcher";

// Constants
const SCROLL_THRESHOLD = 80;

// Memoized Components
const HeaderCTA = memo(({ isDark }: { isDark: boolean }) => (
  <CTAButton
    href="/audit"
    variant={isDark ? "mainCTA" : "shiny"}
    ariaLabel="Demander un audit gratuit"
    size="l"
    className="!transition-none"
  >
    Audit Gratuit
  </CTAButton>
));

HeaderCTA.displayName = "HeaderCTA";

const MobileMenuButton = memo(
  ({
    isDark,
    isMobileMenuOpen,
    onClick,
  }: {
    isDark: boolean;
    isMobileMenuOpen: boolean;
    onClick: () => void;
  }) => (
    <button
      className={cn(
        "md:hidden relative z-50 p-2",
        isMobileMenuOpen && "fixed right-6 top-6",
        isDark
          ? "text-white hover:text-[#00E6A7]"
          : "text-black/80 hover:text-[#00E6A7]"
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
  )
);

MobileMenuButton.displayName = "MobileMenuButton";

const DesktopActions = memo(({ isDark }: { isDark: boolean }) => (
  <div className="hidden md:flex items-center gap-6">
    <ThemeSwitcher isMobile={false} />
    <HeaderCTA isDark={isDark} />
  </div>
));

DesktopActions.displayName = "DesktopActions";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

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
          headerRef.current?.classList.remove("header-hidden");
        } else {
          headerRef.current?.classList.add("header-hidden");
        }
      },
      { threshold: [0] }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isScrolled]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    // Prevent body scroll when menu is open - handled by MobileMenu component now
    // document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  const handleMegaMenuClose = useCallback(() => {
    setIsMegaMenuOpen(false);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 py-4 font-heading overflow-x-clip",
        "transform will-change-transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      )}
      ref={headerRef}
    >
      <header
        className={cn(
          "w-full max-w-[1250px] mx-auto rounded-2xl box-border",
          "border backdrop-blur-md",
          "will-change-[background-color,box-shadow,transform] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "py-3 px-4 md:py-4 md:px-8 scale-100 translate-y-0 shadow-none",
          isDark
            ? [
                "bg-black/40 border-white/10 text-white",
                isScrolled &&
                  "bg-black/70 shadow-[0_8px_32px_-8px_rgba(0,230,167,0.15)]",
              ]
            : [
                "bg-white/40 border-black/5 text-black",
                isScrolled &&
                  "bg-white/70 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)]",
              ],
          isMobileMenuOpen &&
            "bg-transparent border-transparent shadow-none scale-100 translate-y-0"
        )}
        role="banner"
        aria-label="En-tête du site"
      >
        <nav
          className="flex items-center justify-between h-[48px] md:h-[56px]"
          role="navigation"
          aria-label="Navigation principale"
        >
          <Logo />

          <DesktopNav
            isOverHero={!isScrolled}
            isDirectlyOverHero={!isScrolled}
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

      <MegaMenu isOpen={isMegaMenuOpen} setIsMegaMenuOpen={setIsMegaMenuOpen} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        isServiceMenuOpen={isServiceMenuOpen}
        setIsServiceMenuOpen={setIsServiceMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </div>
  );
};

Header.displayName = "Header";

export default memo(Header);
