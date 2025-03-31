import { memo } from 'react';

interface ServiceCardProps {
  title: string;
  text: string;
  icon: React.ElementType;
  theme: { colors: { primary: { main: string } } };
  priority?: boolean;
}

export const ServiceCard = memo(function ServiceCard({ title, text, icon: Icon }: ServiceCardProps) {
  return (
    <article 
      className="rounded-[32px] p-10 relative overflow-hidden h-full bg-[#E0FF5C] backdrop-blur-md shadow-service transform-gpu transition-all duration-500 ease-out hover:-translate-y-4 group"
    >
      <div 
        className="absolute top-8 left-8 w-10 h-10 rounded-full flex items-center justify-center bg-black/10 transform-gpu transition-transform duration-500 group-hover:scale-110"
        aria-hidden="true"
      >
        <Icon 
          size={24}
          className="text-black transform-gpu transition-transform duration-500 group-hover:rotate-12"
        />
      </div>
      <h3 className="text-2xl font-bold mb-6 mt-16 text-black">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-black/80">
        {text}
      </p>
    </article>
  );
});

ServiceCard.displayName = 'ServiceCard'; 