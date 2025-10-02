'use client';

import { Suspense, lazy, ComponentType, useState, useEffect } from 'react';

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  delay?: number;
  [key: string]: any;
}

export default function LazyComponent({ 
  component, 
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded" />,
  delay = 0,
  ...props 
}: LazyComponentProps) {
  const LazyComponent = lazy(() => {
    return new Promise<{ default: ComponentType<any> }>((resolve) => {
      setTimeout(() => {
        resolve(component());
      }, delay);
    });
  });

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Composants lazy pré-configurés
export const LazyVideoPopup = (props: any) => (
  <LazyComponent
    component={() => import('@/components/ui/VideoPopup')}
    delay={1000}
    {...props}
  />
);

export const LazyHubspotChat = (props: any) => (
  <LazyComponent
    component={() => import('@/components/ui/HubspotChat')}
    delay={2000}
    {...props}
  />
);

export const LazyAnalytics = (props: any) => (
  <LazyComponent
    component={() => import('@/components/GoogleAnalytics')}
    delay={3000}
    {...props}
  />
);

// Hook pour le lazy loading conditionnel
export function useLazyLoad(condition: boolean, delay: number = 0) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (condition) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [condition, delay]);

  return shouldLoad;
}
