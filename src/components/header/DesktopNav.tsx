import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo, useCallback } from "react";
import { navItems } from "./NavItems";
import { HeaderThemeProps } from "./types";

interface DesktopNavProps extends HeaderThemeProps {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (value: boolean) => void;
}

// Memoized Components
const NavItem = memo(
  ({
    item,
    isDirectlyOverHero,
    isOverHero,
    isMegaMenuOpen,
    onMouseEnter,
    onClick,
  }: {
    item: (typeof navItems)[0];
    isDirectlyOverHero: boolean;
    isOverHero: boolean;
    isMegaMenuOpen: boolean;
    onMouseEnter: () => void;
    onClick: () => void;
  }) => {
    // For accessibility, allow keyboard interaction for MegaMenu item
    const isMegaMenu = !!item.hasMegaMenu;
    return (
      <div
        key={item.href}
        className="relative"
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
        <p className="m-0 inline-flex items-center font-bold">
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
    isMegaMenuOpen,
    setIsMegaMenuOpen,
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
      }
    }, [setIsMegaMenuOpen]);

    const handleNavMouseLeave = useCallback(() => {
      setIsMegaMenuOpen(false);
    }, [setIsMegaMenuOpen]);

    return (
      <div
        className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2"
        onMouseLeave={handleNavMouseLeave}
      >
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isDirectlyOverHero={isDirectlyOverHero}
            isOverHero={isOverHero}
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
