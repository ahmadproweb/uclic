import { NavItem, ServiceItem } from './types';

export const navItems: NavItem[] = [
  { 
    label: "À propos", 
    href: "/a-propos",
    className: "text-base font-medium cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]"
  },
  { 
    label: "Nos expertises", 
    href: "/services", 
    hasMegaMenu: true,
    className: "text-base font-medium cursor-pointer flex items-center text-gray-900 hover:text-[#9FB832] dark:text-white dark:hover:text-[#E0FF5C]" 
  },
  { 
    label: "Cas clients", 
    href: "/cas-clients",
    className: "text-base font-medium cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]"
  },
  { 
    label: "Blog", 
    href: "/blog",
    className: "text-base font-medium cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]"
  },
  { 
    label: "Contact", 
    href: "/contact",
    className: "text-base font-medium cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]"
  }
];

export const serviceItems: ServiceItem[] = [
  { 
    title: "Agence SEO", 
    slug: "seo",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      "Audit SEO complet",
      "Optimisation on-page",
      "Netlinking qualitatif",
      "SEO local et national",
      "SEO technique avancé",
      "Suivi et reporting mensuel"
    ],
    isHighlighted: true
  },
  { 
    title: "Agence SEA", 
    slug: "sea",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      "Google Ads",
      "Facebook Ads",
      "LinkedIn Ads",
      "Remarketing",
      "Analytics et tracking",
      "Optimisation ROI"
    ],
    isHighlighted: false
  },
  { 
    title: "Agence Data", 
    slug: "data",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      "Analyse de données",
      "Data visualisation",
      "Machine Learning",
      "Prédictions marketing",
      "Segmentation client",
      "Reporting automatisé"
    ],
    isHighlighted: false
  },
  { 
    title: "Agence Automation", 
    slug: "automation",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      "Marketing automation",
      "Workflows automatisés",
      "Intégration CRM",
      "Email automation",
      "Scénarios personnalisés",
      "Optimisation processus"
    ],
    isHighlighted: false
  },
  { 
    title: "Agence CRM", 
    slug: "crm",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      "Implémentation CRM",
      "Formation équipes",
      "Personnalisation",
      "Intégration outils",
      "Support technique",
      "Maintenance évolutive"
    ],
    isHighlighted: false
  }
]; 