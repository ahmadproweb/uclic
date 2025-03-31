'use client';

import Link from 'next/link';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';

interface LegalPageClientProps {
  title: string;
  content: string;
  slug: string;
}

export default function LegalPageClient({ title, content, slug }: LegalPageClientProps) {
  const [mounted, setMounted] = useState(false);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading state
  }

  // Fonction pour obtenir l'icône en fonction du slug
  const getIcon = () => {
    switch (slug) {
      case 'rgpd':
        return (
          <svg className={cn("w-16 h-16", isDark ? "text-white/80" : "text-black/80")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 11l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'conditions-generales-de-vente':
        return (
          <svg className={cn("w-16 h-16", isDark ? "text-white/80" : "text-black/80")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg className={cn("w-16 h-16", isDark ? "text-white/80" : "text-black/80")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15v5M5 15v5M19 15v5M4 10h16M2 20h20M12 3L2 10h20L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

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
                  ? "text-white/90 hover:text-[#E0FF5C]" 
                  : "text-black hover:text-[#9FB832]"
              )}
            >
              Accueil
            </Link>
            <span className={cn(
              isDark ? "text-white/90" : "text-black"
            )}>/</span>
            <Link 
              href="/legal" 
              className={cn(
                "transition-colors",
                isDark 
                  ? "text-white/90 hover:text-[#E0FF5C]" 
                  : "text-black hover:text-[#9FB832]"
              )}
            >
              Documents Légaux
            </Link>
            <span className={cn(
              isDark ? "text-white/90" : "text-black"
            )}>/</span>
            <span className={cn(
              isDark ? "text-white/90" : "text-black"
            )}>{title}</span>
          </div>

          {/* Back button */}
          <Link 
            href="/legal" 
            className={cn(
              "inline-flex items-center text-sm transition-all",
              isDark 
                ? "text-white/90 hover:text-[#E0FF5C]" 
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
            Retour aux documents légaux
          </Link>
        </div>

        {/* Header with icon */}
        <div className={cn(
          "flex flex-col items-center mb-12 p-8 rounded-2xl md:rounded-[32px]",
          isDark ? "bg-white/5 border border-white/10" : "bg-white border border-black/5"
        )}>
          <div className="mb-6">
            {getIcon()}
          </div>
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold text-center mb-4",
            isDark ? "text-white" : "text-black"
          )}>
            {title}
          </h1>
          
        </div>

        {/* Content */}
        <div className={cn(
          "max-w-none space-y-8",
          isDark 
            ? "text-white/90" 
            : "text-black/70"
        )}>
          <div 
            className={cn(
              "[&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:all-unset",
              "[&>h2]:block [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-6 [&>h2]:mt-8",
              "[&>h3]:block [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mb-4",
              "[&>p]:mb-6 [&>p]:leading-relaxed",
              "[&>ul]:list-disc [&>ul]:ml-6 [&>ul]:space-y-2",
              "[&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:space-y-2",
              "[&_strong]:font-semibold",
              "[&_a]:underline [&_a]:decoration-2",
              "[&_br]:block [&_br]:mb-4",
              isDark && "[&>h2]:text-white [&>h3]:text-white [&>p]:text-white/90 [&>ul]:text-white/90 [&>ol]:text-white/90 [&_strong]:text-white"
            )}
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      </div>
    </section>
  );
} 