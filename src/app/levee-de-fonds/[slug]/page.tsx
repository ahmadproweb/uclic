import LeveePage from "@/components/pages/levee-de-fonds/LeveePage";
import {
  getLatestLevees,
  getLeveeBySlug,
  getRelatedLevees,
} from "@/lib/wordpress";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

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

export async function generateMetadata({
  params,
}: LeveePostParams): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  const post = await getLeveeBySlug(slug);

  if (!post) {
    return {
      title: "Levée de fonds non trouvée",
      description: "La levée de fonds que vous recherchez n'existe pas.",
    };
  }

  if (!post.seo) {
    notFound();
  }

  const seo = post.seo;
  const openGraph = seo.openGraph;
  const twitterMeta = openGraph?.twitterMeta;
  const baseUrl = "https://www.uclic.fr";

  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-video-preview": -1,
        "max-image-preview": "large",
        noimageindex: false,
      },
    },
    alternates: {
      canonical: `${baseUrl}/levee-de-fonds/${slug}`,
    },
  };

  if (openGraph) {
    metadata.openGraph = {
      title: openGraph.title,
      description: openGraph.description,
      url: `${baseUrl}/levee-de-fonds/${slug}`,
      siteName: openGraph.siteName,
      locale: openGraph.locale,
      type: "article",
      images: openGraph.image
        ? [
            {
              url: openGraph.image.url,
              width: openGraph.image.width,
              height: openGraph.image.height,
              alt: post.title,
            },
          ]
        : undefined,
    };
  }

  if (twitterMeta) {
    metadata.twitter = {
      card: "summary_large_image",
      title: twitterMeta.title,
      description: twitterMeta.description,
      images: openGraph?.image ? [openGraph.image.url] : undefined,
    };
  }

  if (openGraph?.articleMeta?.section) {
    metadata.other = {
      "article:section": openGraph.articleMeta.section,
      "article:publisher": "https://www.facebook.com/uclic.fr",
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
    getLatestLevees(3, [post.id]),
  ]);

  // Prepare JSON-LD data
  const jsonLd: ArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    image: post.featuredImage?.node.sourceUrl || "",
    author: {
      "@type": "Organization",
      name: "UCLIC",
      url: "https://www.uclic.fr",
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
    description: post.seo?.description || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.uclic.fr/levee-de-fonds/${post.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD: BreadcrumbList for levee post */}
      <Script id="ld-breadcrumb-levee-post" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.uclic.fr/" },
            { "@type": "ListItem", position: 2, name: "Levée de fonds", item: "https://www.uclic.fr/levee-de-fonds" },
            { "@type": "ListItem", position: 3, name: post.title, item: `https://www.uclic.fr/levee-de-fonds/${post.slug}` }
          ]
        })}
      </Script>
      <JsonLd data={jsonLd} />
      <LeveePage
        post={post}
        relatedPosts={relatedPosts}
        latestPosts={latestPosts}
      />
    </>
  );
}
