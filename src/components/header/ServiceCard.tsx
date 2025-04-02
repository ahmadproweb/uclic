import Link from "next/link";
import { cn } from "@/lib/utils";
import { ServiceItem } from "./types";
import { useTheme } from "@/context/ThemeContext";
import { ArrowIcon } from "@/components/ui/icons/ArrowIcon";

interface ServiceCardProps {
  service: ServiceItem;
  isMobile?: boolean;
  onSelect?: () => void;
}

export function ServiceCard({ service, isMobile, onSelect }: ServiceCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isSEOCard = service.title.toLowerCase().includes('seo') && !service.title.toLowerCase().includes('sea');
  
  return (
    <div 
      className={cn(
        "group",
        isMobile ? "w-full" : "w-[19%]",
        "px-4 py-5 min-h-[400px] relative rounded-xl transition-all duration-300",
        isSEOCard 
          ? "bg-[#E0FF5C] hover:bg-[#E2FF47]" 
          : isDark 
            ? "bg-white/5 hover:bg-[#E0FF5C]/100" 
            : "bg-black/5 hover:bg-[#E0FF5C]/100"
      )}
    >
      <Link 
        href={`/services/${service.slug}`}
        className="block h-full"
        onClick={onSelect}
        aria-label={`En savoir plus sur ${service.title}`}
      >
        <div className="flex flex-col h-full">
          <h3 className={cn(
            "text-lg font-bold mb-3 transition-colors duration-300",
            isSEOCard 
              ? "text-black" 
              : isDark 
                ? "text-white group-hover:text-black" 
                : "text-black group-hover:text-black"
          )}>
            {service.title}
          </h3>
          
          <p className={cn(
            "text-base mb-4 transition-colors duration-300",
            isSEOCard 
              ? "text-black/80" 
              : isDark 
                ? "text-white/80 group-hover:text-black/80" 
                : "text-black/80 group-hover:text-black/80"
          )}>
            {service.description}
          </p>
          
          <div className="flex-1">
            <ul className="space-y-2" aria-label={`Services inclus dans ${service.title}`}>
              {service.items.map((item, i) => (
                <li 
                  key={i} 
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isSEOCard 
                      ? "text-black/70" 
                      : isDark 
                        ? "text-white/70 group-hover:text-black/70" 
                        : "text-black/70 group-hover:text-black/70"
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-auto pt-4">
            <div 
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                isSEOCard
                  ? "border-black hover:border-black/70" 
                  : isDark 
                    ? "border-white/60 group-hover:border-black" 
                    : "border-black/60 group-hover:border-black",
                "border"
              )}
              aria-hidden="true"
            >
              <ArrowIcon 
                className={cn(
                  "w-[18px] h-[18px] transition-colors duration-300",
                  isSEOCard 
                    ? "text-black" 
                    : isDark 
                      ? "text-white group-hover:text-black" 
                      : "text-black"
                )}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 