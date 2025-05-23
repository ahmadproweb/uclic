import { ServiceItem } from "@/components/header/types";
import {
  ExpertiseByCategory,
  ExpertiseGrowthCategory,
  getAllExpertiseGrowthCategoriesForMenu,
  getExpertisesByCategory,
} from "@/lib/wordpress";
import useSWR from "swr"; // Make sure to install swr: npm install swr

interface CategoryWithExpertises extends ExpertiseGrowthCategory {
  expertises: ExpertiseByCategory[];
}

const fetchCategoriesWithExpertises = async (): Promise<
  CategoryWithExpertises[]
> => {
  const categoriesData = await getAllExpertiseGrowthCategoriesForMenu();
  return Promise.all(
    categoriesData.map(async (category: ExpertiseGrowthCategory) => {
      const expertises = await getExpertisesByCategory(category.slug);
      return {
        ...category,
        expertises,
      };
    })
  );
};

export const useNavItems = () => {
  const [navItems] = [
    [
      {
        label: "À propos",
        href: "/a-propos",
        className:
          "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]",
      },
      {
        label: "Nos expertises",
        href: "/services",
        hasMegaMenu: true,
        className:
          "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#9FB832] dark:text-white dark:hover:text-[#E0FF5C]",
      },
      {
        label: "Cas clients",
        href: "/cas-clients",
        className:
          "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]",
      },
      {
        label: "Blog",
        href: "/blog",
        className:
          "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]",
      },
      {
        label: "Contact",
        href: "/contact",
        className:
          "text-base font-semibold cursor-pointer flex items-center text-gray-900 hover:text-[#E0FF5C] dark:text-white dark:hover:text-[#E0FF5C]",
      },
    ],
  ];

  // Default services in case of error or loading
  const defaultServiceItems: ServiceItem[] = [
    {
      title: "Agence SEO",
      slug: "seo",
      description: "Optimisation pour les moteurs de recherche",
      items: [
        { title: "Audit SEO complet", href: "/expertise/seo/audit-seo" },
        {
          title: "Optimisation on-page",
          href: "/expertise/seo/optimisation-on-page",
        },
        { title: "Netlinking qualitatif", href: "/expertise/seo/netlinking" },
        {
          title: "SEO local et national",
          href: "/expertise/seo/seo-local-national",
        },
        { title: "SEO technique avancé", href: "/expertise/seo/seo-technique" },
        {
          title: "Suivi et reporting mensuel",
          href: "/expertise/seo/suivi-reporting",
        },
      ],
      isHighlighted: true,
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
        {
          title: "Analytics et tracking",
          href: "/expertise/sea/analytics-tracking",
        },
        { title: "Optimisation ROI", href: "/expertise/sea/optimisation-roi" },
      ],
      isHighlighted: false,
    },
  ];

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("categories-with-expertises", fetchCategoriesWithExpertises);

  let serviceItems = defaultServiceItems;
  if (categories && categories.length > 0) {
    serviceItems = categories.map((category: CategoryWithExpertises) => ({
      title: category.name,
      slug: category.slug,
      description: `Expertise en ${category.name}`,
      items: category.expertises.map((expertise: ExpertiseByCategory) => ({
        title: expertise.title,
        href: `/expertise/${category.slug}/${expertise.slug}`,
      })),
      isHighlighted: category.slug === "seo",
    }));
  }

  return {
    navItems,
    serviceItems,
    categories: categories || [],
    loading: isLoading,
    error,
  };
};
