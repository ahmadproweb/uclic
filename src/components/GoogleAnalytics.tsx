'use client';

import { useEffect, useState } from 'react';

export default function Analytics() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Charger Google Analytics seulement après une interaction utilisateur
    const loadAnalytics = () => {
      if (isLoaded) return;
      
      // Vérifier si GTM est déjà chargé
      if (window.dataLayer) {
        setIsLoaded(true);
        return;
      }

      // Charger Google Tag Manager de manière asynchrone
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-P6CSQ32');
      `;
      script.async = true;
      
      script.onload = () => {
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
        // Délayer le chargement de Google Analytics
        setTimeout(loadAnalytics, 3000);
        
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

    // Charger après 15 secondes même sans interaction
    const fallbackTimer = setTimeout(() => {
      if (!triggered) {
        loadAnalytics();
      }
    }, 15000);

    return () => {
      clearTimeout(fallbackTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [isLoaded]);

  return null;
}

declare global {
  interface Window {
    dataLayer?: any[];
  }
} 