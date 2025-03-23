'use client';

import { useTheme } from '@/context/ThemeContext';
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';

interface TeamMember {
  id: number;
  title: string;
  slug: string;
  equipeFields: {
    role?: string;
    extrait: string;
    image?: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

interface TeamPageClientProps {
  members: TeamMember[];
}

export default function TeamPageClient({ members }: TeamPageClientProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <>
      <section className="w-full max-w-[100vw] relative overflow-hidden pt-28 md:pt-32 pb-20">
        {/* Base Background gradient */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isDark 
              ? `linear-gradient(180deg, ${theme.colors.common.black}, ${theme.colors.primary.main})`
              : `linear-gradient(180deg, ${theme.colors.common.white}, ${theme.colors.primary.main})`
          }}
        />

        {/* Grain effect overlay */}
        <div 
          className={cn(
            "absolute inset-0 z-0 mix-blend-soft-light",
            isDark ? "opacity-90" : "opacity-50"
          )}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '100px 100px'
          }}
        />

        {/* New overlay gradient - black to transparent */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[1]"
          style={{
            background: isDark
              ? 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)'
              : 'linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)',
            height: '25%'
          }}
        />

        <div className="max-w-[1250px] mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className={cn(
              "text-base mb-4 block font-semibold",
              isDark ? "text-[#D9FF4B]" : "text-black"
            )}>Équipe</span>
            <h1 className={cn(
              "text-3xl md:text-5xl font-normal mb-4",
              isDark ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : "text-black"
            )}>
              Découvrez notre<br/>équipe d&apos;experts
            </h1>
            <div className={cn(
              "w-12 h-0.5 mx-auto mb-4",
              isDark ? "bg-[#D9FF4B]" : "bg-black"
            )}/>
            <p className={cn(
              "text-base md:text-lg",
              isDark ? "text-white/80" : "text-black/70"
            )}>
              Des experts passionnés prêts à vous accompagner<br/>dans vos projets digitaux
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {members.map((member) => (
              <div
                key={member.slug}
                className="group"
              >
                <Link 
                  href={`/equipe/${member.slug}`}
                  className="block relative h-[400px] rounded-3xl overflow-hidden shadow-lg"
                >
                  {/* Image de fond */}
                  <div className="absolute inset-0">
                    <img
                      src={member.equipeFields.image?.node.sourceUrl || "https://media.istockphoto.com/id/1919265357/fr/photo/portrait-en-gros-plan-dun-homme-daffaires-confiant-debout-dans-son-bureau.jpg?s=612x612&w=0&k=20&c=u_cAYkuDe1e8oeBrKBNLbPiBrZ_fflqLhwxIXXlgsOg="}
                      alt={member.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={cn(
                      "absolute inset-0 transition-colors duration-300",
                      isDark 
                        ? "bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60"
                        : "bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50"
                    )} />
                  </div>

                  {/* Contenu */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    {member.equipeFields.role && (
                      <span className="inline-block px-3 py-1 bg-[#D9FF4B] text-black rounded-full text-xs font-medium mb-4 shadow-sm">
                        {member.equipeFields.role}
                      </span>
                    )}
                    <h2 className="text-2xl font-bold mb-4 text-white transition-colors group-hover:text-[#D9FF4B]">
                      {member.title}
                    </h2>
                    <div 
                      className="text-white/90 text-base line-clamp-3 mb-6"
                      dangerouslySetInnerHTML={{ __html: member.equipeFields.extrait }}
                    />
                    <div className="flex items-center text-sm text-white/80 transition-colors group-hover:text-[#D9FF4B]">
                      <span className="mr-2">En savoir plus</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-[#D9FF4B] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-black/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Rejoignez notre collectif de freelances
              </h2>
              <p className="text-black/80 text-lg mb-8">
                Vous êtes un expert passionné ? Rejoignez notre communauté de freelances et participez à des projets innovants dans une ambiance collaborative.
              </p>
              <Link 
                href="/contact"
                className={cn(
                  "inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors group",
                  "bg-black text-white hover:bg-black/80"
                )}
              >
                <span className="mr-2">Nous rejoindre</span>
                <svg 
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <ScrollToTop />
      
      {/* PreFooter Section */}
      <div className="w-full relative overflow-hidden pt-32 pb-8">
        {/* Gradient transparent vers gris en haut */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isDark 
              ? `linear-gradient(180deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.main} 100%)`
              : `linear-gradient(180deg, transparent 0%, #F3F4F6 100%)`,
            height: '50%'
          }}
        />

        {/* Bande grise en bas */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[1]"
          style={{
            background: isDark
              ? theme.colors.primary.main
              : '#F3F4F6',
            height: '50%'
          }}
        />
        
        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <PreFooter noBgGradient />
        </div>
      </div>
    </>
  );
} 