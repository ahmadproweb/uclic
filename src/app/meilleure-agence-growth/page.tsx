import { Metadata } from "next";
import HeroSEO from "./HeroSEO";
import PartnerHome from "@/components/pages/home/partner/PartnerHome";
import SEOAgenciesTable from "./SEOAgenciesTable";
import SEOContent from "./SEOContent";
import Testimonials from "@/components/pages/home/testimonials/testimonials";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Classement Agences Growth 2024 : Top 7 Meilleures Agences Growth France",
  description: "Découvrez le classement complet des meilleures agences Growth de France 2024. UCLIC, Growth Room, Deux.io... Comparatif exclusif avec scores, spécialités et avis clients.",
  keywords: "classement agence growth, meilleure agence growth, top agence growth, agence growth france, classement agence growth 2024, growth room, deux.io, wedogrowth, digital corsaires, agence 404, cosavostra, growth hacking, marketing digital, acquisition clients, conversion, roi growth, audit growth gratuit",
  openGraph: {
    title: "Classement Agences Growth 2024 : Top 7 Meilleures Agences Growth France",
    description: "Découvrez le classement complet des meilleures agences Growth de France 2024. UCLIC, Growth Room, Deux.io... Comparatif exclusif avec scores, spécialités et avis clients.",
    url: "https://www.uclic.fr/meilleure-agence-growth",
    siteName: "UCLIC",
    images: [
      {
        url: "https://static.uclic.fr/growth-agence.jpg",
        width: 1200,
        height: 630,
        alt: "Classement agences Growth 2024 - Top 7 meilleures agences Growth France",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Classement Agences Growth 2024 : Top 7 Meilleures Agences Growth France",
    description: "Découvrez le classement complet des meilleures agences Growth de France 2024. UCLIC, Growth Room, Deux.io... Comparatif exclusif avec scores, spécialités et avis clients.",
    images: ["https://static.uclic.fr/growth-agence.jpg"],
  },
  alternates: {
    canonical: "https://www.uclic.fr/meilleure-agence-growth",
  },
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
  category: "Marketing",
  other: {
    "article:author": "UCLIC",
    "article:section": "Growth Marketing",
    "article:tag": "agence growth, marketing digital, croissance business",
  },
};

export default function MeilleureAgenceGrowthPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Classement Agences Growth 2024 : Top 7 Meilleures Agences Growth France",
    "description": "Découvrez le classement complet des meilleures agences Growth de France 2024. UCLIC, Growth Room, Deux.io... Comparatif exclusif avec scores, spécialités et avis clients.",
    "author": {
      "@type": "Organization",
      "name": "UCLIC",
      "url": "https://www.uclic.fr"
    },
    "publisher": {
      "@type": "Organization",
      "name": "UCLIC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.uclic.fr/logo.png"
      }
    },
    "datePublished": "2024-01-15",
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.uclic.fr/meilleure-agence-growth"
    },
    "articleSection": "Growth Marketing",
    "keywords": "classement agence growth, meilleure agence growth, top agence growth, agence growth france",
    "about": [
      {
        "@type": "Thing",
        "name": "Growth Marketing"
      },
      {
        "@type": "Thing", 
        "name": "Marketing Digital"
      },
      {
        "@type": "Thing",
        "name": "Acquisition Clients"
      }
    ],
    "mentions": [
      {
        "@type": "Organization",
        "name": "Growth Room",
        "url": "https://growthroom.co"
      },
      {
        "@type": "Organization", 
        "name": "Deux.io",
        "url": "https://deux.io"
      },
      {
        "@type": "Organization",
        "name": "WeDoGrowth",
        "url": "https://wedogrowth.com"
      },
      {
        "@type": "Organization",
        "name": "Digital Corsaires",
        "url": "https://digital-corsaires.com"
      },
      {
        "@type": "Organization",
        "name": "Agence 404",
        "url": "https://agence404.com"
      },
      {
        "@type": "Organization",
        "name": "CosaVostra",
        "url": "https://cosavostra.com"
      }
    ]
  };

  return (
    <>
      <Script
        id="growth-ranking-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <main className="flex flex-col">
        <HeroSEO />
        <PartnerHome />
        <SEOAgenciesTable />
        <SEOContent />
        <Testimonials />
      </main>
    </>
  );
}
