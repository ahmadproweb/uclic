import { Metadata, ResolvingMetadata } from 'next';
import { getExpertisePostsByCategory } from '@/lib/wordpress';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PreFooter from '@/components/footer/PreFooter';

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
  const categoryDescription = posts[0]?.categories?.nodes?.[0]?.description;

  return {
    ...previousMetadata,
    title: `${categoryName} | Agence Growth - Uclic`,
    description: categoryDescription || 'Découvrez nos expertises en création de site web, branding, et développement digital.',
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
  const categoryDescription = categoryData?.description || '';

  return (
    <section className="w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden bg-gray-50 dark:bg-black">
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

      {/* New overlay gradient - adaptive to dark/light mode */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1] h-[25%] bg-gradient-to-t from-gray-50 via-gray-50 to-transparent dark:from-black dark:via-black dark:to-transparent"
      />
      
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Header with Breadcrumb */}
        <div className="text-center mb-12 md:mb-16">
          <nav className="mb-8">
            <ol className="flex justify-center items-center space-x-4 text-sm">
              <li>
                <Link href="/expertise" className="text-gray-600 dark:text-gray-400 hover:text-[#E0FF5C] dark:hover:text-[#E0FF5C]">
                  Expertises
                </Link>
              </li>
              <li className="text-gray-400 dark:text-gray-600">/</li>
              <li className="text-[#E0FF5C]">{categoryName}</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-5xl font-normal mb-4 text-gray-900 dark:text-white">
            {categoryName}
          </h1>
          <div className="w-12 h-0.5 mx-auto mb-4 bg-gray-900 dark:bg-[#E0FF5C]"/>
        </div>
      
        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/expertise/${category}/${post.slug}`}
              className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm
                bg-white dark:bg-black/40 hover:bg-gray-50 dark:hover:bg-black/60"
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
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-black/60 flex items-center justify-center">
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

        {/* Back to Expertises */}
        <div className="text-center mb-16">
          <Link 
            href="/expertise"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#E0FF5C] dark:hover:text-[#E0FF5C]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour aux expertises
          </Link>
        </div>

        {/* Category Description for SEO */}
        {categoryDescription && (
          <div className="max-w-[1250px] mx-auto px-4 md:px-6 relative z-10 rounded-2xl mb-16">
            <div 
              className="p-8 rounded-2xl backdrop-blur-md border transition-all duration-300
                dark:bg-black/40 dark:border-white/10 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
                bg-white/40 border-black/5 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
            >
              <div 
                className="prose prose-lg max-w-none
                  dark:prose-invert
                  prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:text-black dark:prose-h1:text-white
                  prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:text-black dark:prose-h2:text-white
                  prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-4 prose-h3:text-black dark:prose-h3:text-white
                  prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-p:text-black dark:prose-p:text-white
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-lg prose-li:mb-2 prose-li:text-black dark:prose-li:text-white
                  prose-strong:font-bold prose-strong:text-black dark:prose-strong:text-white
                  prose-em:italic
                  prose-blockquote:border-l-4 prose-blockquote:border-[#E0FF5C] prose-blockquote:pl-4 prose-blockquote:italic
                  prose-a:text-[#E0FF5C] prose-a:no-underline hover:prose-a:underline
                  prose-code:text-sm prose-code:bg-black/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-black/5 prose-pre:p-4 prose-pre:rounded-lg
                  [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: categoryDescription }}
              />
            </div>
          </div>
        )}

        {/* PreFooter */}
        <PreFooter noBgGradient />
      </div>
    </section>
  );
} 