import AboutContent from "@/components/pages/about/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos | Freelances Growth & Sales Ops",
  description:
    "Découvrez l'équipe de freelances experts en Growth Marketing, Sales Ops et Product Marketing. Une approche data-driven pour maximiser votre croissance.",
  alternates: {
    canonical: "https://uclic.fr/about",
  },
  openGraph: {
    title: "À Propos | Freelances Growth & Sales Ops",
    description:
      "Découvrez l'équipe de freelances experts en Growth Marketing, Sales Ops et Product Marketing. Une approche data-driven pour maximiser votre croissance.",
    url: "https://uclic.fr/about",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos | Freelances Growth & Sales Ops",
    description:
      "Découvrez l'équipe de freelances experts en Growth Marketing, Sales Ops et Product Marketing. Une approche data-driven pour maximiser votre croissance.",
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
