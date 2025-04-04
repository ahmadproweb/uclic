import { getLegalPages } from '@/services/wordpress';
import { getAllExpertiseGrowthCategoriesForMenu } from '@/lib/wordpress';
import FooterUI from './FooterUI';

export default async function MainFooter() {
  const [legalPages, categories] = await Promise.all([
    getLegalPages(),
    getAllExpertiseGrowthCategoriesForMenu()
  ]);

  return <FooterUI legalPages={legalPages} categories={categories} />;
} 