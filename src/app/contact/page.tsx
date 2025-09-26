import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Discutons de votre projet ensemble",
  description:
    "Contactez Uclic pour discuter de votre projet digital. Notre équipe est à votre écoute et vous garantit une réponse sous 24h. Développement web, design UI/UX, marketing digital.",
  keywords: [
    "contact",
    "projet digital",
    "développement web",
    "design UI/UX",
    "marketing digital",
    "agence web",
    "freelance",
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
    title: "Contact | Discutons de votre projet ensemble",
    description:
      "Contactez Uclic pour discuter de votre projet digital. Notre équipe est à votre écoute et vous garantit une réponse sous 24h.",
    type: "website",
    url: "https://uclic.fr/contact",
    siteName: "Uclic",
    locale: "fr_FR",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Uclic - Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Discutons de votre projet ensemble",
    description:
      "Contactez Uclic pour discuter de votre projet digital. Notre équipe est à votre écoute et vous garantit une réponse sous 24h.",
    images: ["/logo.png"],
    creator: "@uclic_fr",
    site: "@uclic_fr",
  },
  alternates: {
    canonical: "https://uclic.fr/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="w-full">
      <ContactForm />
    </main>
  );
}
