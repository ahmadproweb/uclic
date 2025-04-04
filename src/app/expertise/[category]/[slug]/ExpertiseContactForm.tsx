'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ExpertiseContactForm() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    emailjs.init('sNJezWZbNlGM1x_Pe');
  }, []);

  const validateForm = (formData: FormData) => {
    const newErrors: {[key: string]: string} = {};

    // Validation du nom
    const name = formData.get('name') as string;
    if (!name) {
      newErrors.name = 'Le nom est requis';
    } else if (name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    const email = formData.get('email') as string;
    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    // Validation du téléphone
    const phone = formData.get('phone') as string;
    if (!phone) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^(\+33|0)[1-9](\d{2}){4}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Le format du téléphone n\'est pas valide';
    }

    // Validation du message
    const message = formData.get('message') as string;
    if (!message) {
      newErrors.message = 'Le message est requis';
    } else if (message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    
    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.send(
        'service_gxm9sft',
        'template_jkryos1',
        {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          phone: formData.get('phone'),
        },
      );

      if (result.text === 'OK') {
        setSubmitStatus('success');
        formRef.current?.reset();
        setErrors({});
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
    <div className="w-full h-full max-w-md mx-auto">
      <div className={cn(
        "w-full h-full rounded-2xl p-8",
        "border backdrop-blur-sm",
        isDark ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5"
      )}>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/90" : "text-black/90"
              )}
            >
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "border backdrop-blur-sm transition-all duration-200",
                "focus:outline-none focus:ring-2",
                isDark 
                  ? "bg-black/20 border-white/10 text-white focus:ring-[#E0FF5C]/50"
                  : "bg-white/80 border-black/5 text-black focus:ring-[#E0FF5C]",
                errors.name && "border-red-500 focus:ring-red-500"
              )}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="email" 
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/90" : "text-black/90"
              )}
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "border backdrop-blur-sm transition-all duration-200",
                "focus:outline-none focus:ring-2",
                isDark 
                  ? "bg-black/20 border-white/10 text-white focus:ring-[#E0FF5C]/50"
                  : "bg-white/80 border-black/5 text-black focus:ring-[#E0FF5C]",
                errors.email && "border-red-500 focus:ring-red-500"
              )}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
              Téléphone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "border backdrop-blur-sm transition-all duration-200",
                "focus:outline-none focus:ring-2",
                isDark 
                  ? "bg-black/20 border-white/10 text-white focus:ring-[#E0FF5C]/50"
                  : "bg-white/80 border-black/5 text-black focus:ring-[#E0FF5C]",
                errors.phone && "border-red-500 focus:ring-red-500"
              )}
              placeholder="+33 1 23 45 67 89"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="message" 
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/90" : "text-black/90"
              )}
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={cn(
                "w-full px-4 py-3 rounded-xl",
                "border backdrop-blur-sm transition-all duration-200",
                "focus:outline-none focus:ring-2",
                isDark 
                  ? "bg-black/20 border-white/10 text-white focus:ring-[#E0FF5C]/50"
                  : "bg-white/80 border-black/5 text-black focus:ring-[#E0FF5C]",
                errors.message && "border-red-500 focus:ring-red-500"
              )}
              placeholder="Décrivez votre projet..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full py-3 px-4 bg-[#E0FF5C] text-black hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-[#E0FF5C]/90 rounded-full font-bold transition-all duration-200",
              isSubmitting && "opacity-50 cursor-not-allowed"
            )}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </button>

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
        </form>
      </div>
    </div>
  );
} 