export interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
}

export interface ServiceItem {
  title: string;
  slug: string;
  description: string;
  items: string[];
  isHighlighted: boolean;
}

export interface HeaderThemeProps {
  isOverHero: boolean;
  isDirectlyOverHero: boolean;
} 