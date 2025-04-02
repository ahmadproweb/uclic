'use client';

import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors } from '@/config/theme';
import { fetchTeamData, type TeamMember } from '@/lib/wordpress';
import Link from 'next/link';

interface ThemeColors {
  common: {
    black: string;
    white: string;
  };
  primary: {
    main: string;
  };
}

// Memoized SocialIcon component with optimized props
const SocialIcon = memo(function SocialIcon({ href, children, backgroundColor, label }: { 
  href: string, 
  children: React.ReactNode,
  backgroundColor: string,
  label: string
}) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center",
        "bg-primary hover:bg-primary/80 transition-colors duration-300"
      )}
      style={{
        backgroundColor,
        '--tw-bg-opacity': '1'
      } as React.CSSProperties}
      aria-label={label}
    >
      {children}
    </a>
  );
});

// Memoized TeamMemberCard component with optimized props
const TeamMemberCard = memo(function TeamMemberCard({ 
  member, 
  hoveredId, 
  onHover,
  themeColors,
  isDark 
}: { 
  member: TeamMember, 
  hoveredId: string | null,
  onHover: (id: string | null) => void,
  themeColors: ThemeColors,
  isDark: boolean
}) {
  const isHovered = hoveredId === member.slug;
  const fullName = member.title;
  const [firstName, ...lastNameParts] = useMemo(() => fullName.split(' '), [fullName]);
  const lastName = useMemo(() => lastNameParts.join(' '), [lastNameParts]);
  
  const handleMouseEnter = useCallback(() => onHover(member.slug), [member.slug, onHover]);
  const handleMouseLeave = useCallback(() => onHover(null), [onHover]);
  
  // Fonction pour ajouter .webp à l'URL de l'image en gardant l'extension originale
  const getWebpUrl = useCallback((url: string | undefined) => {
    if (!url) return '';
    // Si l'URL se termine déjà par .webp, on la retourne telle quelle
    if (url.endsWith('.webp')) return url;
    // On ajoute simplement .webp à la fin, en gardant lextension originale
    return `${url}.webp`;
  }, []);

  const imageUrl = useMemo(() => {
    const miniImageUrl = member.equipeFields.miniImage?.node.sourceUrl;
    const mainImageUrl = member.equipeFields.image?.node.sourceUrl;
    const fallbackUrl = "https://media.istockphoto.com/id/1919265357/fr/photo/portrait-en-gros-plan-dun-homme-daffaires-confiant-debout-dans-son-bureau.jpg";
    
    return getWebpUrl(miniImageUrl || mainImageUrl || fallbackUrl);
  }, [member.equipeFields.miniImage?.node.sourceUrl, member.equipeFields.image?.node.sourceUrl, getWebpUrl]);

  return (
    <article 
      className="group/card relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "relative rounded-2xl md:rounded-[32px] p-4 md:p-8",
          "transition-colors duration-300 flex flex-row items-start gap-4 md:gap-6",
          "backdrop-blur-sm h-[220px] md:h-[280px]"
        )}
        style={{
          backgroundColor: isHovered
            ? themeColors.common.black
            : isDark 
              ? 'rgba(0, 0, 0, 0.06)' 
              : 'rgba(0, 0, 0, 0.05)'
        }}
      >
        <figure className="relative w-16 md:w-24 h-16 md:h-24 flex-shrink-0">
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={member.equipeFields.miniImage?.node.altText || member.equipeFields.image?.node.altText || `Photo de ${member.title}`}
              className={cn(
                "w-full h-full object-cover object-top rounded-xl md:rounded-2xl relative z-10",
                "grayscale group-hover/card:grayscale-0 transition-[filter] duration-300"
              )}
              loading="eager"
              width={96}
              height={96}
            />
            <div 
              className={cn(
                "absolute inset-0 z-20 rounded-xl md:rounded-2xl",
                "bg-[linear-gradient(to_right,#00000011,transparent_2px),linear-gradient(to_bottom,#00000011,transparent_2px)]",
                "[background-size:3px_3px]",
                "mix-blend-overlay opacity-30",
                "group-hover/card:opacity-0 transition-opacity duration-300"
              )}
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'
              }}
              aria-hidden="true"
            />
          </div>
          <div className={cn(
            "absolute -right-2 md:-right-4 top-0 flex flex-col gap-2 md:gap-3",
            "opacity-0 group-hover/card:opacity-100 transition-opacity duration-300",
            "z-30"
          )}>
            {member.equipeFields.linkedin && (
              <SocialIcon 
                href={member.equipeFields.linkedin} 
                backgroundColor={themeColors.primary.main}
                label={`Voir le profil LinkedIn de ${member.title}`}
              >
                <i className="ri-linkedin-fill text-base md:text-lg" style={{ color: themeColors.common.black }} />
              </SocialIcon>
            )}
            {member.equipeFields.twitter && (
              <SocialIcon 
                href={member.equipeFields.twitter} 
                backgroundColor={themeColors.primary.main}
                label={`Voir le profil Twitter de ${member.title}`}
              >
                <i className="ri-twitter-x-fill text-base md:text-lg" style={{ color: themeColors.common.black }} />
              </SocialIcon>
            )}
            {member.equipeFields.autre && (
              <SocialIcon 
                href={member.equipeFields.autre} 
                backgroundColor={themeColors.primary.main}
                label={`Voir le site web de ${member.title}`}
              >
                <i className="ri-global-line text-base md:text-lg" style={{ color: themeColors.common.black }} />
              </SocialIcon>
            )}
          </div>
        </figure>

        <div className="flex-1 min-w-0">
          <h3 
            className="text-lg md:text-xl font-medium mb-1 md:mb-2 transition-colors duration-300"
            style={{ color: isHovered ? themeColors.common.white : themeColors.common.black }}
          >
            <span className="block">{firstName}</span>
            {lastName && <span className="block">{lastName}</span>}
          </h3>
          <p 
            className="text-sm md:text-base mb-1 md:mb-2 transition-colors duration-300"
            style={{ color: isHovered ? `${themeColors.common.white}cc` : `${themeColors.common.black}cc` }}
          >
            {member.equipeFields.role}
          </p>
          <p 
            className="text-xs md:text-sm leading-relaxed transition-colors duration-300"
            style={{ color: isHovered ? `${themeColors.common.white}99` : `${themeColors.common.black}99` }}
          >
            {member.equipeFields.extrait}
          </p>
        </div>
      </div>
      <Link
        href={`/equipe/${member.slug}`}
        className={cn(
          "absolute inset-0 rounded-2xl md:rounded-[32px]",
          "focus:outline-none focus:ring-2 focus:ring-primary/50"
        )}
        aria-label={`En savoir plus sur ${member.title}`}
      />
    </article>
  );
});

