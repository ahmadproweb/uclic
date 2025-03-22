const CACHE_VERSION = 'v1';
const CACHE_NAME = `uclic-cache-${CACHE_VERSION}`;
const RUNTIME_CACHE = 'runtime-cache';

// Ressources à mettre en cache immédiatement
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Stratégies de cache par type de ressource
const CACHE_STRATEGIES = {
  images: 'cache-first',
  fonts: 'cache-first',
  scripts: 'network-first',
  styles: 'network-first',
  documents: 'network-first',
  api: 'network-first'
};

// Cache pour les ressources statiques WordPress
const WP_CACHE_NAME = 'uclic-wp-cache-v1';

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Mise en cache des ressources essentielles
      caches.open(CACHE_NAME).then(cache => {
        console.debug('[SW] Pre-caching assets');
        return cache.addAll(PRECACHE_ASSETS);
      }),
      // Mise en cache des polices
      caches.open('font-cache').then(cache => {
        return cache.addAll([
          'https://fonts.gstatic.com/s/inter/v1/inter-latin-400.woff2',
          'https://fonts.gstatic.com/s/inter/v1/inter-latin-500.woff2',
          'https://fonts.gstatic.com/s/inter/v1/inter-latin-600.woff2',
          'https://fonts.gstatic.com/s/inter/v1/inter-latin-700.woff2'
        ]);
      })
    ]).then(() => {
      console.debug('[SW] Installation complete');
      self.skipWaiting();
    })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Nettoyage des anciens caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName.startsWith('uclic-cache-') && 
              cacheName !== CACHE_NAME
            )
            .map(cacheName => {
              console.debug('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Revendication des clients
      self.clients.claim()
    ])
  );
});

// Gestion des requêtes
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non GET
  if (event.request.method !== 'GET') return;

  // Ignorer les requêtes d'analytics et de tracking
  if (event.request.url.includes('/analytics') || 
      event.request.url.includes('/tracking')) {
    return;
  }

  const url = new URL(event.request.url);
  
  // Déterminer la stratégie de cache en fonction du type de ressource
  let strategy = CACHE_STRATEGIES.documents;
  
  if (url.pathname.match(/\.(jpe?g|png|gif|svg|webp)$/)) {
    strategy = CACHE_STRATEGIES.images;
  } else if (url.pathname.match(/\.(woff2?|ttf|eot)$/)) {
    strategy = CACHE_STRATEGIES.fonts;
  } else if (url.pathname.match(/\.(js|mjs)$/)) {
    strategy = CACHE_STRATEGIES.scripts;
  } else if (url.pathname.match(/\.css$/)) {
    strategy = CACHE_STRATEGIES.styles;
  } else if (url.pathname.startsWith('/api/')) {
    strategy = CACHE_STRATEGIES.api;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(RUNTIME_CACHE);

      // Stratégie Cache First
      if (strategy === 'cache-first') {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          // Mise à jour en arrière-plan
          event.waitUntil(
            fetch(event.request)
              .then(response => cache.put(event.request, response))
              .catch(() => {})
          );
          return cachedResponse;
        }
      }

      // Stratégie Network First
      try {
        const response = await fetch(event.request);
        if (response.ok) {
          event.waitUntil(cache.put(event.request, response.clone()));
          return response;
        }
      } catch (error) {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Retourner la page hors-ligne pour les documents HTML
        if (event.request.mode === 'navigate') {
          return cache.match('/offline.html');
        }
      }

      // Fallback pour les images
      if (strategy === CACHE_STRATEGIES.images) {
        return cache.match('/icons/icon-512x512.png');
      }

      return new Response('Resource not found', { status: 404 });
    })()
  );
});

// Stratégie de mise en cache: Network-first pour les pages HTML, Cache-first pour les assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Ne pas intercepter les requêtes vers l'API
  if (url.pathname.startsWith('/api/')) {
    return;
  }
  
  // Pour les ressources WordPress (images, etc.)
  if (url.hostname === 'uclic.fr' && url.pathname.includes('/wp-content/uploads/')) {
    event.respondWith(
      caches.open(WP_CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            // Si trouvé dans le cache, retourner
            return response;
          }
          
          // Sinon, aller chercher sur le réseau
          return fetch(event.request).then(response => {
            // Mettre en cache une copie de la réponse
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => {
            // En cas d'erreur réseau, essayer de retourner une image de secours
            return caches.match('/icons/icon-152x152.png');
          });
        });
      })
    );
    return;
  }
  
  // Images et autres ressources statiques: stratégie Cache First
  if (
    event.request.method === 'GET' &&
    (
      event.request.destination === 'image' ||
      event.request.destination === 'style' ||
      event.request.destination === 'script' ||
      event.request.destination === 'font'
    )
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request).then(response => {
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      })
    );
    return;
  }
  
  // Pour les pages HTML: stratégie Network First
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open(CACHE_NAME).then(cache => {
          return cache.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Si pas de connexion et pas en cache, retourner une page hors-ligne
            return caches.match('/');
          });
        });
      })
    );
    return;
  }
  
  // Pour le reste: stratégie Network First
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
}); 