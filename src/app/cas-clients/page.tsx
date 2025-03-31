import { getPortfolios } from '@/services/wordpress';
import CasClientsIndexClientSide from '@/components/pages/cas-clients/CasClientsIndexClientSide';
import type { PortfolioPost } from '@/components/pages/cas-clients/CasClientsIndexClientSide';

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

export default async function CasClientsPage() {
  const portfoliosData = await getPortfolios();
  
  // Transform the data to match the PortfolioPost interface
  const portfolios: PortfolioPost[] = portfoliosData.map((portfolio: PortfolioData) => ({
    id: portfolio.id,
    title: portfolio.title,
    slug: portfolio.slug,
    excerpt: portfolio.excerpt,
    content: portfolio.excerpt, // Using excerpt as content since we don't have full content in the list
    date: new Date().toISOString(), // Using current date since we don't have dates in portfolio
    featuredImage: portfolio.featuredImage ? {
      node: {
        sourceUrl: portfolio.featuredImage.node.sourceUrl,
        altText: portfolio.title
      }
    } : undefined
  }));

  return (
    <main>
      <CasClientsIndexClientSide posts={portfolios} />
    </main>
  );
} 