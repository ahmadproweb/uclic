import { getPageBySlug } from "@/services/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPageClient from "./LegalPageClient";

interface LegalPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: LegalPageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return {
      title: "Page non trouvée",
      description: "La page que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${page.title.rendered}`,
    description: page.excerpt?.rendered || "Document légal Uclic",
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <LegalPageClient
      title={page.title.rendered}
      content={page.content.rendered}
      slug={params.slug}
    />
  );
}
