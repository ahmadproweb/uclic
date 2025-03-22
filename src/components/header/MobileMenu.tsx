import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems, serviceItems } from "./NavItems";
import { ServiceCard } from "./ServiceCard";
import { colors as theme } from '@/config/theme';
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { CTAButton } from "@/components/ui/cta-button";

interface MobileMenuProps {
  isOpen: boolean;
  isServiceMenuOpen: boolean;
  setIsServiceMenuOpen: (value: boolean) => void;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export function MobileMenu({
  isOpen,
  isServiceMenuOpen,
  setIsServiceMenuOpen,
  setIsMobileMenuOpen
}: MobileMenuProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

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
      {/* Header avec bouton de fermeture et ThemeSwitcher */}
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
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            "p-2 transition-colors",
            isDark ? "text-white hover:text-[#00E6A7]" : "text-black/80 hover:text-[#00E6A7]"
          )}
          aria-label="Fermer le menu"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M18 6L6 18M6 6L18 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {!isServiceMenuOpen ? (
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
                    onClick={() => setIsServiceMenuOpen(true)}
                  >
                    <span className="text-base font-medium">{item.label}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke={isDark ? "white" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-base font-medium">{item.label}</span>
                  </Link>
                )
              ))}
              
              <CTAButton 
                href="/audit" 
                className="w-auto mx-auto"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Audit Gratuit
              </CTAButton>
            </nav>
          </div>
        </div>
      ) : (
        <div className="pt-20 flex-1 flex flex-col justify-start px-6 overflow-y-auto">
          <div className="max-w-sm mx-auto w-full">
            <button
              onClick={() => setIsServiceMenuOpen(false)}
              className={cn(
                "flex items-center mb-6 transition-colors",
                isDark ? "text-white hover:text-[#00E6A7]" : "text-black/90 hover:text-[#00E6A7]"
              )}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg font-medium">Nos services</span>
            </button>
            
            <div className="flex flex-col space-y-3">
              {serviceItems.map((service) => (
                <ServiceCard 
                  key={service.slug} 
                  service={service} 
                  isMobile 
                  onSelect={() => {
                    setIsServiceMenuOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 