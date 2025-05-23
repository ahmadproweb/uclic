import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import {
  ExpertiseByCategory,
  ExpertiseGrowthCategory,
  getAllExpertiseGrowthCategoriesForMenu,
  getExpertisesByCategory,
} from "@/lib/wordpress";
import { useEffect, useState } from "react";
import { ServiceCard } from "./ServiceCard";

interface MegaMenuProps {
  isOpen: boolean;
  setIsMegaMenuOpen: (value: boolean) => void;
}

interface CategoryWithExpertises extends ExpertiseGrowthCategory {
  expertises: ExpertiseByCategory[];
}

export function MegaMenu({ isOpen, setIsMegaMenuOpen }: MegaMenuProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const [categories, setCategories] = useState<CategoryWithExpertises[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllExpertiseGrowthCategoriesForMenu();
        const categoriesWithExpertises = await Promise.all(
          categoriesData.map(async (category) => {
            const expertises = await getExpertisesByCategory(category.slug);
            return {
              ...category,
              expertises,
            };
          })
        );
        setCategories(categoriesWithExpertises);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && loading) {
      fetchData();
    }
  }, [isOpen, loading]);

  return (
    <div
      className={cn(
        "fixed top-24 left-0 right-0 w-full z-40",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onMouseEnter={() => setIsMegaMenuOpen(true)}
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <div className="max-w-[1400px] mx-auto px-4 h-full relative mt-2">
        <div
          className={cn(
            "backdrop-blur-2xl shadow-2xl border rounded-[15px]",
            "max-h-[calc(100vh-9rem)] overflow-y-auto",
            "scrollbar-thin scrollbar-track-transparent",
            isDark
              ? [
                  "border-white/10",
                  "bg-gradient-to-br from-[#E0FF5C3D]/20 via-black/80 to-black/80",
                  "scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20",
                ]
              : [
                  "border-black/5",
                  "bg-gradient-to-br from-[#E0FF5C3D]/30 via-white/80 to-white/80",
                  "scrollbar-thumb-black/10 hover:scrollbar-thumb-black/20",
                ]
          )}
        >
          <div className="p-6">
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {categories.map((category) => (
                  <ServiceCard
                    key={category.slug}
                    service={{
                      title: category.name,
                      slug: category.slug,
                      description: "",
                      items: category.expertises.map((expertise) => ({
                        title: expertise.title,
                        href: `/expertise/${category.slug}/${expertise.slug}`,
                      })),
                    }}
                    onSelect={() => setIsMegaMenuOpen(false)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
