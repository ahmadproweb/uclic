import { memo } from 'react';
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  text: string;
  icon: string;
  badges?: string[];
  theme: { colors: { primary: { main: string } } };
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ServiceCard = memo(function ServiceCard({ 
  title, 
  text, 
  icon,
  badges = [],
  className,
  style 
}: ServiceCardProps) {
  return (
    <article 
      className={cn(
        "rounded-[32px] p-8 md:p-10 relative overflow-hidden h-full bg-[#E0FF5C] backdrop-blur-md shadow-service transform-gpu transition-all duration-500 ease-out hover:-translate-y-4 group",
        className
      )}
      style={style}
    >
      <div 
        className={cn(
          "absolute top-8 left-8 w-10 h-10 rounded-full flex items-center justify-center bg-black/10",
          "transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
        )}
        aria-hidden="true"
      >
        <i className={cn(icon, "text-2xl text-black leading-none")}></i>
      </div>
      <h3 className="text-2xl font-bold mb-6 mt-16 text-black">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-black/80">
        {text}
      </p>
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {badges.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 text-black/80 border border-black/15"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </article>
  );
});

ServiceCard.displayName = 'ServiceCard'; 