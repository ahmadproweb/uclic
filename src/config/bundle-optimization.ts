
// Configuration d'optimisation du bundle
export const bundleOptimizations = {
  "chunkSizeWarningLimit": 1000,
  "optimizeImports": {
    "lucide-react": {
      "transform": "lucide-react/dist/esm/icons/{{kebabCase member}}",
      "skipDefaultConversion": true
    },
    "date-fns": {
      "transform": "date-fns/{{member}}",
      "skipDefaultConversion": true
    }
  },
  "webpackConfig": {
    "optimization": {
      "splitChunks": {
        "chunks": "all",
        "cacheGroups": {
          "vendor": {
            "test": {},
            "name": "vendors",
            "chunks": "all",
            "priority": 10
          },
          "common": {
            "name": "common",
            "minChunks": 2,
            "chunks": "all",
            "priority": 5,
            "reuseExistingChunk": true
          }
        }
      }
    }
  }
};

// Fonction pour optimiser les imports dynamiques
export function optimizeDynamicImports() {
  // Lazy loading des composants lourds
  const lazyComponents = {
    PostHog: () => import('@/components/optimization/LazyPostHog'),
    GoogleAnalytics: () => import('@/components/optimization/LazyGoogleAnalytics'),
    VideoPopup: () => import('@/components/ui/VideoPopup'),
    HubspotChat: () => import('@/components/ui/HubspotChat')
  };

  return lazyComponents;
}

// Fonction pour précharger les ressources critiques
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  const criticalResources = [
    { href: '/logo.png', as: 'image' },
    { href: '/heroo.png', as: 'image' },
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
}
