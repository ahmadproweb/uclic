import TeamPageClient from "@/components/pages/equipe/TeamPageClient";
import { getTeamMembers } from "@/lib/wordpress";

export default async function TeamPage() {
  const members = await getTeamMembers();

  return <TeamPageClient members={members} />;
}
