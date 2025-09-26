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
    keywords: [
      "équipe",
      "membre",
      "expert",
      "consultant",
      "freelance",
      "growth marketing",
      "intelligence artificielle",
      member.title,
      "Uclic"
    ],
    authors: [{ name: "Uclic" }],
    creator: "Uclic",
    publisher: "Uclic",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "profile",
      url: `https://uclic.fr/equipe/${member.slug}`,
      siteName: "Uclic",
      locale: "fr_FR",
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
    twitter: {
      card: "summary_large_image",
      creator: "@uclic_fr",
      site: "@uclic_fr",
      title: `${member.title} | ${description}`,
      description: description,
      images: [
        {
          url:
            member.equipeFields.image?.node.sourceUrl ||
            "/images/default-profile.jpg",
          alt: member.title,
        },
      ],
    },
    alternates: {
      canonical: `https://uclic.fr/equipe/${member.slug}`,
    },
  };
}
