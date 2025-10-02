'use client';

import { useLazyScripts } from '@/hooks/useLazyScripts';
import { useEffect } from 'react';

interface LazyScriptLoaderProps {
  children: React.ReactNode;
  scripts?: Array<{
    src: string;
    id?: string;
    async?: boolean;
    defer?: boolean;
    priority?: 'high' | 'medium' | 'low';
    triggerEvents?: string[];
    delay?: number;
  }>;
  enableInteractionTrigger?: boolean;
  enableScrollTrigger?: boolean;
  enableViewportTrigger?: boolean;
  triggerDelay?: number;
}

export default function LazyScriptLoader({
  children,
  scripts = [],
  enableInteractionTrigger = true,
  enableScrollTrigger = true,
  enableViewportTrigger = true,
  triggerDelay = 0
}: LazyScriptLoaderProps) {
  const { loadedScripts, isTriggered } = useLazyScripts({
    scripts: scripts.map(script => ({
      ...script,
      onLoad: () => {
        console.log(`Script loaded: ${script.src}`);
      },
      onError: () => {
        console.warn(`Failed to load script: ${script.src}`);
      }
    })),
    triggerOnInteraction: enableInteractionTrigger,
    triggerOnScroll: enableScrollTrigger,
    triggerOnViewport: enableViewportTrigger,
    triggerDelay
  });

  // Scripts par défaut pour l'optimisation
  const defaultScripts = [
    // Scripts de tracking (basse priorité)
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
      id: 'google-analytics',
      async: true,
      priority: 'low' as const,
      delay: 2000
    },
    // Scripts de réseaux sociaux (moyenne priorité)
    {
      src: 'https://platform.linkedin.com/in.js',
      id: 'linkedin-script',
      async: true,
      priority: 'medium' as const,
      delay: 1000
    },
    // Scripts d'analytics avancés (basse priorité)
    {
      src: 'https://cdn.jsdelivr.net/npm/posthog-js@latest/dist/posthog.min.js',
      id: 'posthog-script',
      async: true,
      priority: 'low' as const,
      delay: 3000
    }
  ];

  const allScripts = [...defaultScripts, ...scripts];

  useEffect(() => {
    // Précharger les ressources critiques
    const preloadCriticalResources = () => {
      // Précharger les polices critiques
      const fontPreloads = [
        { href: '/fonts/absans-regular.woff', as: 'font', type: 'font/woff', crossorigin: 'anonymous' },
        { href: '/fonts/remixicon.woff', as: 'font', type: 'font/woff', crossorigin: 'anonymous' }
      ];

      fontPreloads.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font.href;
        link.as = font.as;
        link.type = font.type;
        if (font.crossorigin) {
          link.crossOrigin = font.crossorigin;
        }
        document.head.appendChild(link);
      });

      // Précharger les images critiques
      const criticalImages = [
        '/logo.png',
        '/heroo.png',
        '/backgroundeffect.png'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    preloadCriticalResources();
  }, []);

  return (
    <>
      {children}
      
      {/* Indicateur de chargement des scripts (optionnel, pour le debug) */}
      {process.env.NODE_ENV === 'development' && (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '10px', 
            right: '10px', 
            background: 'rgba(0,0,0,0.8)', 
            color: 'white', 
            padding: '8px', 
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 9999
          }}
        >
          Scripts chargés: {loadedScripts.length}/{allScripts.length}
          {isTriggered && ' (Déclenché)'}
        </div>
      )}
    </>
  );
}
