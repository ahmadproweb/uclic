import AboutContent from "@/components/pages/about/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos | Agence Growth Marketing & Sales Ops",
  description:
    "Découvrez notre agence Growth Marketing & Sales Ops. Une équipe d'experts en marketing digital pour maximiser votre croissance avec une approche data-driven.",
  alternates: {
    canonical: "https://www.uclic.fr/about",
  },
  openGraph: {
    title: "À Propos | Agence Growth Marketing & Sales Ops",
    description:
      "Découvrez notre agence Growth Marketing & Sales Ops. Une équipe d'experts en marketing digital pour maximiser votre croissance avec une approche data-driven.",
    url: "https://www.uclic.fr/about",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos | Agence Growth Marketing & Sales Ops",
    description:
      "Découvrez notre agence Growth Marketing & Sales Ops. Une équipe d'experts en marketing digital pour maximiser votre croissance avec une approche data-driven.",
    site: "@uclic_fr",
  },
};

export default function AboutPage() {
  return (
    <main className="w-full">
      <AboutContent />
    </main>
  );
}
