import { Metadata, ResolvingMetadata } from 'next';
import { getExpertisePostsByCategory, getExpertiseCategory } from '@/lib/wordpress';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PreFooter from '@/components/footer/PreFooter';
import Partners from "@/components/pages/home/partner/partner";
import ExpertiseMarquee from './ExpertiseMarquee';
import AndMoreService from '@/components/pages/home/andmoreservice/andmoreservice';
import { Suspense } from 'react';
import TeamSection from '@/components/pages/home/team/team-section';
import PartnerBtoB from '@/components/pages/home/partnerbtob/partnerbtob';
import CaseStudyWrapper from '@/components/pages/home/casestudy';
import Testimonials from '@/components/pages/home/testimonials/testimonials';
import FAQ from '@/components/pages/home/faq/faq';
import HeroExpertise from './HeroExpertise';
import Blog from '@/components/pages/home/blog/blog';
import { cn } from "@/lib/utils";
import ExpertiseBenefits from './ExpertiseBenefits';
import ProcessExpertise from './ProcessExpertise';
import FAQExpertise from './FAQExpertise';
import ExpertiseContactForm from './ExpertiseContactForm';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  { params }: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = await Promise.resolve(params?.category);
  if (!category) return notFound();

  const categoryData = await getExpertiseCategory(category);
  if (!categoryData) return notFound();

  return {
    title: categoryData.expertiseFields.metaTitle || `${categoryData.name} | Agence Growth - Uclic`,
    description: categoryData.expertiseFields.metaDescription || `Découvrez nos expertises en ${categoryData.name}. Services de création de site web, branding, et développement digital.`
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await Promise.resolve(params?.category);
  console.log('🔍 Category slug:', category);
  
  if (!category) {
    console.error('❌ No category slug provided');
    return notFound();
  }

  try {
    const [categoryData, posts] = await Promise.all([
      getExpertiseCategory(category),
      getExpertisePostsByCategory(category)
    ]);

    console.log('📦 Category data:', categoryData);
    console.log('📦 Posts:', posts);

    if (!categoryData) {
      console.error('❌ No category data found');
      return notFound();
    }

    if (!posts || posts.length === 0) {
      console.error('❌ No posts found for category');
      return notFound();
    }

    // Transformer les posts en format pour le marquee
    const marqueeItems = posts.map(post => ({
      text: post.title,
      href: `/expertise/${category}/${post.slug}`,
      description: post.expertiseFields?.subtitle || post.title
    }));

    return (
      <main className="flex flex-col">
        <HeroExpertise 
          categoryName={categoryData.name} 
          category={category}
          expertiseFields={categoryData.expertiseFields}
        />
        <Partners />
        <ExpertiseBenefits {...categoryData.expertiseFields} />
        <ExpertiseMarquee words={marqueeItems} />
        
        <AndMoreService>
          <Suspense fallback={<div className="w-full h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>}>
            <TeamSection />
          </Suspense>
        </AndMoreService>

        <section 
          className={cn(
            "w-full relative py-8 md:py-16",
            "bg-[#f4f4f0] dark:bg-black/95"
          )}
        >
          <div className="max-w-[1250px] mx-auto px-4">
            <div className="text-center">
              <h2 className={cn(
                "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                "font-medium tracking-[-1px]",
                "text-black/90 dark:text-white/90",
                "leading-[1.1]",
                "mb-8 md:mb-16"
              )}>
                {categoryData.expertiseFields.h22}
              </h2>
              
              <div className="max-w-[800px] mx-auto">
                <p className={cn(
                  "text-base md:text-lg",
                  "leading-relaxed",
                  "text-black/70 dark:text-white/70",
                  "whitespace-pre-line"
                )}>
                  {categoryData.expertiseFields.content2}
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProcessExpertise expertiseFields={categoryData.expertiseFields} />
        <CaseStudyWrapper />
        <Testimonials />
        <FAQExpertise expertiseFields={categoryData.expertiseFields} />
        <Blog />
      </main>
    );
  } catch (error) {
    console.error('🚨 Error in CategoryPage:', error);
    return notFound();
  }
} 