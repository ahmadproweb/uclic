import { useTheme } from "@/context/ThemeContext";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import {
  ExpertiseByCategory,
  ExpertiseGrowthCategory,
  getAllExpertiseGrowthCategoriesForMenu,
  getExpertisesByCategory,
} from "@/lib/wordpress";
import { useEffect, useRef, useState } from "react";
import { ServiceCard } from "./ServiceCard";

interface MegaMenuProps {
  isOpen: boolean;
  setIsMegaMenuOpen: (value: boolean) => void;
  headerRef?: React.RefObject<HTMLElement | HTMLDivElement>;
  armed?: boolean; // only open/keep open when armed by nav hover
  disarm?: () => void;
}

interface CategoryWithExpertises extends ExpertiseGrowthCategory {
  expertises: ExpertiseByCategory[];
}

export function MegaMenu({ isOpen, setIsMegaMenuOpen, headerRef, armed = false, disarm }: MegaMenuProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const [categories, setCategories] = useState<CategoryWithExpertises[]>([]);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

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

  // Close on outside click (outside header and menu) and prevent reopen unless armed
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      const headerEl = headerRef?.current as Node | null;
      const menuEl = menuRef.current as Node | null;
      if (target && (menuEl?.contains(target) || headerEl?.contains(target))) {
        return;
      }
      setIsMegaMenuOpen(false);
      disarm?.();
    };
    document.addEventListener('mousedown', handler, true);
    document.addEventListener('touchstart', handler, true);
    return () => {
      document.removeEventListener('mousedown', handler, true);
      document.removeEventListener('touchstart', handler, true);
    };
  }, [isOpen, setIsMegaMenuOpen, headerRef]);

  if (!mounted) return null;
  // Do not render at all unless explicit open + armed
  if (!(isOpen && armed)) return null;

  return createPortal(
    <div
      className={cn(
        "fixed left-0 right-0 w-full z-[1000] pointer-events-auto opacity-100"
      )}
      style={{ top: "calc(var(--header-height) + 32px)" }}
      onMouseEnter={() => { setIsMegaMenuOpen(true); }}
      onMouseLeave={() => { setIsMegaMenuOpen(false); disarm?.(); }}
      ref={menuRef}
    >
      {/* No-JS fallback is handled by nav link; this menu is JS only */}
      <div className="max-w-[1250px] mx-auto px-6 md:px-8 h-full relative mt-0 z-[1001] pointer-events-auto">
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
          <div className="p-6 md:p-8">
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-7">
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
    </div>,
    document.body
  );
}
