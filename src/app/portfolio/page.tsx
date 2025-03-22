import { getPortfolios } from '@/services/wordpress';
import CaseStudy from '@/components/pages/home/casestudy/casestudyClient';

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();

  return (
    <main className="pt-32">
      <CaseStudy portfolios={portfolios} />
    </main>
  );
} 