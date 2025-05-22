import ToolboxPage from "@/components/pages/toolbox/ToolboxPage";
import Loading from "@/components/ui/Loading";
import { fetchToolboxData } from "@/lib/wordpress";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  params: {
    page: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const currentPage = parseInt(params.page);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uclic.fr";

  return {
    title: `Toolbox - Page ${currentPage}`,
    description: `Découvrez notre sélection d'outils pour développer votre activité - Page ${currentPage}`,
    alternates: {
      canonical:
        currentPage === 1
          ? `${baseUrl}/toolbox`
          : `${baseUrl}/toolbox/page/${currentPage}`,
    },
    openGraph: {
      title: `Toolbox - Page ${currentPage}`,
      description: `Découvrez notre sélection d'outils pour développer votre activité - Page ${currentPage}`,
      url:
        currentPage === 1
          ? `${baseUrl}/toolbox`
          : `${baseUrl}/toolbox/page/${currentPage}`,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export const revalidate = 3600;

export default async function Page({ params }: PageProps) {
  const currentPage = parseInt(params.page);
  const toolboxData = await fetchToolboxData();

  return (
    <Suspense fallback={<Loading />}>
      <ToolboxPage posts={toolboxData.nodes} initialPage={currentPage} />
    </Suspense>
  );
}
