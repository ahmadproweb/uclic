'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyScriptConfig {
  src: string;
  id?: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  priority?: 'high' | 'medium' | 'low';
  triggerEvents?: string[];
  delay?: number;
}

interface UseLazyScriptsOptions {
  scripts: LazyScriptConfig[];
  triggerOnInteraction?: boolean;
  triggerOnScroll?: boolean;
  triggerOnViewport?: boolean;
  triggerDelay?: number;
}

export function useLazyScripts({
  scripts,
  triggerOnInteraction = true,
  triggerOnScroll = true,
  triggerOnViewport = true,
  triggerDelay = 0
}: UseLazyScriptsOptions) {
  const [loadedScripts, setLoadedScripts] = useState<Set<string>>(new Set());
  const [isTriggered, setIsTriggered] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour charger un script
  const loadScript = (script: LazyScriptConfig): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (loadedScripts.has(script.src)) {
        resolve();
        return;
      }

      const scriptElement = document.createElement('script');
      scriptElement.src = script.src;
      scriptElement.async = script.async !== false;
      scriptElement.defer = script.defer !== false;
      
      if (script.id) {
        scriptElement.id = script.id;
      }

      scriptElement.onload = () => {
        setLoadedScripts(prev => new Set([...prev, script.src]));
        script.onLoad?.();
        resolve();
      };

      scriptElement.onerror = () => {
        script.onError?.();
        reject(new Error(`Failed to load script: ${script.src}`));
      };

      document.head.appendChild(scriptElement);
    });
  };

  // Fonction pour charger les scripts par priorité
  const loadScriptsByPriority = async () => {
    const highPriority = scripts.filter(s => s.priority === 'high' || !s.priority);
    const mediumPriority = scripts.filter(s => s.priority === 'medium');
    const lowPriority = scripts.filter(s => s.priority === 'low');

    // Charger les scripts haute priorité immédiatement
    for (const script of highPriority) {
      try {
        await loadScript(script);
      } catch (error) {
        console.warn('Failed to load high priority script:', script.src, error);
      }
    }

    // Charger les scripts moyenne priorité avec un délai
    setTimeout(async () => {
      for (const script of mediumPriority) {
        try {
          await loadScript(script);
        } catch (error) {
          console.warn('Failed to load medium priority script:', script.src, error);
        }
      }
    }, 100);

    // Charger les scripts basse priorité avec un délai plus long
    setTimeout(async () => {
      for (const script of lowPriority) {
        try {
          await loadScript(script);
        } catch (error) {
          console.warn('Failed to load low priority script:', script.src, error);
        }
      }
    }, 500);
  };

  // Gestionnaire d'interactions
  const handleInteraction = () => {
    if (!isTriggered) {
      setIsTriggered(true);
      
      if (triggerDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          loadScriptsByPriority();
        }, triggerDelay);
      } else {
        loadScriptsByPriority();
      }
    }
  };

  // Gestionnaire de scroll
  const handleScroll = () => {
    if (triggerOnScroll && !isTriggered) {
      handleInteraction();
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (!triggerOnInteraction && !triggerOnScroll && !triggerOnViewport) {
      // Si aucune interaction n'est requise, charger immédiatement
      loadScriptsByPriority();
      return;
    }

    // Événements d'interaction
    if (triggerOnInteraction) {
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      events.forEach(event => {
        document.addEventListener(event, handleInteraction, { passive: true, once: true });
      });
    }

    // Événement de scroll
    if (triggerOnScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Intersection Observer pour le viewport
    if (triggerOnViewport) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isTriggered) {
              handleInteraction();
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observer le body pour détecter quand la page est visible
      observerRef.current.observe(document.body);
    }

    return () => {
      // Nettoyage
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });

      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerOnInteraction, triggerOnScroll, triggerOnViewport, triggerDelay]);

  return {
    loadedScripts: Array.from(loadedScripts),
    isTriggered,
    loadScript: (script: LazyScriptConfig) => loadScript(script),
    loadAllScripts: loadScriptsByPriority
  };
}
