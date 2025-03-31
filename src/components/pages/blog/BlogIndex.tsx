// Composant de base qui fonctionne sans JS
export default function BlogIndex({ posts: blogPosts }: { posts: BlogPost[] }) {
  // Récupérer le premier article pour l'affichage à la une
  const featuredPost = blogPosts && blogPosts.length > 0 ? blogPosts[0] : null;
  const remainingPosts = blogPosts.slice(1);
  
  return (
    <section className="w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Base Background gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(180deg, #FFFFFF, #E0FF5C)`
        }}
      />

      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 z-0 mix-blend-soft-light opacity-50"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
      />

      {/* New overlay gradient - black to transparent */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          background: 'linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)',
          height: '25%'
        }}
      />
      
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-base mb-4 block font-semibold text-black">Blog</span>
          <h1 className="text-3xl md:text-5xl font-normal mb-4 text-black">
            Découvrez nos dernières<br/>actualités
          </h1>
          <div className="w-12 h-0.5 mx-auto mb-4 bg-black"/>
          <p className="text-base md:text-lg text-black">
            Devenez un vrai couteau suisse avec les conseils<br/>des experts Uclic
          </p>
        </div>
        
        {/* Hero section with featured image */}
        {featuredPost && (
          <div className="relative w-full h-[40vh] md:h-[50vh] mb-16 rounded-3xl overflow-hidden shadow-xl">
            <img
              src={featuredPost.featured_image_url}
              alt={featuredPost.title}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <div className="max-w-5xl mx-auto w-full">
                <div className="mb-4">
                  <span className="absolute bottom-[calc(100%+2rem)] left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-10">
                    {featuredPost.category}
                  </span>
                  <span className="text-sm uppercase tracking-wider font-semibold inline-block px-3 py-1 rounded-full bg-black text-[#E0FF5C]">
                    À la une
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  {featuredPost.title}
                </h2>
                <div className="text-white/80 flex flex-wrap items-center text-sm space-x-4 mt-4">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.reading_time} min de lecture</span>
                  <span>•</span>
                  <span>{new Date(featuredPost.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <a 
                  href={`/blog/${featuredPost.slug}`}
                  className="px-6 py-2 rounded-full text-sm font-medium mt-8 inline-block
                    bg-[#E0FF5C] text-black hover:bg-[#E0FF5C]/90"
                >
                  Lire l&apos;article
                </a>
              </div>
            </div>
          </div>
        )}
      
        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {remainingPosts.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
              style={{
                background: `linear-gradient(145deg, #E0FF5C, #E0FF5C)`,
                boxShadow: `0 8px 32px -4px rgba(224, 255, 92, 0.25)`
              }}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={`${post.featured_image_url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}.webp`}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  width={400}
                  height={250}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
                  {post.category || 'Blog'}
                </span>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-black">
                  {post.title}
                </h3>
                
                <div 
                  className="text-black/80 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />

                <div className="flex items-center gap-2 text-sm text-black/70">
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {post.author} • {post.reading_time} min de lecture
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <PreFooter noBgGradient />
        </div>
      </div>
    </section>
  );
} 