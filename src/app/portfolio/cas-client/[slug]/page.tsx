import { getPortfolioBySlug } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import PortfolioPostClientSide from '@/components/pages/cas-clients/PortfolioPostClientSide';

interface PortfolioPageProps {
  params: {
    slug: string;
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const portfolio = await getPortfolioBySlug(params.slug);

  if (!portfolio) {
    notFound();
  }

  return <PortfolioPostClientSide portfolio={portfolio} />;
} 