"use client";

import Partners from "@/components/pages/home/partner/partner";
import PreFooter from "@/components/footer/PreFooter";
import { CTAButton } from "@/components/ui/cta-button";
import { UnderlinedText } from "@/components/ui/underlined-text";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
// merged React hooks import below
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";

emailjs.init("sNJezWZbNlGM1x_Pe");

// Normalise un numéro FR en format +33XXXXXXXXX
function normalizeToE164FR(input: string): string {
  if (!input) return "";
  const only = input.replace(/\s+/g, "");
  if (only.startsWith("+")) return only;
  const digits = input.replace(/\D/g, "");
  const withoutLeadingZero = digits.startsWith("0") ? digits.slice(1) : digits;
  return `+33${withoutLeadingZero}`;
}

export default function ContactForm() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const [isDevPreview, setIsDevPreview] = useState(false);
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setIsDevPreview(params.get("dev") === "true");
    } catch {}
  }, []);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const validateForm = (formData: FormData) => {
    const newErrors: { [key: string]: string } = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }

    if (!phone || phone.trim().length === 0) {
      newErrors.phone = "Veuillez entrer votre numéro de téléphone";
    } else {
      const phoneClean = normalizeToE164FR(phone.trim());
      const phoneRegex = /^\+?[0-9]{9,15}$/;
      if (!phoneRegex.test(phoneClean)) {
        newErrors.phone = "Veuillez entrer un numéro de téléphone valide";
      }
    }

    const trimmedMessage = message?.trim() || "";
    if (!trimmedMessage || trimmedMessage.length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);

    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.send("service_8tp0bod", "template_jkryos1", {
        from_name: formData.get("name"),
        from_email: formData.get("email"),
        message: formData.get("message"),
        phone: normalizeToE164FR((formData.get("phone") as string) || "" ) || "N/A",
      });

      if (result.text === "OK") {
        // Identifier l'utilisateur dans PostHog
        const email = formData.get("email") as string;
        const name = formData.get("name") as string;

        // PostHog tracking
        posthog.identify(email, {
          name: name,
          email: email,
          last_contact_date: new Date().toISOString(),
        });

        posthog.capture("contact_form_submitted", {
          name: name,
          email: email,
        });

        setSubmitStatus("success");
        formRef.current?.reset();
        setErrors({});
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error: unknown) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Schema JSON-LD pour SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Uclic",
    "description": "Contactez Uclic pour discuter de votre projet digital. Notre équipe est à votre écoute et vous garantit une réponse sous 24h.",
    "url": "https://uclic.fr/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Uclic",
      "url": "https://uclic.fr",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+33-6-17-12-54-28",
          "contactType": "customer service",
          "areaServed": "FR",
          "availableLanguage": "French"
        },
        {
          "@type": "ContactPoint",
          "email": "contact@uclic.fr",
          "contactType": "customer service",
          "areaServed": "FR",
          "availableLanguage": "French"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressCountry": "FR"
      },
      "sameAs": [
        "https://twitter.com/uclic_fr"
      ]
    }
  };

  return (
    <div className={cn("min-h-screen", isDark ? "bg-black" : "bg-white")}>
      {/* Fixed halo background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 h-[45vh] z-0"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 75%)`
            : `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0) 78%)`,
          filter: 'blur(20px)'
        }}
      />
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        className={cn(
          "w-full relative overflow-hidden pt-32 pb-10 md:pb-16 px-4 sm:px-6",
          isDevPreview && "gradient-pulse"
        )}
        style={
          isDevPreview
            ? {
                backgroundColor: isDark ? "#000000" : "#FFFFFF",
                backgroundImage: `radial-gradient(ellipse at center bottom,
                  ${isDark ? 'rgba(212,237,49,0.70)' : 'rgba(212,237,49,0.95)'} 0%,
                  rgba(212,237,49,0.55) 18%,
                  rgba(212,237,49,0.28) 38%,
                  rgba(212,237,49,0.12) 58%,
                  ${isDark ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'} 78%)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "130% 120%",
                backgroundPosition: "center 100%",
              }
            : undefined
        }
      >
        {/* Background video (only in dev preview) */}
        {false && isDevPreview && (
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/contact-hero.mp4" type="video/mp4" />
          </video>
        )}


        {/* Modern curved glow (horizon) - dev preview only */}
        {false && isDevPreview && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-[-5%] h-[65vh] z-0"
            style={{
              // Halo elliptique vert de la charte (R212,G237,B49) façon maquette
              background: `radial-gradient(ellipse at center bottom,
                ${isDark ? 'rgba(212,237,49,0.70)' : 'rgba(212,237,49,0.95)'} 0%,
                rgba(212,237,49,0.55) 18%,
                rgba(212,237,49,0.28) 38%,
                rgba(212,237,49,0.12) 58%,
                rgba(212,237,49,0.00) 78%)`,
              // slight horizon shaping
              maskImage:
                "radial-gradient(135% 85% at 50% 105%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.6) 58%, rgba(0,0,0,0) 82%)",
              WebkitMaskImage:
                "radial-gradient(135% 85% at 50% 105%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.6) 58%, rgba(0,0,0,0) 82%)",
              filter: 'blur(18px)'
            }}
          />
        )}

        {/* Subtle horizon shadow for depth */}
        {false && isDevPreview && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-[-8%] h-[68vh] z-0"
            style={{
              background: isDark
                ? "radial-gradient(140% 90% at 50% 125%, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.12) 46%, rgba(0,0,0,0) 75%)"
                : "radial-gradient(140% 90% at 50% 125%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 46%, rgba(0,0,0,0) 75%)",
            }}
          />
        )}

        {/* Inner highlight for crisp horizon edge */}
        {false && isDevPreview && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-[-2%] h-[18vh] z-0"
            style={{
              background:
                isDark
                  ? "radial-gradient(85% 30% at 50% 100%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.25) 42%, rgba(255,255,255,0) 75%)"
                  : "radial-gradient(85% 30% at 50% 100%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.35) 42%, rgba(255,255,255,0) 75%)",
              mixBlendMode: isDark ? ("screen" as any) : ("normal" as any),
            }}
          />
        )}

        {/* Tiny stars (very subtle) */}
        {isDevPreview && (
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              opacity: isDark ? 0.25 : 0.12,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='10' cy='20' r='0.6'/%3E%3Ccircle cx='35' cy='15' r='0.8'/%3E%3Ccircle cx='70' cy='28' r='0.5'/%3E%3Ccircle cx='95' cy='12' r='0.7'/%3E%3Ccircle cx='50' cy='40' r='0.6'/%3E%3Ccircle cx='15' cy='55' r='0.7'/%3E%3Ccircle cx='85' cy='60' r='0.6'/%3E%3Ccircle cx='30' cy='75' r='0.5'/%3E%3Ccircle cx='60' cy='85' r='0.7'/%3E%3Ccircle cx='100' cy='90' r='0.6'/%3E%3Ccircle cx='45' cy='100' r='0.5'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "700px 700px",
              backgroundRepeat: "repeat",
            }}
          />
        )}

         <div
           className={cn(
             "max-w-[1250px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10 rounded-2xl border",
             isDark ? "border-white/10" : "border-black/5"
           )}
         >
           {/* Background pattern */}
          <div className="absolute inset-0 rounded-2xl -z-10">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "200px",
                opacity: isDark ? "0.25" : "0.04"
              }}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 py-4">
            {/* Left Column - Content */}
            <div className="flex items-start">
               <div className={cn(
                 "max-w-xl p-0 md:p-6 rounded-2xl",
                 "bg-transparent"
               )}>
                <h1
                  className={cn(
                    "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                    "font-bold tracking-[-1px]",
                    "text-black dark:text-white",
                    "leading-[1.1]",
                    "mb-6"
                  )}
                >
                  <span className="block">Discutons de votre</span>
                  <span className="block">
                    projet{" "}
                    <span
                      className="font-bold"
                      style={{
                        color: isDark
                          ? theme.colors.primary.main
                          : theme.colors.primary.dark,
                      }}
                    >
                      <UnderlinedText text="ensemble" className="font-bold" />
                    </span>
                  </span>
                </h1>

                <p
                  className={cn(
                    "text-lg md:text-xl",
                    "text-black dark:text-white",
                    "mb-8"
                  )}
                >
                  Que vous ayez une idée précise ou que vous cherchiez des
                  conseils, nous sommes là pour vous accompagner dans votre
                  transformation digitale.
                </p>

                <div className="space-y-6 mb-8">
                  {/* Email and Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(217, 255, 75, 0.1)"
                            : "rgba(217, 255, 75, 0.15)",
                          color: isDark
                            ? theme.colors.primary.light
                            : theme.colors.primary.dark,
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-medium mb-1",
                            isDark ? "text-white" : "text-black"
                          )}
                        >
                          Email
                        </h3>
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("contact-form")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className={cn(
                            "text-base hover:underline transition-all text-left",
                            isDark
                              ? "text-white hover:text-white"
                              : "text-black hover:text-black"
                          )}
                        >
                          Écrire via le formulaire
                        </button>
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div className="flex items-start gap-4">
                      <div
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(217, 255, 75, 0.1)"
                            : "rgba(217, 255, 75, 0.15)",
                          color: isDark
                            ? theme.colors.primary.light
                            : theme.colors.primary.dark,
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-medium mb-1",
                            isDark ? "text-white" : "text-black"
                          )}
                        >
                          Téléphone
                        </h3>
                        <a
                          href="tel:+33617125428"
                          className={cn(
                            "text-base hover:underline transition-all",
                            isDark
                              ? "text-white hover:text-white"
                              : "text-black hover:text-black"
                          )}
                        >
                          +33 6 17 12 54 28
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Localisation */}
                  <div className="flex items-start gap-4">
                    <div
                      className="mt-1 p-2 rounded-lg"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(217, 255, 75, 0.1)"
                          : "rgba(217, 255, 75, 0.15)",
                        color: isDark
                          ? theme.colors.primary.light
                          : theme.colors.primary.dark,
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black/90 dark:text-white/90 mb-1">
                        Adresse
                      </h3>
                      <p
                        className={cn(
                          "text-base",
                          isDark ? "text-white/70" : "text-black/70"
                        )}
                      >
                        Paris, France
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                     "rounded-2xl p-6 border backdrop-blur-md relative overflow-hidden",
                     "bg-transparent"
                   )}
                 >
                   {/* Halo effect inside the card */}
                   <div
                     className="pointer-events-none absolute inset-0 rounded-2xl"
                     style={{
                       background: isDark
                         ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
                         : `linear-gradient(to right, rgba(212,237,49,0.10) 0%, rgba(212,237,49,0.10) 60%, rgba(212,237,49,0) 100%)`,
                       filter: 'blur(20px)'
                     }}
                   />
                  <div className="flex items-start gap-4 relative z-10">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(217, 255, 75, 0.1)"
                          : "rgba(217, 255, 75, 0.15)",
                        color: isDark
                          ? theme.colors.primary.light
                          : theme.colors.primary.dark,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "text-lg font-semibold mb-2",
                          isDark ? "text-white" : "text-black"
                        )}
                      >
                        Réponse garantie sous 24h
                      </h3>
                      <p
                        className={cn(
                          "text-base leading-relaxed",
                          isDark ? "text-white/70" : "text-black/70"
                        )}
                      >
                        Notre équipe est à votre écoute pour répondre à toutes
                        vos questions et vous accompagner dans votre projet
                        digital.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:sticky lg:top-32">
              <div
                className={cn(
                   "w-full rounded-[32px] overflow-hidden border p-8 backdrop-blur-md",
                   isDark ? "bg-black/95 border-white/10" : "bg-white/95 border-black/5"
                 )}
              >
              {/* Defer form render to client to avoid hydration mismatch from password managers */}
              {!isClient && (
                <div className="min-h-[560px]" aria-hidden="true" />
              )}
              <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  id="contact-form"
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore
                  data-form-type="other"
                suppressHydrationWarning
                style={{ display: isClient ? undefined : "none" }}
                >
                  {/* Nom */}
                  <div>
                    <label
                      htmlFor="name"
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/90" : "text-black/90"
                      )}
                    >
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="off"
                      inputMode="text"
                      spellCheck={false}
                      data-lpignore="true"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border",
                        "focus:outline-none focus:ring-2 transition-all",
                        isDark
                          ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5"
                          : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5",
                        errors.name &&
                          "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      )}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email + Phone (grid) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className={cn(
                          "block text-sm font-medium mb-2",
                          isDark ? "text-white/90" : "text-black/90"
                        )}
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        inputMode="email"
                        spellCheck={false}
                        data-lpignore="true"
                        required
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border",
                          "focus:outline-none focus:ring-2 transition-all",
                          isDark
                            ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5"
                            : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5",
                          errors.email &&
                            "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        )}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className={cn(
                          "block text-sm font-medium mb-2",
                          isDark ? "text-white/90" : "text-black/90"
                        )}
                      >
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete="off"
                        inputMode="tel"
                        spellCheck={false}
                        data-lpignore="true"
                        required
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border",
                          "focus:outline-none focus:ring-2 transition-all",
                          isDark
                            ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5"
                            : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5",
                          errors.phone &&
                            "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        )}
                        placeholder="+33 6 12 34 56 78"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/90" : "text-black/90"
                      )}
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      autoComplete="off"
                      spellCheck={false}
                      data-lpignore="true"
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border",
                        "focus:outline-none focus:ring-2 transition-all",
                        isDark
                          ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5 placeholder:text-white/50"
                          : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5 placeholder:text-black/50",
                        errors.message &&
                          "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      )}
                      placeholder="Décrivez votre projet en quelques mots..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <CTAButton
                      variant="mainCTA"
                      className={cn(
                        "w-full justify-center",
                        !isDark &&
                          "!bg-[#E0FF5C] hover:!bg-black hover:!text-white",
                        isSubmitting && "opacity-50 pointer-events-none"
                      )}
                      type="submit"
                    >
                      {isSubmitting
                        ? "Envoi en cours..."
                        : "Envoyer le message"}
                    </CTAButton>
                  </div>

                  {submitStatus === "success" && (
                    <p className="text-sm text-center text-green-500">
                      Votre message a été envoyé avec succès !
                    </p>
                  )}

                  {submitStatus === "error" && (
                    <p className="text-sm text-center text-red-500">
                      Une erreur est survenue lors de l&apos;envoi. Veuillez
                      réessayer.
                    </p>
                  )}

                  <p
                    className={cn(
                      "text-sm text-center",
                      isDark ? "text-white/60" : "text-black/60"
                    )}
                  >
                    En soumettant ce formulaire, vous acceptez notre politique
                    de confidentialité
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <div
        className={cn("pt-0 pb-8 md:pt-0 md:pb-12", isDark ? "bg-black" : "bg-white")}
      >
        <Partners />
      </div>

      {/* PreFooter Section */}
      <div className={cn("relative z-10 w-full overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6")}>
        <div className="max-w-[1250px] mx-auto">
          <PreFooter noBgGradient />
        </div>
      </div>
    </div>
  );
}
