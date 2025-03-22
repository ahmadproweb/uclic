import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems } from "./NavItems";
import { HeaderThemeProps } from "./types";
import { colors as theme } from '@/config/theme';

interface DesktopNavProps extends HeaderThemeProps {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (value: boolean) => void;
}

export function DesktopNav({
  isDirectlyOverHero,
  isOverHero,
  isMegaMenuOpen,
  setIsMegaMenuOpen
}: DesktopNavProps) {
  return (
    <div className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
      {navItems.map((item) => (
        <div 
          key={item.href} 
          className="relative"
          style={{ whiteSpace: 'nowrap' }}
        >
          <div 
            className={cn(
              "text-base font-medium transition-colors duration-300 cursor-pointer flex items-center",
              isDirectlyOverHero || isOverHero
                ? "text-gray-900 dark:text-white hover:text-[#97BE11]"
                : "text-gray-900 dark:text-white hover:text-[#97BE11]",
              "dark:text-white dark:hover:text-[#DAFF47]",
              isMegaMenuOpen && item.hasMegaMenu && "text-[#97BE11] dark:text-[#DAFF47]"
            )}
            onClick={() => item.hasMegaMenu ? setIsMegaMenuOpen(!isMegaMenuOpen) : null}
            onMouseEnter={() => item.hasMegaMenu ? setIsMegaMenuOpen(true) : null}
          >
            {item.label}
            {item.hasMegaMenu && (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={cn("ml-1 transition-transform", isMegaMenuOpen && "rotate-180")}
              >
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          
          {!item.hasMegaMenu && (
            <Link href={item.href} className={cn(
              "absolute inset-0 opacity-0",
              isDirectlyOverHero || isOverHero
                ? "text-gray-900 dark:text-white"
                : "text-gray-900 dark:text-white"
            )}>
              <span className="sr-only">{item.label}</span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
} 