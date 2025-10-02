'use client';

import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

function formatFrenchPunctuation(input: string): string {
  return input
    .replace(/\s([;:!?])/g, "\u00A0$1")
    .replace(/ \?/g, "\u00A0?");
}

// Memoized decorative squares component
const DecorativeSquares = memo(({ isDark }: { isDark: boolean }) => {
  if (!isDark) return null;
  
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none md:block hidden">
      {[...Array(6)].map((_, colIndex) => (
        <div
          key={`square-${colIndex}`}
          className="absolute w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45"
          style={{
            left: `${(colIndex + 1) * (100 / 7)}%`,
            top: '50%',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
});

DecorativeSquares.displayName = 'DecorativeSquares';

// Memoized plus button component
const PlusButton = memo(({ isDark }: { isDark: boolean }) => (
  <div
    className={cn(
      "aspect-square rounded-[24px] md:rounded-[32px] flex items-center justify-center cursor-pointer",
      "transition-colors duration-300 ease-in-out",
      isDark 
        ? "bg-black border border-white/10 hover:border-white/20" 
        : "bg-black border border-white/5 hover:border-white/10"
    )}
  >
    <div className="relative">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          "transition-all duration-300 ease-in-out",
          isDark ? "text-white" : "text-white"
        )}
      >
        <path
          d="M12 5V19M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
));

PlusButton.displayName = 'PlusButton';

// Données des outils/partenaires avec logos (même structure que PartnerBtoB)
const tools = [
  { name: "WordPress", logo: "/tools/wordpress.png", description: "Plateforme CMS de référence" },
  { name: "Webflow", logo: "/tools/webflow.png", description: "Design visuel sans code" },
  { name: "Next.js", logo: "/tools/nextjs.png", description: "Framework React moderne" },
  { name: "Supabase", logo: "/tools/supabase.png", description: "Backend-as-a-Service" },
  { name: "Framer", logo: "/tools/framer.png", description: "Prototypage avancé" },
  { name: "Vercel", logo: "/tools/vercel.png", description: "Déploiement instantané" },
  { name: "Stripe", logo: "/tools/stripe.png", description: "Paiements sécurisés" },
  { name: "Mailchimp", logo: "/tools/mailchimp.png", description: "Email marketing" },
  { name: "HubSpot", logo: "/tools/hubspot.png", description: "CRM complet" },
  { name: "Google Analytics", logo: "/tools/google-analytics.png", description: "Analyse de trafic" },
  { name: "Figma", logo: "/tools/figma.png", description: "Design collaboratif" },
  { name: "Notion", logo: "/tools/notion.png", description: "Productivité équipe" },
  { name: "Slack", logo: "/tools/slack.png", description: "Communication équipe" },
];

// Memoized Tool Card Component (identique à PartnerCard de PartnerBtoB)
const ToolCard = memo(({ tool, isDark }: { tool: { name: string; logo: string; description: string }; isDark: boolean }) => (
  <div 
    className={cn(
      "aspect-square rounded-[24px] md:rounded-[32px] flex items-center justify-center",
      "transition-colors duration-300 ease-in-out",
      isDark 
        ? "bg-black border border-white/10 hover:border-white/20" 
        : "bg-black border border-white/5 hover:border-white/10"
    )}
  >
    <img 
      src={tool.logo}
      alt={`${tool.name} logo`}
      className={cn(
        "object-contain [filter:brightness(0)_invert(1)]",
        "w-[50px] h-[20px] sm:w-[65px] sm:h-[25px] md:w-[80px] md:h-[30px]"
      )}
      loading="lazy"
    />
    <span className="sr-only">{tool.name} - {tool.description}</span>
  </div>
));

ToolCard.displayName = 'ToolCard';

interface ExpertisePartnersProps {
  title?: string;
  subtitle?: string;
}

export default function ExpertisePartners({ title, subtitle }: ExpertisePartnersProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const formattedTitle = formatFrenchPunctuation(
    title || "Notre stack technologique : les meilleurs outils pour votre croissance"
  );
  const formattedSubtitle = formatFrenchPunctuation(
    subtitle || "Notre agence Growth déploie la meilleure stack IA du marché : automatisation, analytics, outbound, CRM, SEO. Chaque outil est choisi pour maximiser votre ROI et scaler votre acquisition."
  );

  return (
    <section 
      id="expertise-tools" 
      className={cn(
        "w-full relative z-10 pt-20 pb-12 md:pt-20 md:pb-16 border-t",
        isDark ? "bg-black border-white/10" : "bg-white border-black/5"
      )}
      style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}
      aria-label="Nos outils et technologies"
    >
      {/* Section-level background pattern */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url("/backgroundeffect.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: isDark ? 0.25 : 0.04
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className={cn(
            "inline-flex px-4 py-2 border rounded-full mb-6",
            isDark 
              ? "border-white/10 bg-white/5" 
              : "border-black/10 bg-black/5"
          )}>
            <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>✨ Notre Approche</span>
          </div>
          <h2 className={cn(
            "max-w-5xl mx-auto text-center mb-6",
            "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
            "font-bold tracking-[-1px]",
            isDark ? "text-white" : "text-black",
            "leading-[1.1] text-balance"
          )}>
            {formattedTitle}
          </h2>

          <p className={cn(
            "text-center max-w-3xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed text-pretty",
            isDark ? "text-white/70" : "text-black/70"
          )}>
            {formattedSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
