import LeveesPage from "@/components/pages/levee-de-fonds/LeveesPage";
import Loading from "@/components/ui/Loading";
import { getAllLevees } from "@/lib/wordpress";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Levée de fonds startups françaises",
  description:
    "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup.",
  openGraph: {
    title: "Levée de fonds startups françaises",
    description:
      "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup.",
    url: "https://www.uclic.fr/levee-de-fonds",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Levée de fonds startups françaises",
    description:
      "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup.",
    site: "@uclic_fr",
  },
};

export default async function Page() {
  const levees = await getAllLevees();
  return (
    <Suspense fallback={<Loading />}>
      <LeveesPage posts={levees} initialPage={1} />
    </Suspense>
  );
}
