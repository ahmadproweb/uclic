import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo, useCallback } from "react";
import { navItems } from "./NavItems";
import { HeaderThemeProps } from "./types";

interface DesktopNavProps extends HeaderThemeProps {
  isDark?: boolean;
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (value: boolean) => void;
  onArmMegaMenu?: (armed: boolean) => void;
}

// Memoized Components
const NavItem = memo(
  ({
    item,
    isDirectlyOverHero,
    isOverHero,
    isDark,
    isMegaMenuOpen,
    onMouseEnter,
    onClick,
  }: {
    item: (typeof navItems)[0];
    isDirectlyOverHero: boolean;
    isOverHero: boolean;
    isDark?: boolean;
    isMegaMenuOpen: boolean;
    onMouseEnter: () => void;
    onClick: () => void;
  }) => {
    // For accessibility, allow keyboard interaction for MegaMenu item
    const isMegaMenu = !!item.hasMegaMenu;
    return (
      <div
        key={item.href}
        className="relative group"
        style={{
          whiteSpace: "nowrap",
          ...(isMegaMenu ? { cursor: "pointer" } : {}),
        }}
        tabIndex={isMegaMenu ? 0 : undefined}
        onMouseEnter={isMegaMenu ? onMouseEnter : undefined}
        onClick={isMegaMenu ? onClick : undefined}
        onKeyDown={
          isMegaMenu
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        role={isMegaMenu ? "button" : undefined}
        aria-expanded={isMegaMenu ? isMegaMenuOpen : undefined}
        aria-haspopup={isMegaMenu ? "true" : undefined}
        aria-label={
          isMegaMenu
            ? `${item.label} - Cliquez pour ${
                isMegaMenuOpen ? "fermer" : "ouvrir"
              } le menu`
            : `Accéder à ${item.label}`
        }
      >
        <p className={cn(
          "m-0 inline-flex items-center font-bold relative",
           // Styles de base - Noir en light, blanc en dark
           isDark ? "text-white" : "text-black",
          // Transition pour le hover
          "transition-all duration-300 ease-in-out",
           // Effet hover avec trait vert fluo - adapté selon le thème
           isDark ? "group-hover:text-[#E0FF5C]" : "group-hover:text-black",
          "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#E0FF5C] after:transition-all after:duration-300 after:ease-in-out",
          "group-hover:after:w-full"
        )}>
          {item.label}
          {isMegaMenu && (
            <i
              className={cn(
                "ri-arrow-down-s-line ml-1 !transition-none",
                isMegaMenuOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
          )}
        </p>
        {!isMegaMenu && (
          <Link
          prefetch={false} 
            href={item.href}
            className="absolute inset-0 z-10"
            aria-label={`Accéder à ${item.label}`}
            tabIndex={-1}
          />
        )}
      </div>
    );
  }
);

NavItem.displayName = "NavItem";

export const DesktopNav = memo(
  ({
    isDirectlyOverHero,
    isOverHero,
    isDark,
    isMegaMenuOpen,
    setIsMegaMenuOpen,
    onArmMegaMenu,
  }: DesktopNavProps) => {
    const handleItemClick = useCallback(
      (item: (typeof navItems)[0]) => {
        if (item.hasMegaMenu) {
          setIsMegaMenuOpen(!isMegaMenuOpen);
        }
      },
      [isMegaMenuOpen, setIsMegaMenuOpen]
    );

    // Hover opens the mega menu when pointing the item
    const handleItemMouseEnter = useCallback((item: (typeof navItems)[0]) => {
      if (item.hasMegaMenu) {
        setIsMegaMenuOpen(true);
        onArmMegaMenu?.(true);
      }
    }, [setIsMegaMenuOpen]);

    return (
      <div
        className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2"
      >
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isDirectlyOverHero={isDirectlyOverHero}
            isOverHero={isOverHero}
            isDark={isDark}
            isMegaMenuOpen={!!item.hasMegaMenu && isMegaMenuOpen}
            onMouseEnter={() => handleItemMouseEnter(item)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    );
  }
);

DesktopNav.displayName = "DesktopNav";
