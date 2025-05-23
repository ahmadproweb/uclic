import { CTAButton } from "@/components/ui/cta-button";
import { ArrowIcon } from "@/components/ui/icons/ArrowIcon";
import { useTheme } from "@/context/ThemeContext";
import { useNavItems } from "@/hooks/useNavItems";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo, useCallback, useEffect } from "react";
import { ServiceCard } from "./ServiceCard";
import ThemeSwitcher from "./ThemeSwitcher";
import { MainMenuProps, MobileMenuProps, ServiceMenuProps } from "./types";

// Memoized Components
const MenuHeader = memo(
  ({ isDark, onClose }: { isDark: boolean; onClose: () => void }) => {
    const { theme, toggleTheme } = useTheme();

    const handleThemeClick = () => {
      // On change d'abord le thème
      toggleTheme();
      // Puis on ferme le menu après un court délai
      setTimeout(onClose, 200);
    };

    return (
      <div
        className={cn(
          "fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-50 backdrop-blur-md border-b",
          "border-white/20 bg-black/90"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 p-1.5 px-4 rounded-lg cursor-pointer",
            "bg-white/20"
          )}
          onClick={handleThemeClick}
        >
          <ThemeSwitcher isMobile={true} />
          <span className="text-sm font-medium text-white truncate">Thème</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 transition-colors text-white hover:text-[#00E6A7]"
          aria-label="Fermer le menu"
        >
          <i className="ri-close-line text-2xl" aria-hidden="true" />
        </button>
      </div>
    );
  }
);

MenuHeader.displayName = "MenuHeader";

const ServiceMenu = memo(
  ({ isDark, onBack, onServiceSelect, serviceItems }: ServiceMenuProps) => (
    <div className="pt-28 flex-1 flex flex-col px-6 overflow-y-auto">
      <div className="max-w-sm mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center mb-6 transition-colors text-white hover:text-[#00E6A7]"
        >
          <ArrowIcon className="mr-2 w-6 h-6 rotate-180 text-white" />
          <span className="text-lg font-medium">Nos services</span>
        </button>

        <div className="flex flex-col space-y-3 pb-6">
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
  )
);

ServiceMenu.displayName = "ServiceMenu";

const MainMenu = memo(
  ({ isDark, onServiceMenuOpen, onClose, navItems }: MainMenuProps) => (
    <div className="pt-20 flex-1 flex flex-col justify-center px-6">
      <div className="max-w-sm mx-auto w-full -mt-20">
        <nav className="flex flex-col space-y-3">
          {navItems.map((item) => {
            const bgColor = "bg-[#333333]";
            const textColor = "text-white";

            return item.hasMegaMenu ? (
              <button
                key={item.href}
                className={`${bgColor} hover:bg-[#E0FF5C] hover:text-black rounded-lg py-4 px-5 flex items-center justify-between w-full text-left border border-white/20 ${textColor} transition-colors duration-200`}
                onClick={onServiceMenuOpen}
              >
                <p className="text-base font-medium m-0 flex-1">{item.label}</p>
                <ArrowIcon className="w-[18px] h-[18px] text-white hover:text-black" />
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`${bgColor} hover:bg-[#E0FF5C] hover:text-black rounded-lg py-4 px-5 flex items-center justify-between border border-white/20 ${textColor} transition-colors duration-200`}
                onClick={() => {
                  // Réinitialiser le style du body avant la navigation
                  document.body.style.overflow = "";
                  // On attend que la navigation commence avant de fermer
                  setTimeout(onClose, 150);
                }}
              >
                <p className="text-base font-medium m-0 flex-1">{item.label}</p>
              </Link>
            );
          })}

          <CTAButton
            href="/audit"
            className="w-auto mx-auto mt-4"
            onClick={() => {
              // Réinitialiser le style du body avant la navigation
              document.body.style.overflow = "";
              // On attend que la navigation commence avant de fermer
              setTimeout(onClose, 150);
            }}
            variant={isDark ? "mainCTA" : "shiny"}
            ariaLabel="Demander un audit gratuit"
          >
            Audit Gratuit
          </CTAButton>
        </nav>
      </div>
    </div>
  )
);

MainMenu.displayName = "MainMenu";

export const MobileMenu = memo(
  ({
    isOpen,
    isServiceMenuOpen,
    setIsServiceMenuOpen,
    setIsMobileMenuOpen,
  }: MobileMenuProps) => {
    const { theme: currentTheme } = useTheme();
    const isDark = currentTheme === "dark";
    const { navItems, serviceItems, loading } = useNavItems();

    // Effet pour gérer le overflow du body quand le menu est ouvert/fermé
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden"; // Désactiver le scroll quand le menu est ouvert
      } else {
        // Délai pour permettre l'animation de fermeture
        const timer = setTimeout(() => {
          document.body.style.overflow = ""; // Réactiver le scroll quand le menu est fermé
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    const handleClose = useCallback(() => {
      setIsMobileMenuOpen(false);
      // Le overflow du body sera géré par l'effet ci-dessus
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
      // Réinitialiser immédiatement le style du body pour permettre le scroll
      document.body.style.overflow = "";
    }, [setIsServiceMenuOpen, setIsMobileMenuOpen]);

    if (loading) {
      return (
        <div
          className={cn(
            "fixed inset-0 z-40 transition-all duration-300 md:hidden flex flex-col min-h-screen overflow-y-auto",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          )}
          style={{
            background: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <MenuHeader isDark={isDark} onClose={handleClose} />
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-300 md:hidden flex flex-col min-h-screen overflow-y-auto",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
        style={{
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <MenuHeader isDark={isDark} onClose={handleClose} />

        {isServiceMenuOpen ? (
          <ServiceMenu
            isDark={isDark}
            onBack={handleServiceMenuClose}
            onServiceSelect={handleServiceSelect}
            serviceItems={serviceItems}
          />
        ) : (
          <MainMenu
            isDark={isDark}
            onServiceMenuOpen={handleServiceMenuOpen}
            onClose={handleClose}
            navItems={navItems}
          />
        )}
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";
