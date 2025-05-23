import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Discutons de votre projet ensemble",
  description:
    "Contactez Uclic pour discuter de votre projet digital. Notre équipe est à votre écoute et vous garantit une réponse sous 24h.",
  openGraph: {
    title: "Contact | Discutons de votre projet ensemble",
    description:
      "Contactez Uclic pour discuter de votre projet digital. Notre équipe est à votre écoute et vous garantit une réponse sous 24h.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function ContactPage() {
  return (
    <main className="w-full">
      <ContactForm />
    </main>
  );
}
