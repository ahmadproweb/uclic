'use client';

import { useEffect, useState } from 'react';

interface CriticalCSSProps {
  criticalCSS?: string;
  nonCriticalCSS?: string[];
  enableAsyncCSS?: boolean;
  enablePreloadCSS?: boolean;
}

export default function CriticalCSS({
  criticalCSS,
  nonCriticalCSS = [],
  enableAsyncCSS = true,
  enablePreloadCSS = true
}: CriticalCSSProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Injecter le CSS critique immédiatement
    if (criticalCSS) {
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      style.setAttribute('data-critical', 'true');
      document.head.appendChild(style);
    }

    // Précharger les CSS non-critiques
    if (enablePreloadCSS && nonCriticalCSS.length > 0) {
      nonCriticalCSS.forEach((cssHref, index) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = cssHref;
        link.as = 'style';
        link.setAttribute('data-preload', 'true');
        document.head.appendChild(link);

        // Charger le CSS après un délai pour ne pas bloquer le rendu
        setTimeout(() => {
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = cssHref;
          cssLink.media = 'print';
          cssLink.onload = () => {
            cssLink.media = 'all';
            if (index === nonCriticalCSS.length - 1) {
              setIsLoaded(true);
            }
          };
          document.head.appendChild(cssLink);
        }, 100 * (index + 1));
      });
    }

    // Optimisation des polices
    const optimizeFonts = () => {
      // Précharger les polices critiques
      const criticalFonts = [
        { href: '/fonts/absans-regular.woff2', type: 'font/woff2' },
        { href: '/fonts/remixicon.woff2', type: 'font/woff2' }
      ];

      criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font.href;
        link.as = 'font';
        link.type = font.type;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Optimiser le chargement des Google Fonts
      const googleFontsLink = document.querySelector('link[href*="fonts.googleapis.com"]');
      if (googleFontsLink) {
        googleFontsLink.setAttribute('media', 'print');
        googleFontsLink.onload = () => {
          googleFontsLink.setAttribute('media', 'all');
        };
      }
    };

    optimizeFonts();

    // Optimisation des ressources externes
    const optimizeExternalResources = () => {
      // Délayer le chargement des scripts externes non critiques
      const externalScripts = document.querySelectorAll('script[src*="googletagmanager.com"], script[src*="facebook.net"], script[src*="linkedin.com"]');
      
      externalScripts.forEach((script, index) => {
        const originalSrc = script.getAttribute('src');
        if (originalSrc) {
          script.removeAttribute('src');
          script.setAttribute('data-src', originalSrc);
          
          // Charger après interaction utilisateur ou délai
          setTimeout(() => {
            script.setAttribute('src', originalSrc);
          }, 2000 + (index * 500));
        }
      });
    };

    // Délayer l'optimisation des ressources externes
    setTimeout(optimizeExternalResources, 1000);

  }, [criticalCSS, nonCriticalCSS, enableAsyncCSS, enablePreloadCSS]);

  return null;
}

// Hook pour gérer le CSS critique dynamiquement
export function useCriticalCSS() {
  const [criticalCSS, setCriticalCSS] = useState<string>('');

  const extractCriticalCSS = async (url: string) => {
    try {
      // En production, vous pourriez utiliser un service comme Critical CSS Generator
      // Pour l'instant, on retourne un CSS de base
      const baseCriticalCSS = `
        body { font-family: system-ui, -apple-system, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; }
        .btn { display: inline-block; padding: 0.5rem 1rem; }
        .text-center { text-align: center; }
        .hidden { display: none; }
        .block { display: block; }
        .flex { display: flex; }
        .grid { display: grid; }
      `;
      
      setCriticalCSS(baseCriticalCSS);
    } catch (error) {
      console.warn('Failed to extract critical CSS:', error);
    }
  };

  return {
    criticalCSS,
    extractCriticalCSS
  };
}
