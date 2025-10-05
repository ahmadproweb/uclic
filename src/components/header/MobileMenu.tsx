import { CTAButton } from "@/components/ui/cta-button";
import { ArrowIcon } from "@/components/ui/icons/ArrowIcon";
import { useTheme } from "@/context/ThemeContext";
import { useNavItems } from "@/hooks/useNavItems";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "./Logo";
import { ServiceCard } from "./ServiceCard";
import ThemeSwitcher from "./ThemeSwitcher";
import { MainMenuProps, MobileMenuProps, ServiceMenuProps } from "./types";

// Memoized Components
const MenuHeader = memo(
  ({ isDark, onClose }: { isDark: boolean; onClose: () => void }) => {
    const { theme, toggleTheme } = useTheme();

    const handleThemeClick = () => {
      // On change seulement le thème, sans fermer le menu
      toggleTheme();
    };

    return (
      <div
        className={cn(
          "fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-[110] backdrop-blur-md border rounded-b-2xl",
          isDark ? "border-white/10 bg-black/40" : "border-black/5 bg-white/40"
        )}
      >
        <Logo />
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center gap-2 p-1.5 px-4 rounded-lg cursor-pointer transition-all duration-200 border backdrop-blur-md",
              isDark
                ? "bg-black/40 hover:bg-black/50 text-white border-white/10"
                : "bg-white/40 hover:bg-white/50 text-black border-black/5"
            )}
            onClick={handleThemeClick}
          >
            <i
              className={cn(isDark ? "ri-sun-line" : "ri-moon-line", "text-lg")}
              aria-hidden="true"
            />
            <span className={cn("text-sm font-medium truncate")}>Thème</span>
          </div>
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded-lg transition-all duration-200 hover:text-[#E0FF5C] active:scale-95",
              isDark
                ? "text-white hover:bg-white/10"
                : "text-black hover:bg-black/10"
            )}
            aria-label="Fermer le menu"
          >
            <i className="ri-close-line text-2xl" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
);

MenuHeader.displayName = "MenuHeader";