const ClientTeam = memo(function ClientTeam({ initialData }: { initialData: TeamMember[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const themeColors = useMemo(() => colors.colors, []);

  useEffect(() => {
    if (initialData.length === 0) {
      const loadTeamData = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const data = await fetchTeamData();
          setTeamMembers(data);
        } catch (error) {
          console.error('Error loading team data:', error);
          setError(error instanceof Error ? error.message : 'Failed to load team data');
        } finally {
          setIsLoading(false);
        }
      };

      loadTeamData();
    }
  }, [initialData]);

  const handleHover = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  if (error || isLoading) {
    return null; // Early return for loading and error states
  }

  return (
    <section 
      id="team" 
      className="w-full rounded-2xl md:rounded-[32px] p-6 md:p-16 relative bg-primary/20"
      style={{
        '--tw-bg-opacity': isDark ? '0.2' : '0.1',
        backgroundColor: themeColors.primary.main
      } as React.CSSProperties}
    >
      {/* Décorations */}
      <i 
        className="ri-add-line text-2xl hidden md:block absolute top-10 left-10"
        style={{ color: themeColors.common.black }}
        aria-hidden="true"
      />

      <i 
        className="ri-add-line text-2xl hidden md:block absolute top-10 right-10"
        style={{ color: themeColors.common.black }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-16">
          <p 
            className="text-base md:text-lg mb-2 md:mb-4 transition-colors duration-300 tracking-[-0.5px]"
            style={{ color: themeColors.common.black }}
          >
            Faites-nous entrer en jeu
          </p>
          <h2 
            className="tracking-[-1px] text-3xl md:text-4xl lg:text-5xl font-light transition-colors duration-300"
            style={{ color: themeColors.common.black }}
          >
            Une équipe sur-mesure à<br className="hidden md:block" />vos côtés
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.slug}
              member={member}
              hoveredId={hoveredId}
              onHover={handleHover}
              themeColors={themeColors}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default ClientTeam; 