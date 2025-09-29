import PreFooter from "@/components/footer/PreFooter";
import { CTAButton } from "@/components/ui/cta-button";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { TeamMember } from "@/lib/wordpress";
import "@/styles/wordpress-content.css";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TeamMemberPageLayoutProps {
  member: TeamMember;
  isDark: boolean;
  children?: React.ReactNode;
}

export default function TeamMemberPageLayout({
  member,
  children,
}: TeamMemberPageLayoutProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.title,
    "description": member.equipeFields.extrait || `Expert chez Uclic`,
    "url": `https://uclic.fr/equipe/${member.slug}`,
    "image": member.equipeFields.image?.node.sourceUrl || "/images/default-profile.jpg",
    "jobTitle": (member as any).equipeFields?.poste || "Expert",
    "worksFor": {
      "@type": "Organization",
      "name": "Uclic",
      "url": "https://uclic.fr"
    },
    "sameAs": [
      member.equipeFields.linkedin,
      member.equipeFields.twitter,
      member.equipeFields.autre
    ].filter(Boolean),
    "alumniOf": (member as any).equipeFields?.ecole ? {
      "@type": "EducationalOrganization",
      "name": (member as any).equipeFields?.ecole
    } : undefined,
    "knowsAbout": (member as any).equipeFields?.expertise ? (member as any).equipeFields.expertise.split(',').map((skill: string) => skill.trim()) : undefined
  };

  return (
    <div className={cn("min-h-screen", isDark ? "bg-black" : "bg-white")}>
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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

      <section className="w-full relative overflow-hidden pt-32 pb-16 md:pb-24 px-4 sm:px-6">
        <div
          className={cn(
            "max-w-[1250px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10 rounded-2xl border",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 rounded-2xl -z-10">
            <div
              className="absolute inset-4 md:inset-0 rounded-2xl"
              style={{
                backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "200px",
                opacity: isDark ? "0.25" : "0.04"
              }}
            />
          </div>
          {/* Navigation row */}
          <div className="flex justify-between items-center mb-10">
            {/* Breadcrumb */}
            <nav
              className={cn(
                "flex items-center space-x-2 text-xs",
                isDark ? "text-white/100" : "text-black/100"
              )}
            >
              <Link
                href="/"
                className={cn(
                  "hover:underline transition-colors",
                  isDark
                    ? "text-white/100 hover:text-[#E0FF5C]"
                    : "text-black/100 hover:text-black"
                )}
              >
                Accueil
              </Link>
              <span>/</span>
              <Link
                href="/equipe"
                className={cn(
                  "hover:underline transition-colors",
                  isDark
                    ? "text-white/100 hover:text-[#E0FF5C]"
                    : "text-black/100 hover:text-black"
                )}
              >
                Équipe
              </Link>
              <span>/</span>
              <span className={cn(isDark ? "text-[#E0FF5C]" : "text-primary")}>
                {member.title}
              </span>
            </nav>

            {/* Back button */}
            <Link
              href="/equipe"
              className={cn(
                "inline-flex items-center text-sm transition-all",
                isDark
                  ? "text-white/100 hover:text-[#E0FF5C]"
                  : "text-black/100 hover:text-black"
              )}
            >
              <svg
                className={cn(
                  "w-4 h-4 mr-2 transform rotate-180",
                  isDark ? "stroke-white/100" : "stroke-black/100"
                )}
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Retour à l&apos;équipe
            </Link>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
            {/* Left column - Photo and info */}
            <div className="lg:col-span-4 xl:col-span-3 relative z-20">
              <div
                className={cn(
                  "rounded-3xl p-8 border relative overflow-hidden backdrop-blur-md",
                  isDark 
                    ? "bg-black/40 border-white/10" 
                    : "bg-white/40 border-black/5"
                )}
              >
                {/* Gradient background */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: isDark
                      ? "linear-gradient(145deg, rgba(159, 184, 50, 0.1), rgba(237 245 202, 0.05))"
                      : "linear-gradient(145deg, rgba(159, 184, 50, 0.1), rgba(237 245 202, 0.15))",
                  }}
                />

                {/* Content with relative positioning */}
                <div className="relative z-10">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-8">
                    <img
                      src={
                        member.equipeFields.image?.node.sourceUrl ||
                        "https://media.istockphoto.com/id/1919265357/fr/photo/portrait-en-gros-plan-dun-homme-daffaires-confiant-debout-dans-son-bureau.jpg?s=612x612&w=0&k=20&c=u_cAYkuDe1e8oeBrKBNLbPiBrZ_fflqLhwxIXXlgsOg="
                      }
                      alt={member.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Role badge */}
                  {member.equipeFields.role && (
                     <div
                       className={cn(
                         "px-4 py-1.5 rounded-full text-sm font-medium mb-6 text-center",
                         "bg-black text-white"
                       )}
                     >
                      {member.equipeFields.role}
                    </div>
                  )}

                  {/* Member name */}
                  <h1
                    className={cn(
                      "text-2xl font-bold mb-8 text-center",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
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
                          "bg-black hover:bg-black text-white"
                        )}
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="2"
                            y="9"
                            width="4"
                            height="12"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="4"
                            cy="4"
                            r="2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
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
                            : "bg-black/10 hover:bg-black/20 text-black"
                        )}
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
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
                            : "bg-black/10 hover:bg-black/20 text-black"
                        )}
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Contact button */}
                  <div className="flex justify-center">
                    <CTAButton href="/contact/" variant="mainCTA">
                      Me contacter
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Content */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div
                className={cn(
                  "rounded-3xl p-8 border backdrop-blur-md",
                  isDark 
                    ? "bg-black/40 border-white/10" 
                    : "bg-white/40 border-black/5"
                )}
              >
                <article
                  className={cn(
                    "max-w-none wp-content-styles",
                    isDark ? "dark" : "light"
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
      <div className="relative z-10 w-full overflow-hidden mt-10 md:mt-16 pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6">
        <div className="max-w-[1250px] mx-auto">
          <div className={cn(
            "rounded-2xl border",
            isDark ? "border-white/10" : "border-black/5"
          )}>
            <PreFooter noBgGradient />
          </div>
        </div>
      </div>
    </div>
  );
}
