import { Metadata, ResolvingMetadata } from 'next';
import { getExpertise } from '@/lib/wordpress';
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
import HeroExpertise from './HeroExpertise';
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