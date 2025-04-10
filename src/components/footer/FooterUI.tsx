'use client';

import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { Logo } from "@/components/header/Logo";
import Link from "next/link";
import NewsletterSection from './NewsletterSection';
import { ExpertiseGrowthCategory } from '@/lib/wordpress';

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
      Uclic est une agence digitale spécialisée dans la croissance des entreprises. Notre expertise en IA, SEO, et marketing digital permet d'accélérer votre développement de manière durable et mesurable.
    </p>
  </div>
));

FooterLogo.displayName = 'FooterLogo';

const FooterLinks = memo(({ isDark, title, links }: { isDark: boolean; title: string; links: Array<{ href: string; text: string }> }) => (
  <div className="col-span-1 md:col-span-3 mb-8 md:mb-0">
    <h3 className={`text-sm md:text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
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
    { name: 'Facebook', href: '#', icon: 'ri-facebook-line' },
    { name: 'LinkedIn', href: '#', icon: 'ri-linkedin-line' },
    { name: 'Twitter', href: '#', icon: 'ri-twitter-x-line' },
    { name: 'Instagram', href: '#', icon: 'ri-instagram-line' },
    { name: 'YouTube', href: '#', icon: 'ri-youtube-line' }
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
    { href: '/contact', text: 'Nous rejoindre' },
    { href: '/toolbox', text: 'Toolbox' }
  ];

  return (
    <footer className={`${isDark ? 'bg-black' : 'bg-gray-100'} ${isDark ? 'text-white' : 'text-gray-900'} pt-6 md:pt-12 pb-[100px] md:pb-[100px]`}>
      <div className="max-w-[1250px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8 md:mb-16">
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