import LeveesPage from "@/components/pages/levee-de-fonds/LeveesPage";
import Loading from "@/components/ui/Loading";
import { getAllLevees } from "@/lib/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: {
    page: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageNumber = parseInt(params.page, 10);

  return {
    title: `Levées de fonds startups françaises - Page ${pageNumber}`,
    description: `Découvrez les dernières levées de fonds des startups françaises. Page ${pageNumber} des actualités sur les investissements dans l'écosystème startup.`,
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    openGraph: {
      title: `Levées de fonds startups françaises - Page ${pageNumber}`,
      description: `Découvrez les dernières levées de fonds des startups françaises. Page ${pageNumber} des actualités sur les investissements dans l'écosystème startup.`,
      url: `https://uclic.fr/levee-de-fonds/page/${pageNumber}`,
      type: "website",
      locale: "fr_FR",
      siteName: "Uclic",
    },
    alternates: {
      canonical: `https://uclic.fr/levee-de-fonds/page/${pageNumber}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const pageNumber = parseInt(params.page, 10);
  const levees = await getAllLevees();

  // Calculate total pages
  const postsPerPage = 9;
  const totalPages = Math.ceil(levees.length / postsPerPage);

  // Validate page number
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <LeveesPage posts={levees} initialPage={pageNumber} />
    </Suspense>
  );
}
