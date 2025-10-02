'use client';

import { useEffect } from 'react';

interface PreconnectOptimizerProps {
  domains?: string[];
  enableDNS?: boolean;
  enablePreconnect?: boolean;
  enablePrefetch?: boolean;
}

export default function PreconnectOptimizer({
  domains = [],
  enableDNS = true,
  enablePreconnect = true,
  enablePrefetch = true
}: PreconnectOptimizerProps) {
  useEffect(() => {
    // Domaines par défaut pour l'optimisation
    const defaultDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://api.uclic.fr',
      'https://ph-files.imgix.net',
      'https://secure.gravatar.com',
      'https://cdn.jsdelivr.net',
      'https://platform.linkedin.com',
      'https://www.linkedin.com'
    ];

    const allDomains = [...defaultDomains, ...domains];

    const addResourceHints = () => {
      allDomains.forEach(domain => {
        // DNS Prefetch
        if (enableDNS) {
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = domain;
          document.head.appendChild(dnsLink);
        }

        // Preconnect pour les domaines critiques
        if (enablePreconnect && isCriticalDomain(domain)) {
          const preconnectLink = document.createElement('link');
          preconnectLink.rel = 'preconnect';
          preconnectLink.href = domain;
          preconnectLink.crossOrigin = 'anonymous';
          document.head.appendChild(preconnectLink);
        }

        // Prefetch pour les ressources moins critiques
        if (enablePrefetch && !isCriticalDomain(domain)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = domain;
          document.head.appendChild(prefetchLink);
        }
      });
    };

    // Déterminer si un domaine est critique
    const isCriticalDomain = (domain: string): boolean => {
      const criticalPatterns = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'api.uclic.fr',
        'ph-files.imgix.net'
      ];
      
      return criticalPatterns.some(pattern => domain.includes(pattern));
    };

    // Ajouter les hints de ressources
    addResourceHints();

    // Optimisation des polices Google
    const optimizeGoogleFonts = () => {
      const googleFontsLink = document.querySelector('link[href*="fonts.googleapis.com"]');
      if (googleFontsLink) {
        // Ajouter display=swap pour éviter le FOIT (Flash of Invisible Text)
        const href = googleFontsLink.getAttribute('href');
        if (href && !href.includes('display=swap')) {
          const separator = href.includes('?') ? '&' : '?';
          googleFontsLink.setAttribute('href', `${href}${separator}display=swap`);
        }
      }
    };

    // Optimiser les Google Fonts
    optimizeGoogleFonts();

    // Précharger les ressources critiques
    const preloadCriticalResources = () => {
      const criticalResources = [
        { href: '/logo.png', as: 'image' },
        { href: '/heroo.png', as: 'image' },
        { href: '/backgroundeffect.png', as: 'image' },
        { href: '/fonts/absans-regular.woff2', as: 'font', type: 'font/woff2' },
        { href: '/fonts/remixicon.woff2', as: 'font', type: 'font/woff2' }
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) {
          link.type = resource.type;
        }
        if (resource.as === 'font') {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      });
    };

    // Précharger les ressources critiques
    preloadCriticalResources();

    // Optimisation des images avec lazy loading
    const optimizeImageLoading = () => {
      const images = document.querySelectorAll('img[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const src = img.getAttribute('data-src');
              if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        }, {
          rootMargin: '50px 0px'
        });

        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Délayer l'optimisation des images pour ne pas bloquer le rendu initial
    setTimeout(optimizeImageLoading, 100);

  }, [domains, enableDNS, enablePreconnect, enablePrefetch]);

  return null;
}
