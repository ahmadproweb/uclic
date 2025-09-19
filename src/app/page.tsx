import MarqueeText from "@/components/pages/home/MarqueeText/marquee";
import AndMoreService from "@/components/pages/home/andmoreservice/andmoreservice";
import Blog from "@/components/pages/home/blog/blog";
import CaseStudyWrapper from "@/components/pages/home/casestudy";
import CollectifSection from "@/components/pages/home/collectif/collectif";
import FAQ from "@/components/pages/home/faq/faq";
import SEOContentSection from "@/components/pages/home/seo-content/seo-content";
import Hero from "@/components/pages/home/hero/hero";
import Partners from "@/components/pages/home/partner/partner";
import PartnerBtoB from "@/components/pages/home/partnerbtob/partnerbtob";
import ProcessSteps from "@/components/pages/home/process/process";
import Service from "@/components/pages/home/services/services";
import TeamSection from "@/components/pages/home/team/team-section";
import Testimonials from "@/components/pages/home/testimonials/testimonials";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Partners />
      <Service />
      <CollectifSection />
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
      <Blog />
    </main>
  );
}
