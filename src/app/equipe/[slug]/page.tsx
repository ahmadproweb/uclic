import TeamMemberPage from "@/components/pages/equipe/TeamMemberPage";
import Loading from "@/components/ui/Loading";
import { getTeamMember, getTeamMembers } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface TeamMemberPageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: TeamMemberPageProps) {
  const [member, allMembers] = await Promise.all([
    getTeamMember(params.slug),
    getTeamMembers(),
  ]);

  if (!member) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <TeamMemberPage member={member} otherMembers={allMembers} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: TeamMemberPageProps) {
  const member = await getTeamMember(params.slug);

  if (!member) {
    return {
      title: "Membre non trouvé",
      description:
        "Le membre de l'équipe que vous recherchez n'a pas été trouvé.",
    };
  }

  const description = member.equipeFields.extrait || `Expert chez UCLIC`;

  return {
    title: `${member.title} | ${description}`,
    description: description,
    openGraph: {
      title: `${member.title} | ${description}`,
      description: description,
      images: [
        {
          url:
            member.equipeFields.image?.node.sourceUrl ||
            "/images/default-profile.jpg",
          width: 1200,
          height: 630,
          alt: member.title,
        },
      ],
    },
  };
}
