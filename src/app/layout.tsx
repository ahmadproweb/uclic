import Footer from "@/components/footer/Footer";
import Analytics from "@/components/GoogleAnalytics";
import Header from "@/components/header/Header";
import { PHProvider } from "@/components/providers/PostHogProvider";
import { SpotifyPlayerProvider } from "@/components/providers/SpotifyPlayerProvider";
import HubspotChat from "@/components/ui/HubspotChat";
import VideoPopup from "@/components/ui/VideoPopup";
import { ThemeProvider } from "@/context/ThemeContext";
import { VideoPopupProvider } from "@/context/VideoPopupContext";
import { absans, gmono, inter } from "@/lib/fonts";
import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "@/styles/wordpress-content.css";

export const metadata: Metadata = {
  title: {
    default: `Uclic: Agence Growth Marketing / Hacking : Sales, Ops, Produit`,
    template: `%s | Uclic`,
  },
  alternates: {
    canonical: "./",
  },
  description:
    "Uclic conçoit et optimise vos opérations commerciales pour maximiser chaque interaction. Avec des workflows CRM avancés et des processus de vente automatisés.",
  metadataBase: new URL("https://www.uclic.fr"),
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Uclic",
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: "Uclic",
  openGraph: {
    title: "Agence Growth Marketing / Hacking : Sales, Ops, Produit",
    description:
      "Uclic conçoit et optimise vos opérations commerciales pour maximiser chaque interaction. Avec des workflows CRM avancés et des processus de vente automatisés.",
    url: "https://www.uclic.fr",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
    images: [
      {
        url: "https://static.uclic.fr/open.png",
        width: 1200,
        height: 630,
        alt: "Uclic - Agence Growth Marketing & IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence Growth Marketing / Hacking : Sales, Ops, Produit",
    description:
      "Uclic conçoit et optimise vos opérations commerciales pour maximiser chaque interaction. Avec des workflows CRM avancés et des processus de vente automatisés.",
    site: "@uclic_fr",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${absans.variable} ${gmono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="dns-prefetch" href="https://www.uclic.fr" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/absans-regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/logo.svg" as="image" />
        

        {/* Script minimal pour éviter le FOUC du thème */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const savedTheme = localStorage.getItem('theme');
              const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
              
              document.documentElement.className = theme + ' loading';
              document.documentElement.style.setProperty('--background', theme === 'dark' ? '#000000' : '#ffffff', 'important');
              document.documentElement.style.setProperty('--foreground', theme === 'dark' ? '#F5F5F1' : '#000000', 'important');
              window.__INITIAL_THEME__ = theme;
              
              // Fade-out après chargement
              window.addEventListener('load', function() {
                document.documentElement.classList.remove('loading');
              });
              
              // Fallback rapide si DOM est déjà prêt
              if (document.readyState === 'complete') {
                document.documentElement.classList.remove('loading');
              }
            })();
          `
        }} />
        
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        
        {/* Préchargement des ressources critiques */}
        <link rel="preload" href="/backgroundeffect.png" as="image" />
        <link rel="preload" href="/absans-regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/remixicon.woff" as="font" type="font/woff" crossOrigin="anonymous" fetchPriority="high" />
        <link
          rel="preload"
          href="/fonts/absans-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
      </head>
      <body className="overflow-x-hidden" suppressHydrationWarning={true}>
        {/* Overlay de fade-in */}
        <div className="loading-overlay"></div>
        
        <Script id="website-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://www.uclic.fr/",
            name: "Uclic",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.uclic.fr/recherche?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>
        <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            url: "https://www.uclic.fr/",
            name: "Uclic",
            logo: "/favicon/android-chrome-192x192.png",
            sameAs: [
              "https://www.linkedin.com/company/uclic-growth-marketing/",
              "https://twitter.com/uclic_fr"
            ],
            contactPoint: [{
              "@type": "ContactPoint",
              contactType: "customer support",
              email: "contact@uclic.fr",
              telephone: "+33617125428",
              areaServed: "FR",
              availableLanguage: ["fr", "en"]
            }]
          })}
        </Script>
        <Script id="local-business-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Uclic",
            url: "https://www.uclic.fr/",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Paris",
              addressCountry: "FR"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "48.8566",
              longitude: "2.3522"
            },
            telephone: "+33617125428",
            email: "contact@uclic.fr"
          })}
        </Script>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P6CSQ32"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>
          <VideoPopupProvider>
            <SpotifyPlayerProvider>
              <PHProvider>
                <div>
                  <Header />
                  {children}
                  <Footer />
                  <VideoPopup />
                  <HubspotChat />
                  <Analytics />
                </div>
              </PHProvider>
            </SpotifyPlayerProvider>
          </VideoPopupProvider>
        </ThemeProvider>

        {/* Optimisations PageSpeed - Scripts lazy loading */}
        <Script
          id="pagespeed-optimizations"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Lazy loading des scripts basé sur les interactions
              (function() {
                let scriptsLoaded = false;
                const scripts = [
                  {
                    src: 'https://www.googletagmanager.com/gtag/js?id=GTM-P6CSQ32',
                    id: 'google-analytics',
                    priority: 'low',
                    delay: 3000
                  },
                  {
                    src: 'https://platform.linkedin.com/in.js',
                    id: 'linkedin-script',
                    priority: 'low',
                    delay: 15000
                  }
                ];

                function loadScript(script) {
                  return new Promise(function(resolve, reject) {
                    // Vérifier si le script existe déjà
                    if (script.id && document.querySelector('#' + script.id)) {
                      resolve();
                      return;
                    }

                    var scriptElement = document.createElement('script');
                    scriptElement.src = script.src;
                    scriptElement.async = true;
                    scriptElement.defer = true;
                    
                    if (script.id) {
                      scriptElement.id = script.id;
                    }

                    scriptElement.onload = function() {
                      console.log('Script loaded:', script.src);
                      resolve();
                    };

                    scriptElement.onerror = function() {
                      console.warn('Failed to load script:', script.src);
                      reject();
                    };

                    document.head.appendChild(scriptElement);
                  });
                }

                function loadScriptsByPriority() {
                  if (scriptsLoaded) return;
                  scriptsLoaded = true;

                  const highPriority = scripts.filter(s => s.priority === 'high' || !s.priority);
                  const mediumPriority = scripts.filter(s => s.priority === 'medium');
                  const lowPriority = scripts.filter(s => s.priority === 'low');

                  // Charger les scripts haute priorité immédiatement
                  highPriority.forEach(script => {
                    loadScript(script).catch(() => {});
                  });

                  // Charger les scripts moyenne priorité avec un délai
                  setTimeout(() => {
                    mediumPriority.forEach(script => {
                      loadScript(script).catch(() => {});
                    });
                  }, 100);

                  // Charger les scripts basse priorité avec un délai plus long
                  setTimeout(() => {
                    lowPriority.forEach(script => {
                      loadScript(script).catch(() => {});
                    });
                  }, 500);
                }

                // Déclencheurs d'interaction
                const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
                let triggered = false;

                function handleInteraction() {
                  if (!triggered) {
                    triggered = true;
                    loadScriptsByPriority();
                    
                    // Supprimer les listeners après le premier déclenchement
                    events.forEach(event => {
                      document.removeEventListener(event, handleInteraction);
                    });
                  }
                }

                // Ajouter les listeners d'interaction
                events.forEach(event => {
                  document.addEventListener(event, handleInteraction, { passive: true, once: true });
                });

                // Déclencheur de scroll
                window.addEventListener('scroll', () => {
                  if (!triggered) {
                    handleInteraction();
                  }
                }, { passive: true });

                // Intersection Observer pour le viewport
                if ('IntersectionObserver' in window) {
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting && !triggered) {
                        handleInteraction();
                      }
                    });
                  }, { threshold: 0.1 });

                  observer.observe(document.body);
                }

                // Optimisation des images (seulement pour les images avec data-src)
                function optimizeImages() {
                  const images = document.querySelectorAll('img[data-src]');
                  
                  if ('IntersectionObserver' in window) {
                    const imageObserver = new IntersectionObserver((entries) => {
                      entries.forEach(entry => {
                        if (entry.isIntersecting) {
                          const img = entry.target;
                          const src = img.getAttribute('data-src');
                          
                          if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            
                            // Ajouter un effet de fade-in seulement si l'image n'est pas déjà chargée
                            if (!img.complete) {
                              img.style.transition = 'opacity 0.3s ease-in-out';
                              img.style.opacity = '0';
                              
                              img.onload = () => {
                                img.style.opacity = '1';
                              };
                            }
                          }
                          
                          imageObserver.unobserve(img);
                        }
                      });
                    }, {
                      rootMargin: '50px 0px',
                      threshold: 0.1
                    });

                    images.forEach(img => imageObserver.observe(img));
                  }
                }

                // Délayer l'optimisation des images
                setTimeout(optimizeImages, 500);

                // Préconnexion optimisée (max 4 comme recommandé par Lighthouse)
                const criticalDomains = [
                  'https://fonts.googleapis.com',
                  'https://fonts.gstatic.com',
                  'https://api.uclic.fr',
                  'https://ph-files.imgix.net'
                ];

                // DNS Prefetch pour tous les domaines
                const allDomains = [
                  'https://fonts.googleapis.com',
                  'https://fonts.gstatic.com',
                  'https://www.google-analytics.com',
                  'https://www.googletagmanager.com',
                  'https://api.uclic.fr',
                  'https://ph-files.imgix.net',
                  'https://secure.gravatar.com',
                  'https://platform.linkedin.com',
                  'https://cdn.jsdelivr.net'
                ];

                allDomains.forEach(domain => {
                  const dnsLink = document.createElement('link');
                  dnsLink.rel = 'dns-prefetch';
                  dnsLink.href = domain;
                  document.head.appendChild(dnsLink);
                });

                // Preconnect seulement pour les domaines critiques (max 4)
                criticalDomains.forEach(domain => {
                  const preconnectLink = document.createElement('link');
                  preconnectLink.rel = 'preconnect';
                  preconnectLink.href = domain;
                  preconnectLink.crossOrigin = 'anonymous';
                  document.head.appendChild(preconnectLink);
                });

                // Les polices sont déjà préchargées dans le <head> statique

                // Préchargement des ressources critiques
                var preloadImage = function(href) {
                  var link = document.createElement('link');
                  link.rel = 'preload';
                  link.href = href;
                  link.as = 'image';
                  document.head.appendChild(link);
                };

                preloadImage('/logo.png');
                preloadImage('/heroo.png');
                preloadImage('/backgroundeffect.png');

                // Optimiser le chargement des Google Fonts
                var googleFontsLink = document.querySelector('link[href*="fonts.googleapis.com"]');
                if (googleFontsLink) {
                  var href = googleFontsLink.getAttribute('href');
                  if (href && !href.includes('display=swap')) {
                    var separator = href.includes('?') ? '&' : '?';
                    googleFontsLink.setAttribute('href', href + separator + 'display=swap');
                  }
                }

                // Optimiser le chargement des CSS non-critiques
                var nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([media="print"])');
                for (var i = 0; i < nonCriticalCSS.length; i++) {
                  var link = nonCriticalCSS[i];
                  if (i > 0) {
                    link.media = 'print';
                    link.onload = function() {
                      this.media = 'all';
                    };
                  }
                }

                // Optimiser le travail du thread principal
                const optimizeMainThread = () => {
                  // Découper les tâches longues en plus petites
                  const processInChunks = (tasks, chunkSize = 5) => {
                    let index = 0;
                    
                    const processChunk = () => {
                      const endIndex = Math.min(index + chunkSize, tasks.length);
                      
                      for (let i = index; i < endIndex; i++) {
                        tasks[i]();
                      }
                      
                      index = endIndex;
                      
                      if (index < tasks.length) {
                        // Utiliser setTimeout pour libérer le thread principal
                        setTimeout(processChunk, 0);
                      }
                    };
                    
                    processChunk();
                  };

                  // Optimiser les animations
                  const optimizeAnimations = () => {
                    const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transition"]');
                    animatedElements.forEach(el => {
                      el.style.willChange = 'transform, opacity';
                    });
                  };

                  // Optimiser les images
                  const optimizeImages = () => {
                    const images = document.querySelectorAll('img[loading="lazy"]');
                    images.forEach(img => {
                      if ('loading' in img) {
                        img.loading = 'lazy';
                      }
                    });
                  };

                  // Traiter les optimisations par chunks
                  processInChunks([
                    optimizeAnimations,
                    optimizeImages,
                    () => {
                      // Forcer le garbage collection si possible
                      if (window.gc) {
                        window.gc();
                      }
                    }
                  ]);
                };

                // Lancer l'optimisation après le chargement initial
                setTimeout(optimizeMainThread, 100);

                // Précharger les CSS critiques avec onload
                const criticalCSS = [
                  '/globals.css',
                  '/_next/static/css/app/layout.css'
                ];
                
                criticalCSS.forEach(href => {
                  const link = document.createElement('link');
                  link.rel = 'preload';
                  link.href = href;
                  link.as = 'style';
                  link.fetchPriority = 'high';
                  link.onload = function() {
                    this.rel = 'stylesheet';
                  };
                  document.head.appendChild(link);
                });

                // Déferrer les CSS non-critiques
                const nonCriticalCSSLinks = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
                nonCriticalCSSLinks.forEach((link, index) => {
                  if (index > 0) {
                    link.media = 'print';
                    link.onload = function() {
                      this.media = 'all';
                    };
                  }
                });
              })();
            `
          }}
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
