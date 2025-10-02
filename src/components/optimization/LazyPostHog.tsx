'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    posthog?: any;
  }
}

interface LazyPostHogProps {
  children: React.ReactNode;
}

export default function LazyPostHog({ children }: LazyPostHogProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Version simplifiée - juste retarder PostHog
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 10000); // Charger après 10 secondes

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <>{children}</>;
}
