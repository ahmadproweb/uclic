// WordPress API service for headless CMS integration
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  slug: string;
  category: string;
  reading_time: string;
  featured_image_url: string;
}

export interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    author?: Array<{
      name: string;
    }>;
    'wp:term'?: Array<Array<{
      taxonomy: string;
      name: string;
      id: number;
    }>>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        sizes?: {
          medium?: {
            source_url: string;
          };
          thumbnail?: {
            source_url: string;
          };
        };
      };
    }>;
  };
  slug: string;
  link: string;
}

export interface WordPressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
}

export interface Portfolio {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

// Function to decode HTML entities - client-side only
export function decodeHtmlEntities(text: string): string {
  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }
  return decodeHtmlEntitiesServer(text);
}

// Server-side safe HTML entity decoder
export function decodeHtmlEntitiesServer(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&hellip;/g, '...')
    .replace(/&#8211;/g, '-')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&nbsp;/g, ' ');
}

// Function to fetch posts from WordPress REST API
export async function getLatestPosts(count: number = 10, page: number = 1): Promise<WordPressPost[]> {
  try {
    const perPage = 100; // Maximum allowed by WordPress API
    const totalPages = Math.ceil(count / perPage);
    let allPosts: WordPressPost[] = [];
    
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const response = await fetch(
        `https://api.uclic.fr/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${currentPage}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
      );
      
      if (!response.ok) {
        // If we hit the end of posts, break the loop
        if (response.status === 400 || response.status === 404) {
          break;
        }
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      
      const posts: WordPressPost[] = await response.json();
      allPosts = [...allPosts, ...posts];
      
      // If we didn't get a full page, we've reached the end
      if (posts.length < perPage) break;
      
      // If we have enough posts, stop fetching
      if (allPosts.length >= count) break;
    }
    
    return allPosts.slice(0, count);
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
}

// Function to extract category from post
export function getPostCategory(post: WordPressPost): string {
  if (post._embedded && post._embedded['wp:term']) {
    const categories = post._embedded['wp:term'].find(terms => 
      terms.length > 0 && terms[0].taxonomy === 'category'
    );
    
    if (categories && categories.length > 0) {
      return decodeHtmlEntitiesServer(categories[0].name);
    }
  }
  
  return 'Catégorie';
}

// Function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Function to estimate reading time
export function estimateReadingTime(content: string): string {
  // Strip HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  // Average reading speed: 200 words per minute
  const words = plainText.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  
  return minutes.toString();
}

// Function to get the featured image from a post
export function getFeaturedImage(post: WordPressPost): { url: string; alt: string } {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    const media = post._embedded['wp:featuredmedia'][0];
    
    // Try to get medium size first, then full size
    const imageUrl = 
      media.media_details?.sizes?.medium?.source_url || 
      media.source_url || 
      '/images/placeholder-blog.jpg'; // Default placeholder
    
    return {
      url: imageUrl,
      alt: decodeHtmlEntitiesServer(media.alt_text || post.title.rendered)
    };
  }
  
  // Return placeholder if no image is found
  return {
    url: '/images/placeholder-blog.jpg',
    alt: decodeHtmlEntitiesServer(post.title.rendered)
  };
}

// Function to get related posts (same category, excluding current post)
export async function getRelatedPosts(currentPost: WordPressPost, count: number = 3): Promise<WordPressPost[]> {
  try {
    // Log the current post for debugging
    console.log("Current post for related posts:", JSON.stringify({
      id: currentPost.id,
      category: currentPost._embedded?.['wp:term']?.[0]?.[0]?.name || 'unknown'
    }));
    
    // Alternative approach: fetch more posts and filter client-side
    // This works around potential API limitations
    const response = await fetch(
      `https://api.uclic.fr/wp-json/wp/v2/posts?_embed&per_page=10`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts: WordPressPost[] = await response.json();
    console.log(`Retrieved ${posts.length} potential related posts`);
    
    // Filter out the current post by ID
    const filteredPosts = posts.filter(post => post.id !== currentPost.id);
    
    // Get current post category if available
    const currentCategory = currentPost._embedded?.['wp:term']?.[0]?.[0]?.name || null;
    
    // If we have a category, prioritize posts with the same category
    if (currentCategory) {
      const sameCategory = filteredPosts.filter(post => {
        const categories = post._embedded?.['wp:term']?.[0] || [];
        return categories.some(term => term.name === currentCategory);
      });
      
      console.log(`Found ${sameCategory.length} posts in the same category: "${currentCategory}"`);
      
      // If we have enough posts in the same category, return those
      if (sameCategory.length >= count) {
        return sameCategory.slice(0, count);
      }
      
      // Otherwise, combine with other posts
      const otherPosts = filteredPosts.filter(post => {
        const categories = post._embedded?.['wp:term']?.[0] || [];
        return !categories.some(term => term.name === currentCategory);
      });
      
      return [...sameCategory, ...otherPosts].slice(0, count);
    }
    
    // If no category, just return other posts
    return filteredPosts.slice(0, count);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

const API_URL = 'https://api.uclic.fr/wp-json/wp/v2';

export async function getPostsByCategory(slug: string): Promise<BlogPost[]> {
  try {
    const categoryId = await getCategoryIdBySlug(slug);
    const response = await fetch(
      `${API_URL}/posts?categories=${categoryId}&_embed`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts by category');
    }

    const posts = await response.json();
    return posts.map((post: WordPressPost) => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      date: post.date,
      author: post._embedded?.author?.[0]?.name || 'Anonymous',
      slug: post.slug,
      category: getPostCategory(post),
      reading_time: estimateReadingTime(post.content.rendered),
      featured_image_url: getFeaturedImage(post).url
    }));
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const response = await fetch(
      `${API_URL}/categories?slug=${slug}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }

    const categories = await response.json();
    if (categories.length === 0) {
      throw new Error('Category not found');
    }

    return {
      id: categories[0].id,
      name: categories[0].name,
      description: categories[0].description,
      slug: categories[0].slug
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return {
      id: 0,
      name: 'Non catégorisé',
      description: '',
      slug: 'non-categorise'
    };
  }
}

async function getCategoryIdBySlug(slug: string): Promise<number> {
  try {
    const response = await fetch(
      `${API_URL}/categories?slug=${slug}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }

    const categories = await response.json();
    if (categories.length === 0) {
      throw new Error('Category not found');
    }

    return categories[0].id;
  } catch (error) {
    console.error('Error fetching category ID:', error);
    return 0;
  }
}

// Function to fetch a single page by slug
export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const response = await fetch(
      `https://api.uclic.fr/wp-json/wp/v2/pages?slug=${slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }

    const pages: WordPressPage[] = await response.json();
    
    // WordPress returns an array, but we only want the first match
    return pages[0] || null;
  } catch (error) {
    console.error('Error fetching WordPress page:', error);
    return null;
  }
}

export async function getLegalPages() {
  try {
    const response = await fetch(`https://api.uclic.fr/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query pagelisting {
            pages {
              nodes {
                id
                title
                slug
                content
                status
                pagetypes {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          }
        `
      }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch legal pages: ${response.status}`);
    }

    const json = await response.json();
    console.log('GraphQL Response:', json);

    interface PageType {
      name: string;
      slug: string;
    }

    interface LegalPage {
      id: string;
      title: string;
      slug: string;
      content: string;
      status: string;
      pagetypes?: {
        nodes: PageType[];
      };
    }

    // Filtrer les pages qui ont le pagetype "legal"
    const legalPages = json.data?.pages?.nodes?.filter((page: LegalPage) => 
      page.status === 'publish' && 
      page.pagetypes?.nodes?.some((type: PageType) => type.slug === 'legal')
    ) || [];

    return legalPages;
  } catch (error) {
    console.error('Error fetching legal pages:', error);
    return [];
  }
}

