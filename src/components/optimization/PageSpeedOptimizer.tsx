'use client';

import { useEffect, useState } from 'react';
import LazyScriptLoader from './LazyScriptLoader';
import CriticalCSS from './CriticalCSS';
import PreconnectOptimizer from './PreconnectOptimizer';

interface PageSpeedOptimizerProps {
  children: React.ReactNode;
  enableLazyScripts?: boolean;
  enableCriticalCSS?: boolean;
  enablePreconnect?: boolean;
  enableImageOptimization?: boolean;
  enableFontOptimization?: boolean;
  enableResourceHints?: boolean;
  customScripts?: Array<{
    src: string;
    id?: string;
    async?: boolean;
    defer?: boolean;
    priority?: 'high' | 'medium' | 'low';
    delay?: number;
  }>;
  customDomains?: string[];
}

export default function PageSpeedOptimizer({
  children,
  enableLazyScripts = true,
  enableCriticalCSS = true,
  enablePreconnect = true,
  enableImageOptimization = true,
  enableFontOptimization = true,
  enableResourceHints = true,
  customScripts = [],
  customDomains = []
}: PageSpeedOptimizerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Optimisations côté client uniquement
  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    // Optimisation des performances générales
    const optimizePerformance = () => {
      // Désactiver les animations pour les utilisateurs qui préfèrent la réduction de mouvement
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--animation-iteration-count', '1');
      }

      // Optimiser le scroll
      let ticking = false;
      const optimizeScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Ici vous pouvez ajouter des optimisations de scroll
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', optimizeScroll, { passive: true });

      // Optimiser les interactions
      const optimizeInteractions = () => {
        // Utiliser requestIdleCallback pour les tâches non critiques
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            // Charger les scripts non critiques ici
            loadNonCriticalScripts();
          });
        } else {
          setTimeout(loadNonCriticalScripts, 2000);
        }
      };

      // Charger les scripts non critiques
      const loadNonCriticalScripts = () => {
        const nonCriticalScripts = [
          'https://platform.linkedin.com/in.js',
          'https://cdn.jsdelivr.net/npm/posthog-js@latest/dist/posthog.min.js'
        ];

        nonCriticalScripts.forEach((src, index) => {
          setTimeout(() => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
          }, index * 1000);
        });
      };

      // Délayer l'optimisation des interactions
      setTimeout(optimizeInteractions, 1000);

      return () => {
        window.removeEventListener('scroll', optimizeScroll);
      };
    };

    optimizePerformance();

    // Optimisation des images avec lazy loading avancé
    if (enableImageOptimization) {
      const optimizeImages = () => {
        // Utiliser le lazy loading natif du navigateur si disponible
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                
                // Ajouter un effet de fade-in
                img.style.transition = 'opacity 0.3s ease-in-out';
                img.style.opacity = '0';
                
                img.onload = () => {
                  img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
              }
            });
          }, {
            rootMargin: '50px 0px',
            threshold: 0.1
          });

          images.forEach(img => imageObserver.observe(img));
        }
      };

      // Délayer l'optimisation des images
      setTimeout(optimizeImages, 500);
    }

    // Optimisation des polices
    if (enableFontOptimization) {
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
          const href = googleFontsLink.getAttribute('href');
          if (href && !href.includes('display=swap')) {
            const separator = href.includes('?') ? '&' : '?';
            googleFontsLink.setAttribute('href', `${href}${separator}display=swap`);
          }
        }
      };

      optimizeFonts();
    }

  }, [isClient, enableImageOptimization, enableFontOptimization]);

  // CSS critique par défaut
  const defaultCriticalCSS = `
    body { 
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .container { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 1rem;
    }
    .btn { 
      display: inline-block; 
      padding: 0.75rem 1.5rem; 
      background: #007bff; 
      color: white; 
      text-decoration: none; 
      border-radius: 0.375rem;
      transition: background-color 0.2s ease;
    }
    .btn:hover { 
      background: #0056b3; 
    }
    .text-center { 
      text-align: center; 
    }
    .hidden { 
      display: none; 
    }
    .block { 
      display: block; 
    }
    .flex { 
      display: flex; 
    }
    .grid { 
      display: grid; 
    }
    .relative { 
      position: relative; 
    }
    .absolute { 
      position: absolute; 
    }
    .fixed { 
      position: fixed; 
    }
    .w-full { 
      width: 100%; 
    }
    .h-full { 
      height: 100%; 
    }
    .min-h-screen { 
      min-height: 100vh; 
    }
    .p-4 { 
      padding: 1rem; 
    }
    .m-4 { 
      margin: 1rem; 
    }
    .mb-4 { 
      margin-bottom: 1rem; 
    }
    .mt-4 { 
      margin-top: 1rem; 
    }
    .text-lg { 
      font-size: 1.125rem; 
    }
    .text-xl { 
      font-size: 1.25rem; 
    }
    .text-2xl { 
      font-size: 1.5rem; 
    }
    .font-bold { 
      font-weight: 700; 
    }
    .font-semibold { 
      font-weight: 600; 
    }
    .text-white { 
      color: white; 
    }
    .text-black { 
      color: black; 
    }
    .bg-white { 
      background-color: white; 
    }
    .bg-black { 
      background-color: black; 
    }
    .rounded { 
      border-radius: 0.25rem; 
    }
    .shadow { 
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
    }
  `;

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Optimisations de base */}
      {enableCriticalCSS && (
        <CriticalCSS 
          criticalCSS={defaultCriticalCSS}
          enableAsyncCSS={true}
          enablePreloadCSS={true}
        />
      )}

      {enablePreconnect && (
        <PreconnectOptimizer 
          domains={customDomains}
          enableDNS={true}
          enablePreconnect={true}
          enablePrefetch={true}
        />
      )}

      {enableLazyScripts && (
        <LazyScriptLoader
          scripts={customScripts}
          enableInteractionTrigger={true}
          enableScrollTrigger={true}
          enableViewportTrigger={true}
          triggerDelay={0}
        >
          {children}
        </LazyScriptLoader>
      )}

      {!enableLazyScripts && children}
    </>
  );
}
