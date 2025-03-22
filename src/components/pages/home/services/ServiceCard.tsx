interface ServiceCardProps {
  title: string;
  text: string;
  icon: React.ElementType;
  theme: { colors: { primary: { main: string } } };
  priority?: boolean;
}

export function ServiceCard({ title, text, icon: Icon, theme }: ServiceCardProps) {
  return (
    <article 
      className="rounded-[32px] p-10 relative overflow-hidden h-full transition-all duration-500 ease-out hover:-translate-y-4 group"
      style={{
        background: `linear-gradient(145deg, 
          ${theme.colors.primary.main}CC,
          ${theme.colors.primary.main}99
        )`,
        backdropFilter: 'blur(10px)',
        boxShadow: `0 8px 32px -4px ${theme.colors.primary.main}40`
      }}
    >
      <div 
        className="absolute top-8 left-8 w-10 h-10 rounded-full flex items-center justify-center bg-black/10 transition-transform duration-500 group-hover:scale-110"
        aria-hidden="true"
      >
        <Icon 
          size={24}
          className="text-black transition-transform duration-500 group-hover:rotate-12"
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
} 