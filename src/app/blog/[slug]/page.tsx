import { notFound } from 'next/navigation';
import { 
  getLatestPosts, 
  getPostCategory, 
  estimateReadingTime, 
  decodeHtmlEntitiesServer,
  WordPressPost,
  getRelatedPosts
} from '@/services/wordpress';
import BlogPostClientSide from '@/components/pages/blog/BlogPostClientSide';

// Define params type for this page
type BlogPostParams = {
  params: {
    slug: string;
  };
};

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getLatestPosts(10);
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Function to fetch a single post by slug
async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `https://uclic.fr/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    
    const posts = await response.json();
    
    if (posts.length === 0) {
      return null;
    }
    
    return posts[0];
  } catch (error) {
    console.error('Error fetching WordPress post:', error);
    return null;
  }
}

// Server Component for Blog Post Page
export default async function BlogPostPage({ params }: BlogPostParams) {
  const post = await getPostBySlug(params.slug);
  
  // Précharger les articles associés et récents pour le SEO
  let relatedPosts: WordPressPost[] = [];
  let latestPosts: WordPressPost[] = [];
  
  try {
    // Récupérer les articles associés (même catégorie)
    if (post) {
      relatedPosts = await getRelatedPosts(post, 3);
    }
    
    // Récupérer les articles récents
    latestPosts = await getLatestPosts(6);
    // Exclure l'article courant des articles récents
    if (post) {
      latestPosts = latestPosts.filter(latest => latest.id !== post.id).slice(0, 6);
    }
  } catch (error) {
    console.error('Error fetching related content:', error);
  }

  if (!post) {
    notFound();
  }
  
  // Transform post data
  const postData = {
    id: post.id,
    title: decodeHtmlEntitiesServer(post.title.rendered),
    content: post.content.rendered,
    excerpt: decodeHtmlEntitiesServer(post.excerpt.rendered.replace(/<[^>]*>/g, '')),
    date: post.date,
    reading_time: estimateReadingTime(post.content.rendered),
    category: getPostCategory(post),
    author: post._embedded?.author?.[0]?.name || 'Uclic',
    featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    slug: post.slug
  };
  
  return (
    <>
      
      {/* Version SEO crawlable des articles associés - cachée visuellement mais disponible pour les crawlers */}
      <div className="sr-only">
        {relatedPosts.length > 0 && (
          <div>
            <h2>Articles dans la même catégorie</h2>
            <ul>
              {relatedPosts.map(rPost => (
                <li key={rPost.id}>
                  <a href={`/blog/${rPost.slug}`}>{decodeHtmlEntitiesServer(rPost.title.rendered)}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {latestPosts.length > 0 && (
          <div>
            <h2>Articles récents</h2>
            <ul>
              {latestPosts.map(lPost => (
                <li key={lPost.id}>
                  <a href={`/blog/${lPost.slug}`}>{decodeHtmlEntitiesServer(lPost.title.rendered)}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Version SEO du PreFooter */}
        <div>
          <h2>Prêt à transformer votre marketing ?</h2>
          <p>Contactez-nous pour découvrir comment nous pouvons booster vos résultats dès aujourd&apos;hui.</p>
          <a href="/contact">Prendre contact</a>
          <a href="/case-studies">Nos études de cas</a>
        </div>
      </div>
      
      <BlogPostClientSide 
        post={postData} 
        preloadedRelatedPosts={relatedPosts}
        preloadedLatestPosts={latestPosts}
      />
    </>
  );
} 