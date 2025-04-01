'use client';

import { useState, useEffect, memo } from 'react';
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

// Memoized SocialIcon component
const SocialIcon = memo(({ href, children, backgroundColor, label }: { 
  href: string, 
  children: React.ReactNode,
  backgroundColor: string,
  label: string
}) => (
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
));

SocialIcon.displayName = 'SocialIcon';

// Memoized TeamMemberCard component
const TeamMemberCard = memo(({ 
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
}) => {
  const isHovered = hoveredId === member.slug;
  const fullName = member.title;
  const [firstName, ...lastNameParts] = fullName.split(' ');
  const lastName = lastNameParts.join(' ');
  
  return (
    <article 
      className="group/card"
      onMouseEnter={() => onHover(member.slug)}
      onMouseLeave={() => onHover(null)}
    >
      <Link
        href={`/equipe/${member.slug}`}
        className={cn(
          "relative rounded-2xl md:rounded-[32px] p-4 md:p-8",
          "transition-colors duration-300 flex flex-row items-start gap-4 md:gap-6",
          "backdrop-blur-sm h-[220px] md:h-[280px]",
          "focus:outline-none focus:ring-2 focus:ring-primary/50"
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
          <img
            src={member.equipeFields.miniImage?.node.sourceUrl || member.equipeFields.image?.node.sourceUrl || "https://media.istockphoto.com/id/1919265357/fr/photo/portrait-en-gros-plan-dun-homme-daffaires-confiant-debout-dans-son-bureau.jpg?s=612x612&w=0&k=20&c=u_cAYkuDe1e8oeBrKBNLbPiBrZ_fflqLhwxIXXlgsOg="}
            alt={member.equipeFields.miniImage?.node.altText || member.equipeFields.image?.node.altText || `Photo de ${member.title}`}
            className={cn(
              "w-full h-full object-cover object-top rounded-xl md:rounded-2xl",
              "grayscale group-hover/card:grayscale-0 transition-[filter] duration-300"
            )}
            loading="eager"
            width={96}
            height={96}
          />
          <div className={cn(
            "absolute -right-2 md:-right-4 top-0 flex flex-col gap-2 md:gap-3",
            "opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
          )}>
            {member.equipeFields.linkedin && (
              <SocialIcon 
                href={member.equipeFields.linkedin} 
                backgroundColor={themeColors.primary.main}
                label={`Voir le profil LinkedIn de ${member.title}`}
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="9" width="4" height="12" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="4" cy="4" r="2" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialIcon>
            )}
            {member.equipeFields.twitter && (
              <SocialIcon 
                href={member.equipeFields.twitter} 
                backgroundColor={themeColors.primary.main}
                label={`Voir le profil Twitter de ${member.title}`}
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialIcon>
            )}
            {member.equipeFields.autre && (
              <SocialIcon 
                href={member.equipeFields.autre} 
                backgroundColor={themeColors.primary.main}
                label={`Voir le site web de ${member.title}`}
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12h20" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
      </Link>
    </article>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';

const ClientTeam = ({ initialData }: { initialData: TeamMember[] }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const themeColors = colors.colors;

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

  if (error) {
    return (
      <section 
        id="team" 
        className="w-full rounded-2xl md:rounded-[32px] p-6 md:p-16 relative bg-primary/20"
        style={{
          '--tw-bg-opacity': isDark ? '0.2' : '0.1',
          backgroundColor: themeColors.primary.main
        } as React.CSSProperties}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center" role="alert">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section 
        id="team" 
        className="w-full rounded-2xl md:rounded-[32px] p-6 md:p-16 relative bg-primary/20"
        style={{
          '--tw-bg-opacity': isDark ? '0.2' : '0.1',
          backgroundColor: themeColors.primary.main
        } as React.CSSProperties}
      >
        <div className="flex items-center justify-center min-h-[400px]" role="status">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary">
            <span className="sr-only">Chargement...</span>
          </div>
        </div>
      </section>
    );
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
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block absolute top-10 left-10"
        aria-hidden="true"
      >
        <path d="M12 2V22M2 12H22" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round"/>
      </svg>

      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block absolute top-10 right-10"
        aria-hidden="true"
      >
        <path d="M12 2V22M2 12H22" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round"/>
      </svg>

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
              onHover={setHoveredId}
              themeColors={themeColors}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ClientTeam); 