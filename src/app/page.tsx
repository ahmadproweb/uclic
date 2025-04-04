import Hero from "@/components/pages/home/hero/hero";
import Partners from "@/components/pages/home/partner/partner";
import Service from "@/components/pages/home/services/services";
import MarqueeText from '@/components/pages/home/MarqueeText/marquee';
import AndMoreService from '@/components/pages/home/andmoreservice/andmoreservice';
import PartnerBtoB from '@/components/pages/home/partnerbtob/partnerbtob';
import ProcessSteps from "@/components/pages/home/process/process";
import CaseStudyWrapper from "@/components/pages/home/casestudy";
import Testimonials from "@/components/pages/home/testimonials/testimonials";
import FAQ from "@/components/pages/home/faq/faq";
import Blog from '@/components/pages/home/blog/blog';
import TeamSection from '@/components/pages/home/team/team-section';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Partners />
      <Service />
      <MarqueeText />
      <AndMoreService>
        <Suspense fallback={<div className="w-full h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>}>
          <TeamSection />
        </Suspense>
      </AndMoreService>
      <PartnerBtoB />
      <ProcessSteps />
      <CaseStudyWrapper />
      <Testimonials />
      <FAQ />
      <Blog />
    </main>
  );
}

export const metadata = {
  title: "Freelance Growth Marketing / Hacking : Sales, Ops, Produit | Uclic",
  description: "Uclic conçoit et optimise vos opérations commerciales pour maximiser chaque interaction. Avec des workflows CRM avancés et des processus de vente automatisés.",
  alternates: {
    canonical: 'https://uclic.fr'
  },
  openGraph: {
    title: "Freelance Growth Marketing / Hacking : Sales, Ops, Produit | Uclic",
    description: "Uclic conçoit et optimise vos opérations commerciales pour maximiser chaque interaction. Avec des workflows CRM avancés et des processus de vente automatisés.",
    url: 'https://uclic.fr',
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Growth Marketing / Hacking : Sales, Ops, Produit | Uclic",
    description: "Uclic conçoit et optimise vos opérations commerciales pour maximiser chaque interaction. Avec des workflows CRM avancés et des processus de vente automatisés.",
    site: "@uclic_fr"
  }
}; 