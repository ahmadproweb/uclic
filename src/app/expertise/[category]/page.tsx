import { Metadata, ResolvingMetadata } from 'next';
import { getExpertisePostsByCategory } from '@/lib/wordpress';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PreFooter from '@/components/footer/PreFooter';
import Partners from "@/components/pages/home/partner/partner";
import ExpertiseMarquee from './[slug]/ExpertiseMarquee';
import AndMoreService from '@/components/pages/home/andmoreservice/andmoreservice';
import { Suspense } from 'react';
import TeamSection from '@/components/pages/home/team/team-section';
import PartnerBtoB from '@/components/pages/home/partnerbtob/partnerbtob';
import CaseStudyWrapper from '@/components/pages/home/casestudy';
import Testimonials from '@/components/pages/home/testimonials/testimonials';
import FAQ from '@/components/pages/home/faq/faq';
import HeroExpertise from './HeroExpertise';
import Blog from '@/components/pages/home/blog/blog';
interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  { params }: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Wait for the parent metadata
  const previousMetadata = await parent;

  // Validate category param and fetch data
  const category = await Promise.resolve(params?.category);
  if (!category) return notFound();

  // Fetch data
  const posts = await getExpertisePostsByCategory(category);
  if (!posts.length) return notFound();

  // Safer access to category data
  const categoryName = posts[0]?.categories?.nodes?.[0]?.name || 'Expertise';

  return {
    ...previousMetadata,
    title: `${categoryName} | Agence Growth - Uclic`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Validate category param and fetch data
  const category = await Promise.resolve(params?.category);
  if (!category) return notFound();

  // Fetch data
  const posts = await getExpertisePostsByCategory(category);
  
  // Debug log
  console.log('Posts data:', JSON.stringify({
    category,
    postsCount: posts.length,
    firstPost: posts[0],
  }, null, 2));

  if (!posts.length) return notFound();

  // Safer access to category data with fallbacks
  const categoryData = posts[0]?.categories?.nodes?.[0];
  const categoryName = categoryData?.name || posts[0]?.title || 'Expertise';

  return (
    <main className="relative w-full">
      {/* Hero Section */}
      <HeroExpertise categoryName={categoryName} category={category} />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Partners */}
        <section className="w-full flex flex-col gap-0 pt-8 md:pt-12 bg-[#F3F4F6] dark:bg-black/100 overflow-hidden">
            <Partners />
        </section>

        {/* Expertise Posts */}
        <section className="w-full py-0 pb-16 md:py-20 md:pb-16 relative overflow-hidden bg-[#f4f4f0] dark:bg-black/95">
            {/* Gradient Effects */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div 
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1200px] h-[600px] animate-pulse-slow" 
                style={{
                  background: 'radial-gradient(at 50% 100%, rgba(224, 255, 92, 0.5) 0%, rgba(224, 255, 92, 0.25) 30%, rgba(224, 255, 92, 0.125) 50%, transparent 70%)',
                  filter: 'blur(60px)',
                  transformOrigin: 'center bottom',
                  willChange: 'transform, opacity'
                }}
              />
              <div 
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1000px] h-[500px] animate-pulse-slower" 
                style={{
                  background: 'radial-gradient(at 50% 100%, rgba(224, 255, 92, 0.376) 0%, rgba(224, 255, 92, 0.19) 40%, transparent 70%)',
                  filter: 'blur(50px)',
                  willChange: 'transform'
                }}
              />
              <div 
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-[400px] animate-pulse-slowest" 
                style={{
                  background: 'radial-gradient(at 50% 100%, rgba(224, 255, 92, 0.565) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                  willChange: 'transform'
                }}
              />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/expertise/${category}/${post.slug}`}
                  className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm
                    bg-white dark:bg-neutral-950/40 hover:bg-gray-50 dark:hover:bg-neutral-950/60"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    {/* Pattern container */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E0FF5C] to-[#c7e052] dark:from-[#E0FF5C] dark:to-[#c7e052]">
                      {/* Animated geometric shapes */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-white dark:bg-black transform rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                        <div className="absolute top-[40%] right-[-10%] w-[60%] h-[60%] rounded-full bg-white dark:bg-black transform -rotate-45 group-hover:rotate-0 transition-transform duration-700" />
                        <div className="absolute bottom-[-20%] left-[30%] w-[70%] h-[70%] rounded-full bg-white dark:bg-black transform rotate-12 group-hover:-rotate-12 transition-transform duration-700" />
                      </div>
                      {/* Dots pattern */}
                      <div className="absolute inset-0" style={{ 
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: '16px 16px'
                      }} />
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent dark:from-black/90 dark:via-black/50" />

                    {/* Tag badge */}
                    {post.expertiseFields?.tag && (
                      <span className="absolute bottom-4 left-4 inline-flex items-center px-3 py-1 bg-gray-900 dark:bg-black text-[#E0FF5C] rounded-full text-sm z-20">
                        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {post.expertiseFields.tag}
                      </span>
                    )}

                    {/* Category icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#E0FF5C] dark:group-hover:text-[#E0FF5C] transition-colors">
                      {post.expertiseFields?.h1 || post.title}
                    </h3>
                    
                    {post.expertiseFields?.subtitle && (
                      <div className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.expertiseFields.subtitle}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-neutral-950/60 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      En savoir plus
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Expertise Marquee */}
        <section className="w-full bg-white dark:bg-black overflow-hidden py-8 will-change-transform">
          <ExpertiseMarquee words={posts.map(post => ({
            text: post.title,
            href: `/expertise/${category}/${post.slug}`,
            description: post.expertiseFields?.subtitle || post.title
          }))} />
        </section>

        {/* Team Section */}

            <AndMoreService>
              <Suspense fallback={<div className="w-full h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>}>
                <TeamSection />
              </Suspense>
            </AndMoreService>


        {/* PartnerBtoB */}

            <PartnerBtoB />


        {/* Case Studies */}

            <CaseStudyWrapper />


        {/* Testimonials */}

            <Testimonials />


        {/* FAQ */}

            <FAQ />
        {/* Blog */}
            <Blog />

        


      </div>
    </main>
  );
} 