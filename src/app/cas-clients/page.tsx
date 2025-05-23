import type { PortfolioPost } from "@/components/pages/cas-clients/CasClientsIndexClientSide";
import CasClientsIndexClientSide from "@/components/pages/cas-clients/CasClientsIndexClientSide";
import { getPortfolios } from "@/services/wordpress";
import { Metadata } from "next";

interface PortfolioData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
}

export const metadata: Metadata = {
  title: "Cas Clients | Success Stories & Portfolios | Uclic",
  description:
    "Découvrez nos cas clients et success stories : des exemples concrets de missions réalisées en Growth Marketing, Sales Ops et Product Marketing par l'équipe Uclic.",
  alternates: {
    canonical: "https://www.uclic.fr/cas-clients",
  },
  openGraph: {
    title: "Cas Clients | Success Stories & Portfolios | Uclic",
    description:
      "Découvrez nos cas clients et success stories : des exemples concrets de missions réalisées en Growth Marketing, Sales Ops et Product Marketing par l'équipe Uclic.",
    url: "https://www.uclic.fr/cas-clients",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cas Clients | Success Stories & Portfolios | Uclic",
    description:
      "Découvrez nos cas clients et success stories : des exemples concrets de missions réalisées en Growth Marketing, Sales Ops et Product Marketing par l'équipe Uclic.",
    site: "@uclic_fr",
  },
};

export default async function CasClientsPage() {
  const portfoliosData = await getPortfolios();

  // Transform the data to match the PortfolioPost interface
  const portfolios: PortfolioPost[] = portfoliosData.map(
    (portfolio: PortfolioData) => ({
      id: portfolio.id,
      title: portfolio.title,
      slug: portfolio.slug,
      excerpt: portfolio.excerpt,
      content: portfolio.excerpt, // Using excerpt as content since we don't have full content in the list
      date: new Date().toISOString(), // Using current date since we don't have dates in portfolio
      featuredImage: portfolio.featuredImage
        ? {
            node: {
              sourceUrl: portfolio.featuredImage.node.sourceUrl,
              altText: portfolio.title,
            },
          }
        : undefined,
    })
  );

  return (
    <main>
      <CasClientsIndexClientSide posts={portfolios} />
    </main>
  );
}
