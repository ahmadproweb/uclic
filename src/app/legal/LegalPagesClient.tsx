'use client';

import Link from 'next/link';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface LegalPage {
  title: string;
  slug: string;
  excerpt: string;
  icon: React.ReactNode;
}

interface LegalPagesClientProps {
  pages: LegalPage[];
}

export default function LegalPagesClient() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  // Hardcoded pages with icons
  const legalPages = [
    {
      title: "RGPD",
      slug: "/legal/rgpd",
      excerpt: "Chez Uclic.fr, la protection des données personnelles de nos utilisateurs est une priorité absolue. Nous nous engageons à respecter votre vie privée et à protéger les informations que vous nous confiez.",
      icon: (
        <svg className={cn("w-12 h-12", isDark ? "text-white/80" : "text-black/80")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 11l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Conditions Générales de Vente",
      slug: "/legal/conditions-generales-de-vente",
      excerpt: "Article 1 : Objet Les présentes Conditions Générales de Vente (CGV) définissent les termes et conditions selon lesquels Uclic fournit ses services à ses clients.",
      icon: (
        <svg className={cn("w-12 h-12", isDark ? "text-white/80" : "text-black/80")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Mentions légales",
      slug: "/legal/mentions-legales",
      excerpt: "Mentions Légales Éditeur du site Nom commercial : UCLIC Entreprise individuelle : DELCROS. Découvrez toutes les informations légales concernant notre entreprise.",
      icon: (
        <svg className={cn("w-12 h-12", isDark ? "text-white/80" : "text-black/80")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15v5M5 15v5M19 15v5M4 10h16M2 20h20M12 3L2 10h20L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className={cn(
      "w-full max-w-[100vw] relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20 transition-colors duration-300",
      isDark ? "bg-black" : "bg-[#F5F5F5]"
    )}>
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Navigation row */}
        <div className="flex justify-between items-center mb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link 
              href="/" 
              className={cn(
                "transition-colors",
                isDark 
                  ? "text-white hover:text-[#E0FF5C]" 
                  : "text-black hover:text-[#9FB832]"
              )}
            >
              Accueil
            </Link>
            <span className={cn(
              isDark ? "text-white" : "text-black"
            )}>/</span>
            <span className={cn(
              isDark ? "text-white" : "text-black"
            )}>Documents Légaux</span>
          </div>

          {/* Back button */}
          <Link 
            href="/" 
            className={cn(
              "inline-flex items-center text-sm transition-all",
              isDark 
                ? "text-white hover:text-[#E0FF5C]" 
                : "text-black hover:text-[#9FB832]"
            )}
          >
            <svg 
              className={cn(
                "w-4 h-4 mr-2 transform rotate-180",
                isDark ? "stroke-white" : "stroke-black"
              )} 
              viewBox="0 0 24 24" 
              fill="none" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        {/* Page header */}
        <header className="mb-12">
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold mb-12",
            isDark ? "text-white" : "text-black"
          )}>
            Documents Légaux
          </h1>
        </header>

        {/* Grid of legal documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {legalPages.map((page, index) => (
            <Link 
              key={index}
              href={page.slug}
              className={cn(
                "rounded-2xl md:rounded-[32px] p-5 md:p-6",
                "transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-xl",
                "cursor-pointer group backdrop-blur-sm",
                isDark ? "bg-white/5 border border-white/10" : "bg-white border border-black/5",
                "hover:bg-white/10"
              )}
            >
              <div className={cn(
                "aspect-video w-full rounded-xl md:rounded-2xl mb-6 md:mb-8 transition-colors duration-300 flex items-center justify-center",
                isDark ? "bg-white/10" : "bg-gray-100"
              )}>
                {page.icon}
              </div>
              <h3 className={cn(
                "text-xl md:text-2xl font-medium mb-3 md:mb-4 transition-colors duration-300",
                isDark 
                  ? "text-white group-hover:text-[#E0FF5C]" 
                  : "text-black group-hover:text-black"
              )}>
                {page.title}
              </h3>
              <div 
                className={cn(
                  "text-sm md:text-base mb-6 md:mb-8 flex-1 line-clamp-3",
                  isDark ? "text-white/80" : "text-black/70"
                )}
              >
                {page.excerpt}
              </div>
              <div className={cn(
                "group flex items-center transition-colors duration-300 text-sm md:text-base mt-auto",
                isDark 
                  ? "text-[#E0FF5C]" 
                  : "text-[#9FB832] group-hover:text-black"
              )}>
                Lire plus
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300 w-4 h-4 md:w-5 md:h-5">
                  <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 
