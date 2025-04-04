export interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  className?: string;
}

export interface ServiceItem {
  title: string;
  slug: string;
  description?: string;
  items: Array<{
    title: string;
    href: string;
  }>;
  isHighlighted?: boolean;
}

export interface HeaderThemeProps {
  isOverHero: boolean;
  isDirectlyOverHero: boolean;
} 