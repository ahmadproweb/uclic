import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { 
  getAllExpertiseGrowthCategoriesForMenu, 
  getExpertisesByCategory,
  ExpertiseGrowthCategory,
  ExpertiseByCategory
} from '@/lib/wordpress';
import { NavItem, ServiceItem } from '@/components/header/types';

interface CategoryWithExpertises extends ExpertiseGrowthCategory {
  expertises: ExpertiseByCategory[];
}

export const useNavItems = () => {
  const [navItems] = useState<NavItem[]>([
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
  ]);

  // Services par défaut en cas d'erreur ou pendant le chargement
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([
    { 
      title: "Agence SEO", 
      slug: "seo",
      description: "Optimisation pour les moteurs de recherche",
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
      description: "Publicité sur les moteurs de recherche",
      items: [
        { title: "Google Ads", href: "/expertise/sea/google-ads" },
        { title: "Facebook Ads", href: "/expertise/sea/facebook-ads" },
        { title: "LinkedIn Ads", href: "/expertise/sea/linkedin-ads" },
        { title: "Remarketing", href: "/expertise/sea/remarketing" },
        { title: "Analytics et tracking", href: "/expertise/sea/analytics-tracking" },
        { title: "Optimisation ROI", href: "/expertise/sea/optimisation-roi" }
      ],
      isHighlighted: false
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [categories, setCategories] = useState<CategoryWithExpertises[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer toutes les catégories
        const categoriesData = await getAllExpertiseGrowthCategoriesForMenu();
        
        // Pour chaque catégorie, récupérer ses expertises
        const categoriesWithExpertises = await Promise.all(
          categoriesData.map(async (category) => {
            const expertises = await getExpertisesByCategory(category.slug);
            return {
              ...category,
              expertises
            };
          })
        );
        
        setCategories(categoriesWithExpertises);
        
        // Transformer les catégories en serviceItems pour le menu mobile
        const transformedServices: ServiceItem[] = categoriesWithExpertises.map(category => {
          return {
            title: category.name,
            slug: category.slug,
            description: `Expertise en ${category.name}`,
            items: category.expertises.map(expertise => ({
              title: expertise.title,
              href: `/expertise/${category.slug}/${expertise.slug}`
            })),
            isHighlighted: category.slug === 'seo'
          };
        });
        
        if (transformedServices.length > 0) {
          setServiceItems(transformedServices);
        } else {
          console.warn('Aucune catégorie trouvée, utilisation des services par défaut');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError(err instanceof Error ? err : new Error('Erreur lors de la récupération des données'));
        // On garde les services par défaut en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { navItems, serviceItems, categories, loading, error };
}; 