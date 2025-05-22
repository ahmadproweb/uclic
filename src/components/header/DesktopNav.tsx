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
  }) => (
    <div key={item.href} className="relative" style={{ whiteSpace: "nowrap" }}>
      {item.hasMegaMenu ? (
        <button
          className={cn(
            item.className,
            isMegaMenuOpen && "text-[#9FB832] dark:text-[#E0FF5C]"
          )}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          role="button"
          aria-expanded={isMegaMenuOpen}
          aria-haspopup="true"
          aria-label={`${item.label} - Cliquez pour ${
            isMegaMenuOpen ? "fermer" : "ouvrir"
          } le menu`}
        >
          {item.label}
          <i
            className={cn(
              "ri-arrow-down-s-line ml-1 !transition-none",
              isMegaMenuOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      ) : (
        <Link
          href={item.href}
          className={cn(item.className, "block")}
          aria-label={`Accéder à ${item.label}`}
        >
          {item.label}
        </Link>
      )}
    </div>
  )
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

    const handleItemMouseEnter = useCallback(
      (item: (typeof navItems)[0]) => {
        if (item.hasMegaMenu) {
          setIsMegaMenuOpen(true);
        }
      },
      [setIsMegaMenuOpen]
    );

    return (
      <div className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isDirectlyOverHero={isDirectlyOverHero}
            isOverHero={isOverHero}
            isMegaMenuOpen={isMegaMenuOpen}
            onMouseEnter={() => handleItemMouseEnter(item)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    );
  }
);

DesktopNav.displayName = "DesktopNav";
