import BlogCategoryClientSide from "@/components/pages/blog/BlogCategoryClientSide";
import { getCategoryBySlug, getPostsByCategory } from "@/services/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  const category = await getCategoryBySlug(slug);

  return {
    title: `L'actualité ${category.name} de notre agence`,
    description: `Découvrez notre expertise en ${
      category.name
    }. Articles, guides et conseils par notre agence spécialisée pour optimiser votre stratégie ${category.name.toLowerCase()}.`,
    openGraph: {
      title: `L'actualité ${category.name} de notre agence`,
      description: `Découvrez notre expertise en ${
        category.name
      }. Articles, guides et conseils par notre agence spécialisée pour optimiser votre stratégie ${category.name.toLowerCase()}.`,
      type: "website",
      locale: "fr_FR",
      siteName: "UCLIC",
    },
    twitter: {
      card: "summary_large_image",
      title: `L'actualité ${category.name} de notre agence`,
      description: `Découvrez notre expertise en ${
        category.name
      }. Articles, guides et conseils par notre agence spécialisée pour optimiser votre stratégie ${category.name.toLowerCase()}.`,
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
  );
}
