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
import "./globals.css";

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
        url: "https://www.uclic.fr/open.png",
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
        <link rel="preload" href="/fonts/absans-regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/logo.svg" as="image" />

        <Script id="performance-optimizations" strategy="afterInteractive">
          {`
            const deferredInit = () => {
              // Lazy loading avec IntersectionObserver
              if ('IntersectionObserver' in window) {
                const loadImage = (img) => {
                  const src = img.dataset.src;
                  if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                  }
                };

                const imageObserver = new IntersectionObserver(
                  (entries, observer) => {
                    entries.forEach(entry => {
                      if (entry.isIntersecting) {
                        loadImage(entry.target);
                        observer.unobserve(entry.target);
                      }
                    });
                  },
                  { rootMargin: '50px' }
                );

                document.querySelectorAll('img[loading="lazy"][data-src]')
                  .forEach(img => imageObserver.observe(img));
              }

              // Web Vitals optimisé
              if ('PerformanceObserver' in window) {
                try {
                  const vitalsObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach(entry => {
                      const value = entry.startTime || entry.value;
                      const id = entry.id || entry.entryType;
                      console.debug('[Web Vitals]', id, Math.round(value * 100) / 100);
                    });
                  });

                  vitalsObserver.observe({ 
                    entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']
                  });
                } catch (e) {
                  console.warn('Web Vitals:', e);
                }
              }
            };

            // Différer l'initialisation
            if (window.requestIdleCallback) {
              requestIdleCallback(deferredInit);
            } else {
              setTimeout(deferredInit, 1);
            }
          `}
        </Script>

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
      </head>
      <body className="overflow-x-hidden">
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
      </body>
    </html>
  );
}
