import { getTeamMembers } from '@/lib/wordpress';
import TeamPageClient from '@/components/pages/equipe/TeamPageClient';
import { colors as theme } from '@/config/theme';
import { cn } from '@/lib/utils';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useTheme } from '@/context/ThemeContext';

export default async function TeamPage() {
  const members = await getTeamMembers();
  
  return <TeamPageClient members={members} />;
} 