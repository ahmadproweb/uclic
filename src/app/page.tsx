import MarqueeText from "@/components/pages/home/MarqueeText/marquee";
import AndMoreService from "@/components/pages/home/andmoreservice/andmoreservice";
import Blog from "@/components/pages/home/blog/blog";
import CaseStudyWrapper from "@/components/pages/home/casestudy";
import FAQ from "@/components/pages/home/faq/faq";
import SEOContentSection from "@/components/pages/home/seo-content/seo-content";
import Hero from "@/components/pages/home/hero/hero";
import PartnersWrapper from "@/components/pages/home/partner/PartnersWrapper";
import PartnerHome from "@/components/pages/home/partner/PartnerHome";
import PartnerBtoB from "@/components/pages/home/partnerbtob/partnerbtob";
import ProcessSteps from "@/components/pages/home/process/process";
import Service from "@/components/pages/home/services/services";
import TeamSection from "@/components/pages/home/team/team-section";
import Testimonials from "@/components/pages/home/testimonials/testimonials";
import { Suspense } from "react";
import Script from "next/script";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      {/* JSON-LD: Organization */}
      <Script id="ld-org" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Uclic",
          url: "https://www.uclic.fr/",
          logo: "https://www.uclic.fr/logo.png",
          sameAs: [
            "https://www.linkedin.com/company/uclic-growth-marketing/"
          ],
          foundingDate: "2017",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Paris",
            addressCountry: "FR"
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "customer support",
              telephone: "+33617125428",
              email: "contact@uclic.fr",
              areaServed: "FR",
              availableLanguage: ["fr", "en"]
            }
          ],
          serviceOffered: [
            {
              "@type": "Service",
              name: "Agence Growth Marketing",
              description: "Stratégie et exécution growth orientées performance (acquisition, conversion, rétention)."
            },
            {
              "@type": "Service",
              name: "Automatisation IA & n8n",
              description: "Mise en place de workflows IA et automatisations pour scaler votre acquisition et vos ops."
            },
            {
              "@type": "Service",
              name: "SEO & Contenu assistés par IA",
              description: "Production de contenus et optimisation SEO pilotées par la data et l'IA."
            }
          ]
        })}
      </Script>
      {/* JSON-LD: WebSite */}
      <Script id="ld-website" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Uclic",
          url: "https://www.uclic.fr/",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.uclic.fr/recherche?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </Script>
      {/* Replace legacy wrapper with PartnerHome without heading text */}
      <PartnerHome />
      <Service />
      <MarqueeText />
      <AndMoreService>
        <Suspense
          fallback={
            <div className="w-full h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }
        >
          <TeamSection />
        </Suspense>
      </AndMoreService>
      <PartnerBtoB />
      <ProcessSteps />
      <CaseStudyWrapper />
      <Testimonials />
      <SEOContentSection />
      <FAQ />
      {/* JSON-LD: FAQPage (extraits) */}
      <Script id="ld-faq" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Pourquoi choisir Uclic plutôt qu'une agence traditionnelle ?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Uclic propose des résultats rapides avec des experts IA spécialisés et une approche orientée performance, sans engagement long terme."
              }
            },
            {
              "@type": "Question",
              name: "Comment l'Intelligence Artificielle booste-t-elle vos ventes ?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "L'IA analyse les données, prédit les tendances et optimise vos campagnes en temps réel pour multiplier vos résultats."
              }
            },
            {
              "@type": "Question",
              name: "Quel est votre processus de mise en place ?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Semaine 1 : audit et stratégie. Semaines 2-3 : mise en place outils et campagnes. Semaine 4+ : optimisation continue et reporting."
              }
            }
          ]
        })}
      </Script>
      <Blog />
    </main>
  );
}
