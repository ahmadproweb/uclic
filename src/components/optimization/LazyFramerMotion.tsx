'use client';

import { lazy, Suspense, useState, useEffect } from 'react';

// Composant de fallback optimisé
const FallbackComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className="animate-pulse">{children}</div>;
};

// Lazy loading pour Framer Motion
const LazyMotion = lazy(() => import('framer-motion').then(module => ({
  default: ({ children, ...props }: any) => {
    const MotionDiv = module.motion.div;
    return <MotionDiv {...props}>{children}</MotionDiv>;
  }
})));

interface LazyFramerMotionProps {
  children: React.ReactNode;
  [key: string]: any;
}

export default function LazyFramerMotion({ children, ...props }: LazyFramerMotionProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Charger Framer Motion seulement après interaction ou scroll
    const events = ['scroll', 'mousedown', 'touchstart', 'keydown'];
    
    const handleInteraction = () => {
      setShouldLoad(true);
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };

    // Délai initial pour éviter le chargement immédiat
    const timer = setTimeout(() => {
      events.forEach(event => {
        document.addEventListener(event, handleInteraction, { passive: true, once: true });
      });
    }, 1000);

    // Fallback après 5 secondes
    const fallbackTimer = setTimeout(() => {
      setShouldLoad(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  if (!shouldLoad) {
    return <FallbackComponent>{children}</FallbackComponent>;
  }

  return (
    <Suspense fallback={<FallbackComponent>{children}</FallbackComponent>}>
      <LazyMotion {...props}>
        {children}
      </LazyMotion>
    </Suspense>
  );
}
