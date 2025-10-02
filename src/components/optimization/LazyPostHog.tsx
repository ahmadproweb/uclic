'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    posthog?: any;
  }
}

interface LazyPostHogProps {
  children: React.ReactNode;
}

export default function LazyPostHog({ children }: LazyPostHogProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Charger PostHog seulement après une interaction utilisateur
    const loadPostHog = () => {
      if (isLoaded) return;
      
      // Vérifier si PostHog est déjà chargé
      if (window.posthog) {
        setIsLoaded(true);
        return;
      }

      // Charger PostHog de manière asynchrone
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/posthog-js@latest/dist/posthog.min.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Initialiser PostHog seulement après le chargement
        if (window.posthog) {
          window.posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            loaded: (posthog: any) => {
              console.log('PostHog loaded lazily');
              setIsLoaded(true);
            }
          });
        }
      };

      script.onerror = () => {
        console.warn('Failed to load PostHog');
        setIsLoaded(true); // Marquer comme chargé pour éviter les tentatives répétées
      };

      document.head.appendChild(script);
    };

    // Déclencheurs d'interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    let triggered = false;

    const handleInteraction = () => {
      if (!triggered) {
        triggered = true;
        // Délayer le chargement de PostHog
        setTimeout(loadPostHog, 2000);
        
        // Supprimer les listeners
        events.forEach(event => {
          document.removeEventListener(event, handleInteraction);
        });
      }
    };

    // Ajouter les listeners
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { passive: true, once: true });
    });

    // Charger PostHog après 10 secondes même sans interaction
    const fallbackTimer = setTimeout(() => {
      if (!triggered) {
        loadPostHog();
      }
    }, 10000);

    return () => {
      clearTimeout(fallbackTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [isLoaded]);

  return <>{children}</>;
}
