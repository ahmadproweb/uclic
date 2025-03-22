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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Partners />
      <Service />
      <MarqueeText />
      <AndMoreService />
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
  title: "Uclic - Une vision 360°, des actions là où l'impact est maximal",
  description: "Nous convertissons vos défis en leviers de croissance avec des stratégies data-driven, l'IA et les meilleurs freelances.",
  openGraph: {
    title: "Uclic - Une vision 360°, des actions là où l'impact est maximal",
    description: "Nous convertissons vos défis en leviers de croissance avec des stratégies data-driven, l'IA et les meilleurs freelances.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uclic - Une vision 360°, des actions là où l'impact est maximal",
    description: "Nous convertissons vos défis en leviers de croissance avec des stratégies data-driven, l'IA et les meilleurs freelances.",
  }
}; 