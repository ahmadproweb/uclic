'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface LazyGoogleAnalyticsProps {
  children: React.ReactNode;
}

export default function LazyGoogleAnalytics({ children }: LazyGoogleAnalyticsProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleAnalytics = () => {
      if (isLoaded) return;
      
      // Vérifier si GTM est déjà chargé
      if (window.gtag) {
        setIsLoaded(true);
        return;
      }

      // Charger GTM de manière asynchrone
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      script.async = true;
      script.defer = true;
      script.id = 'google-analytics';
      
      script.onload = () => {
        // Initialiser gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer?.push(args);
        }
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
          send_page_view: false // Éviter l'envoi automatique
        });
        
        console.log('Google Analytics loaded lazily');
        setIsLoaded(true);
      };

      script.onerror = () => {
        console.warn('Failed to load Google Analytics');
        setIsLoaded(true);
      };

      document.head.appendChild(script);
    };

    // Déclencheurs d'interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    let triggered = false;

    const handleInteraction = () => {
      if (!triggered) {
        triggered = true;
        // Délayer le chargement de GA
        setTimeout(loadGoogleAnalytics, 3000);
        
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

    // Charger GA après 15 secondes même sans interaction
    const fallbackTimer = setTimeout(() => {
      if (!triggered) {
        loadGoogleAnalytics();
      }
    }, 15000);

    return () => {
      clearTimeout(fallbackTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [isLoaded]);

  return <>{children}</>;
}
