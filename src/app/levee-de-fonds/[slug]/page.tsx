import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getLeveeBySlug, getRelatedLevees, getLatestLevees } from '@/lib/wordpress';
import LeveePage from '@/components/pages/levee-de-fonds/LeveePage';
import Loading from '@/components/ui/Loading';
import type { Metadata } from 'next';

// JSON-LD Types
interface JsonLdImage {
  "@type": "ImageObject";
  url: string;
}

interface JsonLdOrganization {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: JsonLdImage;
}

interface JsonLdWebPage {
  "@type": "WebPage";
  "@id": string;
}

interface ArticleJsonLd {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  datePublished: string;
  dateModified: string;
  image: string;
  author: JsonLdOrganization;
  publisher: JsonLdOrganization;
  description: string;
  mainEntityOfPage: JsonLdWebPage;
}

// Add JSON-LD Script component
function JsonLd({ data }: { data: ArticleJsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface LeveePostParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: LeveePostParams): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  const post = await getLeveeBySlug(slug);

  if (!post) {
    return {
      title: 'Levée de fonds non trouvée | UCLIC',
      description: 'La levée de fonds que vous recherchez n\'existe pas.',
    };
  }

  if (!post.seo) {
    notFound();
  }

  const seo = post.seo;
  const openGraph = seo.openGraph;
  const twitterMeta = openGraph?.twitterMeta;

  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
  };

  if (seo.canonicalUrl) {
    metadata.alternates = {
      canonical: seo.canonicalUrl,
    };
  }

  if (seo.robots) {
    metadata.robots = {
      index: seo.robots.includes('index'),
      follow: seo.robots.includes('follow'),
      googleBot: {
        index: seo.robots.includes('index'),
        follow: seo.robots.includes('follow'),
        'max-snippet': seo.robots.includes('max-snippet:-1') ? -1 : undefined,
        'max-video-preview': seo.robots.includes('max-video-preview:-1') ? -1 : undefined,
        'max-image-preview': seo.robots.includes('max-image-preview:large') ? 'large' : undefined,
      },
    };
  }

  if (openGraph) {
    metadata.openGraph = {
      title: openGraph.title,
      description: openGraph.description,
      url: openGraph.url,
      siteName: openGraph.siteName,
      locale: openGraph.locale,
      type: 'article',
      images: openGraph.image ? [
        {
          url: openGraph.image.url,
          width: openGraph.image.width,
          height: openGraph.image.height,
          alt: post.title,
        },
      ] : undefined,
    };
  }

  if (twitterMeta) {
    metadata.twitter = {
      card: 'summary_large_image',
      title: twitterMeta.title,
      description: twitterMeta.description,
      images: openGraph?.image ? [openGraph.image.url] : undefined,
    };
  }

  if (openGraph?.articleMeta?.section) {
    metadata.other = {
      'article:section': openGraph.articleMeta.section,
      'article:publisher': 'https://www.facebook.com/uclic.fr',
    };
  }

  return metadata;
}

export const revalidate = 3600; // Revalidate every hour

export default async function Page({ params }: LeveePostParams) {
  const slug = await Promise.resolve(params.slug);
  const post = await getLeveeBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related and latest posts in parallel
  const [relatedPosts, latestPosts] = await Promise.all([
    getRelatedLevees(post.id),
    getLatestLevees(3, [post.id])
  ]);

  // Prepare JSON-LD data
  const jsonLd: ArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.date,
    "dateModified": post.date,
    "image": post.featuredImage?.node.sourceUrl || "",
    "author": {
      "@type": "Organization",
      "name": "UCLIC",
      "url": "https://uclic.fr"
    },
    "publisher": {
      "@type": "Organization",
      "name": "UCLIC",
      "url": "https://uclic.fr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://uclic.fr/images/logo.png"
      }
    },
    "description": post.seo?.description || "",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://uclic.fr/levee-de-fonds/${post.slug}`
    }
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Suspense fallback={<Loading />}>
        <LeveePage 
          post={post}
          relatedPosts={relatedPosts}
          latestPosts={latestPosts}
        />
      </Suspense>
    </>
  );
} 