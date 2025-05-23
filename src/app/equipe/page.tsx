import TeamPageClient from "@/components/pages/equipe/TeamPageClient";
import { getTeamMembers } from "@/lib/wordpress";
import { Metadata } from "next";

export default async function TeamPage() {
  const members = await getTeamMembers();

  return <TeamPageClient members={members} />;
}

export const metadata: Metadata = {
  title: "Équipe Growth Marketing & Sales | Uclic",
  description:
    "Découvrez notre équipe de freelances experts en Growth Marketing, Sales Ops et Product Marketing. Une équipe passionnée au service de votre croissance.",
  alternates: {
    canonical: "https://www.uclic.fr/equipe",
  },
  openGraph: {
    title: "Équipe Growth Marketing & Sales | Uclic",
    description:
      "Découvrez notre équipe de freelances experts en Growth Marketing, Sales Ops et Product Marketing. Une équipe passionnée au service de votre croissance.",
    url: "https://www.uclic.fr/equipe",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Équipe Growth Marketing & Sales | Uclic",
    description:
      "Découvrez notre équipe de freelances experts en Growth Marketing, Sales Ops et Product Marketing. Une équipe passionnée au service de votre croissance.",
    site: "@uclic_fr",
  },
};
