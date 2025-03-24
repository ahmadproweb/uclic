import { TeamMember } from '@/lib/wordpress';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { colors as theme } from '@/config/theme';
import { cn } from '@/lib/utils';
import { CTAButton } from '@/components/ui/cta-button';
import PreFooter from '@/components/footer/PreFooter';

interface TeamMemberPageLayoutProps {
  member: TeamMember;
  isDark: boolean;
  children?: React.ReactNode;
  related?: TeamMember[];
}

export default function TeamMemberPageLayout({
  member,
  children,
  related,
}: TeamMemberPageLayoutProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <>
      <section className="w-full max-w-[100vw] relative overflow-hidden pt-28 md:pt-32 pb-16">
        <div className="max-w-[1250px] mx-auto px-4 md:px-6 relative z-10">
          {/* Navigation row */}
          <div className="flex justify-between items-center mb-10">
            {/* Breadcrumb */}
            <nav className={cn(
              "flex items-center space-x-2 text-xs",
              isDark ? "text-white/50" : "text-black/50"
            )}>
              <Link href="/" className="hover:underline">Accueil</Link>
              <span>/</span>
              <Link href="/equipe" className="hover:underline">Équipe</Link>
              <span>/</span>
              <span className="text-primary">{member.title}</span>
            </nav>

            {/* Back button */}
            <Link 
              href="/equipe" 
              className={cn(
                "inline-flex items-center text-sm hover:underline transition-all",
                isDark ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"
              )}
            >
              <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Retour à l&apos;équipe
            </Link>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
            {/* Left column - Photo and info */}
            <div className="lg:col-span-4 xl:col-span-3 relative z-20">
              <div className="rounded-3xl p-8 border bg-black/20 border-white/10">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-8">
                  <img
                    src={member.equipeFields.image?.node.sourceUrl || "https://media.istockphoto.com/id/1919265357/fr/photo/portrait-en-gros-plan-dun-homme-daffaires-confiant-debout-dans-son-bureau.jpg?s=612x612&w=0&k=20&c=u_cAYkuDe1e8oeBrKBNLbPiBrZ_fflqLhwxIXXlgsOg="}
                    alt={member.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Role badge */}
                {member.equipeFields.role && (
                  <div className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium mb-6 text-center",
                    "bg-primary text-black"
                  )}>
                    {member.equipeFields.role}
                  </div>
                )}

                {/* Member name */}
                <h1 className="text-2xl font-bold mb-8 text-center text-white">
                  {member.title}
                </h1>

                {/* Social links */}
                <div className="flex gap-4 justify-center mb-8">
                  {member.equipeFields.linkedin && (
                    <a
                      href={member.equipeFields.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        isDark 
                          ? "bg-primary/10 hover:bg-primary/20 text-primary" 
                          : "bg-primary hover:bg-primary/90 text-white"
                      )}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="2" y="9" width="4" height="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="4" cy="4" r="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                  {member.equipeFields.twitter && (
                    <a
                      href={member.equipeFields.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        isDark 
                          ? "bg-primary/10 hover:bg-primary/20 text-primary" 
                          : "bg-primary hover:bg-primary/90 text-white"
                      )}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                  {member.equipeFields.autre && (
                    <a
                      href={member.equipeFields.autre}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        isDark 
                          ? "bg-primary/10 hover:bg-primary/20 text-primary" 
                          : "bg-primary hover:bg-primary/90 text-white"
                      )}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Contact button */}
                <div className="flex justify-center">
                  <CTAButton 
                    href="mailto:contact@uclic.fr"
                    variant="mainCTA"
                  >
                    Me contacter
                  </CTAButton>
                </div>
              </div>
            </div>

            {/* Right column - Content */}
            <div className="lg:col-span-8 xl:col-span-9">
              {/* Contenu principal */}
              <div>
                <div 
                  className={cn(
                    "prose prose-lg max-w-none",
                    isDark ? "prose-invert" : "",
                    isDark ? "prose-p:text-white/90" : "prose-p:text-gray-900",
                    "prose-p:mb-8 prose-p:leading-relaxed",
                    "prose-headings:font-medium",
                    "[&>h2]:text-3xl [&>h2]:font-medium [&>h2]:mb-6",
                    "[&>h2:not(:first-child)]:mt-12",
                    isDark ? "[&>h2]:text-white" : "[&>h2]:text-gray-900",
                    "[&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mb-8 [&>h3]:mt-12",
                    isDark ? "[&>h3]:text-white" : "[&>h3]:text-gray-900",
                    "prose-ul:pl-6 prose-ol:pl-6 prose-li:mb-3",
                    "prose-ul:list-none prose-ul:pl-0",
                    "[&_ul>li]:relative [&_ul>li]:pl-6 [&_ul>li]:mb-3",
                    "[&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.6em] [&_ul>li]:before:w-2 [&_ul>li]:before:h-2 [&_ul>li]:before:bg-[#E0FF5C] [&_ul>li]:before:rounded-full",
                    "[&_p]:text-base [&_p]:leading-relaxed",
                    isDark ? "[&_p]:text-white/90" : "[&_p]:text-gray-900",
                    "[&_strong]:font-semibold",
                    isDark ? "[&_strong]:text-white" : "[&_strong]:text-gray-900",
                    "[&_p:has(strong)]:mb-2",
                    "[&_p+p]:mt-8",
                    "[&>h2+p]:mt-8",
                    isDark ? "[&_li]:text-white/90" : "[&_li]:text-gray-900"
                  )}
                  dangerouslySetInnerHTML={{ __html: member.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {children}

      {/* PreFooter Section */}
      <div className="w-full relative overflow-hidden pt-32 pb-8">
        {/* Gradient transparent vers gris en haut */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isDark 
              ? `linear-gradient(180deg, ${theme.colors.primary.main} 0%, ${theme.colors.common.black} 100%)`
              : `linear-gradient(180deg, transparent 0%, #F3F4F6 100%)`,
            height: '50%'
          }}
        />

        {/* Bande grise en bas */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[1]"
          style={{
            background: isDark
              ? theme.colors.common.black
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