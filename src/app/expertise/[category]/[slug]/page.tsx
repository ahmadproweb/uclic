import { Metadata, ResolvingMetadata } from 'next';
import { getExpertise } from '@/lib/wordpress';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Partners from "@/components/pages/home/partner/partner";
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
import ExpertiseContactForm from './ExpertiseContactForm';
import HeroBackgroundExpertise from './HeroBackgroundExpertise';
import ExpertiseBenefits from './ExpertiseBenefits';

interface ExpertisePageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata(
  { params }: ExpertisePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousMetadata = await parent;
  const category = await Promise.resolve(params?.category);
  const slug = await Promise.resolve(params?.slug);
  if (!category || !slug) return notFound();

  const expertise = await getExpertise(slug);
  if (!expertise) return notFound();

  const expertiseCategory = expertise.expertiseGrowthCategories?.nodes?.[0]?.slug;
  if (expertiseCategory !== category) return notFound();

  return {
    ...previousMetadata,
    title: expertise.expertiseFields?.metaTitle || expertise.title,
    description: expertise.expertiseFields?.metaDescription || expertise.expertiseFields?.subtitle || 'Découvrez nos expertises en création de site web, branding, et développement digital.',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Composant HeroExpertise qui utilise les données de l'expertise
const HeroExpertise = ({ expertise }: { expertise: any }) => {
  return (
    <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center pt-28 sm:pt-32 md:pt-36 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
            {expertise.expertiseFields?.tag && (
              <h1 className="inline-flex px-3 sm:px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full text-[#9FB832] dark:text-[#E0FF5C] text-sm sm:text-base font-medium relative z-10 mb-4 sm:mb-6 md:mb-8">
                {expertise.expertiseFields.tag}
              </h1>
            )}
            <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-[64px] font-semibold mb-4 sm:mb-6 leading-[1.1] tracking-[-0.04em] text-rendering-optimizeLegibility will-change-transform text-[#000] dark:text-[#F5F5F1] whitespace-pre-line">
              {expertise.expertiseFields?.h1 || expertise.title}
            </h2>
            {expertise.expertiseFields?.subtitle && (
              <p className="text-base md:text-lg mt-6 mb-8 md:mb-2 max-w-xl pr-4 leading-relaxed tracking-[-0.01em] font-absans font-normal text-rendering-optimizeLegibility subpixel-antialiased text-[#000] dark:text-[#F5F5F1]">
                {expertise.expertiseFields.subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex items-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-medium rounded-full transition-all duration-200 bg-[#E0FF5C] text-black hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-[#E0FF5C]/90"
                >
                  Nous Contacter
                </Link>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center w-full h-full">
            <ExpertiseContactForm />
          </div>
        </div>
      </div>
      
      <HeroBackgroundExpertise />
    </section>
  );
};

export default async function ExpertisePage({ params }: ExpertisePageProps) {
  const category = await Promise.resolve(params?.category);
  const slug = await Promise.resolve(params?.slug);
  if (!category || !slug) return notFound();

  const expertise = await getExpertise(slug);
  if (!expertise) return notFound();

  const expertiseCategory = expertise.expertiseGrowthCategories?.nodes?.[0]?.slug;
  if (expertiseCategory !== category) return notFound();

  return (
    <main className="flex flex-col">
      <HeroExpertise expertise={expertise} />
      <Partners />
      <ExpertiseBenefits {...expertise.expertiseFields} />
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