import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "À propos | Notre histoire et nos valeurs",
  description:
    "Découvrez comment est né Uclic et ce qui nous anime au quotidien. Une agence digitale créée pour rendre le digital profondément humain.",
  alternates: {
    canonical: "https://www.uclic.fr/a-propos",
  },
  openGraph: {
    title: "À propos | Notre histoire et nos valeurs",
    description:
      "Découvrez comment est né Uclic et ce qui nous anime au quotidien. Une agence digitale créée pour rendre le digital profondément humain.",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
    url: "https://www.uclic.fr/a-propos",
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos | Notre histoire et nos valeurs",
    description:
      "Découvrez comment est né Uclic et ce qui nous anime au quotidien. Une agence digitale créée pour rendre le digital profondément humain.",
    site: "@uclic_fr",
  },
};

export default function AboutPage() {
  return (
    <main className="w-full">
      <AboutPageClient />
    </main>
  );
}
