'use client';

import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { Logo } from "@/components/header/Logo";
import Link from "next/link";
import NewsletterSection from './NewsletterSection';

interface FooterUIProps {
  legalPages: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
}

// Memoized Components
const FooterLogo = memo(({ isDark }: { isDark: boolean }) => (
  <div className="col-span-1 md:col-span-3 mb-8 md:mb-0">
    <div className="mb-4 md:mb-6">
      <Logo />
    </div>
    <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-xs md:text-sm leading-relaxed`}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Pellentesque sit amet hendrerit.
    </p>
  </div>
));

FooterLogo.displayName = 'FooterLogo';

const ServicesSection = memo(({ isDark }: { isDark: boolean }) => (
  <div className="col-span-1 md:col-span-2 mb-8 md:mb-0">
    <h3 className={`text-xs md:text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Nos services</h3>
    <ul className="space-y-2 md:space-y-4">
      {['Agence SEO', 'Agence SEA', 'Agence Data', 'Agence Automation', 'Agence CRM'].map((service) => (
        <li key={service}>
          <a 
            href="#" 
            className={`text-xs md:text-sm transition-colors ${
              isDark 
                ? 'text-white/80 hover:text-[#E0FF5C]' 
                : 'text-gray-700 hover:text-[#9FB832]'
            }`}
          >
            {service}
          </a>
        </li>
      ))}
    </ul>
  </div>
));

ServicesSection.displayName = 'ServicesSection';

const ExpertiseSection = memo(({ isDark }: { isDark: boolean }) => (
  <div className="col-span-1 md:col-span-2 mb-8 md:mb-0">
    <h3 className={`text-xs md:text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Notre expertise</h3>
    <ul className="space-y-2 md:space-y-4">
      {['SEO', 'SEA', 'SMA', 'r8n', 'Meta'].map((expertise) => (
        <li key={expertise}>
          <a 
            href="#" 
            className={`text-xs md:text-sm transition-colors ${
              isDark 
                ? 'text-white/80 hover:text-[#E0FF5C]' 
                : 'text-gray-700 hover:text-[#9FB832]'
            }`}
          >
            {expertise}
          </a>
        </li>
      ))}
    </ul>
  </div>
));

ExpertiseSection.displayName = 'ExpertiseSection';

const SiteMapSection = memo(({ isDark }: { isDark: boolean }) => (
  <div className="col-span-1 md:col-span-2 mb-8 md:mb-0">
    <h3 className={`text-xs md:text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Plan du site</h3>
    <ul className="space-y-2 md:space-y-4">
      {[
        { href: '/a-propos', text: 'À propos' },
        { href: '/equipe', text: 'Notre équipe' },
        { href: '/levee-de-fonds', text: 'Levées de fonds' },
        { href: '/charte-freelance', text: 'La charte du Freelance' },
        { href: '/contact', text: 'Nous rejoindre' },
        { href: '/toolbox', text: 'Toolbox' }
      ].map(({ href, text }) => (
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

SiteMapSection.displayName = 'SiteMapSection';

const FooterBottom = memo(({ isDark, legalPages }: { isDark: boolean; legalPages: FooterUIProps['legalPages'] }) => (
  <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 md:gap-6">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 text-xs md:text-sm">
      <span className={isDark ? 'text-white/90' : 'text-gray-900'}>
        © {new Date().getFullYear()} Uclic. Tous droits réservés.
      </span>
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
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
      </div>
    </div>
    
    <div className="flex justify-center gap-4">
      {['Facebook', 'LinkedIn', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
        <a 
          key={social}
          href="#" 
          className={`p-1.5 md:p-2 ${
            isDark 
              ? 'text-white/80 hover:text-[#E0FF5C]' 
              : 'text-gray-700 hover:text-[#9FB832]'
          } rounded-full transition-colors`}
          aria-label={social}
        >
          {/* SVG icons will be added here */}
        </a>
      ))}
    </div>
  </div>
));

FooterBottom.displayName = 'FooterBottom';

function FooterUI({ legalPages }: FooterUIProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`${isDark ? 'bg-black' : 'bg-gray-100'} ${isDark ? 'text-white' : 'text-gray-900'} pt-6 md:pt-12 pb-6 md:pb-8`}>
      <div className="max-w-[1250px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 mb-8 md:mb-16">
          <FooterLogo isDark={isDark} />
          <ServicesSection isDark={isDark} />
          <ExpertiseSection isDark={isDark} />
          <SiteMapSection isDark={isDark} />
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