'use client';

import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { Logo } from "@/components/header/Logo";
import Link from "next/link";
import NewsletterSection from './NewsletterSection';
import { ExpertiseGrowthCategory } from '@/lib/wordpress';
import { cn } from "@/lib/utils";

interface FooterUIProps {
  legalPages: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
  categories: ExpertiseGrowthCategory[];
}

// Memoized Components
const FooterLogo = memo(({ isDark }: { isDark: boolean }) => (
  <div className="col-span-1 md:col-span-3 mb-8 md:mb-0">
    <div className="mb-4 md:mb-6">
      <Logo />
    </div>
    <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-xs md:text-sm leading-relaxed max-w-[90%]`}>
      Uclic est une agence d'experts en Intelligence Artificielle et Growth Marketing. Notre automatisation IA transforme vos campagnes en générateurs de revenus, multipliant vos résultats par 3x grâce à l'automatisation complète de votre funnel marketing.
    </p>
  </div>
));

FooterLogo.displayName = 'FooterLogo';

const FooterLinks = memo(({ isDark, title, links }: { isDark: boolean; title: string; links: Array<{ href: string; text: string }> }) => (
  <div className="col-span-1 md:col-span-3 mb-8 md:mb-0">
    <span className={`text-sm md:text-base font-bold mb-4 block ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</span>
    <ul className="space-y-2 md:space-y-4">
      {links.map(({ href, text }) => (
        <li key={href}>
          <Link 
            href={href}
            className={`text-xs md:text-sm transition-colors ${
              isDark 
                ? 'text-white/80 hover:text-[#E0FF5C]' 
                : 'text-gray-700 hover:text-[#9FB832]'
            }`}
          >
            {text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
));

FooterLinks.displayName = 'FooterLinks';

const FooterBottom = memo(({ isDark, legalPages }: { isDark: boolean; legalPages: FooterUIProps['legalPages'] }) => {
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/uclic-growth-marketing/', icon: 'ri-linkedin-line' },
    { name: 'Twitter', href: 'https://x.com/delcros_w', icon: 'ri-twitter-x-line' }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <nav className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-xs md:text-sm">
        <span className={isDark ? 'text-white/90' : 'text-gray-900'}>
          © {new Date().getFullYear()} Uclic. Tous droits réservés.
        </span>
        {legalPages.map((page) => (
          <Link 
            key={page.id}
            href={`/legal/${page.slug}`}
            className={`${
              isDark 
                ? 'text-white/80 hover:text-[#E0FF5C]' 
                : 'text-gray-700 hover:text-[#9FB832]'
            } transition-colors duration-200`}
          >
            {page.title}
          </Link>
        ))}
      </nav>
      
      <nav className="flex justify-center gap-4" aria-label="Réseaux sociaux">
        {socialLinks.map(({ name, href, icon }) => (
          <Link 
            key={name}
            href={href} 
            className={`p-1.5 md:p-2 ${
              isDark 
                ? 'text-white/80 hover:text-[#E0FF5C]' 
                : 'text-gray-700 hover:text-[#9FB832]'
            } rounded-full transition-colors`}
            aria-label={name}
          >
            <i className={`${icon} text-lg md:text-xl`} aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </div>
  );
});

FooterBottom.displayName = 'FooterBottom';

function FooterUI({ legalPages, categories }: FooterUIProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const servicesLinks = categories.map(category => ({
    href: `/expertise/${category.slug}`,
    text: category.name
      .replace(/Agence Intelligence Artificielle/i, 'Agence IA')
      .replace(/CRM & gestion de la relation client/i, 'CRM')
  }));

  const siteMapLinks = [
    { href: '/a-propos', text: 'À propos' },
    { href: '/equipe', text: 'Notre équipe' },
    { href: '/levee-de-fonds', text: 'Levées de fonds' },
    { href: '/charte-freelance', text: 'La charte du Freelance' },
    { href: '/meilleure-agence-growth', text: 'Meilleure Agence Growth' },
    { href: '/contact', text: 'Nous rejoindre' },
    { href: '/toolbox', text: 'Toolbox' }
  ];

  return (
    <footer 
      className={`w-full ${isDark ? 'bg-black' : 'bg-white'} ${isDark ? 'text-white' : 'text-gray-900'} pt-8 md:pt-12 pb-[100px] md:pb-[100px] border relative rounded-t-2xl overflow-hidden`}
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        backgroundImage: `radial-gradient(ellipse at center bottom,
          ${isDark ? 'rgba(212,237,49,0.15)' : 'rgba(212,237,49,0.20)'} 0%,
          rgba(212,237,49,0.10) 18%,
          rgba(212,237,49,0.06) 38%,
          rgba(212,237,49,0.03) 58%,
          ${isDark ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'} 78%)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "130% 120%",
        backgroundPosition: "center 100%",
      }}
    >
      {/* Background pattern - full width */}
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-t-2xl"
        style={{
          backgroundImage: `url(${require('../../lib/assets').backgroundEffectUrl})`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: isDark ? "0.25" : "0.04"
        }}
      />
      
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8 md:mb-16 px-0">
          <FooterLogo isDark={isDark} />
          <FooterLinks isDark={isDark} title="Nos services" links={servicesLinks} />
          <FooterLinks isDark={isDark} title="Plan du site" links={siteMapLinks} />
          <div className="col-span-1 md:col-span-3">
            <NewsletterSection />
          </div>
        </div>

        <div className={`h-px ${isDark ? 'bg-white/10' : 'bg-black/10'} mb-8`}></div>

        <FooterBottom isDark={isDark} legalPages={legalPages} />
      </div>
    </footer>
  );
}

FooterUI.displayName = 'FooterUI';

export default memo(FooterUI); 