import { memo, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems } from "./NavItems";
import { HeaderThemeProps } from "./types";
import 'remixicon/fonts/remixicon.css';

interface DesktopNavProps extends HeaderThemeProps {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (value: boolean) => void;
}

// Memoized Components
const NavItem = memo(({ 
  item, 
  isDirectlyOverHero, 
  isOverHero, 
  isMegaMenuOpen,
  onMouseEnter,
  onClick
}: { 
  item: typeof navItems[0];
  isDirectlyOverHero: boolean;
  isOverHero: boolean;
  isMegaMenuOpen: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) => (
  <div 
    key={item.href} 
    className="relative"
    style={{ whiteSpace: 'nowrap' }}
  >
    <div 
      className={cn(
        "text-base font-medium transition-colors duration-300 cursor-pointer flex items-center",
        isDirectlyOverHero || isOverHero
          ? "text-gray-900 dark:text-white hover:text-[#E0FF5C]"
          : "text-gray-900 dark:text-white hover:text-[#E0FF5C]",
        "dark:text-white dark:hover:text-[#E0FF5C]",
        isMegaMenuOpen && item.hasMegaMenu && "text-[#E0FF5C] dark:text-[#E0FF5C]"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role={item.hasMegaMenu ? "button" : undefined}
      aria-expanded={item.hasMegaMenu ? isMegaMenuOpen : undefined}
      aria-haspopup={item.hasMegaMenu ? "true" : undefined}
      aria-label={item.hasMegaMenu ? `${item.label} - Cliquez pour ${isMegaMenuOpen ? 'fermer' : 'ouvrir'} le menu` : undefined}
    >
      {item.label}
      {item.hasMegaMenu && (
        <i 
          className={cn(
            "ri-arrow-down-s-line ml-1 transition-transform",
            isMegaMenuOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      )}
    </div>
    
    {!item.hasMegaMenu && (
      <Link 
        href={item.href} 
        className={cn(
          "absolute inset-0",
          isDirectlyOverHero || isOverHero
            ? "text-gray-900 dark:text-white"
            : "text-gray-900 dark:text-white"
        )}
        aria-label={`Accéder à ${item.label}`}
      >
        {item.label}
      </Link>
    )}
  </div>
));

NavItem.displayName = 'NavItem';

export const DesktopNav = memo(({
  isDirectlyOverHero,
  isOverHero,
  isMegaMenuOpen,
  setIsMegaMenuOpen
}: DesktopNavProps) => {
  const handleItemClick = useCallback((item: typeof navItems[0]) => {
    if (item.hasMegaMenu) {
      setIsMegaMenuOpen(!isMegaMenuOpen);
    }
  }, [isMegaMenuOpen, setIsMegaMenuOpen]);

  const handleItemMouseEnter = useCallback((item: typeof navItems[0]) => {
    if (item.hasMegaMenu) {
      setIsMegaMenuOpen(true);
    }
  }, [setIsMegaMenuOpen]);

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
});

DesktopNav.displayName = 'DesktopNav'; 