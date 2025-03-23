// This is a Server Component - no 'use client' directive here
import { fetchTeamData } from '@/lib/wordpress';
import ClientTeam from './ClientTeam';

// Server Component that handles data fetching
export default async function TeamSection() {
  const teamMembers = await fetchTeamData();
  return <ClientTeam initialData={teamMembers} />;
} 