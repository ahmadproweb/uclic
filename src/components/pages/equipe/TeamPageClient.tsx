'use client';

import { useTheme } from '@/context/ThemeContext';
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';

interface TeamPageClientProps {
  members: any[]; // TODO: Add proper type
}

export default function TeamPageClient({ members }: TeamPageClientProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <div className={cn("min-h-screen", isDark ? "bg-black" : "bg-white")}>
      {/* Fixed halo background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 h-[45vh] z-0"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 75%)`
            : `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0) 78%)`,
          filter: 'blur(20px)'
        }}
      />

      <section className="w-full max-w-[100vw] pt-40 pb-16 md:pb-24 relative overflow-hidden">
      
      <div className="max-w-[1250px] mx-auto px-8 md:px-12 py-8 md:py-12 relative z-10 rounded-2xl"
        style={{
          boxShadow: isDark
            ? "0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px -4px rgba(0,0,0,0.3)"
            : "0 0 0 1px rgba(0,0,0,0.03), 0 8px 32px -4px rgba(0,0,0,0.1)",
          position: "relative"
        }}
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className={cn(
            "text-base mb-4 block font-semibold",
            isDark ? "text-[#E0FF5C]" : "text-black"
          )}>Équipe</span>
          <h1 className={cn(
            "text-3xl md:text-5xl font-normal mb-4",
            isDark ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : "text-black"
          )}>
            Découvrez notre<br/>collectif
          </h1>
          <div className={cn(
            "w-12 h-0.5 mx-auto mb-4",
            isDark ? "bg-[#E0FF5C]" : "bg-black"
          )}/>
          <p className={cn(
            "text-base md:text-lg",
            isDark ? "text-white/80" : "text-black/70"
          )}>
            Des freelance passionnés<br/>au service de votre croissance
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
                    <span className="inline-block px-3 py-1 bg-[#E0FF5C] text-black rounded-full text-xs font-medium mb-4 shadow-sm">
                      {member.equipeFields.role}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold mb-4 text-white transition-colors group-hover:text-[#E0FF5C]">
                    {member.title}
                  </h2>
                  <div 
                    className="text-white/90 text-base line-clamp-3 mb-6"
                    dangerouslySetInnerHTML={{ __html: member.equipeFields.extrait }}
                  />
                  <div className="flex items-center text-sm text-white/80 transition-colors group-hover:text-[#E0FF5C]">
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

        {/* PreFooter Section */}
        <div className="relative z-10 w-full overflow-hidden pt-16 pb-16">
          <PreFooter noBgGradient />
        </div>
      </div>

      <ScrollToTop />
      </section>
    </div>
  );
} 