// Ajouter cette fonction pour récupérer les testimonials
export async function getTestimonials() {
  try {
    const response = await fetch('https://api.uclic.fr/graphql', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            testimonials(first: 6) {
              nodes {
                id
                title
                content
                status
                clientDesignation
                reviewGivenStar
                review
                imageTesti
              }
            }
          }
        `
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.status}`);
    }

    const json = await response.json();
    
    if (!json.data?.testimonials?.nodes) {
      throw new Error('No testimonials data found');
    }

    const publishedTestimonials = json.data.testimonials.nodes.filter(
      (testimonial: any) => testimonial.status === 'publish'
    );

    // Prendre les 6 premiers témoignages (au cas où le filtre en retourne plus)
    return publishedTestimonials.slice(0, 6);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getPortfolios() {
  try {
    const response = await fetch('https://api.uclic.fr/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetPortfolios {
            portfolios(first: 3) {
              nodes {
                id
                title
                excerpt
                slug
                status
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        `
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch portfolios:', response.status);
      return [];
    }

    const data = await response.json();
    
    if (!data.data?.portfolios?.nodes) {
      console.error('Invalid portfolio data structure:', data);
      return [];
    }

    // Filter out any drafts or private posts
    return data.data.portfolios.nodes.filter((portfolio: any) => portfolio.status === 'publish');
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return [];
  }
}

export async function getPortfolioBySlug(slug: string) {
  try {
    const response = await fetch('https://api.uclic.fr/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetPortfolioBySlug($slug: ID!) {
            portfolio(id: $slug, idType: SLUG) {
              id
              title
              content
              excerpt
              status
              slug
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        `,
        variables: {
          slug
        }
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch portfolio:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (!data.data?.portfolio || data.data.portfolio.status !== 'publish') {
      return null;
    }

    return data.data.portfolio;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return null;
  }
} 