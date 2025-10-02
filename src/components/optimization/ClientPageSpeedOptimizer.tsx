'use client';

import PageSpeedOptimizerSSR from './PageSpeedOptimizerSSR';

interface ClientPageSpeedOptimizerProps {
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

export default function ClientPageSpeedOptimizer(props: ClientPageSpeedOptimizerProps) {
  return <PageSpeedOptimizerSSR {...props} />;
}
