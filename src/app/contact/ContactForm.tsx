'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { UnderlinedText } from '@/components/ui/underlined-text';
import { colors as theme } from '@/config/theme';
import Partners from '@/components/pages/home/partner/partner';
import { CTAButton } from '@/components/ui/cta-button';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (formData: FormData) => {
    const newErrors: {[key: string]: string} = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }

    const trimmedMessage = message?.trim() || '';
    if (!trimmedMessage || trimmedMessage.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formData = new FormData(e.currentTarget);
    
    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.send(
        'service_ggfkz62',
        'template_contact',
        {
          from_name: formData.get('name'),
          from_email: formData.get('email'),
          message: formData.get('message'),
          to_email: 'wladimir@uclic.fr',
        },
        'sNJezWZbNlGM1x_Pe'
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        e.currentTarget.reset();
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={cn(
        "w-full relative overflow-hidden pt-40 pb-16 md:pb-24"
      )}>
        {/* Base Background gradient */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isDark 
              ? `linear-gradient(180deg, ${theme.colors.common.black} 0%, ${theme.colors.common.black} 30%, ${theme.colors.primary.main}80)`
              : `linear-gradient(180deg, ${theme.colors.common.white}, ${theme.colors.primary.main})`
          }}
        />

        {/* Grain effect overlay */}
        <div 
          className={cn(
            "absolute inset-0 z-0 mix-blend-soft-light",
            isDark ? "opacity-90" : "opacity-50"
          )}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '100px 100px'
          }}
        />

        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Content */}
            <div className="flex items-start">
              <div className="max-w-xl">
                <h1 className={cn(
                  "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                  "font-bold tracking-[-1px]",
                  "text-black dark:text-white",
                  "leading-[1.1]",
                  "mb-6"
                )}>
                  <span className="block">Discutons de votre</span>
                  <span className="block">
                    projet{' '}
                    <span className="font-bold" style={{ color: isDark ? theme.colors.primary.main : theme.colors.primary.dark }}>
                      <UnderlinedText text="ensemble" className="font-bold" />
                    </span>
                  </span>
                </h1>
                
                <p className={cn(
                  "text-lg md:text-xl",
                  "text-black dark:text-white",
                  "mb-8"
                )}>
                  Que vous ayez une idée précise ou que vous cherchiez des conseils, nous sommes là pour vous accompagner dans votre transformation digitale.
                </p>

                <div className="space-y-6 mb-8">
                  {/* Email and Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div 
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                          color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={cn(
                          "text-lg font-medium mb-1",
                          isDark ? "text-white" : "text-black"
                        )}>Email</h3>
                        <a 
                          href="mailto:contact@uclic.fr" 
                          className={cn(
                            "text-base hover:underline transition-all",
                            isDark ? "text-white hover:text-white" : "text-black hover:text-black"
                          )}
                        >
                          contact@uclic.fr
                        </a>
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div className="flex items-start gap-4">
                      <div 
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                          color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={cn(
                          "text-lg font-medium mb-1",
                          isDark ? "text-white" : "text-black"
                        )}>Téléphone</h3>
                        <a 
                          href="tel:+33123456789" 
                          className={cn(
                            "text-base hover:underline transition-all",
                            isDark ? "text-white hover:text-white" : "text-black hover:text-black"
                          )}
                        >
                          +33 1 23 45 67 89
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Localisation */}
                  <div className="flex items-start gap-4">
                    <div 
                      className="mt-1 p-2 rounded-lg"
                      style={{
                        backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                        color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black/90 dark:text-white/90 mb-1">Adresse</h3>
                      <p className={cn(
                        "text-base",
                        isDark ? "text-white/70" : "text-black/70"
                      )}>
                        Paris, France
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className={cn(
                    "rounded-2xl p-6",
                    "border backdrop-blur-sm",
                    isDark ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                        color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-lg font-semibold mb-2",
                        isDark ? "text-white" : "text-black"
                      )}>
                        Réponse garantie sous 24h
                      </h3>
                      <p className={cn(
                        "text-base leading-relaxed",
                        isDark ? "text-white/70" : "text-black/70"
                      )}>
                        Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans votre projet digital.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:sticky lg:top-32">
              <div className={cn(
                "w-full rounded-[32px] overflow-hidden border p-8",
                isDark ? "bg-[#161616]" : "bg-white",
                isDark ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" : ""
              )}
              style={{
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border",
                        "focus:outline-none focus:ring-2 transition-all",
                        isDark 
                          ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5" 
                          : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5",
                        errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      )}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/90" : "text-black/90"
                      )}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border",
                        "focus:outline-none focus:ring-2 transition-all",
                        isDark 
                          ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5" 
                          : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5",
                        errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      )}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
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
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border",
                        "focus:outline-none focus:ring-2 transition-all",
                        isDark 
                          ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5 placeholder:text-white/50" 
                          : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5 placeholder:text-black/50",
                        errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      )}
                      placeholder="Décrivez votre projet en quelques mots..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <CTAButton 
                      variant="mainCTA"
                      className={cn(
                        "w-full justify-center",
                        !isDark && "!bg-[#E0FF5C] hover:!bg-black hover:!text-white",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </CTAButton>
                  </div>

                  {submitStatus === 'success' && (
                    <p className="text-sm text-center text-green-500">
                      Votre message a été envoyé avec succès !
                    </p>
                  )}

                  {submitStatus === 'error' && (
                    <p className="text-sm text-center text-red-500">
                      Une erreur est survenue lors de l'envoi. Veuillez réessayer.
                    </p>
                  )}

                  <p className={cn(
                    "text-sm text-center",
                    isDark ? "text-white/60" : "text-black/60"
                  )}>
                    En soumettant ce formulaire, vous acceptez notre politique de confidentialité
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <div className={cn(
        "py-12 md:py-16",
        isDark ? "bg-black" : "bg-[#F3F4F6]"
      )}>
        <Partners />
      </div>
    </>
  );
} 