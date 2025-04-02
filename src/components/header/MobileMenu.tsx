import { memo, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems, serviceItems } from "./NavItems";
import { ServiceCard } from "./ServiceCard";
import { colors as theme } from '@/config/theme';
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowIcon } from "@/components/ui/icons/ArrowIcon";

interface MobileMenuProps {
  isOpen: boolean;
  isServiceMenuOpen: boolean;
  setIsServiceMenuOpen: (value: boolean) => void;
  setIsMobileMenuOpen: (value: boolean) => void;
}

// Memoized Components
const MenuHeader = memo(({ 
  isDark, 
  onClose 
}: { 
  isDark: boolean; 
  onClose: () => void;
}) => (
  <div className={cn(
    "fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-50 backdrop-blur-md border-b",
    isDark ? "border-white/10" : "border-black/5 bg-white/80"
  )}>
    <div className={cn(
      "flex items-center gap-2 p-1.5 rounded-lg",
      isDark ? "bg-white/5" : "bg-black/[0.03]"
    )}>
      <ThemeSwitcher />
      <span className={cn(
        "text-sm font-medium",
        isDark ? "text-white/70" : "text-black/60"
      )}>Thème</span>
    </div>
    <button
      onClick={onClose}
      className={cn(
        "p-2 transition-colors",
        isDark ? "text-white hover:text-[#00E6A7]" : "text-black/80 hover:text-[#00E6A7]"
      )}
      aria-label="Fermer le menu"
    >
      <i className="ri-close-line text-2xl" aria-hidden="true" />
    </button>
  </div>
));

MenuHeader.displayName = 'MenuHeader';

const ServiceMenu = memo(({ 
  isDark, 
  onBack, 
  onServiceSelect 
}: { 
  isDark: boolean; 
  onBack: () => void;
  onServiceSelect: () => void;
}) => (
  <div className="pt-20 flex-1 flex flex-col justify-start px-6 overflow-y-auto">
    <div className="max-w-sm mx-auto w-full">
      <button
        onClick={onBack}
        className={cn(
          "flex items-center mb-6 transition-colors",
          isDark ? "text-white hover:text-[#00E6A7]" : "text-black/90 hover:text-[#00E6A7]"
        )}
      >
        <ArrowIcon 
          className="mr-2 w-6 h-6 rotate-180"
        />
        <span className="text-lg font-medium">Nos services</span>
      </button>
      
      <div className="flex flex-col space-y-3">
        {serviceItems.map((service) => (
          <ServiceCard 
            key={service.slug} 
            service={service} 
            isMobile 
            onSelect={onServiceSelect}
          />
        ))}
      </div>
    </div>
  </div>
));

ServiceMenu.displayName = 'ServiceMenu';

const MainMenu = memo(({ 
  isDark, 
  onServiceMenuOpen, 
  onClose 
}: { 
  isDark: boolean; 
  onServiceMenuOpen: () => void;
  onClose: () => void;
}) => (
  <div className="pt-20 flex-1 flex flex-col justify-start px-6">
    <div className="max-w-sm mx-auto w-full">
      <nav className="flex flex-col space-y-3">
        {navItems.map((item) => (
          item.hasMegaMenu ? (
            <button
              key={item.href}
              className={cn(
                "backdrop-blur-sm rounded-lg py-4 px-5 flex items-center justify-between w-full text-left transition-colors",
                isDark 
                  ? "bg-white/10 text-white hover:bg-[#00E6A7]/20" 
                  : "bg-black/[0.03] text-black/90 hover:bg-[#00E6A7]/10"
              )}
              onClick={onServiceMenuOpen}
            >
              <span className="text-base font-medium">{item.label}</span>
              <ArrowIcon 
                className={cn(
                  "w-[18px] h-[18px] -rotate-90",
                  isDark ? "text-white" : "text-black"
                )}
              />
            </button>
          ) : (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "backdrop-blur-sm rounded-lg py-4 px-5 flex items-center justify-between transition-colors",
                isDark 
                  ? "bg-white/10 text-white hover:bg-[#00E6A7]/20" 
                  : "bg-black/[0.03] text-black/90 hover:bg-[#00E6A7]/10"
              )}
              onClick={onClose}
            >
              <span className="text-base font-medium">{item.label}</span>
            </Link>
          )
        ))}
        
        <CTAButton 
          href="/audit" 
          className="w-auto mx-auto"
          onClick={onClose}
          variant={isDark ? "mainCTA" : "shiny"}
          ariaLabel="Demander un audit gratuit"
        >
          Audit Gratuit
        </CTAButton>
      </nav>
    </div>
  </div>
));

MainMenu.displayName = 'MainMenu';

export const MobileMenu = memo(({
  isOpen,
  isServiceMenuOpen,
  setIsServiceMenuOpen,
  setIsMobileMenuOpen
}: MobileMenuProps) => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  const handleClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, [setIsMobileMenuOpen]);

  const handleServiceMenuOpen = useCallback(() => {
    setIsServiceMenuOpen(true);
  }, [setIsServiceMenuOpen]);

  const handleServiceMenuClose = useCallback(() => {
    setIsServiceMenuOpen(false);
  }, [setIsServiceMenuOpen]);

  const handleServiceSelect = useCallback(() => {
    setIsServiceMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [setIsServiceMenuOpen, setIsMobileMenuOpen]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-40 transition-all duration-300 md:hidden flex flex-col",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}
      style={{
        background: isDark 
          ? theme.colors.gradients.dark 
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
        backdropFilter: `blur(${theme.effects.blur.default})`
      }}
    >
      <MenuHeader isDark={isDark} onClose={handleClose} />

      {isServiceMenuOpen ? (
        <ServiceMenu 
          isDark={isDark}
          onBack={handleServiceMenuClose}
          onServiceSelect={handleServiceSelect}
        />
      ) : (
        <MainMenu 
          isDark={isDark}
          onServiceMenuOpen={handleServiceMenuOpen}
          onClose={handleClose}
        />
      )}
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu'; 