const ServiceMenu = memo(
  ({ isDark, onBack, onServiceSelect, serviceItems }: ServiceMenuProps) => (
    <div className="pt-24 flex-1 flex flex-col px-6 overflow-y-auto">
      <div className="max-w-sm mx-auto w-full">
        <button
          onClick={onBack}
          className={cn(
            "flex items-center mb-8 transition-all duration-200 hover:text-[#00E6A7] hover:scale-[1.02] active:scale-[0.98] p-3 -ml-2 rounded-xl backdrop-blur-md border",
            isDark
              ? "text-white bg-black/40 border-white/10"
              : "text-black bg-white/40 border-black/5"
          )}
        >
          <ArrowIcon
            className={cn(
              "mr-3 w-6 h-6 rotate-180 transition-transform duration-200 group-hover:-translate-x-1",
              isDark ? "text-white" : "text-black"
            )}
          />
          <span className="text-xl mr-3">💡</span>
          <span className="text-lg font-medium">Expertises</span>
        </button>

        <div className="flex flex-col space-y-4 pb-6">
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
    <div className="pt-24 flex-1 flex flex-col justify-start px-6">
      <div className="max-w-sm mx-auto w-full">
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => {
            const bgColor = isDark ? "bg-[#333333]" : "bg-gray-100";
            const textColor = isDark ? "text-white" : "text-black";

            // Icônes pour chaque élément de navigation
            const getIcon = (label: string) => {
              switch (label) {
                case "À propos":
                  return "ℹ️";
                case "Nos expertises":
                  return "💡";
                case "Cas clients":
                  return "💼";
                case "Blog":
                  return "📝";
                case "Contact":
                  return "📞";
                default:
                  return "➡️";
              }
            };

            return item.hasMegaMenu ? (
              <button
                key={item.href}
                className={cn(
                  "backdrop-blur-md hover:bg-[#E0FF5C] hover:text-black hover:scale-[1.02] active:scale-[0.98] rounded-xl py-4 px-6 flex items-center justify-between w-full text-left border transition-all duration-200 ease-out",
                  isDark
                    ? "bg-black/40 border-white/10 text-white"
                    : "bg-white/40 border-black/5 text-black"
                )}
                onClick={onServiceMenuOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getIcon(item.label)}</span>
                  <p className="text-base font-medium m-0">{item.label}</p>
                </div>
                <ArrowIcon
                  className={`w-[18px] h-[18px] ${
                    isDark ? "text-white" : "text-black"
                  } hover:text-black transition-transform duration-200 group-hover:translate-x-1`}
                />
              </button>
            ) : (
              <Link
                key={item.href}
                prefetch={false}
                href={item.href}
                className={cn(
                  "backdrop-blur-md hover:bg-[#E0FF5C] hover:text-black hover:scale-[1.02] active:scale-[0.98] rounded-xl py-4 px-6 flex items-center justify-between border transition-all duration-200 ease-out group",
                  isDark
                    ? "bg-black/40 border-white/10 text-white"
                    : "bg-white/40 border-black/5 text-black"
                )}
                onClick={() => {
                  // Réinitialiser le style du body avant la navigation
                  document.body.style.overflow = "";
                  // On attend que la navigation commence avant de fermer
                  setTimeout(onClose, 150);
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getIcon(item.label)}</span>
                  <p className="text-base font-medium m-0">{item.label}</p>
                </div>
              </Link>
            );
          })}

          <div className="mt-8 flex flex-col items-center space-y-6">
            <CTAButton
              href="/audit"
              className="w-full max-w-xs mx-auto hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ease-out flex items-center justify-center gap-2"
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

            {/* Logos clients */}
            {/* Logos clients */}
            <div className="flex flex-col items-center space-y-3">
              <p
                className={cn(
                  "text-xs opacity-60",
                  isDark ? "text-white" : "text-black"
                )}
              >
                Ils nous font confiance
              </p>
              <div className="flex flex-col items-center space-y-2 opacity-50">
                {/* Ligne 1 */}
                <div className="flex items-center space-x-2">
                  <img
                    src={require("@/lib/assets").getAssetUrl(
                      "/partners/louisvuitton.png"
                    )}
                    alt="Logo Louis Vuitton"
                    width="60"
                    height="16"
                    loading="lazy"
                    className="h-4 w-auto object-contain brightness-0 dark:invert"
                  />
                  <img
                    src={require("@/lib/assets").getAssetUrl(
                      "/partners/lemonde.png"
                    )}
                    alt="Logo Le Monde"
                    width="60"
                    height="16"
                    loading="lazy"
                    className="h-4 w-auto object-contain brightness-0 dark:invert"
                  />
                  <img
                    src={require("@/lib/assets").getAssetUrl(
                      "/partners/tehtris.png"
                    )}
                    alt="Logo Tehtris"
                    width="60"
                    height="16"
                    loading="lazy"
                    className="h-4 w-auto object-contain brightness-0 dark:invert"
                  />
                </div>
                {/* Ligne 2 */}
                <div className="flex items-center space-x-2">
                  <img
                    src={require("@/lib/assets").getAssetUrl(
                      "/partners/oreal.png"
                    )}
                    alt="Logo L'Oréal"
                    width="60"
                    height="16"
                    loading="lazy"
                    className="h-4 w-auto object-contain brightness-0 dark:invert"
                  />
                  <img
                    src={require("@/lib/assets").getAssetUrl(
                      "/partners/agicap.png"
                    )}
                    alt="Logo Agicap"
                    width="60"
                    height="16"
                    loading="lazy"
                    className="h-4 w-auto object-contain brightness-0 dark:invert"
                  />
                  <img
                    src={require("@/lib/assets").getAssetUrl(
                      "/partners/deepki.png"
                    )}
                    alt="Logo Deepki"
                    width="60"
                    height="16"
                    loading="lazy"
                    className="h-4 w-auto object-contain brightness-0 dark:invert"
                  />
                </div>
                {/* Ligne 3 */}
                <div className="flex items-center space-x-2">
                  <img
                    src={require("@/lib/assets").getAssetUrl(
                      "/partners/muzzo.png"
                    )}
                    alt="Logo Muzzo"
                    width="60"
                    height="16"
                    loading="lazy"
                    className="h-4 w-auto object-contain brightness-0 dark:invert"
                  />
                  <img
                    src={require("@/lib/assets").getAssetUrl(
                      "/partners/codingame.png"
                    )}
                    alt="Logo CodinGame"
                    width="60"
                    height="16"
                    loading="lazy"
                    className="h-4 w-auto object-contain brightness-0 dark:invert"
                  />
                  <img
                    src={require("@/lib/assets").getAssetUrl(
                      "/partners/floa.png"
                    )}
                    alt="Logo Floa"
                    width="60"
                    height="16"
                    loading="lazy"
                    className="h-4 w-auto object-contain brightness-0 dark:invert"
                  />
                </div>
              </div>
            </div>
          </div>
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

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

    if (!mounted) return null;

    const menuContent = loading ? (
      <div
        className={cn(
          "fixed inset-0 z-[100] transition-all duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Menu panel */}
        <div
          className={cn(
            "fixed left-0 top-0 h-full w-full transition-all duration-300 ease-out flex flex-col min-h-screen overflow-y-auto",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
          style={{
            background: isDark
              ? "rgba(0, 0, 0, 0.4)"
              : "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <MenuHeader isDark={isDark} onClose={handleClose} />
          <div className="flex items-center justify-center h-full">
            <div
              className={cn(
                "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2",
                isDark ? "border-white" : "border-black"
              )}
            ></div>
          </div>
        </div>
      </div>
    ) : (
      <div
        className={cn(
          "fixed inset-0 z-[100] transition-all duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Halo background effect */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(circle at 50% 50%, rgba(0, 230, 167, 0.15) 0%, rgba(0, 0, 0, 0.9) 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(0, 230, 167, 0.1) 0%, rgba(255, 255, 255, 0.95) 70%)",
          }}
        />

        {/* Blur overlay for better readability */}
        <div
          className={cn(
            "fixed inset-0 min-h-screen backdrop-blur-lg pointer-events-none",
            isDark ? "bg-black/50" : "bg-white/60"
          )}
        />

        {/* Menu panel */}
        <div
          className={cn(
            "fixed left-0 top-0 h-full w-full transition-all duration-300 ease-out flex flex-col min-h-screen overflow-y-auto bg-transparent pointer-events-auto relative",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Texture grain background */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${
                require("@/lib/assets").backgroundEffectUrl
              })`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              opacity: isDark ? 0.03 : 0.04,
            }}
          />

          <MenuHeader isDark={isDark} onClose={handleClose} />

          <div className="relative z-10">
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
        </div>
      </div>
    );

    return createPortal(menuContent, document.body);
  }
);

MobileMenu.displayName = "MobileMenu";
