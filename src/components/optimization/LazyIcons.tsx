'use client';

import { lazy, Suspense, useState, useEffect } from 'react';

// Composant de fallback pour les icônes
const IconFallback = ({ className }: { className?: string }) => (
  <div className={`w-4 h-4 bg-gray-300 rounded animate-pulse ${className}`} />
);

// Lazy loading pour les icônes Lucide
const createLazyIcon = (iconName: string) => {
  return lazy(() => 
    import('lucide-react').then(module => ({
      default: (module as any)[iconName] || (() => <IconFallback />)
    }))
  );
};

// Icônes les plus utilisées
export const LazyChevronDown = createLazyIcon('ChevronDown');
export const LazyMenu = createLazyIcon('Menu');
export const LazyX = createLazyIcon('X');
export const LazySearch = createLazyIcon('Search');
export const LazyUser = createLazyIcon('User');
export const LazyMail = createLazyIcon('Mail');
export const LazyPhone = createLazyIcon('Phone');
export const LazyArrowRight = createLazyIcon('ArrowRight');
export const LazyPlay = createLazyIcon('Play');
export const LazyExternalLink = createLazyIcon('ExternalLink');

interface LazyIconProps {
  className?: string;
  size?: number;
  [key: string]: any;
}

// Wrapper pour les icônes lazy
export function LazyIconWrapper({ 
  Icon, 
  fallback, 
  className, 
  ...props 
}: { 
  Icon: React.ComponentType<any>;
  fallback?: React.ReactNode;
  className?: string;
} & LazyIconProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Charger l'icône seulement si elle est visible ou après interaction
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('icon-container');
    if (element) {
      observer.observe(element);
    }

    // Fallback après 2 secondes
    const timer = setTimeout(() => setShouldLoad(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  if (!shouldLoad) {
    return fallback || <IconFallback className={className} />;
  }

  return (
    <Suspense fallback={fallback || <IconFallback className={className} />}>
      <Icon className={className} {...props} />
    </Suspense>
  );
}
