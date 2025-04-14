import { NavItem, ServiceItem } from './types';

export const navItems: NavItem[] = [
  { 
    label: "À propos", 
    href: "/a-propos",
    className: "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]"
  },
  { 
    label: "Nos expertises", 
    href: "/services", 
    hasMegaMenu: true,
    className: "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#9FB832] dark:text-white dark:hover:text-[#E0FF5C]" 
  },
  { 
    label: "Outils gratuits", 
    href: "/outils-gratuits",
    className: "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]"
  },
  { 
    label: "Cas clients", 
    href: "/cas-clients",
    className: "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]"
  },
  { 
    label: "Blog", 
    href: "/blog",
    className: "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]"
  },
  { 
    label: "Contact", 
    href: "/contact",
    className: "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]"
  }
];

export const serviceItems: ServiceItem[] = [
  { 
    title: "Agence SEO", 
    slug: "seo",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      { title: "Audit SEO complet", href: "/expertise/seo/audit-seo" },
      { title: "Optimisation on-page", href: "/expertise/seo/optimisation-on-page" },
      { title: "Netlinking qualitatif", href: "/expertise/seo/netlinking" },
      { title: "SEO local et national", href: "/expertise/seo/seo-local-national" },
      { title: "SEO technique avancé", href: "/expertise/seo/seo-technique" },
      { title: "Suivi et reporting mensuel", href: "/expertise/seo/suivi-reporting" }
    ],
    isHighlighted: true
  },
  { 
    title: "Agence SEA", 
    slug: "sea",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      { title: "Google Ads", href: "/expertise/sea/google-ads" },
      { title: "Facebook Ads", href: "/expertise/sea/facebook-ads" },
      { title: "LinkedIn Ads", href: "/expertise/sea/linkedin-ads" },
      { title: "Remarketing", href: "/expertise/sea/remarketing" },
      { title: "Analytics et tracking", href: "/expertise/sea/analytics" },
      { title: "Optimisation ROI", href: "/expertise/sea/optimisation-roi" }
    ],
    isHighlighted: false
  },
  { 
    title: "Agence Data", 
    slug: "data",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      { title: "Analyse de données", href: "/expertise/data/analyse" },
      { title: "Data visualisation", href: "/expertise/data/visualisation" },
      { title: "Machine Learning", href: "/expertise/data/machine-learning" },
      { title: "Prédictions marketing", href: "/expertise/data/predictions" },
      { title: "Segmentation client", href: "/expertise/data/segmentation" },
      { title: "Reporting automatisé", href: "/expertise/data/reporting" }
    ],
    isHighlighted: false
  },
  { 
    title: "Agence Automation", 
    slug: "automation",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      { title: "Marketing automation", href: "/expertise/automation/marketing" },
      { title: "Workflows automatisés", href: "/expertise/automation/workflows" },
      { title: "Intégration CRM", href: "/expertise/automation/crm" },
      { title: "Email automation", href: "/expertise/automation/email" },
      { title: "Scénarios personnalisés", href: "/expertise/automation/scenarios" },
      { title: "Optimisation processus", href: "/expertise/automation/optimisation" }
    ],
    isHighlighted: false
  },
  { 
    title: "Agence CRM", 
    slug: "crm",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut elit",
    items: [
      { title: "Implémentation CRM", href: "/expertise/crm/implementation" },
      { title: "Formation équipes", href: "/expertise/crm/formation" },
      { title: "Personnalisation", href: "/expertise/crm/personnalisation" },
      { title: "Intégration outils", href: "/expertise/crm/integration" },
      { title: "Support technique", href: "/expertise/crm/support" },
      { title: "Maintenance évolutive", href: "/expertise/crm/maintenance" }
    ],
    isHighlighted: false
  }
]; 