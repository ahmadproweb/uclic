import { serviceItems } from "./NavItems";
import { cn } from "@/lib/utils";
import { ServiceCard } from "./ServiceCard";
import { useTheme } from "@/context/ThemeContext";

interface MegaMenuProps {
  isOpen: boolean;
  onMouseLeave: () => void;
}

export function MegaMenu({ isOpen, onMouseLeave }: MegaMenuProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <div 
      className={cn(
        "absolute top-24 left-0 right-0 w-full z-40 transition-all duration-300 overflow-hidden",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-[1250px] mx-auto px-4">
        <div 
          className={cn(
            "backdrop-blur-xl shadow-2xl border rounded-[15px] overflow-hidden",
            isDark ? [
              "border-white/10",
              "bg-gradient-to-br from-[#DAFF473D]/20 via-black/80 to-black/80"
            ] : [
              "border-black/5",
              "bg-gradient-to-br from-[#DAFF473D]/30 via-white/80 to-white/80"
            ]
          )}
        >
          <div className="flex justify-between p-6">
            {serviceItems.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 