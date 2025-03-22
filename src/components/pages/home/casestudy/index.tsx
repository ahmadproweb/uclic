import { getPortfolios } from '@/services/wordpress';
import CaseStudy from './casestudyClient';

export default async function CaseStudyWrapper() {
  const portfolios = await getPortfolios();
  return <CaseStudy portfolios={portfolios} />;
} 