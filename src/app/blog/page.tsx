import BlogIndexClientSide from "@/components/pages/blog/BlogIndexClientSide";
import {
  decodeHtmlEntitiesServer,
  estimateReadingTime,
  getFeaturedImage,
  getLatestPosts,
} from "@/services/wordpress";
import { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Blog Growth Marketing & Sales | Conseils d'Experts",
  description:
    "Articles et conseils d'experts en Growth Marketing, Sales Ops et Product Marketing. Découvrez nos stratégies data-driven pour optimiser votre croissance.",
  alternates: {
    canonical: "https://www.uclic.fr/blog",
  },
  openGraph: {
    title: "Blog Growth Marketing & Sales | Conseils d'Experts",
    description:
      "Articles et conseils d'experts en Growth Marketing, Sales Ops et Product Marketing. Découvrez nos stratégies data-driven pour optimiser votre croissance.",
    url: "https://www.uclic.fr/blog",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Growth Marketing & Sales | Conseils d'Experts",
    description:
      "Articles et conseils d'experts en Growth Marketing, Sales Ops et Product Marketing. Découvrez nos stratégies data-driven pour optimiser votre croissance.",
    site: "@uclic_fr",
  },
};

export default async function BlogPage() {
  const POSTS_PER_PAGE = 9;
  const currentPage = 1;

  // Fetch posts with pagination
  const { posts, totalPages } = await getLatestPosts(
    POSTS_PER_PAGE,
    currentPage
  );

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
      <Script id="ld-breadcrumb-blog" type="application/ld+json">
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
            }
          ]
        })}
      </Script>
      {/* JSON-LD: ItemList of blog posts */}
      <Script id="ld-itemlist-blog" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: transformedPosts.slice(0, POSTS_PER_PAGE).map((p, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `https://www.uclic.fr/blog/${p.slug}`,
            name: p.title
          }))
        })}
      </Script>
      <Suspense
      fallback={
        <div className="p-12 text-center">Chargement des articles...</div>
      }
    >
      <BlogIndexClientSide
        posts={transformedPosts}
        initialPage={currentPage}
        totalPages={totalPages}
      />
    </Suspense>
    </>
  );
}
