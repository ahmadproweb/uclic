import { NavItem, ServiceItem } from './types';

export const navItems: NavItem[] = [
  { 
    label: "Nos services", 
    href: "/services", 
    hasMegaMenu: true,
    className: "transition-colors duration-300 hover:text-[#D9FF4B]" 
  },
  { 
    label: "Nos expertises", 
    href: "/expertises",
    className: "transition-colors duration-300 hover:text-[#D9FF4B]"
  },
  { 
    label: "Cas clients", 
    href: "/cas-clients",
    className: "transition-colors duration-300 hover:text-[#D9FF4B]"
  },
  { 
    label: "Blog", 
    href: "/blog",
    className: "transition-colors duration-300 hover:text-[#D9FF4B]"
  },
  { 
    label: "À propos", 
    href: "/a-propos",
    className: "transition-colors duration-300 hover:text-[#D9FF4B]"
  },
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