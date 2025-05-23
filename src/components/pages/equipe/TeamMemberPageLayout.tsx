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

  return (
    <>
      <section className="w-full max-w-[100vw] relative overflow-hidden pt-28 md:pt-32 pb-16">
        <div className="max-w-[1250px] mx-auto px-4 md:px-6 relative z-10">
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
                  "rounded-3xl p-8 border relative overflow-hidden",
                  isDark ? "border-white/10" : "border-[#9FB832]/20"
                )}
              >
                {/* Gradient background */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: isDark
                      ? "linear-gradient(145deg, rgba(159, 184, 50, 0.1), rgba(224, 255, 92, 0.05))"
                      : "linear-gradient(145deg, rgba(159, 184, 50, 0.1), rgba(224, 255, 92, 0.15))",
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
                        isDark
                          ? "bg-primary text-black"
                          : "bg-primary text-white"
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
                          isDark
                            ? "bg-primary/10 hover:bg-primary/20 text-primary"
                            : "bg-primary hover:bg-primary/100 text-white"
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
                            : "bg-primary hover:bg-primary/100 text-white"
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
                            : "bg-primary hover:bg-primary/100 text-white"
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
      </section>

      {children}

      {/* PreFooter Section */}
      <div className="relative z-10 w-full overflow-hidden pt-32 pb-8">
        <div className="max-w-[1250px] mx-auto px-4">
          <PreFooter noBgGradient />
        </div>
      </div>
    </>
  );
}
