import { getLegalPages } from '@/services/wordpress';
import FooterUI from './FooterUI';

export default async function MainFooter() {
  const legalPages = await getLegalPages();
  return <FooterUI legalPages={legalPages} />;
} 