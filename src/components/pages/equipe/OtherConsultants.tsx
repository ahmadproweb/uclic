import { TeamMember } from '@/lib/wordpress';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState, useMemo } from 'react';

interface OtherConsultantsProps {
  currentMember: TeamMember;
  initialMembers: TeamMember[];
}

export function OtherConsultants({ currentMember, initialMembers = [] }: OtherConsultantsProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filtrer les membres pour exclure le membre actuel
  const otherMembers = initialMembers.filter(m => m.slug !== currentMember.slug);
  
  // Calculer les membres à afficher dans le slide actuel (2 par page)
  const membersPerPage = 2;
  const visibleMembers = useMemo(() => {
    const startIdx = currentSlide * membersPerPage;
    return otherMembers.slice(startIdx, startIdx + membersPerPage);
  }, [otherMembers, currentSlide]);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(otherMembers.length / membersPerPage);

  // Fonction pour changer de slide
  const changeSlide = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSlide(currentSlide === totalPages - 1 ? 0 : currentSlide + 1);
    } else {
      setCurrentSlide(currentSlide === 0 ? totalPages - 1 : currentSlide - 1);
    }
  };

  // Si pas d'autres membres, on affiche un message
  if (otherMembers.length === 0) {
    return (
      <div className={cn(
        "py-20",
        isDark ? "bg-black/80" : "bg-black/5 dark:bg-white/5"
      )}>
        <div className="max-w-[1250px] mx-auto px-4">
          <div className={cn(
            "rounded-3xl overflow-hidden relative p-8 flex flex-col justify-between min-h-[320px]",
            isDark 
              ? "bg-[#E0FF5C]/10 border border-[#E0FF5C]/30" 
              : "bg-[#E0FF5C]/20 border border-[#9FB832]/30"
          )}>
            <div>
              <div className={cn(
                "absolute top-6 right-6 opacity-20",
                isDark ? "text-[#E0FF5C]" : "text-[#9FB832]"
              )}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4",
                isDark ? "bg-[#E0FF5C] text-black" : "bg-[#9FB832] text-white"
              )}>
                Notre équipe
              </span>
              <h4 className={cn(
                "text-xl font-bold mb-4",
                isDark ? "text-white" : "text-black"
              )}>
                Découvrez tous nos consultants
              </h4>
              <p className={cn(
                "mb-4",
                isDark ? "text-white/90" : "text-black/90"
              )}>
                Des experts passionnés prêts à vous accompagner dans vos projets digitaux.
              </p>
            </div>
            <Link href="/equipe" className={cn(
              "inline-flex items-center text-sm font-medium hover:underline",
              isDark ? "text-[#E0FF5C]" : "text-[#9FB832]"
            )}>
              <span className="mr-2">Voir toute l&apos;équipe</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "py-20",
      isDark ? "bg-black/80" : "bg-black/5 dark:bg-white/5"
    )}>
      <div className="max-w-[1250px] mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className={cn(
            "text-2xl md:text-3xl font-light",
            isDark ? "text-white" : "text-black"
          )}>
            Autres consultants
          </h2>

          {/* Navigation controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-colors",
                      currentSlide === index 
                        ? (isDark ? "bg-[#E0FF5C]" : "bg-[#E0FF5C]") 
                        : (isDark ? "bg-white/20" : "bg-black/20")
                    )}
                    aria-label={`Page ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => changeSlide('prev')}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    isDark 
                      ? "bg-white/10 hover:bg-white/20 text-white" 
                      : "bg-black/5 hover:bg-black/10 text-black"
                  )}
                  aria-label="Consultants précédents"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => changeSlide('next')}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    isDark 
                      ? "bg-white/10 hover:bg-white/20 text-white" 
                      : "bg-black/5 hover:bg-black/10 text-black"
                  )}
                  aria-label="Consultants suivants"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carte colorée selon la charte graphique */}
          <div className={cn(
            "rounded-3xl overflow-hidden relative p-8 flex flex-col justify-between h-[400px]",
            isDark 
              ? "bg-[#E0FF5C]/10 border border-[#E0FF5C]/30" 
              : "bg-[#E0FF5C]/20 border border-[#9FB832]/30"
          )}>
            <div>
              <div className={cn(
                "absolute top-6 right-6 opacity-20",
                isDark ? "text-[#E0FF5C]" : "text-[#9FB832]"
              )}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4",
                isDark ? "bg-[#E0FF5C] text-black" : "bg-[#9FB832] text-white"
              )}>
                Notre équipe
              </span>
              <h4 className={cn(
                "text-xl font-bold mb-4",
                isDark ? "text-white" : "text-black"
              )}>
                Découvrez tous nos consultants
              </h4>
              <p className={cn(
                "mb-4",
                isDark ? "text-white/90" : "text-black/90"
              )}>
                Des experts passionnés prêts à vous accompagner dans vos projets digitaux.
              </p>
            </div>
            <Link href="/equipe" className={cn(
              "inline-flex items-center text-sm font-medium hover:underline",
              isDark ? "text-[#E0FF5C]" : "text-[#9FB832]"
            )}>
              <span className="mr-2">Voir toute l&apos;équipe</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Autres membres */}
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleMembers.map((member) => (
              <Link 
                href={`/equipe/${member.slug}`} 
                key={member.slug}
                className="group relative h-[400px] rounded-3xl overflow-hidden border backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "transparent",
                  borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                  boxShadow: "none",
                }}
              >
                {/* Background pattern */}
                <div
                  className="absolute inset-0 rounded-3xl z-0 pointer-events-none"
                  style={{
                    backgroundImage: "url('/backgroundeffect.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px",
                    opacity: isDark ? "0.4" : "0.04"
                  }}
                />
                
                {/* Hover halo effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
                  style={{
                    background: isDark
                      ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
                      : `linear-gradient(to right, rgba(212,237,49,0.10) 0%, rgba(212,237,49,0.10) 60%, rgba(212,237,49,0) 100%)`,
                    filter: 'blur(20px)',
                  }}
                />
                {/* Image de fond */}
                <div className="absolute inset-0">
                  <img
                    src={member.equipeFields.image?.node.sourceUrl || "https://media.istockphoto.com/id/1919265357/fr/photo/portrait-en-gros-plan-dun-homme-daffaires-confiant-debout-dans-son-bureau.jpg?s=612x612&w=0&k=20&c=u_cAYkuDe1e8oeBrKBNLbPiBrZ_fflqLhwxIXXlgsOg="}
                    alt={member.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-colors duration-300" />
                </div>

                {/* Contenu */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
                  {member.equipeFields.role && (
                    <span className="inline-block px-3 py-1 bg-[#E0FF5C] text-black rounded-full text-xs font-medium mb-4">
                      {member.equipeFields.role}
                    </span>
                  )}
                  <h4 className="text-2xl text-white font-bold mb-4 group-hover:text-[#E0FF5C] transition-colors">
                    {member.title}
                  </h4>
                  <div 
                    className="text-white/80 text-base line-clamp-3 mb-6"
                    dangerouslySetInnerHTML={{ __html: member.equipeFields.extrait }}
                  />
                  <div className="flex items-center text-sm text-white/60 group-hover:text-[#E0FF5C] transition-colors">
                    <span className="mr-2">En savoir plus</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 