'use client';

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

export default function FooterUI({ legalPages }: FooterUIProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`${isDark ? 'bg-black' : 'bg-gray-100'} ${isDark ? 'text-white' : 'text-gray-900'} pt-6 md:pt-12 pb-6 md:pb-8`}>
    <div className="max-w-[1250px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 mb-8 md:mb-16">
        {/* Logo et description */}
        <div className="col-span-1 md:col-span-3 mb-8 md:mb-0">
          <div className="mb-4 md:mb-6">
            <Logo />
          </div>
          <p className={`${isDark ? 'text-white/60' : 'text-gray-600'} text-xs md:text-sm leading-relaxed`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Pellentesque sit amet hendrerit.
          </p>
        </div>

        {/* Nos services */}
        <div className="col-span-1 md:col-span-2 mb-8 md:mb-0">
          <h3 className="text-xs md:text-sm font-medium mb-4">Nos services</h3>
          <ul className="space-y-2 md:space-y-4">
            {['Agence SEO', 'Agence SEA', 'Agence Data', 'Agence Automation', 'Agence CRM'].map((service) => (
              <li key={service}>
                <a 
                  href="#" 
                  className={`text-xs md:text-sm transition-colors ${
                    isDark 
                      ? 'text-white/60 hover:text-[#E0FF5C]' 
                      : 'text-gray-900 hover:text-[#E0FF5C]'
                  }`}
                >
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Notre expertise */}
        <div className="col-span-1 md:col-span-2 mb-8 md:mb-0">
          <h3 className="text-xs md:text-sm font-medium mb-4">Notre expertise</h3>
          <ul className="space-y-2 md:space-y-4">
            {['SEO', 'SEA', 'SMA', 'r8n', 'Meta'].map((expertise) => (
              <li key={expertise}>
                <a 
                  href="#" 
                  className={`text-xs md:text-sm transition-colors ${
                    isDark 
                      ? 'text-white/60 hover:text-[#E0FF5C]' 
                      : 'text-gray-900 hover:text-[#E0FF5C]'
                  }`}
                >
                  {expertise}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Plan du site */}
        <div className="col-span-1 md:col-span-2 mb-8 md:mb-0">
          <h3 className="text-xs md:text-sm font-medium mb-4">Plan du site</h3>
          <ul className="space-y-2 md:space-y-4">
            <li>
              <Link 
                href="/a-propos" 
                className={`text-xs md:text-sm transition-colors ${
                  isDark 
                    ? 'text-white/60 hover:text-[#E0FF5C]' 
                    : 'text-gray-900 hover:text-[#E0FF5C]'
                }`}
              >
                À propos
              </Link>
            </li>
            <li>
              <Link 
                href="/equipe" 
                className={`text-xs md:text-sm transition-colors ${
                  isDark 
                    ? 'text-white/60 hover:text-[#E0FF5C]' 
                    : 'text-gray-900 hover:text-[#E0FF5C]'
                }`}
              >
                Notre équipe
              </Link>
            </li>
            <li>
              <Link 
                href="/charte-freelance" 
                className={`text-xs md:text-sm transition-colors ${
                  isDark 
                    ? 'text-white/60 hover:text-[#E0FF5C]' 
                    : 'text-gray-900 hover:text-[#E0FF5C]'
                }`}
              >
                La charte du Freelance
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`text-xs md:text-sm transition-colors ${
                  isDark 
                    ? 'text-white/60 hover:text-[#E0FF5C]' 
                    : 'text-gray-900 hover:text-[#E0FF5C]'
                }`}
              >
                Nous rejoindre
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-1 md:col-span-3">
          <NewsletterSection />
        </div>
      </div>

      {/* Séparateur */}
      <div className={`h-px ${isDark ? 'bg-white/10' : 'bg-black/10'} mb-8`}></div>

      {/* Footer bottom */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 md:gap-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 text-xs md:text-sm">
          <span className={isDark ? 'text-white/80' : 'text-gray-900'}>
            © {new Date().getFullYear()} Uclic. Tous droits réservés.
          </span>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            {legalPages.map((page: LegalPage) => (
              <Link 
                key={page.id}
                href={`/legal/${page.slug}`}
                className={`${
                  isDark 
                    ? 'text-white/60 hover:text-[#E0FF5C]' 
                    : 'text-black-600 hover:text-[#E0FF5C]'
                } transition-colors duration-200`}
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex justify-center gap-4">
          {['Facebook', 'LinkedIn', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
            <a 
              key={social}
              href="#" 
              className={`p-1.5 md:p-2 ${
                isDark 
                  ? 'text-white/60 hover:text-[#E0FF5C]' 
                  : 'text-gray-600 hover:text-[#E0FF5C]'
              } rounded-full transition-colors`}
              aria-label={social}
            >
              {/* ... SVG icons restent inchangés ... */}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
  );
} 