import { Metadata, ResolvingMetadata } from 'next';
import { getExpertise } from '@/lib/wordpress';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PreFooter from '@/components/footer/PreFooter';
import ExpertiseContactForm from './ExpertiseContactForm';
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import ExpertiseFAQ from './ExpertiseFAQ';


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
  // Wait for the parent metadata
  const previousMetadata = await parent;

  // Validate params
  const category = await Promise.resolve(params?.category);
  const slug = await Promise.resolve(params?.slug);
  if (!category || !slug) return notFound();

  // Fetch data
  const expertise = await getExpertise(slug);
  if (!expertise) return notFound();

  // Validate that the expertise category matches the URL category
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
  
  // Validate params
  const category = await Promise.resolve(params?.category);
  const slug = await Promise.resolve(params?.slug);
  if (!category || !slug) return notFound();

  // Fetch data
  const expertise = await getExpertise(slug);
  if (!expertise) return notFound();

  // Validate that the expertise category matches the URL category
  const expertiseCategory = expertise.expertiseGrowthCategories?.nodes?.[0]?.slug;
  if (expertiseCategory !== category) return notFound();

  // Extract category data
  const categoryData = expertise.expertiseGrowthCategories?.nodes?.[0];
  const categoryName = categoryData?.name || expertise.title;
  const categoryDescription = categoryData?.description;

  // Extract expertise fields
  const {
    tag,
    h1,
    subtitle,
    h21,
    titrebox1,
    description1,
    titrebox2,
    description2,
    titrebox3,
    description3,
    h22,
    content2,
    processLittleTitle,
    processTitle,
    processDescription,
    processTitre1,
    descriptionTitre1,
    processTitre2,
    descriptionTitre2,
    processTitre3,
    descriptionTitre3,
    faqSubtitle,
    faqTitle1,
    faqDesc1,
    faqTitle2,
    faqDesc2,
    faqTitle3,
    faqDesc3,
    faqTitle4,
    faqDesc4,
    faqTitle5,
    faqDesc5,
    faqTitle6,
    faqDesc6
  } = expertise.expertiseFields || {};

  return (
    <section className="w-full max-w-[100vw] relative overflow-hidden bg-gray-50 dark:bg-black">
      {/* Base Background gradient */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-white to-[#E0FF5C] dark:from-black dark:to-[#E0FF5C]"
      />

      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 z-0 mix-blend-soft-light opacity-50 dark:opacity-30"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Hero Section */}
      <div className="relative min-h-[calc(60vh-var(--header-height))] flex items-center justify-center overflow-hidden pt-28 md:pt-32">
        <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8 items-center px-4 sm:px-6 lg:px-8 pb-24">
          {/* Left Column - Text */}
          <div className="max-w-full lg:max-w-2xl text-left">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-4 text-sm">
                <li>
                  <Link href="/expertise" className="text-gray-600 dark:text-gray-400 hover:text-[#E0FF5C] dark:hover:text-[#E0FF5C]">
                    Expertises
                  </Link>
                </li>
                <li className="text-gray-400 dark:text-gray-600">/</li>
                <li>
                  <Link href={`/expertise/${expertiseCategory}`} className="text-gray-600 dark:text-gray-400 hover:text-[#E0FF5C] dark:hover:text-[#E0FF5C]">
                    {categoryName}
                  </Link>
                </li>
                <li className="text-gray-400 dark:text-gray-600">/</li>
                <li className="text-[#E0FF5C]">{h1 || expertise.title}</li>
              </ol>
            </nav>

            {tag && (
              <div className="inline-block px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full mb-4">
                <span className="text-[#9FB832] dark:text-[#E0FF5C] text-sm font-medium">{tag}</span>
              </div>
            )}

            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-[64px] font-semibold mb-4 sm:mb-6 leading-[1.1] text-[#000000] dark:text-[#F5F5F1] tracking-[-0.04em] text-rendering-optimizeLegibility">
              {h1 || expertise.title}
            </h1>
            
            {subtitle && (
              <p className="text-base md:text-lg text-black/100 dark:text-white/100 mt-6 mb-8 md:mb-12 max-w-xl pr-4">
                {subtitle}
              </p>
            )}
           
              <div className="flex flex-row gap-3">
                <CTAButton href="/contact" variant="simple">
                  Nous Contacter
                </CTAButton>
              </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="relative">
            <div className="mx-auto lg:mx-0 lg:ml-auto">
              <ExpertiseContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1250px] mx-auto px-4 md:px-6 relative z-10">
        {/* Benefits Section */}
        {h21 && (
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-medium tracking-[-1px] text-center mb-16 text-black/90 dark:text-white/90 leading-[1.1]">
              {h21}
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: titrebox1,
                  description: description1
                },
                {
                  title: titrebox2,
                  description: description2
                },
                {
                  title: titrebox3,
                  description: description3
                }
              ].map((benefit, index) => (
                <article 
                  key={index} 
                  className="rounded-[32px] p-10 relative overflow-hidden h-full bg-[#E0FF5C] backdrop-blur-md shadow-service transform-gpu transition-all duration-500 ease-out hover:-translate-y-4 group"
                >
                  <i 
                    className={cn(
                      "absolute top-8 left-8 w-10 h-10 rounded-full flex items-center justify-center bg-black/10 text-2xl text-black transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                      "ri-checkbox-circle-line"
                    )}
                    aria-hidden="true"
                  />
                  <h3 className="text-2xl font-bold mb-6 mt-16 text-black">
                    {benefit.title}
                  </h3>
                  <p className="text-base leading-relaxed text-black/80">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Why Section */}
        {h22 && (
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-normal mb-8 text-gray-900 dark:text-white">
              {h22}
            </h2>
            <div className="p-6 rounded-2xl backdrop-blur-md  transition-all duration-300
              dark:bg-black/40 dark:border-white/10 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
              bg-white/40 border-black/5 shadow-[0_0_0_1px_rgba(0,0,0,0.03)] border-1  ">
              <p className="text-lg text-gray-600 dark:text-white">
                {content2}
              </p>
            </div>
          </div>
        )}

        {/* Process Section */}
        {processTitle && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <span className="text-base mb-4 block font-semibold text-[#E0FF5C]">
                {processLittleTitle}
              </span>
              <h2 className="text-3xl md:text-5xl font-normal mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {processTitle}
              </h2>
              <div className="w-12 h-0.5 mx-auto mb-4 bg-[#E0FF5C]"></div>
              <p className="text-base md:text-lg max-w-md mx-auto text-center transition-colors duration-300 text-white">
                {processDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: processTitre1,
                  description: descriptionTitre1
                },
                {
                  title: processTitre2,
                  description: descriptionTitre2
                },
                {
                  title: processTitre3,
                  description: descriptionTitre3
                }
              ].map((step, index) => (
                <article 
                  key={index} 
                  className="rounded-[32px] p-10 relative overflow-hidden h-full bg-[#E0FF5C] backdrop-blur-md shadow-service transform-gpu transition-all duration-500 ease-out hover:-translate-y-4 group"
                >
                  <i 
                    className="absolute top-8 left-8 w-10 h-10 rounded-full flex items-center justify-center bg-black/10 text-2xl text-black transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </i>
                  <h3 className="text-2xl font-bold mb-6 mt-16 text-black">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-black/80">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {faqTitle1 && (
          <ExpertiseFAQ 
            subtitle={faqSubtitle}
            items={[
              { id: 1, question: faqTitle1, answer: faqDesc1 },
              { id: 2, question: faqTitle2, answer: faqDesc2 },
              { id: 3, question: faqTitle3, answer: faqDesc3 },
              { id: 4, question: faqTitle4, answer: faqDesc4 },
              { id: 5, question: faqTitle5, answer: faqDesc5 },
              { id: 6, question: faqTitle6, answer: faqDesc6 }
            ].filter(item => item.question && item.answer)}
          />
        )}
      </div>

      {/* Back to Category */}
      <div className="text-center mt-16">
        <Link 
          href={`/expertise/${expertiseCategory}`}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#E0FF5C] dark:hover:text-[#E0FF5C]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Retour à la catégorie
        </Link>
      </div>

      {/* PreFooter */}
      <PreFooter noBgGradient />
    </section>
  );
} 