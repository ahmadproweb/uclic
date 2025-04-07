export interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  className?: string;
}

export interface ServiceSubItem {
  title: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  slug: string;
  description: string;
  items: ServiceSubItem[];
  isHighlighted?: boolean;
}

export interface MobileMenuProps {
  isOpen: boolean;
  isServiceMenuOpen: boolean;
  setIsServiceMenuOpen: (value: boolean) => void;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export interface ServiceMenuProps {
  isDark: boolean;
  onBack: () => void;
  onServiceSelect: () => void;
  serviceItems: ServiceItem[];
}

export interface MainMenuProps {
  isDark: boolean;
  onServiceMenuOpen: () => void;
  onClose: () => void;
  navItems: NavItem[];
}

export interface HeaderThemeProps {
  isOverHero: boolean;
  isDirectlyOverHero: boolean;
} 