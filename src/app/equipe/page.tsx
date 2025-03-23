import { getTeamMembers } from '@/lib/wordpress';
import TeamPageClient from '@/components/pages/equipe/TeamPageClient';

export default async function TeamPage() {
  const members = await getTeamMembers();
  
  return <TeamPageClient members={members} />;
} 