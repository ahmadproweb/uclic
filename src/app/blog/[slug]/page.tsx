import BlogPostClientSide from "@/components/pages/blog/BlogPostClientSide";
import {
  decodeHtmlEntitiesServer,
  estimateReadingTime,
  getLatestPosts,
  getPostCategory,
  getRelatedPosts,
  WordPressPost,
} from "@/services/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Script from "next/script";

// JSON-LD Types
interface JsonLdImage {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
}

interface JsonLdOrganization {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: JsonLdImage;
}

interface JsonLdPerson {
  "@type": "Person";
  name: string;
  url?: string;
}

interface JsonLdWebPage {
  "@type": "WebPage";
  "@id": string;
}

interface BlogPostJsonLd {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  datePublished: string;
  dateModified: string;
  image: string;
  author: JsonLdPerson | JsonLdOrganization;
  publisher: JsonLdOrganization;
  description: string;
  mainEntityOfPage: JsonLdWebPage;
  wordCount?: number;
  articleBody?: string;
  keywords?: string;
  articleSection?: string;
}

// Add JSON-LD Script component
function JsonLd({ data }: { data: BlogPostJsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Define params type for this page
type BlogPostParams = {
  params: {
    slug: string;
  };
};

// Generate metadata for the page
export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article non trouvé | Blog UCLIC",
      description: "L'article que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${decodeHtmlEntitiesServer(post.title.rendered)} | Blog UCLIC`,
    description: decodeHtmlEntitiesServer(
      post.excerpt.rendered.replace(/<[^>]*>/g, "")
    ),
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const { posts } = await getLatestPosts(10);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Function to fetch a single post by slug
async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `https://api.uclic.fr/wp-json/wp/v2/posts?slug=${slug}&_embed`,
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
    console.error("Error fetching WordPress post:", error);
    return null;
  }
}

// Main page component
export default async function BlogPostPage({ params }: BlogPostParams) {
  const slug = await Promise.resolve(params.slug);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related and latest posts for the sidebar
  const [relatedPosts, latestPosts] = await Promise.all([
    getRelatedPosts(post),
    getLatestPosts(3),
  ]);

  // Transform WordPress post to our format
  const transformedPost = {
    id: post.id,
    title: decodeHtmlEntitiesServer(post.title.rendered),
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    date: post.date,
    reading_time: estimateReadingTime(post.content.rendered),
    category: getPostCategory(post),
    author: post._embedded?.author?.[0]?.name || "Uclic",
    featured_image_url:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
    slug: post.slug,
  };

  // Prepare JSON-LD data
  const jsonLd: BlogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: transformedPost.title,
    datePublished: transformedPost.date,
    dateModified: transformedPost.date,
    image: transformedPost.featured_image_url,
    author: {
      "@type": "Person",
      name: transformedPost.author,
    },
    publisher: {
      "@type": "Organization",
      name: "UCLIC",
      url: "https://www.uclic.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://www.uclic.fr/images/logo.png",
      },
    },
    description: decodeHtmlEntitiesServer(
      transformedPost.excerpt.replace(/<[^>]*>/g, "")
    ),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.uclic.fr/blog/${transformedPost.slug}`,
    },
    wordCount: transformedPost.content.split(/\s+/).length,
    articleBody: decodeHtmlEntitiesServer(
      transformedPost.content.replace(/<[^>]*>/g, "")
    ),
    articleSection: transformedPost.category,
  };

  return (
    <>
      {/* JSON-LD: BreadcrumbList for blog post */}
      <Script id="ld-breadcrumb-blogpost" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.uclic.fr/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.uclic.fr/blog" },
            { "@type": "ListItem", position: 3, name: transformedPost.title, item: `https://www.uclic.fr/blog/${transformedPost.slug}` }
          ]
        })}
      </Script>
      <JsonLd data={jsonLd} />
      <Suspense
        fallback={
          <div className="p-12 text-center">Chargement de l'article...</div>
        }
      >
        <BlogPostClientSide
          post={transformedPost}
          preloadedRelatedPosts={relatedPosts}
          preloadedLatestPosts={latestPosts.posts}
        />
      </Suspense>
    </>
  );
}
