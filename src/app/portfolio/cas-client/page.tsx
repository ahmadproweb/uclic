import { getPortfolios } from '@/services/wordpress';
import CaseStudy from '@/components/pages/home/casestudy/casestudyClient';

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-[1250px] mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-normal mb-8 md:mb-12">
          Nos Réalisations
        </h1>
        <CaseStudy portfolios={portfolios} />
      </div>
    </main>
  );
} 