import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isAICard = service.title.toLowerCase().includes('intelligence artificielle');
  
  // Logique de renommage des titres
  const displayTitle = service.title
    .replace(/Agence Intelligence Artificielle/i, 'Agence IA')
    .replace(/CRM & gestion de la relation client/i, 'CRM');
  
  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect?.();
    router.push(href);
  };

  return (
    <div 
      onClick={(e) => handleNavigation(e, `/expertise/${service.slug}`)}
      className="block h-full cursor-pointer"
    >
      <div 
        className={cn(
          "group h-full",
          isMobile ? "w-full" : "w-full",
          "px-6 py-6 relative rounded-xl hover:scale-[1.02]",
          isAICard
            ? "bg-[#E0FF5C] hover:bg-[#E2FF47]"
            : isDark 
              ? "bg-white/5 hover:bg-[#E0FF5C]/100" 
              : "bg-black/5 hover:bg-[#E0FF5C]/100"
        )}
      >
        <div className="flex flex-col h-full">
          <h3 className={cn(
            "text-xl font-bold mb-4",
            isAICard
              ? "text-black"
              : isDark 
                ? "text-white group-hover:text-black" 
                : "text-black group-hover:text-black"
          )}>
            {displayTitle}
          </h3>
          
          {service.description && (
            <p className={cn(
              "text-base mb-4",
              isAICard
                ? "text-black/80"
                : isDark 
                  ? "text-white/80 group-hover:text-black/80" 
                  : "text-black/80 group-hover:text-black/80"
            )}>
              {service.description}
            </p>
          )}
          
          <div className="flex-1">
            <ul className="space-y-1.5" aria-label={`Services inclus dans ${service.title}`}>
              {service.items.map((item, i) => (
                <li key={i}>
                  <a
                    href={`/expertise/${service.slug}/${item.href.split('/').pop()}`}
                    onClick={(e) => handleNavigation(e, `/expertise/${service.slug}/${item.href.split('/').pop()}`)}
                    className={cn(
                      "text-sm block truncate font-normal",
                      isAICard
                        ? "text-black/70 hover:text-black hover:font-semibold"
                        : isDark 
                          ? "text-white group-hover:text-black hover:text-black hover:font-semibold" 
                          : "text-black group-hover:text-black hover:font-semibold"
                    )}
                    title={item.title}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-auto pt-4">
            <ArrowIcon 
              className={cn(
                "w-6 h-6 group-hover:translate-x-1",
                isAICard
                  ? "text-black"
                  : isDark 
                    ? "text-white group-hover:text-black" 
                    : "text-black"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 