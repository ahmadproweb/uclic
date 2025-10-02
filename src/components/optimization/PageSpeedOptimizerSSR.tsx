'use client';

import { useEffect, useState } from 'react';

interface PageSpeedOptimizerSSRProps {
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

export default function PageSpeedOptimizerSSR({
  children,
  enableLazyScripts = true,
  enableCriticalCSS = true,
  enablePreconnect = true,
  enableImageOptimization = true,
  enableFontOptimization = true,
  enableResourceHints = true,
  customScripts = [],
  customDomains = []
}: PageSpeedOptimizerSSRProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Optimisations côté client uniquement
  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    // Injecter le CSS critique
    if (enableCriticalCSS) {
      const style = document.createElement('style');
      style.textContent = defaultCriticalCSS;
      style.setAttribute('data-critical', 'true');
      document.head.appendChild(style);
    }

    // Préconnexion aux domaines
    if (enablePreconnect) {
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com',
        'https://api.uclic.fr',
        'https://ph-files.imgix.net',
        'https://secure.gravatar.com',
        ...customDomains
      ];

      domains.forEach(domain => {
        // DNS Prefetch
        const dnsLink = document.createElement('link');
        dnsLink.rel = 'dns-prefetch';
        dnsLink.href = domain;
        document.head.appendChild(dnsLink);

        // Preconnect pour les domaines critiques
        if (domain.includes('fonts.googleapis.com') || domain.includes('api.uclic.fr')) {
          const preconnectLink = document.createElement('link');
          preconnectLink.rel = 'preconnect';
          preconnectLink.href = domain;
          preconnectLink.crossOrigin = 'anonymous';
          document.head.appendChild(preconnectLink);
        }
      });
    }

    // Optimisation des polices
    if (enableFontOptimization) {
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
    }

    // Lazy loading des scripts
    if (enableLazyScripts && customScripts.length > 0) {
      const loadScript = (script: any) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script.src;
        scriptElement.async = script.async !== false;
        scriptElement.defer = script.defer !== false;
        
        if (script.id) {
          scriptElement.id = script.id;
        }

        scriptElement.onload = () => {
          console.log(`Script loaded: ${script.src}`);
        };

        scriptElement.onerror = () => {
          console.warn(`Failed to load script: ${script.src}`);
        };

        document.head.appendChild(scriptElement);
      };

      // Charger les scripts avec délai
      customScripts.forEach((script, index) => {
        const delay = script.delay || 0;
        setTimeout(() => {
          loadScript(script);
        }, delay + (index * 500));
      });
    }

    // Optimisation des images
    if (enableImageOptimization) {
      const optimizeImages = () => {
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

  }, [isClient, enableCriticalCSS, enablePreconnect, enableFontOptimization, enableLazyScripts, enableImageOptimization, customScripts, customDomains]);

  if (!isClient) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
