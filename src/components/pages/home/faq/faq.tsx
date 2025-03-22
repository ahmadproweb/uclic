'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const faqItems = [
  {
    id: 1,
    question: "Comment fonctionne Uclic ?",
    answer: "Uclic est une agence Growth 360° qui accompagne les entreprises dans leur stratégie de croissance digitale. Notre approche se base sur une méthodologie en 4 étapes : audit initial, définition de la stratégie, mise en place des actions, et optimisation continue des performances."
  },
  {
    id: 2,
    question: "Pourquoi faire confiance à des experts Uclic ?",
    answer: "Nos experts sont certifiés dans leurs domaines respectifs et cumulent plusieurs années d'expérience en growth marketing. Nous avons accompagné avec succès de nombreuses entreprises, de la startup à la grande entreprise, dans l'atteinte de leurs objectifs de croissance."
  },
  {
    id: 3,
    question: "Pourquoi faire appel à une agence Growth 360° ?",
    answer: `Externaliser sa stratégie growth avec Uclic permet de couvrir l'ensemble des leviers d'acquisitions tout en ayant un référent au sein de la même agence.

    Chez Uclic, quand on vous met à disposition une équipe, nous nous assurons de travailler les leviers d'acquisitions et de faire en sorte que l'ensemble de l'équipe projet travaille vers un objectif de croissance pour votre entreprise.
    
    Le cas échéant, nous vous mettons à disposition un chef de projet expert dans son domaine qui sera votre point de contact et qui s'assurera que la roadmap et les performances sont en adéquation avec vos objectifs.`
  },
  {
    id: 4,
    question: "Quels sont les services proposés par Uclic ?",
    answer: "Uclic propose une gamme complète de services en growth marketing : SEO, SEA, Social Media, Content Marketing, Email Marketing, CRO, Analytics et Data Science. Nous adaptons notre offre en fonction de vos besoins et objectifs spécifiques."
  },
  {
    id: 5,
    question: "Comment se déroule une collaboration avec Uclic ?",
    answer: "La collaboration débute par une phase de découverte où nous analysons vos besoins et objectifs. Ensuite, nous établissons ensemble un plan d'action personnalisé. Un chef de projet dédié vous accompagne tout au long de la mission et des points réguliers sont organisés pour suivre l'avancement et les résultats."
  },
  {
    id: 6,
    question: "Quelle est la durée minimale d'engagement ?",
    answer: "Nous privilégions les engagements sur 6 mois minimum pour permettre la mise en place d'une stratégie efficace et mesurer des résultats concrets. Cependant, nous adaptons nos conditions en fonction de la nature du projet et des objectifs."
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const questionsRef = useRef<HTMLDivElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const blobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animation du titre
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animation des questions
      const questions = questionsRef.current?.children;
      if (questions) {
        gsap.from(Array.from(questions), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: questionsRef.current,
            start: "top bottom-=50",
            end: "top center+=100",
            toggleActions: "play none none reverse",
          }
        });
      }

      // Animation du dégradé
      if (gradientRef.current) {
        gsap.to(gradientRef.current, {
          x: "+=30",
          y: "+=20",
          rotation: "-=15",
          duration: 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }

      // Animation du blob
      if (blobRef.current) {
        gsap.to(blobRef.current, {
          x: "-=40",
          y: "+=30",
          rotation: "-=25",
          duration: 15,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "w-full pt-16 md:pt-24 pb-16 md:pb-24 relative overflow-hidden",
        "transition-colors duration-300",
        isDark ? "bg-black/95" : "bg-white"
      )}
    >
      <div className="max-w-[1250px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          {/* Background Spiral */}
          <div 
            className="absolute left-[50px] -top-[100px] w-[408px] h-[628px] transition-all duration-300"
            style={{
              WebkitMaskImage: 'url("/spiral.svg")',
              maskImage: 'url("/spiral.svg")',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              backgroundColor: isDark ? theme.colors.primary.main : 'black',
              transform: 'scale(0.9)'
            }}
          />

          {/* Colonne de gauche */}
          <div ref={titleRef} className="col-span-1 lg:col-span-5 lg:sticky lg:top-8 lg:self-start relative z-10">
            <div className="space-y-6">
              <h2 className={cn(
                "text-5xl md:text-6xl lg:text-7xl font-normal",
                "transition-colors duration-300",
                isDark ? "text-white" : "text-black"
              )}>FAQ</h2>
              <p className={cn(
                "text-base md:text-lg max-w-md",
                "transition-colors duration-300",
                isDark ? "text-white/60" : "text-black/60"
              )}>
                Nous répondons à vos <br/>questions sur le Growth <br/> et comment bien choisir <br/>votre partenaire <br/>de croissance
              </p>
              <Link 
                href="/contact"
                className={cn(
                  "inline-flex items-center px-6 py-3 text-base rounded-full",
                  "transition-all duration-300 transform hover:scale-105",
                  isDark 
                    ? "bg-[#DAFF47] text-black hover:bg-[#DAFF47]/90" 
                    : "bg-black text-white hover:bg-[#DAFF47] hover:text-black"
                )}
              >
                Discutons de votre projet
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M4 12h16m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Colonne de droite - Questions */}
          <div ref={questionsRef} className="col-span-1 lg:col-span-7 relative z-10">
            {/* Radial gradient background */}
            <div 
              ref={gradientRef}
              className="absolute -inset-10 z-0 pointer-events-none opacity-60"
              style={{
                background: `radial-gradient(circle at center, ${theme.colors.primary.main}50 0%, transparent 70%)`,
                filter: 'blur(40px)'
              }}
            />
            
            <div className="space-y-4 relative">
              {faqItems.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "faq-item rounded-2xl overflow-hidden relative",
                    "transition-all duration-300 backdrop-blur-2xl"
                  )}
                  style={{
                    background: isDark 
                      ? 'rgba(0, 0, 0, 0.3)' 
                      : 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    boxShadow: isDark 
                      ? `0 8px 32px -4px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)` 
                      : `0 8px 32px -4px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)`,
                    borderTop: isDark 
                      ? '1px solid rgba(255, 255, 255, 0.1)' 
                      : '1px solid rgba(255, 255, 255, 0.7)',
                    borderLeft: isDark 
                      ? '1px solid rgba(255, 255, 255, 0.05)' 
                      : '1px solid rgba(255, 255, 255, 0.5)'
                  }}
                >
                  <button
                    className={cn(
                      "w-full py-4 md:py-5 px-5 md:px-6",
                      "flex items-center justify-between",
                      "transition-colors duration-300",
                      isDark ? "text-white" : "text-black"
                    )}
                    onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                  >
                    <span className="text-lg md:text-xl font-medium pr-4">{item.question}</span>
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                      "transition-all duration-300 transform",
                      openItem === item.id ? "rotate-45" : "rotate-0",
                      isDark 
                        ? "bg-[#DAFF47] text-black" 
                        : "bg-black text-white group-hover:bg-[#DAFF47] group-hover:text-black"
                    )}>
                      +
                    </div>
                  </button>
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      openItem === item.id ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <div className={cn(
                      "p-5 md:p-6 pt-0",
                      "whitespace-pre-line text-base",
                      "transition-colors duration-300",
                      isDark ? "text-white/60" : "text-black/60"
                    )}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Élément décoratif supplémentaire */}
            <div 
              ref={blobRef}
              className="absolute bottom-20 right-[5%] w-48 h-48 rounded-full opacity-20 blur-3xl transition-colors duration-300" 
              style={{
                background: "rgb(217, 255, 75)",
                zIndex: 1,
                translate: "none", 
                rotate: "none", 
                scale: "none",
                transform: "translate3d(-18.975px, 28.4626px, 0px) rotate(-170.775deg)"
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
} 