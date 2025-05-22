import BlogIndexClientSide from "@/components/pages/blog/BlogIndexClientSide";
import {
  decodeHtmlEntitiesServer,
  estimateReadingTime,
  getFeaturedImage,
  getLatestPosts,
} from "@/services/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
    };
  }

  return {
    title: `Page ${page} | Blog UCLIC`,
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
    <BlogIndexClientSide
      posts={transformedPosts}
      initialPage={currentPage}
      totalPages={totalPages}
    />
  );
}
