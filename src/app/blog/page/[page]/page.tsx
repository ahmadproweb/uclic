import BlogIndexClientSide from "@/components/pages/blog/BlogIndexClientSide";
import {
  decodeHtmlEntitiesServer,
  estimateReadingTime,
  getFeaturedImage,
  getLatestPosts,
} from "@/services/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

interface PageProps {
  params: {
    page: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = parseInt(params.page);
  if (isNaN(page) || page < 1) {
    return {
      title: "Page non trouvée | Blog UCLIC",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isFirstPage = page === 1;
  const baseTitle = "Blog Growth Marketing & Sales | Conseils d'Experts";
  const pageTitle = isFirstPage ? baseTitle : `${baseTitle} - Page ${page}`;
  const description = isFirstPage 
    ? "Articles et conseils d'experts en Growth Marketing, Sales Ops et Product Marketing. Découvrez nos stratégies data-driven pour optimiser votre croissance."
    : `Page ${page} du blog UCLIC - Articles et conseils d'experts en Growth Marketing, Sales Ops et Product Marketing.`;

  return {
    title: pageTitle,
    description: description,
    keywords: "growth marketing, marketing digital, sales ops, product marketing, conseils experts, stratégies data-driven, uclic",
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
    alternates: {
      canonical: `https://www.uclic.fr/blog${page > 1 ? `/page/${page}` : ''}`,
    },
    openGraph: {
      title: pageTitle,
      description: description,
      url: `https://www.uclic.fr/blog${page > 1 ? `/page/${page}` : ''}`,
      type: "website",
      locale: "fr_FR",
      siteName: "UCLIC",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      site: "@uclic_fr",
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const currentPage = parseInt(params.page);
  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const POSTS_PER_PAGE = 9;

  // Fetch posts with pagination
  const { posts, totalPages } = await getLatestPosts(
    POSTS_PER_PAGE,
    currentPage
  );

  if (currentPage > totalPages) {
    notFound();
  }

  // Transform WordPress posts to our format
  const transformedPosts = posts.map((post) => ({
    id: post.id,
    title: decodeHtmlEntitiesServer(post.title.rendered),
    slug: post.slug,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    author: post._embedded?.author?.[0]?.name || "Uclic",
    author_link: "",
    featured_image_url: getFeaturedImage(post).url,
    reading_time: estimateReadingTime(post.content.rendered),
    tags: [],
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Blog",
  }));

  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <Script id="ld-breadcrumb-pagination" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: "https://www.uclic.fr/"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: "https://www.uclic.fr/blog"
            },
            ...(currentPage > 1 ? [{
              "@type": "ListItem",
              position: 3,
              name: `Page ${currentPage}`,
              item: `https://www.uclic.fr/blog/page/${currentPage}`
            }] : [])
          ]
        })}
      </Script>
      
      {/* JSON-LD: CollectionPage for pagination */}
      <Script id="ld-collection-page" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: currentPage === 1 ? "Blog UCLIC" : `Blog UCLIC - Page ${currentPage}`,
          description: "Articles et conseils d'experts en Growth Marketing, Sales Ops et Product Marketing",
          url: `https://www.uclic.fr/blog${currentPage > 1 ? `/page/${currentPage}` : ''}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: transformedPosts.map((post, index) => ({
              "@type": "ListItem",
              position: (currentPage - 1) * 9 + index + 1,
              url: `https://www.uclic.fr/blog/${post.slug}`,
              name: post.title
            }))
          },
          isPartOf: {
            "@type": "WebSite",
            name: "UCLIC",
            url: "https://www.uclic.fr"
          },
          ...(currentPage > 1 && {
            "pagination": {
              "@type": "Pagination",
              "currentPage": currentPage,
              "totalPages": totalPages,
              "hasNextPage": currentPage < totalPages,
              "hasPreviousPage": currentPage > 1,
              "nextPage": currentPage < totalPages ? `https://www.uclic.fr/blog/page/${currentPage + 1}` : undefined,
              "previousPage": currentPage > 1 ? `https://www.uclic.fr/blog/page/${currentPage - 1}` : undefined
            }
          })
        })}
      </Script>
      
      <BlogIndexClientSide
        posts={transformedPosts}
        initialPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
