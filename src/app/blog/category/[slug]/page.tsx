import BlogCategoryClientSide from "@/components/pages/blog/BlogCategoryClientSide";
import { getCategoryBySlug, getPostsByCategory } from "@/services/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Catégorie non trouvée | Blog UCLIC",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const categoryName = category.name;
  const categorySlug = category.slug;
  const title = `${categoryName} | Blog UCLIC - Growth Marketing`;
  const description = `Découvrez nos articles et conseils d'experts en ${categoryName.toLowerCase()}. Stratégies data-driven, guides pratiques et actualités ${categoryName.toLowerCase()} par notre agence spécialisée.`;

  return {
    title: title,
    description: description,
    keywords: `${categoryName.toLowerCase()}, growth marketing, marketing digital, conseils experts, stratégies data-driven, uclic, ${categoryName.toLowerCase()} france`,
    authors: [{ name: "UCLIC" }],
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
      canonical: `https://www.uclic.fr/blog/category/${categorySlug}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://www.uclic.fr/blog/category/${categorySlug}`,
      type: "website",
      locale: "fr_FR",
      siteName: "UCLIC",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      site: "@uclic_fr",
    },
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const { posts, total, totalPages } = await getPostsByCategory(params.slug, 1);

  console.log("Category page debug:", {
    slug: params.slug,
    totalPosts: total,
    totalPages,
    postsCount: posts.length,
  });

  return (
    <>
      {/* JSON-LD: BreadcrumbList for category */}
      <Script id="ld-breadcrumb-category" type="application/ld+json">
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
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: `https://www.uclic.fr/blog/category/${category.slug}`
            }
          ]
        })}
      </Script>
      
      {/* JSON-LD: CollectionPage for category */}
      <Script id="ld-collection-category" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${category.name} | Blog UCLIC`,
          description: `Articles et conseils d'experts en ${category.name.toLowerCase()}`,
          url: `https://www.uclic.fr/blog/category/${category.slug}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://www.uclic.fr/blog/${post.slug}`,
              name: post.title
            }))
          },
          isPartOf: {
            "@type": "WebSite",
            name: "UCLIC",
            url: "https://www.uclic.fr"
          },
          about: {
            "@type": "Thing",
            name: category.name,
            description: `Contenu spécialisé en ${category.name.toLowerCase()}`
          }
        })}
      </Script>
      
      <Suspense
        fallback={
          <div className="p-12 text-center">Chargement des articles...</div>
        }
      >
        <BlogCategoryClientSide
          posts={posts}
          category={category}
          initialPage={1}
          totalPages={totalPages}
        />
      </Suspense>
    </>
  );
}
