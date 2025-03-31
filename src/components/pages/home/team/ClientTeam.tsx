'use client';

import { useState, useEffect } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors } from '@/config/theme';
import { fetchTeamData, type TeamMember } from '@/lib/wordpress';
import Link from 'next/link';

const ClientTeam = ({ initialData }: { initialData: TeamMember[] }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const themeColors = colors.colors;

  useEffect(() => {
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
  }, []);

  const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a 
      href={href} 
      className={cn(
        "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300",
        "bg-primary hover:bg-primary/80"
      )}
      style={{
        backgroundColor: themeColors.primary.main,
        '--tw-bg-opacity': hoveredId ? '1' : '0.8'
      } as React.CSSProperties}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  );

  if (error) {
    return (
      <section id="team" className={cn(
        "w-full rounded-2xl md:rounded-[32px] p-6 md:p-16 relative",
        "bg-primary/20"
      )}
      style={{
        '--tw-bg-opacity': isDark ? '0.2' : '0.1',
        backgroundColor: themeColors.primary.main
      } as React.CSSProperties}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section id="team" className={cn(
        "w-full rounded-2xl md:rounded-[32px] p-6 md:p-16 relative",
        "bg-primary/20"
      )}
      style={{
        '--tw-bg-opacity': isDark ? '0.2' : '0.1',
        backgroundColor: themeColors.primary.main
      } as React.CSSProperties}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className={cn(
      "w-full rounded-2xl md:rounded-[32px] p-6 md:p-16 relative",
      "bg-primary/20"
    )}
    style={{
      '--tw-bg-opacity': isDark ? '0.2' : '0.1',
      backgroundColor: themeColors.primary.main
    } as React.CSSProperties}>
      {/* Top Left Cross - masqué sur mobile */}
      <div className="hidden md:block absolute top-10 left-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V22M2 12H22" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Top Right Cross - masqué sur mobile */}
      <div className="hidden md:block absolute top-10 right-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V22M2 12H22" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <p style={{ color: themeColors.common.black }} className="text-base md:text-lg mb-2 md:mb-4 transition-colors duration-300 tracking-[-0.5px]">
            Faites-nous entrer en jeu
          </p>
          <h2 style={{ color: themeColors.common.black }} className="tracking-[-1px] text-3xl md:text-4xl lg:text-5xl font-light transition-colors duration-300">
            Une équipe sur-mesure à<br className="hidden md:block" />vos côtés
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {teamMembers.map((member) => (
            <Link
              key={member.slug}
              href={`/equipe/${member.slug}`}
              className="block group/card"
            >
              <div
                className={cn(
                  "relative rounded-2xl md:rounded-[32px] p-4 md:p-8",
                  "transition-all duration-300 flex flex-row md:items-start gap-4 md:gap-6",
                  "backdrop-blur-sm group/member cursor-pointer h-[220px] md:h-[280px]"
                )}
                style={{
                  backgroundColor: hoveredId === member.slug
                    ? themeColors.common.black
                    : isDark 
                      ? 'rgba(0, 0, 0, 0.06)' 
                      : 'rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={() => setHoveredId(member.slug)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative w-16 md:w-24 flex-shrink-0">
                  <img
                    src={member.equipeFields.miniImage?.node.sourceUrl || member.equipeFields.image?.node.sourceUrl || "https://media.istockphoto.com/id/1919265357/fr/photo/portrait-en-gros-plan-dun-homme-daffaires-confiant-debout-dans-son-bureau.jpg?s=612x612&w=0&k=20&c=u_cAYkuDe1e8oeBrKBNLbPiBrZ_fflqLhwxIXXlgsOg="}
                    alt={member.equipeFields.miniImage?.node.altText || member.equipeFields.image?.node.altText || member.title}
                    className={cn(
                      "w-16 h-16 md:w-24 md:h-24 object-cover object-top rounded-xl md:rounded-2xl transition-all duration-300",
                      "grayscale group-hover/card:grayscale-0"
                    )}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://media.istockphoto.com/id/1919265357/fr/photo/portrait-en-gros-plan-dun-homme-daffaires-confiant-debout-dans-son-bureau.jpg?s=612x612&w=0&k=20&c=u_cAYkuDe1e8oeBrKBNLbPiBrZ_fflqLhwxIXXlgsOg=";
                    }}
                  />
                  <div className={cn(
                    "absolute -right-2 md:-right-4 top-0 flex flex-col gap-2 md:gap-3",
                    "opacity-0 group-hover/member:opacity-100 transition-opacity duration-300"
                  )}>
                    {member.equipeFields.linkedin && (
                      <SocialIcon href={member.equipeFields.linkedin}>
                        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="2" y="9" width="4" height="12" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="4" cy="4" r="2" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </SocialIcon>
                    )}
                    {member.equipeFields.twitter && (
                      <SocialIcon href={member.equipeFields.twitter}>
                        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </SocialIcon>
                    )}
                    {member.equipeFields.autre && (
                      <SocialIcon href={member.equipeFields.autre}>
                        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12h20" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={themeColors.common.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </SocialIcon>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <h3 style={{ 
                    color: hoveredId === member.slug ? themeColors.common.white : themeColors.common.black 
                  }} className="text-lg md:text-xl font-medium mb-1 md:mb-2 transition-colors duration-300 break-words flex flex-col">
                    <span>{member.title.split(' ')[0]}</span>
                    <span>{member.title.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  <p style={{ 
                    color: hoveredId === member.slug ? `${themeColors.common.white}cc` : `${themeColors.common.black}cc` 
                  }} className="text-sm md:text-base mb-1 md:mb-2 transition-colors duration-300">
                    {member.equipeFields.role}
                  </p>
                  <p style={{ 
                    color: hoveredId === member.slug ? `${themeColors.common.white}99` : `${themeColors.common.black}99` 
                  }} className="text-xs md:text-sm leading-relaxed transition-colors duration-300">
                    {member.equipeFields.extrait}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientTeam; 